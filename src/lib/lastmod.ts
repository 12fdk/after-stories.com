import { execFileSync } from "node:child_process";
import { events } from "../data/events";

// When each page's content last changed: the last commit that touched the files it is written
// in. Used for the sitemap's <lastmod> and the page's dateModified (#30). The build time would
// mark every page as changed on every deploy, and search engines learn to ignore a lastmod
// like that. The deploy checks out the full history so `git log` can see it.

/** The files a page's content is written in, by its path. */
export function pageSources(path: string): string[] {
  if (path === "/") return ["src/pages/index.astro", "src/data/events.ts"];
  if (path === "/privacy/") return ["src/pages/privacy.astro", "src/data/privacy.ts"];
  if (path === "/terms/") return ["src/pages/terms.astro", "src/data/terms.ts"];
  const slug = path.replace(/^\/|\/$/g, "");
  if (events.some((e) => e.slug === slug)) return ["src/pages/[event].astro", "src/data/events.ts"];
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
