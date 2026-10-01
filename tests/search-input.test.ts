import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import SearchInput from '@/components/SearchInput.vue'

const results = [
  { name: 'Warszawa', lat: 52.2297, lon: 21.0122, country: 'PL', state: 'Mazowieckie' },
  { name: 'Warszawa Wola', lat: 52.23, lon: 20.96, country: 'PL' },
]

describe('SearchInput', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, status: 200, json: () => Promise.resolve(results) }))
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('labels the field and marks it as a combobox', () => {
    const wrapper = mount(SearchInput)
    const input = wrapper.get('input')
    expect(input.attributes('role')).toBe('combobox')
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('label').classes()).toContain('sr-only')
  })

  it('does not query the API for a single character', async () => {
    const wrapper = mount(SearchInput)
    await wrapper.get('input').setValue('W')
    vi.advanceTimersByTime(400)
    await flushPromises()
    expect(fetch).not.toHaveBeenCalled()
  })

  it('debounces the request and lists the results', async () => {
    const wrapper = mount(SearchInput)
    await wrapper.get('input').setValue('Wars')
    expect(fetch).not.toHaveBeenCalled()
    vi.advanceTimersByTime(300)
    await flushPromises()
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(wrapper.findAll('[role="option"]')).toHaveLength(2)
  })

  it('emits the chosen place', async () => {
    const wrapper = mount(SearchInput)
    await wrapper.get('input').setValue('Wars')
    vi.advanceTimersByTime(300)
    await flushPromises()
    await wrapper.findAll('[role="option"] button')[0].trigger('click')
    expect(wrapper.emitted('selected')?.[0]?.[0]).toMatchObject({ name: 'Warszawa' })
  })

  it('supports keyboard navigation of the result list', async () => {
    const wrapper = mount(SearchInput)
    const input = wrapper.get('input')
    await input.setValue('Wars')
    vi.advanceTimersByTime(300)
    await flushPromises()
    await input.trigger('keydown', { key: 'ArrowDown' })
    await input.trigger('keydown', { key: 'ArrowDown' })
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('selected')?.[0]?.[0]).toMatchObject({ name: 'Warszawa Wola' })
  })

  it('closes the list on Escape', async () => {
    const wrapper = mount(SearchInput)
    const input = wrapper.get('input')
    await input.setValue('Wars')
    vi.advanceTimersByTime(300)
    await flushPromises()
    await input.trigger('keydown', { key: 'Escape' })
    expect(wrapper.findAll('[role="option"]')).toHaveLength(0)
  })

  it('clears the field with the clear button', async () => {
    const wrapper = mount(SearchInput)
    await wrapper.get('input').setValue('Wars')
    await wrapper.get('button[aria-label="Wyczyść wyszukiwanie"]').trigger('click')
    expect(wrapper.get('input').element.value).toBe('')
  })
})
