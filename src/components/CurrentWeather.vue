<script setup lang="ts">
import { computed } from 'vue'
import type { CurrentWeather } from '@/types/weather'
import { storageService } from '@/services/storage'
import { longDate, temperature, temperatureWithUnit, time, visibility, windSpeed } from '@/services/formatters'
import WeatherIcon from '@/components/WeatherIcon.vue'
import IconBase from '@/components/IconBase.vue'

const props = defineProps<{ weather: CurrentWeather }>()
const current = computed(() => props.weather)
const condition = computed(() => current.value.weather[0])
const favorite = computed(() => storageService.isFavorite(current.value.coord.lat, current.value.coord.lon))

function toggleFavorite(): void {
  storageService.toggleFavorite({
    name: current.value.name,
    country: current.value.sys.country,
    lat: current.value.coord.lat,
    lon: current.value.coord.lon,
  })
}

function windDirection(degrees: number): string {
  const directions = ['północny', 'północno-wschodni', 'wschodni', 'południowo-wschodni', 'południowy', 'południowo-zachodni', 'zachodni', 'północno-zachodni']
  return directions[Math.round(degrees / 45) % directions.length]
}
</script>

<template>
  <section class="surface overflow-hidden p-5 sm:p-6" aria-labelledby="current-weather-heading">
    <div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
      <div class="min-w-0 flex-1">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h1 id="current-weather-heading" class="truncate text-2xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-3xl">
              {{ current.name }}
            </h1>
            <p class="mt-1 text-sm text-ink-500">{{ current.sys.country }} · {{ longDate(current.dt) }}</p>
          </div>
          <button
            type="button"
            class="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl text-ink-400 transition-colors hover:bg-amber-50 hover:text-amber-500 dark:hover:bg-amber-950/40"
            :class="favorite ? 'text-amber-500' : ''"
            :aria-label="favorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'"
            :aria-pressed="favorite"
            @click="toggleFavorite"
          >
            <IconBase name="star" size="6" :class="favorite ? 'fill-current' : ''" />
          </button>
        </div>
        <div class="mt-5 flex items-center gap-4">
          <WeatherIcon :code="condition?.icon" size="xl" :label="condition?.description || 'Warunki pogodowe'" />
          <div>
            <p class="text-6xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-7xl">{{ temperature(current.main.temp) }}</p>
            <p class="mt-1 max-w-48 text-sm capitalize text-ink-600 dark:text-ink-300">{{ condition?.description }}</p>
          </div>
        </div>
      </div>
      <dl class="grid grid-cols-2 gap-2 sm:w-64">
        <div class="rounded-xl bg-ink-50 p-3 dark:bg-ink-900/70">
          <dt class="text-xs text-ink-500">Odczuwalna</dt>
          <dd class="mt-1 text-base font-semibold text-ink-800 dark:text-white">{{ temperatureWithUnit(current.main.feels_like) }}</dd>
        </div>
        <div class="rounded-xl bg-ink-50 p-3 dark:bg-ink-900/70">
          <dt class="text-xs text-ink-500">Wilgotność</dt>
          <dd class="mt-1 text-base font-semibold text-ink-800 dark:text-white">{{ current.main.humidity }}%</dd>
        </div>
        <div class="rounded-xl bg-ink-50 p-3 dark:bg-ink-900/70">
          <dt class="text-xs text-ink-500">Wiatr</dt>
          <dd class="mt-1 text-base font-semibold text-ink-800 dark:text-white">{{ windSpeed(current.wind.speed) }}</dd>
        </div>
        <div class="rounded-xl bg-ink-50 p-3 dark:bg-ink-900/70">
          <dt class="text-xs text-ink-500">Ciśnienie</dt>
          <dd class="mt-1 text-base font-semibold text-ink-800 dark:text-white">{{ Math.round(current.main.pressure) }} hPa</dd>
        </div>
      </dl>
    </div>
    <div class="mt-6 grid grid-cols-2 gap-3 border-t border-ink-100 pt-4 dark:border-ink-700 sm:grid-cols-4">
      <div class="flex items-center gap-2 text-sm text-ink-600 dark:text-ink-300">
        <IconBase name="wind" size="5" class="text-skybrand-500" />
        <span>Wiatr {{ windDirection(current.wind.deg) }}</span>
      </div>
      <div class="flex items-center gap-2 text-sm text-ink-600 dark:text-ink-300">
        <IconBase name="eye" size="5" class="text-skybrand-500" />
        <span>Widoczność {{ visibility(current.visibility) }}</span>
      </div>
      <div class="flex items-center gap-2 text-sm text-ink-600 dark:text-ink-300">
        <IconBase name="sun" size="5" class="text-amber-500" />
        <span>Wschód {{ time(current.sys.sunrise) }}</span>
      </div>
      <div class="flex items-center gap-2 text-sm text-ink-600 dark:text-ink-300">
        <IconBase name="moon" size="5" class="text-indigo-500" />
        <span>Zachód {{ time(current.sys.sunset) }}</span>
      </div>
    </div>
  </section>
</template>
