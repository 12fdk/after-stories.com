/// <reference types="vitest/config" />
// Astro's Vite config, so tests can render components with the Container API (src/lib/appstore.test.ts).
import { getViteConfig } from "astro/config";

export default getViteConfig({ test: {} });
