# Dostępność

Celem jest zgodność z WCAG 2.2 na poziomie AA.

## Struktura strony

- Jeden element `main` z identyfikatorem `main-content`.
- Odnośnik „Przejdź do treści” jako pierwszy element strony, widoczny po otrzymaniu fokusu.
- Nagłówki tworzą ciąg bez pominięć: `h1` dla nazwy miejsca lub tytułu widoku, `h2` dla sekcji.
- Każda sekcja ma powiązanie `aria-labelledby` lub `aria-label`.
- Atrybut `lang="pl"` na elemencie `html`.

## Klawiatura

- Wszystkie funkcje są dostępne bez myszy.
- Lista podpowiedzi obsługuje `ArrowUp`, `ArrowDown`, `Enter` i `Escape`.
- Widoczny pierścień fokusu jest zdefiniowany dla `:focus-visible` i ma wyraźny kontrast.
- Kolejność fokusu odpowiada kolejności wizualnej, ponieważ układ nie zmienia kolejności elementów w kodzie.

## Role i etykiety

| Element | Rozwiązanie |
| --- | --- |
| Pole wyszukiwania | `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-autocomplete` |
| Lista wyników | `role="listbox"` i `role="option"` z `aria-selected` |
| Przycisk ulubionych | `aria-pressed` i etykieta zmieniająca się ze stanem |
| Przełącznik motywu | `aria-pressed` i etykieta opisująca skutek działania |
| Paski UV i jakości powietrza | `role="progressbar"` z `aria-valuenow`, `aria-valuemin`, `aria-valuemax` |
| Komunikat błędu | `role="alert"` |
| Komunikat lokalizacji | `role="status"` |
| Obszar ładowania | `aria-busy="true"` |
| Ikony dekoracyjne | `aria-hidden="true"` |
| Ikony pogody | `role="img"` z opisem słownym |

## Tekst i kontrast

- Kolory tekstu i tła dobrano tak, aby kontrast wynosił co najmniej 4,5:1 dla
  tekstu zwykłego i 3:1 dla tekstu dużego, w obu motywach.
- Informacja nigdy nie jest przekazywana wyłącznie kolorem. Pasek jakości powietrza
  ma zawsze podpis słowny, na przykład „Zadowalająca”.
- Treść jest pisana prostym językiem, w stronie czynnej i bez zbędnych skrótów.

## Czas i ruch

- Brak automatycznie odświeżanych treści i brak limitów czasu.
- Animacje są wyłączane przy ustawieniu `prefers-reduced-motion`.

## Lokalizacja urządzenia

Dostęp do lokalizacji wymaga działania użytkownika. Odmowa zgody nie blokuje
aplikacji — pojawia się komunikat i można dalej korzystać z wyszukiwarki.

## Jak sprawdzać

1. Przejście całej strony klawiszem `Tab` bez pułapek fokusu.
2. Odczyt strony czytnikiem ekranu, na przykład NVDA lub VoiceOver.
3. Powiększenie strony do 200 procent bez utraty treści.
4. Automatyczny audyt, na przykład Lighthouse lub axe DevTools.
