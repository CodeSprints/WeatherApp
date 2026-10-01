import { computed, ref } from 'vue'
import type { FavoriteCity, SearchHistoryItem, Theme } from '@/types/weather'

const HISTORY_KEY = 'pogoda365:history'
const FAVORITES_KEY = 'pogoda365:favorites'
const THEME_KEY = 'pogoda365:theme'
const MAX_HISTORY_ITEMS = 10

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const value = window.localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : fallback
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    return
  }
}

function getInitialTheme(): Theme {
  if (typeof window !== 'undefined') {
    const saved = window.localStorage.getItem(THEME_KEY)
    if (saved === 'light' || saved === 'dark') return saved
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark'
  }
  return 'light'
}

export class StorageService {
  readonly history = ref<SearchHistoryItem[]>(read<SearchHistoryItem[]>(HISTORY_KEY, []))
  readonly favorites = ref<FavoriteCity[]>(read<FavoriteCity[]>(FAVORITES_KEY, []))
  readonly theme = ref<Theme>(getInitialTheme())
  readonly hasHistory = computed(() => this.history.value.length > 0)
  readonly hasFavorites = computed(() => this.favorites.value.length > 0)

  constructor() {
    this.applyTheme(this.theme.value)
  }

  addHistory(item: SearchHistoryItem): void {
    const withoutDuplicate = this.history.value.filter(
      (entry) => entry.lat !== item.lat || entry.lon !== item.lon,
    )
    this.history.value = [item, ...withoutDuplicate].slice(0, MAX_HISTORY_ITEMS)
    write(HISTORY_KEY, this.history.value)
  }

  removeHistory(name: string): void {
    this.history.value = this.history.value.filter((item) => item.name !== name)
    write(HISTORY_KEY, this.history.value)
  }

  clearHistory(): void {
    this.history.value = []
    if (typeof window !== 'undefined') window.localStorage.removeItem(HISTORY_KEY)
  }

  isFavorite(lat: number, lon: number): boolean {
    return this.favorites.value.some((item) => item.lat === lat && item.lon === lon)
  }

  toggleFavorite(city: Omit<FavoriteCity, 'id' | 'order'>): void {
    const id = `${city.lat}:${city.lon}`
    if (this.isFavorite(city.lat, city.lon)) {
      this.favorites.value = this.favorites.value.filter((item) => item.id !== id)
    } else {
      this.favorites.value = [...this.favorites.value, { ...city, id, order: this.favorites.value.length }]
    }
    write(FAVORITES_KEY, this.favorites.value)
  }

  removeFavorite(id: string): void {
    this.favorites.value = this.favorites.value.filter((item) => item.id !== id)
    write(FAVORITES_KEY, this.favorites.value)
  }

  setTheme(theme: Theme): void {
    this.theme.value = theme
    write(THEME_KEY, theme)
    this.applyTheme(theme)
  }

  toggleTheme(): void {
    this.setTheme(this.theme.value === 'light' ? 'dark' : 'light')
  }

  private applyTheme(theme: Theme): void {
    if (typeof document !== 'undefined') document.documentElement.classList.toggle('dark', theme === 'dark')
  }
}

export const storageService = new StorageService()
