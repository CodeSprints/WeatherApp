import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import CurrentWeather from '@/components/CurrentWeather.vue'
import HourlyForecast from '@/components/HourlyForecast.vue'
import DailyForecast from '@/components/DailyForecast.vue'
import AdditionalInfo from '@/components/AdditionalInfo.vue'
import PopularCities from '@/components/PopularCities.vue'
import FavoritesList from '@/components/FavoritesList.vue'
import HistoryList from '@/components/HistoryList.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import WeatherIcon from '@/components/WeatherIcon.vue'
import { storageService } from '@/services/storage'
import { currentWeatherFixture, dailyFixture, hourlyFixture, weatherDataFixture } from './fixtures'

describe('CurrentWeather', () => {
  beforeEach(() => {
    storageService.favorites.value = []
  })

  it('shows the place name, temperature and condition', () => {
    const wrapper = mount(CurrentWeather, { props: { weather: currentWeatherFixture } })
    expect(wrapper.find('h1').text()).toBe('Warszawa')
    expect(wrapper.text()).toContain('12°')
    expect(wrapper.text()).toContain('bezchmurnie')
  })

  it('exposes the favourite button state to assistive technology', async () => {
    const wrapper = mount(CurrentWeather, { props: { weather: currentWeatherFixture } })
    const button = wrapper.get('button[aria-pressed]')
    expect(button.attributes('aria-pressed')).toBe('false')
    expect(button.attributes('aria-label')).toBe('Dodaj do ulubionych')
    await button.trigger('click')
    expect(storageService.isFavorite(52.2297, 21.0122)).toBe(true)
    expect(wrapper.get('button[aria-pressed]').attributes('aria-label')).toBe('Usuń z ulubionych')
  })
})

describe('HourlyForecast', () => {
  it('renders one entry per hour', () => {
    const wrapper = mount(HourlyForecast, { props: { hourly: hourlyFixture } })
    expect(wrapper.findAll('article')).toHaveLength(hourlyFixture.length)
  })

  it('renders machine readable times', () => {
    const wrapper = mount(HourlyForecast, { props: { hourly: hourlyFixture } })
    expect(wrapper.find('time').attributes('datetime')).toMatch(/^\d{4}-\d{2}-\d{2}T/)
  })
})

describe('DailyForecast', () => {
  it('names the first two days in Polish', () => {
    const wrapper = mount(DailyForecast, { props: { daily: dailyFixture } })
    const days = wrapper.findAll('time')
    expect(days[0].text()).toBe('Dziś')
    expect(days[1].text()).toBe('Jutro')
    expect(days).toHaveLength(dailyFixture.length)
  })
})

describe('AdditionalInfo', () => {
  it('describes UV and air quality with accessible progress bars', () => {
    const wrapper = mount(AdditionalInfo, {
      props: {
        weather: currentWeatherFixture,
        uv: weatherDataFixture.uv ?? null,
        airQuality: weatherDataFixture.airQuality ?? null,
      },
    })
    const bars = wrapper.findAll('[role="progressbar"]')
    expect(bars).toHaveLength(2)
    expect(bars[0].attributes('aria-valuenow')).toBe('4')
    expect(bars[1].attributes('aria-valuenow')).toBe('2')
    expect(wrapper.text()).toContain('Umiarkowany')
    expect(wrapper.text()).toContain('Zadowalająca')
  })

  it('falls back to zero when extra data is missing', () => {
    const wrapper = mount(AdditionalInfo, { props: { weather: currentWeatherFixture, uv: null, airQuality: null } })
    expect(wrapper.text()).toContain('Brak danych')
  })
})

describe('PopularCities', () => {
  it('emits the selected place', async () => {
    const wrapper = mount(PopularCities)
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.emitted('selected')?.[0]?.[0]).toMatchObject({ name: 'Warszawa', country: 'PL' })
  })
})

describe('FavoritesList and HistoryList', () => {
  beforeEach(() => {
    storageService.favorites.value = []
    storageService.history.value = []
  })

  it('shows an empty state for favourites', () => {
    expect(mount(FavoritesList).text()).toContain('Dodaj miejsce gwiazdką')
  })

  it('emits the chosen favourite', async () => {
    storageService.toggleFavorite({ name: 'Kraków', country: 'PL', lat: 50.06, lon: 19.94 })
    const wrapper = mount(FavoritesList)
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.emitted('selected')?.[0]?.[0]).toMatchObject({ name: 'Kraków' })
  })

  it('shows an empty state for history', () => {
    expect(mount(HistoryList).text()).toContain('Historia wyszukiwania jest pusta.')
  })

  it('clears the history from the list header', async () => {
    storageService.addHistory({ name: 'Gdańsk', country: 'PL', lat: 54.35, lon: 18.64, timestamp: Date.now() })
    const wrapper = mount(HistoryList)
    expect(wrapper.text()).toContain('Gdańsk')
    await wrapper.get('button').trigger('click')
    expect(storageService.hasHistory.value).toBe(false)
  })
})

describe('ThemeToggle', () => {
  it('switches the theme and keeps the label in sync', async () => {
    storageService.setTheme('light')
    const wrapper = mount(ThemeToggle)
    expect(wrapper.get('button').attributes('aria-label')).toBe('Włącz ciemny motyw')
    await wrapper.get('button').trigger('click')
    expect(storageService.theme.value).toBe('dark')
    expect(wrapper.get('button').attributes('aria-label')).toBe('Włącz jasny motyw')
  })
})

describe('WeatherIcon', () => {
  it.each([
    ['01d', 'Słonecznie'],
    ['04d', 'Pochmurno'],
    ['10d', 'Deszcz'],
    ['11d', 'Burza'],
    ['13d', 'Śnieg'],
    ['50d', 'Mgła'],
  ])('renders an accessible label for code %s', (code, label) => {
    const wrapper = mount(WeatherIcon, { props: { code, label } })
    expect(wrapper.get('[role="img"]').attributes('aria-label')).toBe(label)
    expect(wrapper.find('svg').exists()).toBe(true)
  })
})
