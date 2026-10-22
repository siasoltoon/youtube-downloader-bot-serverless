import { api, db } from 'sdk';
import { users, downloadJobs } from '../schema.js';

const ALLOWED_HOSTS = new Set(['youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com', 'youtu.be']);

function parseYouTubeUrl(value) {
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    if (!ALLOWED_HOSTS.has(url.hostname.toLowerCase())) return null;
    return url.href;
  } catch {
    return null;
  }
}

export default async function (message) {
  if (!message?.chat?.id || !message.from?.id) return;
  const chatId = message.chat.id;
  const userId = message.from.id;
  const input = (message.text ?? '').trim();

  await db.insert(users).values({ userId, lastSeenAt: new Date() })
    .onConflictDoUpdate({ target: users.userId, set: { lastSeenAt: new Date() } }).run();

  if (input === '/start') {
    await api.sendMessage({ chat_id: chatId, text: 'YouTube Downloader Serverless shell is ready. Send a YouTube URL to register a request. No download worker is connected yet.' });
    return;
  }

  const sourceUrl = parseYouTubeUrl(input);
  if (!sourceUrl) {
    await api.sendMessage({ chat_id: chatId, text: 'Send a valid HTTP(S) URL from youtube.com or youtu.be. This shell records requests only; downloading is not enabled.' });
    return;
  }

  const [job] = await db.insert(downloadJobs).values({ userId, sourceUrl, status: 'queued' }).returning().run();
  await api.sendMessage({ chat_id: chatId, text: `Request #${job.id} recorded as queued. An authenticated external yt-dlp/FFmpeg worker must be connected before a download can start.` });
}
