# Komponenty

Wszystkie komponenty używają `<script setup lang="ts">` i mają typowane właściwości.

## AppShell.vue

Rama aplikacji: nagłówek z wyszukiwarką, przyciskiem lokalizacji i przełącznikiem
motywu, obszar treści oraz stopka. Zawiera odnośnik „Przejdź do treści”, widoczny
dopiero po otrzymaniu fokusu.

## DashboardView.vue

Widok główny. Wybiera jeden z czterech stanów: ładowanie, błąd, dane, powitanie.
Łączy komponenty prezentacyjne i zapisuje wybrane miejsca w historii.

## TermsView.vue

Statyczna strona regulaminu pod ścieżką `/regulamin`.

## SearchInput.vue

Pole wyszukiwania miast.

| Właściwość | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `placeholder` | `string` | `Szukaj miasta` | Tekst podpowiedzi i etykieta pola. |

| Zdarzenie | Dane | Opis |
| --- | --- | --- |
| `selected` | `GeoLocation` | Użytkownik wybrał miejsce z listy. |

Zachowanie: zapytanie wysyłane jest po 300 ms przerwy w pisaniu i dopiero od dwóch
znaków. Lista obsługuje klawisze strzałek, `Enter` i `Escape`.

## CurrentWeather.vue

Bieżące warunki dla wczytanego miejsca.

| Właściwość | Typ | Opis |
| --- | --- | --- |
| `weather` | `CurrentWeather` | Dane bieżące z backendu. |

Zawiera przycisk dodania do ulubionych z atrybutem `aria-pressed`.

## HourlyForecast.vue

Prognoza godzinowa przewijana w poziomie.

| Właściwość | Typ | Opis |
| --- | --- | --- |
| `hourly` | `HourlyForecast[]` | Lista wpisów godzinowych. |

## DailyForecast.vue

Prognoza na pięć dni z zakresem temperatur.

| Właściwość | Typ | Opis |
| --- | --- | --- |
| `daily` | `DailyForecast[]` | Lista wpisów dziennych. |

## AdditionalInfo.vue

Cztery kafelki: indeks UV, jakość powietrza, wschód i zachód słońca.

| Właściwość | Typ | Opis |
| --- | --- | --- |
| `weather` | `CurrentWeather` | Dane bieżące. |
| `uv` | `UvIndex \| null` | Indeks UV, jeśli dostępny. |
| `airQuality` | `AirQualityResponse \| null` | Jakość powietrza, jeśli dostępna. |

## TemperatureChart.vue

Wykres liniowy temperatury oparty na Chart.js. Wykres jest odbudowywany przy
zmianie danych i niszczony przy odmontowaniu komponentu.

## FavoritesList.vue i HistoryList.vue

Listy zapisanych miejsc. Każdy wiersz ma przycisk wyboru i przycisk usunięcia
z opisową etykietą. Przy pustej liście pokazywany jest krótki komunikat.

| Zdarzenie | Dane |
| --- | --- |
| `selected` | `FavoriteCity` lub `SearchHistoryItem` |

## PopularCities.vue

Zestaw przycisków z popularnymi miastami. Emituje `selected` z obiektem `CityReference`.

## ThemeToggle.vue

Przełącznik motywu. Etykieta i `aria-pressed` zmieniają się razem ze stanem.

## WeatherIcon.vue i IconBase.vue

Ikony w formacie SVG. `WeatherIcon` dobiera rysunek na podstawie kodu pogody i ma
rolę `img` z etykietą tekstową. `IconBase` rysuje ikony interfejsu i domyślnie jest
ukryty przed czytnikami ekranu, ponieważ towarzyszy mu tekst.

## WeatherSkeleton.vue

Zarys układu pokazywany podczas ładowania danych. Obszar ma atrybut `aria-busy`.
