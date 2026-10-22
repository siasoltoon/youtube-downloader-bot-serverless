# Repository instructions

Keep `siasoltoon/youtube_downloader_bot` unchanged. This repository is a separate migration.

Runtime modules use only the Telegram Serverless SDK and relative imports ending in `.js`. No arbitrary npm packages, filesystem access, or long-running processes in deployed modules. Do not implement download execution in Serverless; keep yt-dlp/FFmpeg and file delivery in an external worker. Never store credentials or media bytes in the built-in database.
