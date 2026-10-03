import { events } from "../data/events";
import displayWidths from "../assets/og/display-widths.json";

// The share image for each page (#30): 1200×630, what a link to the page shows in iMessage,
// WhatsApp, Slack, social posts and search. The page's own headline on the app's dark palette,
// so a shared link reads like the page it opens. Rendered to PNG by src/pages/og/[card].png.ts.

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export interface OgCard {
  /** The file name: /og/<slug>.png. */
  slug: string;
  /** One headline line per entry; the last one is in the accent. */
  lines: string[];
  /** What the page is, in search words, under the headline. */
  kicker: string;
}

export const homeCard: OgCard = {
  slug: "home",
  lines: ["Plan it together.", "Live it together.", "Wake up to the story."],
  kicker: "The group planning app for trips, parties and nights out",
};

/** One card per page that has its own share image: the home page and each event page. */
export const ogCards: OgCard[] = [
  homeCard,
  ...events.map((e) => ({ slug: e.slug, lines: e.headline, kicker: e.title.split(" | ")[0] })),
];

export const ogImagePath = (slug: string) => `/og/${slug}.png`;

const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** The text column: the image width less the 80px margins. */
export const TEXT_WIDTH = OG_WIDTH - 160;

const widths = displayWidths as Record<string, number>;

/** A line's width in the display font, in em (unknown characters count as a wide glyph). */
export const lineWidthEm = (line: string) => [...line].reduce((sum, c) => sum + (widths[c] ?? 0.7), 0);

/** Headline size: as big as fits the longest line in the text column, at most 112px. */
export function headlineSize(lines: string[]): number {
  const widest = Math.max(...lines.map(lineWidthEm));
  return Math.min(112, Math.floor(TEXT_WIDTH / widest));
}

export function ogSvg(card: OgCard, iconDataUri: string): string {
  const size = headlineSize(card.lines);
  const lineHeight = Math.round(size * 1.02);
  const blockHeight = lineHeight * card.lines.length;
  // The headline block sits in the middle band, between the brand row and the kicker.
  const firstBaseline = Math.round(330 - blockHeight / 2 + size * 0.8);
  const headline = card.lines
    .map((line, i) => {
      const fill = i === card.lines.length - 1 ? "#FF2D6F" : "#F7F8F9";
      return `<text x="80" y="${firstBaseline + i * lineHeight}" fill="${fill}" font-family="OG Display" font-size="${size}">${escapeXml(line)}</text>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}">
<defs>
<radialGradient id="glow" cx="1" cy="1" r="0.9"><stop offset="0" stop-color="#FF2D6F" stop-opacity="0.38"/><stop offset="0.55" stop-color="#2A0F1C" stop-opacity="0.6"/><stop offset="1" stop-color="#0B0C0E" stop-opacity="0"/></radialGradient>
<clipPath id="icon"><rect x="80" y="64" width="64" height="64" rx="15"/></clipPath>
</defs>
<rect width="100%" height="100%" fill="#0B0C0E"/>
<rect width="100%" height="100%" fill="url(#glow)"/>
<image href="${iconDataUri}" x="80" y="64" width="64" height="64" clip-path="url(#icon)"/>
<text x="164" y="108" fill="#F7F8F9" font-family="OG Display" font-size="38">After Stories</text>
${headline}
<text x="80" y="566" fill="#A2AAB3" font-family="OG Text" font-size="30">${escapeXml(card.kicker)}</text>
</svg>`;
}
