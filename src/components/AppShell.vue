<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { GeoLocation } from '@/types/weather'
import { storageService } from '@/services/storage'
import { locationError, locationLoading, requestLocation } from '@/services/geolocation'
import { useWeather } from '@/composables/useWeather'
import SearchInput from '@/components/SearchInput.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import IconBase from '@/components/IconBase.vue'

const router = useRouter()
const weather = useWeather()
const loading = weather.loading
const year = new Date().getFullYear()

async function selectCity(city: GeoLocation): Promise<void> {
  const result = await weather.loadByCoords(city.lat, city.lon)
  if (result) storageService.addHistory({ name: result.current.name || city.name, country: result.current.sys.country || city.country, lat: city.lat, lon: city.lon, timestamp: Date.now() })
  await router.push('/')
}

async function useCurrentLocation(): Promise<void> {
  const location = await requestLocation()
  if (!location) return
  const result = await weather.loadByCoords(location.lat, location.lon)
  if (result) storageService.addHistory({ name: result.current.name, country: result.current.sys.country, lat: location.lat, lon: location.lon, timestamp: Date.now() })
  await router.push('/')
}

function clearLocationError(): void {
  locationError.value = null
}
</script>

<template>
  <a href="#main-content" class="sr-only-focusable fixed left-4 top-4 z-[60] rounded-lg bg-white px-4 py-3 font-semibold text-skybrand-700 shadow-soft">Przejdź do treści</a>
  <div class="min-h-screen bg-gradient-to-br from-ink-50 via-white to-skybrand-50/40 dark:from-ink-900 dark:via-ink-900 dark:to-ink-800">
    <header class="sticky top-0 z-40 border-b border-ink-200/70 bg-white/90 backdrop-blur-xl dark:border-ink-700/70 dark:bg-ink-900/90">
      <div class="mx-auto max-w-7xl px-4 sm:px-6">
        <div class="flex min-h-16 items-center justify-between gap-3">
          <RouterLink to="/" class="flex shrink-0 items-center gap-2 rounded-lg text-ink-900 dark:text-white" aria-label="Pogoda365, strona główna">
            <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-skybrand-600 text-white"><IconBase name="cloud" size="5" /></span>
            <span class="hidden text-base font-bold tracking-tight sm:block">Pogoda365</span>
          </RouterLink>
          <div class="hidden w-full max-w-md md:block"><SearchInput @selected="selectCity" /></div>
          <div class="flex items-center gap-2">
            <button type="button" class="button-muted px-3" :disabled="locationLoading || loading" :aria-label="locationLoading ? 'Ustalanie lokalizacji' : 'Użyj mojej lokalizacji'" @click="useCurrentLocation">
              <span v-if="locationLoading" class="h-4 w-4 animate-spin rounded-full border-2 border-skybrand-500 border-t-transparent" aria-hidden="true"></span>
              <IconBase v-else name="pin" size="5" class="text-skybrand-600" />
              <span class="hidden lg:inline">Moja lokalizacja</span>
            </button>
            <ThemeToggle />
          </div>
        </div>
        <div class="pb-3 md:hidden"><SearchInput placeholder="Wpisz nazwę miasta" @selected="selectCity" /></div>
      </div>
    </header>

    <div v-if="locationError" class="mx-auto max-w-7xl px-4 pt-4 sm:px-6" role="status">
      <div class="flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
        <span>{{ locationError }}</span>
        <button type="button" class="font-semibold underline underline-offset-2" @click="clearLocationError">Zamknij</button>
      </div>
    </div>

    <main id="main-content" class="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <RouterView />
    </main>

    <footer class="border-t border-ink-200/70 py-6 dark:border-ink-700/70">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
        <p class="text-xs text-ink-500">© {{ year }} Pogoda365 · Dane: Open-Meteo i OpenStreetMap</p>
        <nav aria-label="Linki dodatkowe"><RouterLink to="/regulamin" class="text-xs font-semibold text-ink-500 underline underline-offset-2 hover:text-skybrand-600">Regulamin</RouterLink></nav>
      </div>
    </footer>
  </div>
</template>
