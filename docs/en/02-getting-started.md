# Getting started

## Requirements

- Node.js 20.19 or newer.
- npm 10 or newer.

## Install

```bash
npm install
cd src/backend && npm install && cd ../..
```

## Local development

Run the backend and the frontend in two terminals.

```bash
npm run backend
```

```bash
npm run dev
```

The frontend listens on port 5173 and forwards `/api` requests to the backend at
`http://localhost:3000`. Change the backend address with the `BACKEND_URL` variable.

```bash
BACKEND_URL=http://localhost:4000 npm run dev
```

## Available commands

| Command | Effect |
| --- | --- |
| `npm run dev` | Development server with live reload. |
| `npm run build` | Type check and production build into `dist`. |
| `npm run preview` | Preview of the production build. |
| `npm run typecheck` | Type check without building. |
| `npm run test` | Tests in watch mode. |
| `npm run test:run` | A single test run. |
| `npm run test:coverage` | Tests with a coverage report. |
| `npm run backend` | API server. |

## Environment variables

### Frontend

| Variable | Default | Meaning |
| --- | --- | --- |
| `VITE_API_URL` | `/api` | API path prefix used in the browser. |
| `BACKEND_URL` | `http://localhost:3000` | Proxy target for `/api` during development. |

### Backend

| Variable | Default | Meaning |
| --- | --- | --- |
| `PORT` | `3000` | API server port. |
| `CORS_ORIGIN` | `http://localhost:4200` | Comma-separated list of allowed origins. |

## Deployment

The production build writes static files to `dist`. The `netlify.toml` file holds a
ready configuration for Netlify, including the redirect of every path to
`index.html`, which client-side routing needs. Deploy the backend separately and
point to it with `VITE_API_URL`, or configure a proxy under the `/api` path.
