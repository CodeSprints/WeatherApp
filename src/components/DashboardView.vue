<script setup lang="ts">
import type { CityReference, FavoriteCity, SearchHistoryItem } from '@/types/weather'
import { storageService } from '@/services/storage'
import { requestLocation, locationLoading } from '@/services/geolocation'
import { useWeather } from '@/composables/useWeather'
import CurrentWeather from '@/components/CurrentWeather.vue'
import HourlyForecast from '@/components/HourlyForecast.vue'
import DailyForecast from '@/components/DailyForecast.vue'
import AdditionalInfo from '@/components/AdditionalInfo.vue'
import TemperatureChart from '@/components/TemperatureChart.vue'
import FavoritesList from '@/components/FavoritesList.vue'
import HistoryList from '@/components/HistoryList.vue'
import PopularCities from '@/components/PopularCities.vue'
import WeatherSkeleton from '@/components/WeatherSkeleton.vue'
import IconBase from '@/components/IconBase.vue'

const weather = useWeather()
const current = weather.current
const hourly = weather.hourly
const daily = weather.daily
const uv = weather.uv
const airQuality = weather.airQuality
const loading = weather.loading
const error = weather.error

async function loadReference(city: CityReference | FavoriteCity | SearchHistoryItem): Promise<void> {
  const result = await weather.loadByCoords(city.lat, city.lon)
  if (result) storageService.addHistory({ name: result.current.name || city.name, country: result.current.sys.country || city.country, lat: city.lat, lon: city.lon, timestamp: Date.now() })
}

async function loadCurrentLocation(): Promise<void> {
  const location = await requestLocation()
  if (!location) return
  const result = await weather.loadByCoords(location.lat, location.lon)
  if (result) storageService.addHistory({ name: result.current.name, country: result.current.sys.country, lat: location.lat, lon: location.lon, timestamp: Date.now() })
}
</script>

<template>
  <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
    <div class="min-w-0 space-y-5">
      <WeatherSkeleton v-if="loading" />
      <section v-else-if="error" class="surface p-8 text-center" role="alert" aria-labelledby="error-heading">
        <IconBase name="alert" size="10" class="mx-auto text-red-500" />
        <h1 id="error-heading" class="mt-4 text-lg font-bold text-ink-900 dark:text-white">Nie udało się wczytać pogody</h1>
        <p class="mx-auto mt-2 max-w-md text-sm text-ink-500">{{ error }}</p>
        <button type="button" class="button-primary mt-5" @click="weather.clearError">Zamknij komunikat</button>
      </section>
      <template v-else-if="current">
        <CurrentWeather :weather="current" />
        <HourlyForecast :hourly="hourly" />
        <DailyForecast :daily="daily" />
        <AdditionalInfo :weather="current" :uv="uv" :air-quality="airQuality" />
        <TemperatureChart :hourly="hourly" />
      </template>
      <section v-else class="surface p-8 text-center sm:p-12" aria-labelledby="welcome-heading">
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-skybrand-600 text-white shadow-soft"><IconBase name="cloud" size="8" /></div>
        <h1 id="welcome-heading" class="mt-5 text-2xl font-bold tracking-tight text-ink-900 dark:text-white">Sprawdź pogodę</h1>
        <p class="mx-auto mt-3 max-w-md text-sm leading-6 text-ink-500">Wyszukaj miasto lub pozwól nam użyć Twojej lokalizacji. Otrzymasz aktualne warunki, prognozę godzinową i prognozę na pięć dni.</p>
        <button type="button" class="button-primary mt-6" :disabled="locationLoading" @click="loadCurrentLocation">
          <IconBase name="pin" size="5" />
          {{ locationLoading ? 'Ustalanie lokalizacji…' : 'Użyj mojej lokalizacji' }}
        </button>
      </section>
      <PopularCities @selected="loadReference" />
    </div>
    <aside class="space-y-5 lg:pt-0" aria-label="Zapisane miejsca">
      <div class="surface p-4"><FavoritesList @selected="loadReference" /></div>
      <div class="surface p-4"><HistoryList @selected="loadReference" /></div>
      <div class="rounded-2xl border border-skybrand-100 bg-skybrand-50 p-4 dark:border-skybrand-900/50 dark:bg-skybrand-950/30">
        <p class="text-sm font-bold text-skybrand-900 dark:text-skybrand-200">Wskazówka</p>
        <p class="mt-1 text-xs leading-5 text-skybrand-800 dark:text-skybrand-300">Dodaj ulubione miejsca, aby szybko porównywać prognozy.</p>
      </div>
    </aside>
  </div>
</template>
