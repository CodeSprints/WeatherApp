<script setup lang="ts">
import type { DailyForecast as DailyForecastItem } from '@/types/weather'
import { dayName, temperature } from '@/services/formatters'
import WeatherIcon from '@/components/WeatherIcon.vue'

const props = defineProps<{ daily: DailyForecastItem[] }>()

function barWidth(min: number, max: number): number {
  const low = Math.max(-20, Math.min(40, min))
  const high = Math.max(low, Math.min(45, max))
  return Math.max(18, Math.round(((high - low) / 65) * 100))
}
</script>

<template>
  <section class="surface p-5 sm:p-6" aria-labelledby="daily-heading">
    <div class="flex items-center justify-between gap-4">
      <h2 id="daily-heading" class="text-base font-bold text-ink-800 dark:text-white">Prognoza na 5 dni</h2>
      <span class="text-xs text-ink-500">Zakres temperatur</span>
    </div>
    <div class="mt-4 divide-y divide-ink-100 dark:divide-ink-700">
      <div v-for="(item, index) in props.daily" :key="item.dt" class="grid grid-cols-[5rem_2rem_1fr_auto] items-center gap-2 py-3 sm:grid-cols-[6rem_2.5rem_1fr_auto] sm:gap-4">
        <time class="text-sm font-semibold text-ink-700 dark:text-ink-200" :datetime="new Date(item.dt * 1000).toISOString()">{{ dayName(item.dt, index) }}</time>
        <WeatherIcon :code="item.weather[0]?.icon" size="sm" :label="item.weather[0]?.description || 'Warunki pogodowe'" />
        <div class="hidden min-w-0 sm:block">
          <p class="truncate text-sm capitalize text-ink-500">{{ item.weather[0]?.description }}</p>
          <div class="mt-2 h-1.5 max-w-44 overflow-hidden rounded-full bg-gradient-to-r from-sky-400 to-orange-400" :style="{ width: `${barWidth(item.temp_min, item.temp_max)}%` }" aria-hidden="true"></div>
        </div>
        <div class="flex items-center gap-2 text-right text-sm">
          <span class="text-ink-500">{{ temperature(item.temp_min) }}</span>
          <span class="font-bold text-ink-800 dark:text-white">{{ temperature(item.temp_max) }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
