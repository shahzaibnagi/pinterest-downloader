# Pinterest Downloader

Paste a Pinterest pin URL, get the image or video file behind it.

## How it works

| File | Job |
|---|---|
| `index.html` | The interface — paste a link, preview the media, download it |
| `api/pin.js` | Vercel serverless function that resolves the pin through RapidAPI |

## Setup

1. Subscribe to the Pinterest resolver endpoint on RapidAPI.
2. Set the key as an environment variable — never in code:

```bash
RAPIDAPI_KEY=your_key_here
```

On Vercel: Project → Settings → Environment Variables → add `RAPIDAPI_KEY` → redeploy.

## Endpoint

```
GET /api/pin?url=https://www.pinterest.com/pin/1234567890/
```

Returns the resolver's JSON as-is. Bad input gets a `400`, an unreachable resolver a `502`.

## Limits

- The whole thing depends on a third-party resolver: if RapidAPI is down, this is down.
- Private pins and board-locked media cannot be resolved.
- Downloading other people's content may breach Pinterest's terms and copyright — it exists for your own pins and licensed media.

## Licence

MIT
