# Testy

Projekt używa Vitest, Vue Test Utils i środowiska jsdom.

## Uruchamianie

```bash
npm run test        # tryb ciągły
npm run test:run    # jedno przejście
npm run test:coverage
```

## Zawartość katalogu tests

| Plik | Zakres |
| --- | --- |
| `setup.ts` | Konfiguracja środowiska: `matchMedia`, czyszczenie pamięci i komponentów. |
| `fixtures.ts` | Przykładowe dane pogodowe używane w wielu testach. |
| `formatters.test.ts` | Formatowanie temperatury, wiatru, widoczności, dat i czasu względnego. |
| `storage.test.ts` | Historia, ulubione, motyw, trwałość i odporność na uszkodzone dane. |
| `weather-service.test.ts` | Budowa adresów, obsługa kodów błędów, opisy UV i jakości powietrza. |
| `use-weather.test.ts` | Stan ładowania, dane, błędy i wyszukiwanie. |
| `components.test.ts` | Renderowanie i dostępność komponentów prezentacyjnych. |
| `search-input.test.ts` | Opóźnienie zapytania, lista wyników, obsługa klawiatury. |

Łącznie 57 testów w 6 plikach.

## Zasady pisania testów

1. Test sprawdza zachowanie widoczne dla użytkownika, a nie szczegóły wewnętrzne.
2. Elementy wyszukiwane są po roli i etykiecie, dzięki czemu test potwierdza
   również dostępność.
3. Żądania sieciowe są zastępowane atrapą `fetch`, więc testy działają bez internetu.
4. Czas sterowany jest zegarami Vitest tam, gdzie liczy się opóźnienie.
5. Każdy test zaczyna się od czystej pamięci przeglądarki.

## Przykład

```ts
import { mount } from '@vue/test-utils'
import ThemeToggle from '@/components/ThemeToggle.vue'

it('switches the theme', async () => {
  const wrapper = mount(ThemeToggle)
  await wrapper.get('button').trigger('click')
  expect(wrapper.get('button').attributes('aria-pressed')).toBe('true')
})
```

## Weryfikacja typów

Przed każdą budową uruchamiane jest `vue-tsc --noEmit`. Błąd typów przerywa budowę.
