# KMPR Power

Open-access solar PPA and BOOT plants for AP industries.

## Run

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in the values:

| Variable | Required for | Where to get it |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | CMS content | [sanity.io/manage](https://sanity.io/manage) |
| `NEXT_PUBLIC_SANITY_DATASET` | CMS content | sanity.io/manage (default: `production`) |
| `SANITY_API_WRITE_TOKEN` | Seed script (`pnpm seed`) | sanity.io/manage → API → Tokens (Editor role) |
| `ANTHROPIC_API_KEY` | Bill upload calculator (`/calculator`) | [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) |

> `ANTHROPIC_API_KEY` is used server-side only in `app/api/extract-bill/route.ts`.
> Bills are processed in memory and never persisted.
