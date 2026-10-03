import type { APIRoute, GetStaticPaths } from "astro";
import { readFileSync } from "node:fs";
import { Resvg } from "@resvg/resvg-js";
import { ogCards, ogSvg, type OgCard } from "../../lib/og";

// The share images, rendered at build time into dist/og/<slug>.png. The fonts are static
// instances of the site's Anybody (src/assets/og), used only here and never served.
export const getStaticPaths: GetStaticPaths = () =>
  ogCards.map((card) => ({ params: { card: card.slug }, props: { card } }));

const icon = `data:image/png;base64,${readFileSync("public/icon-512.png").toString("base64")}`;
const fontFiles = ["src/assets/og/anybody-display.ttf", "src/assets/og/anybody-text.ttf"];

export const GET: APIRoute = ({ props }) => {
  const svg = ogSvg((props as { card: OgCard }).card, icon);
  const png = new Resvg(svg, {
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: "OG Text" },
  })
    .render()
    .asPng();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
