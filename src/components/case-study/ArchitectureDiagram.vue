<script setup lang="ts">
import { romishCaseStudy } from '@/data/content'

/**
 * Romish system overview as inline SVG, coloured with the theme tokens so it works in both themes.
 * Two layouts: wide for desktop, stacked for phones (only one is displayed, so assistive tech
 * reads one title and description).
 */
const a = romishCaseStudy.architecture
const n = a.diagram.nodes
const e = a.diagram.edges
type Key = keyof typeof n
interface Box { key: Key; x: number; y: number; w: number; h: number }

const wide: Box[] = [
  { key: 'browser', x: 170, y: 8, w: 240, h: 56 },
  { key: 'pusher', x: 530, y: 8, w: 180, h: 56 },
  ...(['mongo', 'redis', 'qstash', 'dathost', 'steam', 'stripe'] as const).map((key, i) => ({ key, x: i * 150, y: 294, w: 130, h: 56 })),
  { key: 'cs2', x: 450, y: 404, w: 130, h: 56 },
]
const wideLinks = [65, 215, 365, 515, 665, 815]

const narrow: Box[] = [
  { key: 'browser', x: 0, y: 8, w: 150, h: 56 },
  { key: 'pusher', x: 210, y: 8, w: 150, h: 56 },
  { key: 'mongo', x: 0, y: 300, w: 165, h: 56 },
  { key: 'redis', x: 195, y: 300, w: 165, h: 56 },
  { key: 'qstash', x: 0, y: 376, w: 165, h: 56 },
  { key: 'steam', x: 195, y: 376, w: 165, h: 56 },
  { key: 'stripe', x: 0, y: 452, w: 165, h: 56 },
  { key: 'dathost', x: 195, y: 452, w: 165, h: 56 },
  { key: 'cs2', x: 195, y: 540, w: 165, h: 56 },
]
</script>

<template>
  <figure class="arch min-w-0 rounded-lg border border-line bg-surface p-3 sm:p-8">
    <!-- Desktop -->
    <svg
      class="hidden h-auto w-full md:block"
      viewBox="0 0 880 470"
      role="img"
      aria-labelledby="arch-wide-title arch-wide-desc"
    >
      <title id="arch-wide-title">{{ a.diagramTitle }}</title>
      <desc id="arch-wide-desc">{{ a.diagramDesc }}</desc>
      <defs>
        <marker id="arch-arrow-w" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 10 5 0 10z" class="arrowhead" />
        </marker>
      </defs>

      <!-- edges -->
      <g class="edge" marker-end="url(#arch-arrow-w)">
        <line x1="290" y1="64" x2="290" y2="115" />
        <line x1="620" y1="118" x2="620" y2="67" />
        <line x1="530" y1="36" x2="413" y2="36" />
        <line x1="515" y1="350" x2="515" y2="401" />
        <path d="M580 432H590V237" fill="none" />
      </g>
      <g class="edge" marker-start="url(#arch-arrow-w)" marker-end="url(#arch-arrow-w)">
        <line v-for="x in wideLinks" :key="x" :x1="x" y1="237" :x2="x" y2="291" />
      </g>
      <g class="label">
        <text x="298" y="95">{{ e.https }}</text>
        <text x="628" y="95">{{ e.events }}</text>
        <text x="471" y="27" text-anchor="middle">{{ e.socket }}</text>
        <text x="507" y="381" text-anchor="end">{{ e.setup }}</text>
        <text x="598" y="422">{{ e.webhook }}</text>
      </g>

      <!-- app -->
      <rect x="20" y="118" width="840" height="116" rx="10" class="app" />
      <text x="440" y="146" text-anchor="middle" class="name">
        {{ n.app.name }} <tspan class="detail">· {{ n.app.detail }}</tspan>
      </text>
      <g v-for="(layer, i) in a.diagram.layers" :key="layer">
        <rect :x="25 + i * 282" y="162" width="266" height="44" rx="6" class="layer" />
        <text :x="158 + i * 282" y="189" text-anchor="middle" class="layer-text">{{ layer }}</text>
      </g>

      <!-- nodes -->
      <g v-for="b in wide" :key="b.key">
        <rect :x="b.x" :y="b.y" :width="b.w" :height="b.h" rx="8" class="node" />
        <text :x="b.x + b.w / 2" :y="b.y + 24" text-anchor="middle" class="name">{{ n[b.key].name }}</text>
        <text :x="b.x + b.w / 2" :y="b.y + 42" text-anchor="middle" class="detail">{{ n[b.key].detail }}</text>
      </g>
    </svg>

    <!-- Phones -->
    <svg class="narrow h-auto w-full md:hidden" viewBox="0 0 380 610" role="img" aria-labelledby="arch-narrow-title arch-narrow-desc">
      <title id="arch-narrow-title">{{ a.diagramTitle }}</title>
      <desc id="arch-narrow-desc">{{ a.diagramDesc }}</desc>
      <defs>
        <marker id="arch-arrow-n" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 10 5 0 10z" class="arrowhead" />
        </marker>
      </defs>

      <g class="edge" marker-end="url(#arch-arrow-n)">
        <line x1="75" y1="64" x2="75" y2="115" />
        <line x1="285" y1="118" x2="285" y2="67" />
        <line x1="210" y1="36" x2="153" y2="36" />
        <line x1="277" y1="508" x2="277" y2="537" />
        <path d="M360 568H372V188H363" fill="none" />
      </g>
      <g class="edge">
        <line x1="180" y1="258" x2="180" y2="480" />
        <line v-for="y in [328, 404, 480]" :key="y" x1="165" :y1="y" x2="195" :y2="y" />
      </g>
      <g class="label">
        <text x="83" y="95">{{ e.https }}</text>
        <text x="293" y="95">{{ e.events }}</text>
        <text x="181" y="27" text-anchor="middle">{{ e.socketShort }}</text>
        <text x="269" y="527" text-anchor="end">{{ e.setup }}</text>
        <text x="185" y="572" text-anchor="end">{{ e.webhook }}</text>
      </g>

      <rect x="0" y="118" width="360" height="140" rx="10" class="app" />
      <text x="180" y="142" text-anchor="middle" class="name">{{ n.app.name }}</text>
      <text x="180" y="158" text-anchor="middle" class="detail">{{ n.app.detail }}</text>
      <g v-for="(layer, i) in a.diagram.layers" :key="layer">
        <rect x="12" :y="170 + i * 28" width="336" height="24" rx="5" class="layer" />
        <text x="180" :y="186 + i * 28" text-anchor="middle" class="layer-text">{{ layer }}</text>
      </g>

      <g v-for="b in narrow" :key="b.key">
        <rect :x="b.x" :y="b.y" :width="b.w" :height="b.h" rx="8" class="node" />
        <text :x="b.x + b.w / 2" :y="b.y + 24" text-anchor="middle" class="name">{{ n[b.key].name }}</text>
        <text :x="b.x + b.w / 2" :y="b.y + 42" text-anchor="middle" class="detail">{{ n[b.key].detail }}</text>
      </g>
    </svg>
  </figure>
</template>

<style scoped>
.arch svg {
  font-family: var(--font-sans);
}
.node {
  fill: var(--c-surface-2);
  stroke: var(--c-line-strong);
}
.app {
  fill: var(--c-accent-soft);
  stroke: var(--c-accent);
}
.layer {
  fill: var(--c-surface);
  stroke: var(--c-line-strong);
}
.name {
  fill: var(--c-fg);
  font-size: 15px;
  font-weight: 600;
}
.detail {
  fill: var(--c-muted);
  font-size: 12.5px;
  font-weight: 400;
}
.layer-text {
  fill: var(--c-fg);
  font-family: var(--font-mono);
  font-size: 12px;
}
.edge line,
.edge path {
  stroke: var(--c-accent);
  stroke-width: 1.5;
}
.arrowhead {
  fill: var(--c-accent);
}
.label text {
  fill: var(--c-muted);
  font-family: var(--font-mono);
  font-size: 12.5px;
}
</style>

<style scoped>
/* Phone layout is drawn at roughly 1:1, so it gets larger type than the scaled-down desktop one */
.narrow .name {
  font-size: 16px;
}
.narrow .detail {
  font-size: 14px;
}
.narrow .layer-text,
.narrow .label text {
  font-size: 13.5px;
}
</style>
