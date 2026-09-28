// Converts the originals in assets-src/ (WebP or PNG) into responsive AVIF + WebP files in
// public/images/, and writes their dimensions to src/data/images.generated.ts.
// Run with: npm run images
//
// The image slots (file names, alt text, what to capture) are defined in
// src/data/content.ts (`romishImages`). A slot whose original isn't in assets-src/ yet
// is skipped, and the site shows a labelled placeholder for it.
//
// It also writes the case study's share image (public/og/romish-og.jpg, 1200 x 630,
// cropped from the top of the landing screenshot after any blur).
import { existsSync } from 'node:fs'
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import sharp from 'sharp'
import { romishImages } from '../src/data/content.ts'

const SRC = 'assets-src'
const OUT = 'public/images'
const WIDTHS = [480, 800, 1600, 2400]
const OG = { slot: 'romish-landing', file: 'public/og/romish-og.jpg' }

/**
 * Until a slot's new (rebranded) original is in assets-src/, export the pre-rebrand
 * screenshot of the same screen from assets-src/pre-rebrand/ so the page never loses it.
 * Default: the same slot id as a PNG. Listed here only where the old file name differs.
 */
const PRE_REBRAND = `${SRC}/pre-rebrand`
const preRebrandName = {
  'romish-play': 'romish-dashboard.png', // the Play page was called the dashboard
  'romish-before': 'romish-dashboard.png', // the Play page before the rebrand
}

/**
 * Personal data to hide before export: Steam names, Steam IDs, IPs, passwords, admin URLs.
 * Regions are in original pixels, so each entry records the size it was measured on
 * (`expect`). If a replaced screenshot has a different size the image is NOT exported:
 * re-measure the regions (or delete the entry if the new shot has nothing to hide).
 */
const privacy = {
  'romish-landing': {
    expect: [1920, 1080],
    blur: [{ left: 495, top: 810, width: 230, height: 34 }], // sample "players online" figure, not real usage
  },
  'romish-live': {
    expect: [1873, 894],
    blur: [{ left: 846, top: 440, width: 182, height: 36 }], // server IP and port
  },
  'romish-profile': {
    expect: [1870, 945],
    blur: [{ left: 306, top: 240, width: 128, height: 20 }], // Steam64 ID
  },
  'romish-servers': {
    expect: [1860, 951],
    blur: [
      { left: 1350, top: 535, width: 170, height: 32 }, // game server IP and port
      { left: 0, top: 930, width: 215, height: 21 }, // admin URL in the browser status bar
    ],
  },
  'romish-admin': {
    expect: [1873, 955],
    blur: [{ left: 298, top: 640, width: 150, height: 44 }], // another player's name and avatar
  },
  'romish-social': {
    expect: [394, 957],
    blur: [{ left: 26, top: 256, width: 132, height: 46 }], // another player's name and avatar
    crop: { left: 0, top: 0, width: 394, height: 440 }, // the panel is empty below the one request
  },
}

async function blurRegions(input, regions) {
  const composites = await Promise.all(
    regions.map(async (r) => ({
      input: await sharp(input).extract(r).blur(14).toBuffer(),
      left: r.left,
      top: r.top,
    })),
  )
  return sharp(input).composite(composites).png().toBuffer()
}

await mkdir(OUT, { recursive: true })
const manifest = {}
const missing = []
const fallback = []
const refused = []

for (const slot of romishImages) {
  let src = `${SRC}/${slot.file}`
  if (!existsSync(src)) {
    const old = `${PRE_REBRAND}/${preRebrandName[slot.id] ?? `${slot.id}.png`}`
    if (!existsSync(old)) {
      missing.push(slot.file)
      continue
    }
    src = old
    fallback.push(`${slot.file} (using ${old})`)
  }
  let buf = await sharp(src).png().toBuffer()
  const { width, height } = await sharp(buf).metadata()

  const opts = privacy[slot.id]
  if (opts) {
    const [w, h] = opts.expect
    if (w !== width || h !== height) {
      refused.push(`${slot.file} is ${width}x${height}, blur regions were measured on ${w}x${h}`)
      continue
    }
    buf = await blurRegions(buf, opts.blur)
    if (opts.crop) buf = await sharp(buf).extract(opts.crop).png().toBuffer()
  }

  const out = await sharp(buf).metadata()
  const outWidths = [...new Set(WIDTHS.map((x) => Math.min(x, out.width)))]
  for (const x of outWidths) {
    const resized = sharp(buf).resize({ width: x })
    await resized.clone().avif({ quality: 55 }).toFile(`${OUT}/${slot.id}-${x}.avif`)
    await resized.clone().webp({ quality: 78 }).toFile(`${OUT}/${slot.id}-${x}.webp`)
  }
  manifest[slot.id] = { width: out.width, height: out.height, widths: outWidths }
  if (slot.id === OG.slot) {
    await sharp(buf).resize(1200, 630, { fit: 'cover', position: 'top' }).jpeg({ quality: 85, mozjpeg: true }).toFile(OG.file)
  }
  console.log(`${slot.id}: ${out.width}x${out.height} -> ${outWidths.join(', ')}`)
}

// Remove exports left over from slots that no longer have a source (renamed or refused)
for (const file of await readdir(OUT)) {
  const match = /^(romish-[\w-]+?)-\d+\.(avif|webp)$/.exec(file)
  if (match && !(match[1] in manifest)) await rm(`${OUT}/${file}`)
}
if (!(OG.slot in manifest)) await rm(OG.file, { force: true })

// Site icons

const icon = `${SRC}/icon-source.png`
if (existsSync(icon)) {
  await sharp(icon).resize(180).png().toFile('public/apple-touch-icon.png')
  await sharp(icon).resize(192).png().toFile('public/icon-192.png')
  await sharp(icon).resize(512).png().toFile('public/icon-512.png')

  // favicon.ico: an ICO container holding 16, 32 and 48px PNGs
  const sizes = [16, 32, 48]
  const pngs = await Promise.all(sizes.map((s) => sharp(icon).resize(s).png().toBuffer()))
  const header = Buffer.alloc(6 + 16 * sizes.length)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(sizes.length, 4)
  let offset = header.length
  sizes.forEach((s, i) => {
    const e = 6 + i * 16
    header.writeUInt8(s, e)
    header.writeUInt8(s, e + 1)
    header.writeUInt16LE(1, e + 4)
    header.writeUInt16LE(32, e + 6)
    header.writeUInt32LE(pngs[i].length, e + 8)
    header.writeUInt32LE(offset, e + 12)
    offset += pngs[i].length
  })
  await writeFile('public/favicon.ico', Buffer.concat([header, ...pngs]))
}

await writeFile(
  'src/data/images.generated.ts',
  `// Generated by scripts/optimize-images.mjs. Do not edit by hand.
export interface ImageMeta {
  width: number
  height: number
  widths: readonly number[]
}

export const imageMeta: Record<string, ImageMeta> = ${JSON.stringify(manifest, null, 2)}
`,
)

if (fallback.length) console.log(`\nPre-rebrand screenshot used until the new one is added:\n  ${fallback.join('\n  ')}`)
if (missing.length) console.log(`\nNot in assets-src/ yet (the site shows a placeholder): ${missing.join(', ')}`)
if (refused.length) {
  console.error(`\nNOT exported, blur regions need re-measuring:\n  ${refused.join('\n  ')}`)
  process.exitCode = 1
}
