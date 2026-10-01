import { describe, expect, it } from 'vitest'
import {
  dayName,
  hour,
  longDate,
  percentage,
  relativeTime,
  temperature,
  temperatureWithUnit,
  time,
  visibility,
  windSpeed,
} from '@/services/formatters'

const sample = Math.floor(Date.UTC(2026, 0, 15, 12, 0, 0) / 1000)

describe('formatters', () => {
  it('rounds temperature and adds degree sign', () => {
    expect(temperature(12.4)).toBe('12°')
    expect(temperature(-0.6)).toBe('-1°')
  })

  it('returns a dash for missing temperature', () => {
    expect(temperature(null)).toBe('—')
    expect(temperature(undefined)).toBe('—')
    expect(temperature(Number.NaN)).toBe('—')
  })

  it('adds the Celsius unit when requested', () => {
    expect(temperatureWithUnit(20)).toBe('20°C')
    expect(temperatureWithUnit(null)).toBe('—')
  })

  it('converts wind speed from metres per second to kilometres per hour', () => {
    expect(windSpeed(10)).toBe('36.0 km/h')
    expect(windSpeed(undefined)).toBe('—')
  })

  it('formats visibility in metres below one kilometre', () => {
    expect(visibility(800)).toBe('800 m')
    expect(visibility(10000)).toBe('10.0 km')
    expect(visibility(null)).toBe('—')
  })

  it('formats clock time and dates', () => {
    expect(time(sample)).toMatch(/\d{2}:\d{2}/)
    expect(time(null)).toBe('—')
    expect(hour(sample)).toMatch(/\d/)
    expect(longDate(sample)).toContain('stycznia')
  })

  it('names the first two days in plain Polish', () => {
    expect(dayName(sample, 0)).toBe('Dziś')
    expect(dayName(sample, 1)).toBe('Jutro')
    expect(dayName(sample, 2)).not.toBe('')
  })

  it('formats percentages', () => {
    expect(percentage(42.6)).toBe('43%')
    expect(percentage(null)).toBe('—')
  })

  it('describes relative time in Polish', () => {
    const now = Date.UTC(2026, 0, 15, 12, 0, 0)
    expect(relativeTime(now - 10_000, now)).toBe('przed chwilą')
    expect(relativeTime(now - 5 * 60_000, now)).toBe('5 min temu')
    expect(relativeTime(now - 3 * 3_600_000, now)).toBe('3 godz. temu')
    expect(relativeTime(now - 2 * 86_400_000, now)).toBe('2 dni temu')
  })
})
