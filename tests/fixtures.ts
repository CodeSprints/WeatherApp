import type { CurrentWeather, DailyForecast, HourlyForecast, WeatherData } from '@/types/weather'

const base = Math.floor(Date.UTC(2026, 0, 15, 12, 0, 0) / 1000)

export const currentWeatherFixture: CurrentWeather = {
  id: 1,
  name: 'Warszawa',
  coord: { lat: 52.2297, lon: 21.0122 },
  weather: [{ id: 0, main: 'Clear', description: 'bezchmurnie', icon: '01d' }],
  main: { temp: 12.4, feels_like: 10.2, temp_min: 8, temp_max: 15, pressure: 1013.4, humidity: 61 },
  visibility: 10000,
  wind: { speed: 4.2, deg: 180 },
  clouds: { all: 10 },
  dt: base,
  sys: { country: 'PL', sunrise: base - 18000, sunset: base + 18000 },
  timezone: 3600,
}

export const hourlyFixture: HourlyForecast[] = Array.from({ length: 6 }, (_, index) => ({
  dt: base + index * 3600,
  temp: 10 + index,
  feels_like: 9 + index,
  humidity: 60,
  weather: [{ id: 0, main: 'Clear', description: 'bezchmurnie', icon: '01d' }],
  pop: index === 0 ? 0 : 0.3,
}))

export const dailyFixture: DailyForecast[] = Array.from({ length: 5 }, (_, index) => ({
  dt: base + index * 86400,
  temp_min: 5 + index,
  temp_max: 14 + index,
  humidity: 70,
  weather: [{ id: 3, main: 'Clouds', description: 'zachmurzenie', icon: '04d' }],
  sunrise: base - 18000,
  sunset: base + 18000,
}))

export const weatherDataFixture: WeatherData = {
  current: currentWeatherFixture,
  forecast: {
    cod: '200',
    message: 0,
    cnt: 0,
    list: [],
    city: {
      id: 1,
      name: 'Warszawa',
      coord: { lat: 52.2297, lon: 21.0122 },
      country: 'PL',
      population: 0,
      timezone: 3600,
      sunrise: base - 18000,
      sunset: base + 18000,
    },
  },
  hourly: hourlyFixture,
  daily: dailyFixture,
  uv: { lat: 52.2297, lon: 21.0122, date_iso: '2026-01-15T12:00:00Z', date: base, value: 4.2 },
  airQuality: {
    coord: { lat: 52.2297, lon: 21.0122 },
    list: [{ main: { aqi: 2 }, components: { pm2_5: 8, pm10: 14 }, dt: base }],
  },
}
