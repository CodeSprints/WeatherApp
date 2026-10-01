# Uruchomienie

## Wymagania

- Node.js w wersji 20.19 lub nowszej.
- npm w wersji 10 lub nowszej.

## Instalacja

```bash
npm install
cd src/backend && npm install && cd ../..
```

## Praca lokalna

Uruchom backend i frontend w dwóch terminalach.

```bash
npm run backend
```

```bash
npm run dev
```

Frontend nasłuchuje na porcie 5173 i przekazuje żądania `/api` do backendu pod adresem
`http://localhost:3000`. Adres backendu można zmienić zmienną `BACKEND_URL`.

```bash
BACKEND_URL=http://localhost:4000 npm run dev
```

## Dostępne polecenia

| Polecenie | Działanie |
| --- | --- |
| `npm run dev` | Serwer deweloperski z przeładowaniem na żywo. |
| `npm run build` | Sprawdzenie typów i budowa wersji produkcyjnej do katalogu `dist`. |
| `npm run preview` | Podgląd zbudowanej wersji produkcyjnej. |
| `npm run typecheck` | Sprawdzenie typów bez budowania. |
| `npm run test` | Testy w trybie ciągłym. |
| `npm run test:run` | Jednorazowe uruchomienie testów. |
| `npm run test:coverage` | Testy z raportem pokrycia kodu. |
| `npm run backend` | Serwer API. |

## Zmienne środowiskowe

### Frontend

| Zmienna | Wartość domyślna | Znaczenie |
| --- | --- | --- |
| `VITE_API_URL` | `/api` | Przedrostek adresów API w przeglądarce. |
| `BACKEND_URL` | `http://localhost:3000` | Cel przekierowania `/api` w trybie deweloperskim. |

### Backend

| Zmienna | Wartość domyślna | Znaczenie |
| --- | --- | --- |
| `PORT` | `3000` | Port serwera API. |
| `CORS_ORIGIN` | `http://localhost:4200` | Lista dozwolonych źródeł rozdzielona przecinkami. |

## Wdrożenie

Budowa produkcyjna tworzy statyczne pliki w katalogu `dist`. Plik `netlify.toml`
zawiera gotową konfigurację dla Netlify wraz z przekierowaniem wszystkich ścieżek
do `index.html`, co jest wymagane przez trasowanie po stronie przeglądarki.
Backend należy wdrożyć osobno i wskazać jego adres zmienną `VITE_API_URL`
lub skonfigurować serwer proxy pod ścieżką `/api`.
