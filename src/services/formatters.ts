const polishTime = new Intl.DateTimeFormat('pl-PL', { hour: '2-digit', minute: '2-digit' })
const polishHour = new Intl.DateTimeFormat('pl-PL', { hour: 'numeric' })
const polishWeekday = new Intl.DateTimeFormat('pl-PL', { weekday: 'short' })
const polishLongDate = new Intl.DateTimeFormat('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' })

export function temperature(value: number | null | undefined): string {
  return value === null || value === undefined || Number.isNaN(value) ? '—' : `${Math.round(value)}°`
}

export function temperatureWithUnit(value: number | null | undefined): string {
  const result = temperature(value)
  return result === '—' ? result : `${result}C`
}

export function windSpeed(value: number | null | undefined): string {
  return value === null || value === undefined ? '—' : `${(value * 3.6).toFixed(1)} km/h`
}

export function visibility(value: number | null | undefined): string {
  if (value === null || value === undefined) return '—'
  return value >= 1000 ? `${(value / 1000).toFixed(1)} km` : `${Math.round(value)} m`
}

export function time(timestamp: number | null | undefined): string {
  return timestamp ? polishTime.format(new Date(timestamp * 1000)) : '—'
}

export function hour(timestamp: number): string {
  return polishHour.format(new Date(timestamp * 1000))
}

export function dayName(timestamp: number, index: number): string {
  if (index === 0) return 'Dziś'
  if (index === 1) return 'Jutro'
  return polishWeekday.format(new Date(timestamp * 1000)).replace('.', '')
}

export function longDate(timestamp: number): string {
  return polishLongDate.format(new Date(timestamp * 1000))
}

export function percentage(value: number | null | undefined): string {
  return value === null || value === undefined ? '—' : `${Math.round(value)}%`
}

export function relativeTime(timestamp: number, now = Date.now()): string {
  const difference = Math.max(0, now - timestamp)
  if (difference < 60_000) return 'przed chwilą'
  if (difference < 3_600_000) return `${Math.floor(difference / 60_000)} min temu`
  if (difference < 86_400_000) return `${Math.floor(difference / 3_600_000)} godz. temu`
  return `${Math.floor(difference / 86_400_000)} dni temu`
}
