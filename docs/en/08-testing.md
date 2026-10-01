# Testing

The project uses Vitest, Vue Test Utils and the jsdom environment.

## Running

```bash
npm run test        # watch mode
npm run test:run    # single pass
npm run test:coverage
```

## Contents of the tests folder

| File | Scope |
| --- | --- |
| `setup.ts` | Environment setup: `matchMedia`, storage and component cleanup. |
| `fixtures.ts` | Sample weather data shared by several tests. |
| `formatters.test.ts` | Temperature, wind, visibility, date and relative time formatting. |
| `storage.test.ts` | History, favourites, theme, persistence and resistance to corrupted data. |
| `weather-service.test.ts` | URL building, error code handling, UV and air quality wording. |
| `use-weather.test.ts` | Loading state, data, errors and search. |
| `components.test.ts` | Rendering and accessibility of the presentational components. |
| `search-input.test.ts` | Request debouncing, result list, keyboard handling. |

That is 57 tests across 6 files.

## Rules for writing tests

1. A test checks behaviour a user can observe, not internal details.
2. Elements are queried by role and label, so each test also confirms accessibility.
3. Network calls are replaced with a `fetch` stub, so tests run offline.
4. Time is driven by Vitest fake timers wherever a delay matters.
5. Every test starts with empty browser storage.

## Example

```ts
import { mount } from '@vue/test-utils'
import ThemeToggle from '@/components/ThemeToggle.vue'

it('switches the theme', async () => {
  const wrapper = mount(ThemeToggle)
  await wrapper.get('button').trigger('click')
  expect(wrapper.get('button').attributes('aria-pressed')).toBe('true')
})
```

## Type checking

Every build runs `vue-tsc --noEmit` first. A type error stops the build.
