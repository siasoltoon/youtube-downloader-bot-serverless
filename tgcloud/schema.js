import { table, integer, text, index, sql } from 'sdk/db';

export const users = table('users', {
  userId: integer('user_id').primaryKey(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  lastSeenAt: integer('last_seen_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

export const downloadJobs = table('download_jobs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull(),
  sourceUrl: text('source_url').notNull(),
  status: text('status').notNull().default('queued'),
  externalJobId: text('external_job_id'),
  resultRef: text('result_ref'),
  errorCode: text('error_code'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
}, (t) => ({
  userIdx: index('idx_download_jobs_user').on(t.userId),
  statusIdx: index('idx_download_jobs_status').on(t.status),
}));
