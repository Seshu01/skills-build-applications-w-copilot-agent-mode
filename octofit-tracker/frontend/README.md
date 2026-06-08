# OctoFit Frontend

React 19 + Vite presentation tier for the OctoFit multi-tier application.

## Environment variable

Define `VITE_CODESPACE_NAME` in a local env file when running in Codespaces.

Example `.env.local`:

```
VITE_CODESPACE_NAME=your-codespace-name
```

API routing behavior:

- If `VITE_CODESPACE_NAME` is defined, frontend requests use:
	`https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`
- If it is not defined, frontend falls back safely to:
	`http://localhost:8000/api/[component]/`

This fallback prevents invalid URLs such as `https://undefined-8000.app.github.dev`.

## Run

```
npm install
npm run dev
```
