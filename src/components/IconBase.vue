<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  name: string
  size?: string
  decorative?: boolean
}>(), {
  size: '5',
  decorative: true,
})

const sizeClass = computed(() => ({
  '4': 'h-4 w-4',
  '5': 'h-5 w-5',
  '6': 'h-6 w-6',
  '8': 'h-8 w-8',
}[props.size] || 'h-5 w-5'))
</script>

<template>
  <svg
    :class="[sizeClass, 'shrink-0']"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    :aria-hidden="props.decorative"
  >
    <template v-if="props.name === 'cloud'">
      <path d="M17.5 19H9a7 7 0 1 1 6.7-9.02A4.5 4.5 0 1 1 17.5 19Z" />
    </template>
    <template v-else-if="props.name === 'pin'">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </template>
    <template v-else-if="props.name === 'search'">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </template>
    <template v-else-if="props.name === 'sun'">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41" />
    </template>
    <template v-else-if="props.name === 'moon'">
      <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z" />
    </template>
    <template v-else-if="props.name === 'star'">
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3.1 9.6l6.2-.9L12 3Z" />
    </template>
    <template v-else-if="props.name === 'clock'">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </template>
    <template v-else-if="props.name === 'x'">
      <path d="m6 6 12 12M18 6 6 18" />
    </template>
    <template v-else-if="props.name === 'arrow-left'">
      <path d="m15 18-6-6 6-6M9 12h12" />
    </template>
    <template v-else-if="props.name === 'refresh'">
      <path d="M20 11a8.1 8.1 0 0 0-14.5-4.9L4 8" />
      <path d="M4 4v4h4M4 13a8.1 8.1 0 0 0 14.5 4.9L20 16" />
      <path d="M20 20v-4h-4" />
    </template>
    <template v-else-if="props.name === 'droplet'">
      <path d="M12 2.5S5 10 5 14a7 7 0 0 0 14 0c0-4-7-11.5-7-11.5Z" />
    </template>
    <template v-else-if="props.name === 'wind'">
      <path d="M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7" />
    </template>
    <template v-else-if="props.name === 'gauge'">
      <path d="M4 17a8 8 0 1 1 16 0" />
      <path d="m12 13 3-3M5 20h14" />
    </template>
    <template v-else-if="props.name === 'eye'">
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
      <circle cx="12" cy="12" r="2.5" />
    </template>
    <template v-else-if="props.name === 'alert'">
      <path d="m10.3 3.3-8 14A2 2 0 0 0 4 20h16a2 2 0 0 0 1.7-2.7l-8-14a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4m0 3h.01" />
    </template>
    <template v-else-if="props.name === 'check'">
      <path d="m5 12 4 4L19 6" />
    </template>
    <template v-else>
      <circle cx="12" cy="12" r="8" />
    </template>
  </svg>
</template>
