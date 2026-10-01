import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useWeather } from '@/composables/useWeather'
import { weatherDataFixture } from './fixtures'

describe('useWeather', () => {
  beforeEach(() => {
    const weather = useWeather()
    weather.data.value = null
    weather.error.value = null
    vi.unstubAllGlobals()
  })

  it('exposes current, hourly and daily data after a successful load', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, status: 200, json: () => Promise.resolve(weatherDataFixture) }))
    const weather = useWeather()
    const result = await weather.loadByCoords(52.2297, 21.0122)
    expect(result).not.toBeNull()
    expect(weather.current.value?.name).toBe('Warszawa')
    expect(weather.hourly.value).toHaveLength(6)
    expect(weather.daily.value).toHaveLength(5)
    expect(weather.uv.value?.value).toBeCloseTo(4.2)
    expect(weather.airQuality.value?.list[0].main.aqi).toBe(2)
    expect(weather.loading.value).toBe(false)
  })

  it('loads data by city name', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, status: 200, json: () => Promise.resolve(weatherDataFixture) }))
    const weather = useWeather()
    await weather.loadByCity('Warszawa')
    expect(weather.current.value?.sys.country).toBe('PL')
  })

  it('stores a readable error and can clear it', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500, json: () => Promise.resolve({}) }))
    const weather = useWeather()
    const result = await weather.loadByCoords(1, 1)
    expect(result).toBeNull()
    expect(weather.error.value).toBe('Nie udało się pobrać danych.')
    weather.clearError()
    expect(weather.error.value).toBeNull()
  })

  it('skips searching for queries shorter than two characters', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const weather = useWeather()
    expect(await weather.search('a')).toEqual([])
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('returns an empty list when the search request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    const weather = useWeather()
    expect(await weather.search('Warszawa')).toEqual([])
    expect(weather.searchLoading.value).toBe(false)
  })
})
