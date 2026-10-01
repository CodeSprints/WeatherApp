# Architecture

## Folder layout

```text
├── index.html              page entry point
├── src
│   ├── main.ts             application start
│   ├── App.vue             root of the component tree
│   ├── styles.css          Tailwind base layer and shared classes
│   ├── router/             route definitions
│   ├── components/         view components
│   ├── composables/        state shared between components
│   ├── services/           data access, local storage, formatting
│   ├── types/              domain types
│   └── backend/            API server (Express)
├── tests/                  unit and component tests
└── docs/                   documentation
```

## Layers

1. **Types** (`src/types`). A single source of truth for the shape of weather data.
   No logic, only interfaces.
2. **Services** (`src/services`). Functions without view state:
   - `weather.ts` — HTTP requests and the wording for the UV and air quality scales,
   - `storage.ts` — favourites, history and theme in browser storage,
   - `geolocation.ts` — access to the device location,
   - `formatters.ts` — number, date and time formatting in Polish.
3. **Composables** (`src/composables`). `useWeather` holds the loaded data, the
   loading flag and the error message. The state is created once per module, so the
   header and the main view read the same data without a state management library.
4. **Components** (`src/components`). They own layout and interaction. They make no
   network calls of their own beyond calling a function from the layer above.

## Data flow

```text
user → SearchInput → useWeather.search → services/weather → backend
backend → useWeather.data → DashboardView → presentational components
```

Choosing a place calls `loadByCoords`. The function sets `loading`, fetches the data,
stores it in `data` and clears `loading`. Components react to the change because
`data` is a Vue ref.

## Error handling

The service layer turns any non-`2xx` response into an exception with a readable
message. `useWeather` catches it and stores the text in `error`. The view renders
the message inside an element with `role="alert"`, so a screen reader announces it
immediately.

## Browser storage

`StorageService` writes three keys: `pogoda365:history`, `pogoda365:favorites` and
`pogoda365:theme`. Reads are guarded against corrupted content — a parse error
returns an empty value. The history keeps at most ten entries and removes
duplicates by coordinates.

## Backend

The Express server exposes three endpoints and maps Open-Meteo responses into the
shape the frontend types expect. API keys and the weather code mapping therefore
stay out of the browser.
