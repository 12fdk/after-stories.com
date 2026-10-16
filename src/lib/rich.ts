// Copy text with the app's like (❤️) in it: the pages draw the heart themselves instead of
// showing the emoji (src/components/Rich.astro). The copy keeps the emoji for llms.txt.

/** The text around each heart, in order: n hearts give n + 1 parts. */
export function splitHearts(text: string): string[] {
  return text.split(/❤️|❤/);
}
