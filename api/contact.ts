// POST /api/contact: validates a contact form message, then forwards it to Formspree.
//
// The browser checks the same things for quick feedback, but this is the gate that counts:
// a message only goes through if the email is well formed, not from a throwaway provider,
// and its domain can actually receive mail (DNS MX lookup). Bots that fill the honeypot or
// submit faster than a person can type get a fake success and are dropped.
//
// Outside Vercel (npm run dev) messages are validated but not sent.
import { promises as dns } from 'node:dns'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const disposableDomains = new Set<string>(require('disposable-email-domains'))

/** Set FORMSPREE_ENDPOINT in Vercel to a form id that isn't in the public bundle. */
const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT ?? 'https://formspree.io/f/xeejgwqd'
const MIN_FILL_MS = 3000
const DNS_TIMEOUT_MS = 3000
const LIMITS = { name: 100, email: 254, subject: 150, message: 5000 }

// Letters, digits and the usual symbols before the @; a real domain with a 2+ letter TLD after it
const EMAIL =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i

const messages = {
  name: 'Please enter your name.',
  message: 'Please write a message of at least 10 characters.',
  emailInvalid: 'Please enter a valid email address, like name@example.com.',
  emailDisposable: 'Please use a permanent email address, not a disposable one, so I can reply.',
  emailNoMail: "That email address's domain can't receive email. Please check it for typos.",
  tooLong: 'This is too long.',
}

type Field = 'name' | 'email' | 'subject' | 'message'
type Errors = Partial<Record<Field, string>>

const json = (data: unknown, status = 200, headers: Record<string, string> = {}) =>
  Response.json(data, { status, headers: { 'Cache-Control': 'no-store', ...headers } })

const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '')

function withTimeout<T>(promise: Promise<T>): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(Object.assign(new Error('timeout'), { code: 'ETIMEOUT' })), DNS_TIMEOUT_MS)),
  ])
}

/** The domain definitely doesn't exist or has no records of that type. */
const isNoRecords = (error: unknown) => ['ENOTFOUND', 'ENODATA'].includes((error as { code?: string }).code ?? '')

/**
 * Can this domain receive mail? true / false, or 'unknown' when DNS itself failed
 * (then we let the message through rather than lose a real one).
 */
async function domainAcceptsMail(domain: string): Promise<boolean | 'unknown'> {
  try {
    const mx = await withTimeout(dns.resolveMx(domain))
    // RFC 7505 "null MX" (a single record pointing at ".") means the domain accepts no mail
    if (mx.length === 1 && (mx[0].exchange === '' || mx[0].exchange === '.')) return false
    if (mx.length > 0) return true
  } catch (error) {
    if (!isNoRecords(error)) return 'unknown'
  }
  // RFC 5321: with no MX, mail goes to the domain's own address record
  for (const lookup of [dns.resolve4, dns.resolve6]) {
    try {
      if ((await withTimeout(lookup(domain))).length > 0) return true
    } catch (error) {
      if (!isNoRecords(error)) return 'unknown'
    }
  }
  return false
}

async function validateEmail(email: string): Promise<string | undefined> {
  if (!email || email.length > LIMITS.email || !EMAIL.test(email)) return messages.emailInvalid
  const domain = email.slice(email.lastIndexOf('@') + 1).toLowerCase()
  // Check the domain and each parent (mail.throwaway.com -> throwaway.com)
  const parts = domain.split('.')
  for (let i = 0; i < parts.length - 1; i++) {
    if (disposableDomains.has(parts.slice(i).join('.'))) return messages.emailDisposable
  }
  if ((await domainAcceptsMail(domain)) === false) return messages.emailNoMail
  return undefined
}

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405, { Allow: 'POST' })

    let body: Record<string, unknown>
    try {
      body = await request.json()
    } catch {
      return json({ error: 'Invalid request' }, 400)
    }

    const form = {
      name: text(body.name),
      email: text(body.email),
      subject: text(body.subject),
      message: text(body.message),
    }

    // Bots: honeypot filled, or submitted faster than a person could. Pretend it worked.
    const elapsed = Number(body.elapsedMs)
    if (text(body._gotcha) || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) return json({ ok: true })

    const errors: Errors = {}
    if (!form.name) errors.name = messages.name
    else if (form.name.length > LIMITS.name) errors.name = messages.tooLong
    if (form.subject.length > LIMITS.subject) errors.subject = messages.tooLong
    if (form.message.length < 10) errors.message = messages.message
    else if (form.message.length > LIMITS.message) errors.message = messages.tooLong
    const emailError = await validateEmail(form.email)
    if (emailError) errors.email = emailError
    if (Object.keys(errors).length > 0) return json({ errors }, 422)

    if (!process.env.VERCEL) return json({ ok: true, dryRun: true })

    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        _replyto: form.email,
        _subject: form.subject || `Portfolio message from ${form.name}`,
      }),
    })
    if (!res.ok) {
      console.error(`Formspree rejected a contact message: ${res.status} ${await res.text().catch(() => '')}`)
      return json({ error: 'Your message could not be sent.' }, 502)
    }
    return json({ ok: true })
  },
}
