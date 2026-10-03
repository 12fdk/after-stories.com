// Light / Dark / Auto. Auto is the default and means "no data-theme": the CSS then follows
// prefers-color-scheme. The choice is a per-browser convenience in localStorage, so every read
// and write survives storage being blocked. The inline script in Base.astro applies it before
// first paint; it must keep doing what readChoice and applyChoice do.

export type ThemeChoice = "auto" | "light" | "dark";

export const THEME_KEY = "theme";

type Store = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export function readChoice(storage: Store | null): ThemeChoice {
  try {
    const stored = storage?.getItem(THEME_KEY);
    return stored === "light" || stored === "dark" ? stored : "auto";
  } catch {
    return "auto";
  }
}

export function applyChoice(choice: ThemeChoice, root: HTMLElement, storage: Store | null): void {
  if (choice === "auto") delete root.dataset.theme;
  else root.dataset.theme = choice;
  try {
    if (choice === "auto") storage?.removeItem(THEME_KEY);
    else storage?.setItem(THEME_KEY, choice);
  } catch {
    // Storage blocked: the theme still applies for this page view.
  }
}
