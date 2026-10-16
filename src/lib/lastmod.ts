import { execFileSync } from "node:child_process";
import { events } from "../data/events";
import { basePath, DEFAULT_LOCALE, locales, type Locale } from "./i18n";

// When each page's content last changed: the last commit that touched the files it is written
// in. Used for the sitemap's <lastmod> and the page's dateModified (#30). The build time would
// mark every page as changed on every deploy, and search engines learn to ignore a lastmod
// like that. The deploy checks out the full history so `git log` can see it.

/** The locale a path lives in (/fr/trips/ -> "fr"); English for everything else. */
function localeOf(path: string): Locale {
  const seg = path.split("/")[1];
  return (locales as string[]).includes(seg) ? (seg as Locale) : DEFAULT_LOCALE;
}

/** The files a page's content is written in, by its path (locale-aware). */
export function pageSources(path: string): string[] {
  const locale = localeOf(path);
  const copy = locale === DEFAULT_LOCALE ? [] : [`src/data/copy/${locale}.ts`];
  // Strip the locale prefix: /fr/trips/ -> /trips/
  const bare = basePath(path);
  // The home page's English copy lives in its locale file too (src/components/HomePage.astro).
  if (bare === "/") return ["src/pages/index.astro", "src/data/events.ts", ...(copy.length ? copy : ["src/data/copy/en.ts"])];
  if (bare === "/privacy/") return ["src/pages/privacy.astro", "src/data/privacy.ts", ...copy];
  if (bare === "/terms/") return ["src/pages/terms.astro", "src/data/terms.ts", ...copy];
  const slug = bare.replace(/^\/|\/$/g, "");
  const eventPage =
    locale === DEFAULT_LOCALE ? "src/pages/[event].astro" : "src/pages/[locale]/[event].astro";
  if (events.some((e) => e.slug === slug)) return [eventPage, "src/data/events.ts", ...copy];
  return [];
}

/** The ISO date of the last commit that touched any of the files. */
export type CommitDate = (files: string[]) => string;

const gitCommitDate: CommitDate = (files) =>
  execFileSync("git", ["log", "-1", "--format=%cI", "--", ...files], { encoding: "utf8" }).trim();

/** The page's last change, or undefined when the files or git history aren't there. */
export function lastModified(path: string, commitDate: CommitDate = gitCommitDate): Date | undefined {
  const files = pageSources(path);
  if (!files.length) return undefined;
  try {
    const iso = commitDate(files);
    const date = new Date(iso);
    return iso && !Number.isNaN(date.getTime()) ? date : undefined;
  } catch {
    return undefined;
  }
}
