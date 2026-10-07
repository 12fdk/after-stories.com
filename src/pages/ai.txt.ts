import type { APIRoute } from "astro";
import { aiTxt } from "../lib/ai";

// Built into dist/ai.txt (src/lib/ai.ts). Same route shape as llms.txt.
export const GET: APIRoute = () =>
  new Response(aiTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
