import type { InjectionKey } from 'vue'
import type { Screenshot } from '@/data/content'
import { imageMeta } from '@/data/images.generated'

/** Provided by a page that owns an ImageLightbox, so every ImageSlot inside it can open it. */
export const lightboxKey: InjectionKey<(shot: Screenshot) => void> = Symbol('lightbox')

/** True once `npm run images` has exported this slot. */
export const hasImage = (id: string) => id in imageMeta

/**
 * True if a slot takes up space on the page: always in dev (the placeholder shows),
 * and in production only once the image exists. Layouts use it to drop the image column.
 */
export const showsSlot = (id: string | undefined) => !!id && (import.meta.env.DEV || hasImage(id))
