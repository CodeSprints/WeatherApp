# API backendu

Serwer działa pod adresem `http://localhost:3000`, a punkty końcowe mają przedrostek
`/api/weather`. W przeglądarce używany jest adres względny `/api`, który serwer
deweloperski przekazuje do backendu.

## GET /api/weather/search

Wyszukiwanie miejsc po nazwie.

| Parametr | Typ | Wymagany | Opis |
| --- | --- | --- | --- |
| `q` | `string` | tak | Fragment nazwy miejsca. |

Odpowiedź `200`:

```json
[
  { "name": "Warszawa", "lat": 52.2297, "lon": 21.0122, "country": "PL", "state": "Mazowieckie" }
]
```

Odpowiedź `400` przy braku parametru `q`.

## GET /api/weather/city

Pogoda dla nazwy miasta.

| Parametr | Typ | Wymagany | Opis |
| --- | --- | --- | --- |
| `city` | `string` | tak | Nazwa miasta. |

Odpowiedzi: `200` z obiektem `WeatherData`, `404` gdy miasto nie zostało znalezione,
`500` przy błędzie usługi zewnętrznej.

## GET /api/weather/coords

Pogoda dla współrzędnych.

| Parametr | Typ | Wymagany | Zakres |
| --- | --- | --- | --- |
| `lat` | `number` | tak | od −90 do 90 |
| `lon` | `number` | tak | od −180 do 180 |

## Kształt odpowiedzi WeatherData

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

Prędkość wiatru jest podawana w metrach na sekundę, a przeliczenie na kilometry
na godzinę wykonuje funkcja `windSpeed` po stronie przeglądarki.
Pole `pop` oznacza prawdopodobieństwo opadów w zakresie od 0 do 1.

## Źródła danych

- Open-Meteo — prognoza i jakość powietrza.
- Open-Meteo Geocoding — wyszukiwanie miejsc.
- Nominatim (OpenStreetMap) — nazwa miejsca dla podanych współrzędnych.
