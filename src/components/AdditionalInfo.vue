<script setup lang="ts">
import { computed } from 'vue'
import type { AirQualityResponse, CurrentWeather, UvIndex } from '@/types/weather'
import { aqiDescription, uvDescription } from '@/services/weather'
import { time } from '@/services/formatters'
import IconBase from '@/components/IconBase.vue'

type Props = {
  weather: CurrentWeather
  uv: UvIndex | null
  airQuality: AirQualityResponse | null
}
const props = defineProps<Props>()
const uvValue = computed(() => Math.round(props.uv?.value ?? 0))
const aqiValue = computed(() => props.airQuality?.list[0]?.main.aqi ?? 0)
const uvInfo = computed(() => uvDescription(uvValue.value))
const aqiInfo = computed(() => aqiDescription(aqiValue.value))
const uvBar = computed(() => Math.min(100, Math.round((uvValue.value / 11) * 100)))
const aqiBar = computed(() => Math.min(100, Math.round((aqiValue.value / 5) * 100)))
</script>

<template>
  <section class="grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Dodatkowe informacje pogodowe">
    <article class="surface p-4">
      <div class="flex items-center justify-between gap-2">
        <h2 class="text-xs font-medium text-ink-500">Indeks UV</h2>
        <span class="text-xs font-semibold" :class="uvInfo.className">{{ uvInfo.label }}</span>
      </div>
      <p class="mt-2 text-2xl font-bold text-ink-800 dark:text-white">{{ uvValue }} <span class="text-xs font-normal text-ink-400">/ 11</span></p>
      <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-700" role="progressbar" aria-label="Indeks UV" :aria-valuenow="uvValue" aria-valuemin="0" aria-valuemax="11">
        <div class="h-full rounded-full bg-amber-400 transition-all" :style="{ width: `${uvBar}%` }"></div>
      </div>
    </article>
    <article class="surface p-4">
      <div class="flex items-center justify-between gap-2">
        <h2 class="text-xs font-medium text-ink-500">Jakość powietrza</h2>
        <span class="text-right text-xs font-semibold" :class="aqiInfo.className">{{ aqiInfo.label }}</span>
      </div>
      <p class="mt-2 text-2xl font-bold text-ink-800 dark:text-white">{{ aqiValue }} <span class="text-xs font-normal text-ink-400">/ 5</span></p>
      <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-700" role="progressbar" aria-label="Jakość powietrza" :aria-valuenow="aqiValue" aria-valuemin="0" aria-valuemax="5">
        <div class="h-full rounded-full bg-emerald-500 transition-all" :style="{ width: `${aqiBar}%` }"></div>
      </div>
    </article>
    <article class="surface p-4">
      <div class="flex items-center justify-between gap-2">
        <h2 class="text-xs font-medium text-ink-500">Wschód słońca</h2>
        <IconBase name="sun" size="4" class="text-amber-500" />
      </div>
      <p class="mt-3 text-2xl font-bold text-ink-800 dark:text-white">{{ time(props.weather.sys.sunrise) }}</p>
    </article>
    <article class="surface p-4">
      <div class="flex items-center justify-between gap-2">
        <h2 class="text-xs font-medium text-ink-500">Zachód słońca</h2>
        <IconBase name="moon" size="4" class="text-indigo-500" />
      </div>
      <p class="mt-3 text-2xl font-bold text-ink-800 dark:text-white">{{ time(props.weather.sys.sunset) }}</p>
    </article>
  </section>
</template>
