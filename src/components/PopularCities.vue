<script setup lang="ts">
import type { CityReference } from '@/types/weather'

const emit = defineEmits<{ selected: [city: CityReference] }>()
const cities: CityReference[] = [
  { name: 'Warszawa', country: 'PL', lat: 52.2297, lon: 21.0122 },
  { name: 'Kraków', country: 'PL', lat: 50.0647, lon: 19.945 },
  { name: 'Gdańsk', country: 'PL', lat: 54.352, lon: 18.6466 },
  { name: 'Londyn', country: 'GB', lat: 51.5074, lon: -0.1278 },
  { name: 'Paryż', country: 'FR', lat: 48.8566, lon: 2.3522 },
  { name: 'Tokio', country: 'JP', lat: 35.6762, lon: 139.6503 },
]
</script>

<template>
  <section aria-labelledby="popular-heading">
    <h2 id="popular-heading" class="text-base font-bold text-ink-800 dark:text-white">Popularne miejsca</h2>
    <div class="mt-3 flex gap-2 overflow-x-auto pb-1" tabindex="0" aria-label="Lista popularnych miejsc">
      <button v-for="city in cities" :key="city.name" type="button" class="min-h-11 shrink-0 rounded-full border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-700 transition-colors hover:border-skybrand-400 hover:bg-skybrand-50 hover:text-skybrand-700 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200 dark:hover:bg-skybrand-950/50" @click="emit('selected', city)">
        {{ city.name }}
      </button>
    </div>
  </section>
</template>
