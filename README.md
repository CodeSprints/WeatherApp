# Pogoda365

![Vue](https://img.shields.io/badge/Vue-3-42b883)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8)
![Vite](https://img.shields.io/badge/Vite-7-646cff)
![Vitest](https://img.shields.io/badge/Vitest-57_tests-6e9f18)

Weather dashboard built with Vue 3, TypeScript and Tailwind CSS. One codebase
serves the mobile, tablet and desktop web experience.

Aplikacja pogodowa zbudowana w Vue 3, TypeScript i Tailwind CSS. Jeden kod obsługuje
wersję mobilną, tabletową i desktopową.

## Features

- City search with suggestions, debounced requests and keyboard navigation
- Current conditions, hourly forecast, five-day forecast
- UV index, air quality, sunrise and sunset
- Temperature trend chart (Chart.js)
- Favourites and search history stored in the browser
- Device location on request
- Light and dark theme with system preference as the default
- WCAG 2.2 AA oriented markup and interaction

## Quick start

```bash
npm install
cd src/backend && npm install && cd ../..

npm run backend   # terminal 1, API on port 3000
npm run dev       # terminal 2, app on port 5173
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Type check and production build |
| `npm run preview` | Preview the production build |
| `npm run typecheck` | Type check only |
| `npm run test:run` | Run the test suite once |
| `npm run test:coverage` | Test suite with coverage |

## Project structure

```text
src/
├── components/     view components
├── composables/    shared state (useWeather)
├── services/       HTTP, storage, geolocation, formatting
├── types/          domain types
├── router/         routes
└── backend/        Express API over Open-Meteo
tests/              Vitest suites
docs/               documentation in Polish and English
```

## Documentation

Full documentation lives in [`docs/`](docs/README.md) and is written in Polish and
English: introduction, getting started, architecture, components, API,
responsive design, accessibility, testing and a glossary.

Pełna dokumentacja znajduje się w katalogu [`docs/`](docs/README.md) i jest
napisana po polsku i po angielsku.

## Data sources

Open-Meteo (forecast, air quality, geocoding) and OpenStreetMap Nominatim
(reverse geocoding).

## License

MIT
