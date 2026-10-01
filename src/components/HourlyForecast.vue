<script setup lang="ts">
import type { HourlyForecast as HourlyForecastItem } from '@/types/weather'
import { hour, temperature } from '@/services/formatters'
import WeatherIcon from '@/components/WeatherIcon.vue'

const props = defineProps<{ hourly: HourlyForecastItem[] }>()

function isCurrent(timestamp: number): boolean {
  return Math.abs(Date.now() - timestamp * 1000) < 90 * 60 * 1000
}
</script>

<template>
  <section class="surface p-5 sm:p-6" aria-labelledby="hourly-heading">
    <div class="flex items-center justify-between gap-4">
      <h2 id="hourly-heading" class="text-base font-bold text-ink-800 dark:text-white">Prognoza godzinowa</h2>
      <span class="text-xs text-ink-500">Najbliższe godziny</span>
    </div>
    <div class="mt-4 overflow-x-auto pb-2" tabindex="0" aria-label="Przewijana prognoza godzinowa">
      <div class="flex min-w-max gap-2">
        <article
          v-for="item in props.hourly"
          :key="item.dt"
          class="flex min-w-[68px] flex-col items-center gap-2 rounded-xl px-2 py-3"
          :class="isCurrent(item.dt) ? 'bg-skybrand-50 text-skybrand-700 dark:bg-skybrand-950/50 dark:text-skybrand-300' : 'text-ink-600 dark:text-ink-300'"
        >
          <time class="text-xs font-semibold" :datetime="new Date(item.dt * 1000).toISOString()">{{ isCurrent(item.dt) ? 'Teraz' : hour(item.dt) }}</time>
          <WeatherIcon :code="item.weather[0]?.icon" size="sm" :label="item.weather[0]?.description || 'Warunki pogodowe'" />
          <strong class="text-sm text-ink-800 dark:text-white">{{ temperature(item.temp) }}</strong>
          <span v-if="item.pop > 0" class="text-[11px] text-skybrand-600 dark:text-skybrand-300">{{ Math.round(item.pop * 100) }}% opadów</span>
        </article>
      </div>
    </div>
  </section>
</template>
