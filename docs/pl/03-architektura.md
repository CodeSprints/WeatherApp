# Architektura

## Struktura katalogów

```text
├── index.html              punkt wejścia strony
├── src
│   ├── main.ts             start aplikacji
│   ├── App.vue             korzeń drzewa komponentów
│   ├── styles.css          warstwa bazowa Tailwind i klasy wspólne
│   ├── router/             definicje tras
│   ├── components/         komponenty widoku
│   ├── composables/        stan współdzielony między komponentami
│   ├── services/           dostęp do danych, pamięć lokalna, formatowanie
│   ├── types/              typy domenowe
│   └── backend/            serwer API (Express)
├── tests/                  testy jednostkowe i komponentowe
└── docs/                   dokumentacja
```

## Warstwy

1. **Typy** (`src/types`). Jedno źródło prawdy dla kształtu danych pogodowych.
   Żadnej logiki, wyłącznie interfejsy.
2. **Serwisy** (`src/services`). Funkcje bez stanu widoku:
   - `weather.ts` — zapytania HTTP i opisy indeksów UV oraz jakości powietrza,
   - `storage.ts` — ulubione, historia i motyw w pamięci przeglądarki,
   - `geolocation.ts` — dostęp do lokalizacji urządzenia,
   - `formatters.ts` — formatowanie liczb, dat i godzin w języku polskim.
3. **Composables** (`src/composables`). `useWeather` przechowuje aktualnie wczytane
   dane, znacznik ładowania i komunikat błędu. Stan jest tworzony raz na moduł,
   więc nagłówek i widok główny widzą te same dane bez biblioteki do zarządzania stanem.
4. **Komponenty** (`src/components`). Odpowiadają za układ i interakcję.
   Nie wykonują własnych zapytań sieciowych poza wywołaniem funkcji z warstwy wyżej.

## Przepływ danych

```text
użytkownik → SearchInput → useWeather.search → services/weather → backend
backend → useWeather.data → DashboardView → komponenty prezentacyjne
```

Wybór miejsca uruchamia `loadByCoords`. Funkcja ustawia `loading`, pobiera dane,
zapisuje je w `data` i czyści `loading`. Komponenty reagują na zmianę, ponieważ
`data` jest referencją Vue.

## Obsługa błędów

Warstwa serwisowa zamienia odpowiedzi HTTP inne niż `2xx` na wyjątek z czytelnym
komunikatem po polsku. `useWeather` przechwytuje wyjątek i zapisuje treść w `error`.
Widok pokazuje komunikat w elemencie z atrybutem `role="alert"`, dzięki czemu
czytnik ekranu odczyta go od razu.

## Zapis danych w przeglądarce

`StorageService` zapisuje trzy klucze: `pogoda365:history`, `pogoda365:favorites`
i `pogoda365:theme`. Odczyt jest zabezpieczony przed uszkodzoną zawartością —
w razie błędu parsowania zwracana jest wartość pusta. Historia przechowuje
maksymalnie dziesięć pozycji i usuwa duplikaty po współrzędnych.

## Backend

Serwer Express udostępnia trzy punkty końcowe i tłumaczy odpowiedzi Open-Meteo na
format zgodny z typami frontendu. Dzięki temu klucze API i logika mapowania kodów
pogodowych pozostają poza przeglądarką.
