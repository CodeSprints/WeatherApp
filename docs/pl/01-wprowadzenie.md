# Wprowadzenie

Pogoda365 to aplikacja internetowa, która pokazuje pogodę dla wybranego miejsca.
Aplikacja działa w przeglądarce na telefonie, tablecie i komputerze. Jest to jeden
kod źródłowy, bez osobnych wersji dla różnych urządzeń.

## Co robi aplikacja

- Wyszukuje miasta po nazwie i podpowiada wyniki w trakcie pisania.
- Pokazuje bieżące warunki: temperaturę, temperaturę odczuwalną, wilgotność,
  wiatr, ciśnienie, widoczność, wschód i zachód słońca.
- Pokazuje prognozę godzinową na najbliższe godziny.
- Pokazuje prognozę na pięć dni z zakresem temperatur.
- Pokazuje indeks UV i jakość powietrza.
- Rysuje wykres trendu temperatury.
- Zapisuje ulubione miejsca i historię wyszukiwania w przeglądarce.
- Ustala pogodę dla bieżącej lokalizacji po zgodzie użytkownika.
- Przełącza jasny i ciemny motyw i zapamiętuje wybór.

## Zastosowane technologie

| Warstwa | Technologia |
| --- | --- |
| Interfejs | Vue 3 (Composition API, `<script setup>`) |
| Język | TypeScript w trybie `strict` |
| Style | Tailwind CSS 3 |
| Narzędzia | Vite 7 |
| Wykresy | Chart.js 4 |
| Trasowanie | Vue Router 4 |
| Testy | Vitest, Vue Test Utils, jsdom |
| Backend | Express 5 z danymi Open-Meteo |

## Zasady projektu

1. Kod nie zawiera komentarzy. Nazwy funkcji, zmiennych i plików mają być jasne same w sobie.
2. Każdy element interfejsu musi być dostępny z klawiatury.
3. Układ dopasowuje się do szerokości ekranu bez osobnych gałęzi kodu.
4. Logika domenowa trafia do katalogu `src/services` i `src/composables`, a nie do komponentów.
5. Każda publiczna funkcja serwisowa ma test.
