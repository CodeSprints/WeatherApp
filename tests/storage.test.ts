import { beforeEach, describe, expect, it } from 'vitest'
import { StorageService } from '@/services/storage'

const city = { name: 'Warszawa', country: 'PL', lat: 52.2297, lon: 21.0122 }

describe('StorageService', () => {
  let storage: StorageService

  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.classList.remove('dark')
    storage = new StorageService()
  })

  it('starts empty', () => {
    expect(storage.history.value).toEqual([])
    expect(storage.hasFavorites.value).toBe(false)
  })

  it('stores search history newest first', () => {
    storage.addHistory({ ...city, timestamp: 1 })
    storage.addHistory({ name: 'Kraków', country: 'PL', lat: 50.06, lon: 19.94, timestamp: 2 })
    expect(storage.history.value.map((item) => item.name)).toEqual(['Kraków', 'Warszawa'])
  })

  it('deduplicates history by coordinates', () => {
    storage.addHistory({ ...city, timestamp: 1 })
    storage.addHistory({ ...city, timestamp: 2 })
    expect(storage.history.value).toHaveLength(1)
    expect(storage.history.value[0].timestamp).toBe(2)
  })

  it('limits history to ten entries', () => {
    for (let index = 0; index < 15; index += 1) {
      storage.addHistory({ name: `Miasto ${index}`, country: 'PL', lat: index, lon: index, timestamp: index })
    }
    expect(storage.history.value).toHaveLength(10)
  })

  it('removes and clears history', () => {
    storage.addHistory({ ...city, timestamp: 1 })
    storage.removeHistory('Warszawa')
    expect(storage.history.value).toEqual([])
    storage.addHistory({ ...city, timestamp: 2 })
    storage.clearHistory()
    expect(storage.hasHistory.value).toBe(false)
  })

  it('toggles favorites on and off', () => {
    storage.toggleFavorite(city)
    expect(storage.isFavorite(city.lat, city.lon)).toBe(true)
    storage.toggleFavorite(city)
    expect(storage.isFavorite(city.lat, city.lon)).toBe(false)
  })

  it('removes a favorite by identifier', () => {
    storage.toggleFavorite(city)
    storage.removeFavorite(`${city.lat}:${city.lon}`)
    expect(storage.favorites.value).toEqual([])
  })

  it('persists data between instances', () => {
    storage.toggleFavorite(city)
    storage.addHistory({ ...city, timestamp: 5 })
    const restored = new StorageService()
    expect(restored.favorites.value).toHaveLength(1)
    expect(restored.history.value).toHaveLength(1)
  })

  it('applies the theme to the document element', () => {
    storage.setTheme('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    storage.toggleTheme()
    expect(storage.theme.value).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('survives corrupted storage content', () => {
    window.localStorage.setItem('pogoda365:favorites', 'not-json')
    expect(new StorageService().favorites.value).toEqual([])
  })
})
