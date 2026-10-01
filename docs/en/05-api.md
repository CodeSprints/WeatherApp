# Backend API

The server runs at `http://localhost:3000` and the endpoints share the
`/api/weather` prefix. The browser uses the relative `/api` path, which the
development server forwards to the backend.

## GET /api/weather/search

Searches places by name.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `q` | `string` | yes | Part of the place name. |

Response `200`:

```json
[
  { "name": "Warszawa", "lat": 52.2297, "lon": 21.0122, "country": "PL", "state": "Mazowieckie" }
]
```

Response `400` when `q` is missing.

## GET /api/weather/city

Weather for a city name.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `string` | yes | City name. |

Responses: `200` with a `WeatherData` object, `404` when the city is unknown,
`500` when the upstream service fails.

## GET /api/weather/coords

Weather for coordinates.

| Parameter | Type | Required | Range |
| --- | --- | --- | --- |
| `lat` | `number` | yes | −90 to 90 |
| `lon` | `number` | yes | −180 to 180 |

## Shape of WeatherData

```json
{
  "current": {
    "name": "Warszawa",
    "coord": { "lat": 52.2297, "lon": 21.0122 },
    "weather": [{ "id": 0, "main": "Clear", "description": "clear sky", "icon": "01d" }],
    "main": { "temp": 12.4, "feels_like": 10.2, "temp_min": 8, "temp_max": 15, "pressure": 1013, "humidity": 61 },
    "visibility": 10000,
    "wind": { "speed": 4.2, "deg": 180 },
    "clouds": { "all": 10 },
    "dt": 1768478400,
    "sys": { "country": "PL", "sunrise": 1768460400, "sunset": 1768496400 },
    "timezone": 3600
  },
  "hourly": [{ "dt": 1768478400, "temp": 12.4, "feels_like": 10.2, "humidity": 61, "weather": [], "pop": 0.1 }],
  "daily": [{ "dt": 1768478400, "temp_min": 8, "temp_max": 15, "humidity": 70, "weather": [], "sunrise": 0, "sunset": 0 }],
  "forecast": { "cod": "200", "cnt": 0, "list": [], "city": {} },
  "airQuality": { "coord": {}, "list": [{ "main": { "aqi": 2 }, "components": {}, "dt": 1768478400 }] }
}
```

Wind speed arrives in metres per second; the browser-side `windSpeed` function
converts it to kilometres per hour. The `pop` field is the probability of
precipitation between 0 and 1.

## Data sources

- Open-Meteo — forecast and air quality.
- Open-Meteo Geocoding — place search.
- Nominatim (OpenStreetMap) — place name for given coordinates.
