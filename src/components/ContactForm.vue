<script setup lang="ts">
import { computed, nextTick, reactive, ref } from 'vue'
import AppIcon from './AppIcon.vue'
import { contact, person, site } from '@/data/content'

type Field = 'name' | 'email' | 'message'
type Status = 'idle' | 'sending' | 'success' | 'error'

const form = reactive({ name: '', email: '', subject: '', message: '', _gotcha: '' })
const touched = reactive<Record<Field, boolean>>({ name: false, email: false, message: false })
const status = ref<Status>('idle')
const serverError = ref('')
const successHeading = ref<HTMLElement>()

const errors = computed<Record<Field, string>>(() => ({
  name: form.name.trim() ? '' : 'Please enter your name.',
  email: !form.email.trim()
    ? 'Please enter your email address.'
    : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
      ? ''
      : 'Please enter a valid email address, like name@example.com.',
  message:
    form.message.trim().length >= 10 ? '' : 'Please write a message of at least 10 characters.',
}))

const visibleError = (field: Field) => (touched[field] ? errors.value[field] : '')

async function submit(event: Event) {
  const fields: Field[] = ['name', 'email', 'message']
  fields.forEach((f) => (touched[f] = true))
  const firstInvalid = fields.find((f) => errors.value[f])
  if (firstInvalid) {
    ;(event.target as HTMLFormElement).querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
    return
  }

  status.value = 'sending'
  serverError.value = ''
  try {
    const body = new FormData()
    body.append('name', form.name.trim())
    body.append('email', form.email.trim())
    body.append('subject', form.subject.trim())
    body.append('message', form.message.trim())
    body.append('_subject', form.subject.trim() || `Portfolio message from ${form.name.trim()}`)
    body.append('_gotcha', form._gotcha)

    const res = await fetch(site.formEndpoint, { method: 'POST', body, headers: { Accept: 'application/json' } })
    if (!res.ok) {
      const data = await res.json().catch(() => null)
      serverError.value = data?.errors?.map((e: { message: string }) => e.message).join(' ') ?? ''
      throw new Error(`Form submission failed with status ${res.status}`)
    }
    status.value = 'success'
    Object.assign(form, { name: '', email: '', subject: '', message: '' })
    fields.forEach((f) => (touched[f] = false))
    await nextTick()
    successHeading.value?.focus()
  } catch {
    status.value = 'error'
  }
}

const inputClass = (field?: Field) => [
  'block w-full rounded-md border bg-bg px-3.5 py-2.5 text-[0.9375rem] text-fg placeholder:text-muted/70',
  'transition-colors focus:border-accent focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-accent/30',
  field && visibleError(field) ? 'border-red-500 dark:border-red-400' : 'border-line-strong',
]
</script>

<template>
  <div class="rounded-lg border border-line bg-surface p-6 sm:p-8">
    <div v-if="status === 'success'" class="flex min-h-80 flex-col items-start justify-center" role="status">
      <span class="flex size-10 items-center justify-center rounded-full bg-accent-soft text-accent">
        <AppIcon name="check" :size="20" />
      </span>
      <h3 ref="successHeading" tabindex="-1" class="mt-5 text-xl font-semibold tracking-tight outline-none">
        Message sent
      </h3>
      <p class="mt-2 leading-relaxed text-muted">{{ contact.form.success }}</p>
      <button
        type="button"
        class="mt-6 text-sm font-medium text-accent hover:text-accent-hover"
        @click="status = 'idle'"
      >
        Send another message
      </button>
    </div>

    <form v-else novalidate class="space-y-5" aria-describedby="form-status" @submit.prevent="submit">
      <div class="grid gap-5 sm:grid-cols-2">
        <div>
          <label for="cf-name" class="mb-1.5 block text-sm font-medium">Name</label>
          <input
            id="cf-name"
            v-model="form.name"
            name="name"
            type="text"
            autocomplete="name"
            required
            :aria-invalid="!!visibleError('name')"
            :aria-describedby="visibleError('name') ? 'cf-name-error' : undefined"
            :class="inputClass('name')"
            @blur="touched.name = true"
          />
          <p v-if="visibleError('name')" id="cf-name-error" class="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {{ visibleError('name') }}
          </p>
        </div>
        <div>
          <label for="cf-email" class="mb-1.5 block text-sm font-medium">Email</label>
          <input
            id="cf-email"
            v-model="form.email"
            name="email"
            type="email"
            autocomplete="email"
            inputmode="email"
            required
            :aria-invalid="!!visibleError('email')"
            :aria-describedby="visibleError('email') ? 'cf-email-error' : undefined"
            :class="inputClass('email')"
            @blur="touched.email = true"
          />
          <p v-if="visibleError('email')" id="cf-email-error" class="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {{ visibleError('email') }}
          </p>
        </div>
      </div>

      <div>
        <label for="cf-subject" class="mb-1.5 block text-sm font-medium">
          Subject <span class="font-normal text-muted">(optional)</span>
        </label>
        <input id="cf-subject" v-model="form.subject" name="subject" type="text" :class="inputClass()" />
      </div>

      <div>
        <label for="cf-message" class="mb-1.5 block text-sm font-medium">Message</label>
        <textarea
          id="cf-message"
          v-model="form.message"
          name="message"
          rows="5"
          required
          :aria-invalid="!!visibleError('message')"
          :aria-describedby="visibleError('message') ? 'cf-message-error' : undefined"
          :class="[inputClass('message'), 'resize-y']"
          @blur="touched.message = true"
        />
        <p v-if="visibleError('message')" id="cf-message-error" class="mt-1.5 text-sm text-red-600 dark:text-red-400">
          {{ visibleError('message') }}
        </p>
      </div>

      <!-- Honeypot for bots; Formspree drops submissions where this is filled -->
      <div class="hidden" aria-hidden="true">
        <label for="cf-gotcha">Leave this field empty</label>
        <input id="cf-gotcha" v-model="form._gotcha" name="_gotcha" type="text" tabindex="-1" autocomplete="off" />
      </div>

      <div id="form-status" aria-live="polite">
        <p
          v-if="status === 'error'"
          class="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300"
        >
          {{ contact.form.error }}
          <a :href="`mailto:${person.email}`" class="font-medium break-all underline underline-offset-2">{{ person.email }}</a>
          <span v-if="serverError" class="mt-1 block opacity-80">Details: {{ serverError }}</span>
        </p>
      </div>

      <button
        type="submit"
        :disabled="status === 'sending'"
        class="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-accent px-5 font-medium text-accent-fg transition-colors hover:bg-accent-hover disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        <svg v-if="status === 'sending'" class="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity="0.3" stroke-width="3" />
          <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
        </svg>
        {{ status === 'sending' ? 'Sending…' : 'Send message' }}
      </button>
    </form>
  </div>
</template>
