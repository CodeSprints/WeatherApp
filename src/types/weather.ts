export interface WeatherCondition {
  id: number
  main: string
  description: string
  icon: string
}

export interface CurrentWeather {
  id: number
  name: string
  coord: { lat: number; lon: number }
  weather: WeatherCondition[]
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  visibility: number
  wind: { speed: number; deg: number; gust?: number }
  clouds: { all: number }
  dt: number
  sys: { country: string; sunrise: number; sunset: number }
  timezone: number
}

export interface HourlyForecast {
  dt: number
  temp: number
  feels_like: number
  humidity: number
  weather: WeatherCondition[]
  pop: number
}

export interface DailyForecast {
  dt: number
  temp_min: number
  temp_max: number
  humidity: number
  weather: WeatherCondition[]
  sunrise: number
  sunset: number
  pop?: number
}

export interface ForecastResponse {
  cod: string
  message: number
  cnt: number
  list: Array<{
    dt: number
    dt_txt: string
    main: Record<string, number>
    weather: WeatherCondition[]
    clouds: { all: number }
    wind: { speed: number; deg: number; gust?: number }
    visibility: number
    pop: number
    sys: { pod: 'd' | 'n' }
  }>
  city: {
    id: number
    name: string
    coord: { lat: number; lon: number }
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }
}

export interface UvIndex {
  lat: number
  lon: number
  date_iso: string
  date: number
  value: number
}

export interface AirQualityResponse {
  coord: { lon: number; lat: number }
  list: Array<{
    main: { aqi: number }
    components: Record<string, number>
    dt: number
  }>
}

export interface GeoLocation {
  name: string
  local_names?: Record<string, string>
  lat: number
  lon: number
  country: string
  state?: string
}

export interface WeatherData {
  current: CurrentWeather
  forecast: ForecastResponse
  hourly: HourlyForecast[]
  daily: DailyForecast[]
  uv?: UvIndex
  airQuality?: AirQualityResponse
}

export interface SearchHistoryItem {
  name: string
  country: string
  lat: number
  lon: number
  timestamp: number
}

export interface FavoriteCity {
  id: string
  name: string
  country: string
  lat: number
  lon: number
  order: number
}

export interface CityReference {
  name: string
  country: string
  lat: number
  lon: number
}

export type Theme = 'light' | 'dark'
