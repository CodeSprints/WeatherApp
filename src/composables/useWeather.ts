import { computed, ref } from 'vue'
import type { GeoLocation, WeatherData } from '@/types/weather'
import { getWeatherByCity, getWeatherByCoords, searchCities } from '@/services/weather'

const data = ref<WeatherData | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const searchLoading = ref(false)
let searchController: AbortController | null = null

export function useWeather() {
  const current = computed(() => data.value?.current ?? null)
  const hourly = computed(() => data.value?.hourly ?? [])
  const daily = computed(() => data.value?.daily ?? [])
  const uv = computed(() => data.value?.uv ?? null)
  const airQuality = computed(() => data.value?.airQuality ?? null)

  async function loadByCoords(lat: number, lon: number): Promise<WeatherData | null> {
    loading.value = true
    error.value = null
    try {
      const result = await getWeatherByCoords(lat, lon)
      data.value = result
      return result
    } catch (cause) {
      error.value = cause instanceof Error ? cause.message : 'Nie udało się pobrać pogody.'
      return null
    } finally {
      loading.value = false
    }
  }

  async function loadByCity(city: string): Promise<WeatherData | null> {
    loading.value = true
    error.value = null
    try {
      const result = await getWeatherByCity(city)
      data.value = result
      return result
    } catch (cause) {
      error.value = cause instanceof Error ? cause.message : 'Nie udało się pobrać pogody.'
      return null
    } finally {
      loading.value = false
    }
  }

  async function search(query: string): Promise<GeoLocation[]> {
    if (query.trim().length < 2) return []
    searchController?.abort()
    searchController = new AbortController()
    searchLoading.value = true
    try {
      return await searchCities(query.trim())
    } catch {
      return []
    } finally {
      searchLoading.value = false
    }
  }

  function clearError(): void {
    error.value = null
  }

  return {
    data,
    current,
    hourly,
    daily,
    uv,
    airQuality,
    loading,
    error,
    searchLoading,
    loadByCoords,
    loadByCity,
    search,
    clearError,
  }
}
