<script setup lang="ts">
import { computed } from 'vue'

type IconSize = 'sm' | 'md' | 'lg' | 'xl'

const props = withDefaults(defineProps<{
  code?: string
  size?: IconSize
  label?: string
}>(), {
  code: '',
  size: 'md',
  label: 'Warunki pogodowe',
})

const weatherType = computed(() => {
  const code = props.code.slice(0, 2)
  if (code === '11') return 'storm'
  if (code === '13') return 'snow'
  if (code === '09' || code === '10') return 'rain'
  if (code === '50') return 'mist'
  if (code === '03' || code === '04') return 'cloud'
  return 'clear'
})

const sizeClass = computed(() => ({
  sm: 'h-7 w-7',
  md: 'h-11 w-11',
  lg: 'h-16 w-16',
  xl: 'h-24 w-24',
}[props.size]))
</script>

<template>
  <span :class="[sizeClass, 'inline-flex shrink-0 items-center justify-center']" role="img" :aria-label="props.label">
    <svg v-if="weatherType === 'clear'" viewBox="0 0 24 24" fill="none" class="h-full w-full">
      <circle cx="12" cy="12" r="4" fill="currentColor" class="text-amber-400" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" class="text-amber-500" />
    </svg>
    <svg v-else-if="weatherType === 'cloud'" viewBox="0 0 24 24" fill="none" class="h-full w-full">
      <path d="M17.5 19H9a7 7 0 1 1 6.7-9.02A4.5 4.5 0 1 1 17.5 19Z" fill="currentColor" class="text-ink-300 dark:text-ink-500" />
      <path d="M17.5 19H9a7 7 0 1 1 6.7-9.02A4.5 4.5 0 1 1 17.5 19Z" stroke="currentColor" stroke-width="1.2" class="text-ink-400 dark:text-ink-400" />
    </svg>
    <svg v-else-if="weatherType === 'rain'" viewBox="0 0 24 24" fill="none" class="h-full w-full">
      <path d="M17.5 15H9a6 6 0 1 1 5.7-7.85A4 4 0 1 1 17.5 15Z" fill="currentColor" class="text-ink-300 dark:text-ink-500" />
      <path d="M8 18v2m4-2v3m4-3v2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" class="text-skybrand-500" />
    </svg>
    <svg v-else-if="weatherType === 'storm'" viewBox="0 0 24 24" fill="none" class="h-full w-full">
      <path d="M17.5 14H9a6 6 0 1 1 5.7-7.85A4 4 0 1 1 17.5 14Z" fill="currentColor" class="text-ink-400 dark:text-ink-500" />
      <path d="m13 13-3 5h3l-2 4 5-6h-3l2-3Z" fill="currentColor" class="text-amber-400" />
    </svg>
    <svg v-else-if="weatherType === 'snow'" viewBox="0 0 24 24" fill="none" class="h-full w-full">
      <path d="M17.5 14H9a6 6 0 1 1 5.7-7.85A4 4 0 1 1 17.5 14Z" fill="currentColor" class="text-ink-200 dark:text-ink-500" />
      <path d="M8 19h.01M12 18v.01M16 19h.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" class="text-sky-300" />
    </svg>
    <svg v-else viewBox="0 0 24 24" fill="none" class="h-full w-full">
      <path d="M4 8h16M4 12h16M4 16h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" class="text-ink-400" />
    </svg>
  </span>
</template>
