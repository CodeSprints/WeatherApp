# Introduction

Pogoda365 is a web application that shows the weather for a chosen place.
It runs in the browser on phones, tablets and desktops. There is one codebase,
with no separate build per device.

## What the app does

- Searches for cities by name and suggests results while you type.
- Shows current conditions: temperature, feels-like temperature, humidity,
  wind, pressure, visibility, sunrise and sunset.
- Shows an hourly forecast for the coming hours.
- Shows a five-day forecast with the temperature range.
- Shows the UV index and the air quality index.
- Draws a temperature trend chart.
- Stores favourite places and search history in the browser.
- Loads the weather for the current location once the user agrees.
- Switches between a light and a dark theme and remembers the choice.

## Technology

| Layer | Technology |
| --- | --- |
| Interface | Vue 3 (Composition API, `<script setup>`) |
| Language | TypeScript in `strict` mode |
| Styling | Tailwind CSS 3 |
| Tooling | Vite 7 |
| Charts | Chart.js 4 |
| Routing | Vue Router 4 |
| Tests | Vitest, Vue Test Utils, jsdom |
| Backend | Express 5 with Open-Meteo data |

## Project rules

1. The code carries no comments. Names of functions, variables and files explain themselves.
2. Every interface element works with a keyboard.
3. The layout adapts to the screen width without separate code branches.
4. Domain logic lives in `src/services` and `src/composables`, not in components.
5. Every public service function has a test.
