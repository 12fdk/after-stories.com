import type { Locale } from "./i18n";

// After Stories on the App Store (live 2026-10-18, #59). Every download link on the site comes
// from here, so they all carry the same campaign tokens:
//   - pt (provider token) + ct (campaign token) let App Store Connect › App Analytics ›
//     Acquisition › Campaigns attribute downloads to the site, one campaign per place on the page.
//   - Umami counts the clicks (event "app-store-click", src/components/AppStoreCta.astro).
// The /app/ URL without a storefront sends each visitor to their own country's store.

export const APP_STORE_ID = "6815212070";
export const PROVIDER_TOKEN = "127521693";

/** Where on the page a download link sits: its Umami property and its App Store campaign. */
export type Placement = "header" | "hero" | "plan" | "closer" | "qr";
export const placements: Placement[] = ["header", "hero", "plan", "closer", "qr"];

/** The plain App Store page, for structured data and the llms files. */
export const APP_STORE_URL = `https://apps.apple.com/app/id${APP_STORE_ID}`;

/** The App Store campaign for a place on the page (Apple allows 40 characters). */
export const campaignToken = (placement: Placement) => `site-${placement}`;

/** A download link for one place on the page, with the campaign tokens. */
export function appStoreUrl(placement: Placement): string {
  const url = new URL(`https://apps.apple.com/app/apple-store/id${APP_STORE_ID}`);
  url.searchParams.set("pt", PROVIDER_TOKEN);
  url.searchParams.set("ct", campaignToken(placement));
  url.searchParams.set("mt", "8");
  return url.href;
}

/** Apple's official black "Download on the App Store" badge in the page's language
 * (public/badges/, from Apple's marketing tools). Width at the badge's native 40 px height. */
export const badge: Record<Locale, { src: string; width: number }> = {
  en: { src: "/badges/app-store-en.svg", width: 119.66407 },
  da: { src: "/badges/app-store-da.svg", width: 119.66407 },
  de: { src: "/badges/app-store-de.svg", width: 119.66407 },
  fr: { src: "/badges/app-store-fr.svg", width: 126.50751 },
  es: { src: "/badges/app-store-es.svg", width: 119.66407 },
};

/** Safari's Smart App Banner (<meta name="apple-itunes-app">) on every page. */
export const SMART_APP_BANNER = `app-id=${APP_STORE_ID}`;
