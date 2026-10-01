import { beforeEach, describe, expect, it, vi } from 'vitest'
import { aqiDescription, getWeatherByCity, getWeatherByCoords, searchCities, uvDescription } from '@/services/weather'
import { weatherDataFixture } from './fixtures'

function mockFetch(payload: unknown, ok = true, status = 200): void {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok,
    status,
    json: () => Promise.resolve(payload),
  }))
}

describe('weather service', () => {
  beforeEach(() => {
    vi.unstubAllGlobals()
  })

  it('requests the search endpoint with the query', async () => {
    mockFetch([{ name: 'Warszawa', lat: 52.2, lon: 21, country: 'PL' }])
    const results = await searchCities('Wars')
    expect(results[0].name).toBe('Warszawa')
    const url = String(vi.mocked(fetch).mock.calls[0][0])
    expect(url).toContain('/api/weather/search')
    expect(url).toContain('q=Wars')
  })

  it('requests weather by city name', async () => {
    mockFetch(weatherDataFixture)
    const data = await getWeatherByCity('Warszawa')
    expect(data.current.name).toBe('Warszawa')
    expect(String(vi.mocked(fetch).mock.calls[0][0])).toContain('city=Warszawa')
  })

  it('requests weather by coordinates', async () => {
    mockFetch(weatherDataFixture)
    await getWeatherByCoords(52.2297, 21.0122)
    const url = String(vi.mocked(fetch).mock.calls[0][0])
    expect(url).toContain('lat=52.2297')
    expect(url).toContain('lon=21.0122')
  })

  it('reports a dedicated message for a missing place', async () => {
    mockFetch({}, false, 404)
    await expect(getWeatherByCity('Nieznane')).rejects.toThrow('Nie znaleziono miejsca.')
  })

  it('reports a generic message for a server failure', async () => {
    mockFetch({}, false, 500)
    await expect(getWeatherByCoords(0, 0)).rejects.toThrow('Nie udało się pobrać danych.')
  })

  it('describes the UV index in Polish', () => {
    expect(uvDescription(1).label).toBe('Niski')
    expect(uvDescription(4).label).toBe('Umiarkowany')
    expect(uvDescription(6).label).toBe('Wysoki')
    expect(uvDescription(9).label).toBe('Bardzo wysoki')
    expect(uvDescription(12).label).toBe('Ekstremalny')
  })

  it('describes the air quality index in Polish', () => {
    expect(aqiDescription(1).label).toBe('Dobra')
    expect(aqiDescription(3).label).toBe('Umiarkowana')
    expect(aqiDescription(5).label).toBe('Bardzo słaba')
    expect(aqiDescription(0).label).toBe('Brak danych')
  })
})
