// Builds assets-src/romish-mobile.png: phone screenshots from assets-src/mobile/
// side by side on a dark canvas, each with rounded corners.
// Run with: node scripts/compose-mobile.mjs   (then `npm run images`)
//
// mobileview6 (live match) is left out on purpose: it shows the server address.
import sharp from 'sharp'

const SRC = 'assets-src/mobile'
const PHONES = ['mobileview3', 'mobileview4', 'mobileview5', 'mobileview7'] // draft, veto, setup, results
const W = 390
const H = 844
const GAP = 40
const PAD = 40
const RADIUS = 28

const mask = Buffer.from(`<svg width="${W}" height="${H}"><rect width="${W}" height="${H}" rx="${RADIUS}" /></svg>`)

const phones = await Promise.all(
  PHONES.map((name) =>
    sharp(`${SRC}/${name}.png`)
      .resize({ width: W, height: H, fit: 'cover', position: 'top' })
      .composite([{ input: mask, blend: 'dest-in' }])
      .png()
      .toBuffer(),
  ),
)

await sharp({
  create: {
    width: PAD * 2 + PHONES.length * W + (PHONES.length - 1) * GAP,
    height: PAD * 2 + H,
    channels: 4,
    background: '#0b0b0c',
  },
})
  .composite(phones.map((input, i) => ({ input, left: PAD + i * (W + GAP), top: PAD })))
  .png()
  .toFile('assets-src/romish-mobile.png')

console.log(`assets-src/romish-mobile.png: ${PHONES.join(', ')}`)
