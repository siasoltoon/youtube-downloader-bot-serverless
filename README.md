# YouTube Downloader Bot — Telegram Serverless

**Status:** Phase 0 migration shell, not a working downloader.

Original: `siasoltoon/youtube_downloader_bot`

## Boundary
Serverless handles Telegram intake and stores request/job metadata. `yt-dlp`, FFmpeg, temporary files, download execution, and media delivery must remain in an external worker/service. This repository does not download media or call a worker yet.

## Setup
- Node.js 18+; run `npm install`.
- Enable Serverless for the intended bot in @BotFather.
- Run `npx tgcloud login` with the bot's Serverless CLI access token.
- Run `npm run check` and test with `npx tgcloud run handlers/message '{ chat: { id: 123 }, from: { id: 123 }, text: "/start" }'`.
- Review `npx tgcloud diff`, then explicitly run `npx tgcloud push` and separately review `npx tgcloud migrate`.

## Database
The built-in database stores URL/job state and external references only. Do not store media bytes, cookies, auth tokens, or temporary paths here. Before connecting a worker, define signed requests, URL/domain validation, retries, idempotency, size/duration limits, and user-facing error states.
