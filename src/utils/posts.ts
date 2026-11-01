/** Whether a post is published (not a draft) for collection filtering. */
export function isPublished(data: { draft?: boolean }): boolean {
  return !data.draft;
}

/** Rough reading time from markdown word count (200 wpm). */
export function readingTime(body: string): { minutes: number } {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return { minutes: Math.max(1, Math.round(words / 200)) };
}
