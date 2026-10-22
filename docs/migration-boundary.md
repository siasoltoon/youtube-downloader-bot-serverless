# Migration boundary

## Serverless
URL intake, user metadata, request status, and external job/result references.

## External worker
Video metadata extraction, yt-dlp, FFmpeg, temporary files, storage, and media delivery. No worker endpoint is configured yet.

## Before production
- Restrict and validate supported source domains.
- Define download size/duration/format limits and applicable rights/policy controls.
- Authenticate and sign worker requests; use idempotency keys and bounded retries.
- Never accept arbitrary callback URLs or expose storage paths.
- Add job timeout, cancellation, retention, and result cleanup.
- Test duplicate Telegram updates and worker failures.
