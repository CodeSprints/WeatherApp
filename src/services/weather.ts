import type { GeoLocation, WeatherData } from '@/types/weather'

const apiUrl = (import.meta.env.VITE_API_URL as string | undefined) || '/api'

async function request<T>(path: string, params: Record<string, string | number>): Promise<T> {
  const url = new URL(`${apiUrl}${path}`, window.location.origin)
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, String(value)))
  const response = await fetch(url)
  if (!response.ok) throw new Error(response.status === 404 ? 'Nie znaleziono miejsca.' : 'Nie udało się pobrać danych.')
  return response.json() as Promise<T>
}

export function searchCities(query: string): Promise<GeoLocation[]> {
  return request<GeoLocation[]>('/weather/search', { q: query })
}

export function getWeatherByCity(city: string): Promise<WeatherData> {
  return request<WeatherData>('/weather/city', { city })
}

export function getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  return request<WeatherData>('/weather/coords', { lat, lon })
}

export function uvDescription(value: number): { label: string; className: string } {
  if (value <= 2) return { label: 'Niski', className: 'text-emerald-600 dark:text-emerald-400' }
  if (value <= 5) return { label: 'Umiarkowany', className: 'text-amber-600 dark:text-amber-400' }
  if (value <= 7) return { label: 'Wysoki', className: 'text-orange-600 dark:text-orange-400' }
  if (value <= 10) return { label: 'Bardzo wysoki', className: 'text-red-600 dark:text-red-400' }
  return { label: 'Ekstremalny', className: 'text-fuchsia-600 dark:text-fuchsia-400' }
}

export function aqiDescription(value: number): { label: string; className: string } {
  if (value === 1) return { label: 'Dobra', className: 'text-emerald-600 dark:text-emerald-400' }
  if (value === 2) return { label: 'Zadowalająca', className: 'text-amber-600 dark:text-amber-400' }
  if (value === 3) return { label: 'Umiarkowana', className: 'text-orange-600 dark:text-orange-400' }
  if (value === 4) return { label: 'Słaba', className: 'text-red-600 dark:text-red-400' }
  if (value === 5) return { label: 'Bardzo słaba', className: 'text-fuchsia-600 dark:text-fuchsia-400' }
  return { label: 'Brak danych', className: 'text-ink-500' }
}
