import { afterEach, vi } from 'vitest'
import { enableAutoUnmount } from '@vue/test-utils'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }),
})

enableAutoUnmount(afterEach)

afterEach(() => {
  window.localStorage.clear()
  vi.restoreAllMocks()
})
