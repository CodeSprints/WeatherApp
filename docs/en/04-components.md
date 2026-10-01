# Components

Every component uses `<script setup lang="ts">` and typed props.

## AppShell.vue

The application frame: a header with the search field, the location button and the
theme switch, the content area and the footer. It carries a “skip to content” link
that becomes visible when it receives focus.

## DashboardView.vue

The main view. It picks one of four states: loading, error, data, welcome.
It composes the presentational components and records chosen places in the history.

## TermsView.vue

A static terms page at the `/regulamin` path.

## SearchInput.vue

The city search field.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `placeholder` | `string` | `Szukaj miasta` | Hint text and field label. |

| Event | Payload | Description |
| --- | --- | --- |
| `selected` | `GeoLocation` | The user picked a place from the list. |

Behaviour: the request is sent after a 300 ms pause in typing and only from two
characters onwards. The list supports the arrow keys, `Enter` and `Escape`.

## CurrentWeather.vue

Current conditions for the loaded place.

| Prop | Type | Description |
| --- | --- | --- |
| `weather` | `CurrentWeather` | Current data from the backend. |

It includes a favourite button with an `aria-pressed` attribute.

## HourlyForecast.vue

An hourly forecast that scrolls horizontally.

| Prop | Type | Description |
| --- | --- | --- |
| `hourly` | `HourlyForecast[]` | List of hourly entries. |

## DailyForecast.vue

A five-day forecast with the temperature range.

| Prop | Type | Description |
| --- | --- | --- |
| `daily` | `DailyForecast[]` | List of daily entries. |

## AdditionalInfo.vue

Four tiles: UV index, air quality, sunrise and sunset.

| Prop | Type | Description |
| --- | --- | --- |
| `weather` | `CurrentWeather` | Current data. |
| `uv` | `UvIndex \| null` | UV index when available. |
| `airQuality` | `AirQualityResponse \| null` | Air quality when available. |

## TemperatureChart.vue

A line chart built with Chart.js. The chart is rebuilt when the data changes and
destroyed when the component unmounts.

## FavoritesList.vue and HistoryList.vue

Lists of saved places. Each row has a select button and a remove button with a
descriptive label. An empty list shows a short message.

| Event | Payload |
| --- | --- |
| `selected` | `FavoriteCity` or `SearchHistoryItem` |

## PopularCities.vue

A row of buttons with popular cities. It emits `selected` with a `CityReference`.

## ThemeToggle.vue

The theme switch. Its label and `aria-pressed` change together with the state.

## WeatherIcon.vue and IconBase.vue

SVG icons. `WeatherIcon` picks the drawing from the weather code and carries the
`img` role with a text label. `IconBase` draws interface icons and is hidden from
screen readers by default, because text always accompanies it.

## WeatherSkeleton.vue

A layout outline shown while data loads. The region carries `aria-busy`.
