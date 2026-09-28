import type { InjectionKey } from 'vue'
import type { Screenshot } from '@/data/content'
import { imageMeta } from '@/data/images.generated'

/** Provided by a page that owns an ImageLightbox, so every ImageSlot inside it can open it. */
export const lightboxKey: InjectionKey<(shot: Screenshot) => void> = Symbol('lightbox')

/** True once `npm run images` has exported this slot. */
export const hasImage = (id: string) => id in imageMeta

/**
 * True if a slot takes up space on the page. Layouts use it to drop the image column.
 * A slot whose image isn't exported yet renders a labelled placeholder, so this is true for any slot.
 * To hide missing screenshots in production instead: `!!id && (import.meta.env.DEV || hasImage(id))`.
 */
export const showsSlot = (id: string | undefined) => !!id
