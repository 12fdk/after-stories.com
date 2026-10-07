import { LAUNCH_STATUS } from "./llms";
import { DEFINITION, SITE_NAME, SITE_URL } from "./seo";

// /ai.txt for AI crawlers (src/pages/ai.txt.ts). The pages themselves are summarised in
// llms.txt and llms-full.txt, which are built from the same data as the site, so this file
// only points at them and repeats the one-sentence definition. No contact address: a bare
// @ is what Cloudflare's email obfuscation rewrites when a response is treated as HTML.

export function aiTxt(): string {
  return `# ${SITE_NAME}

> ${DEFINITION}

${LAUNCH_STATUS}

AI crawlers and answer engines may crawl, index and quote this site. Read these files instead of inferring the product from the HTML:

- ${SITE_URL}/llms.txt — what ${SITE_NAME} is, the facts, and a link to every page
- ${SITE_URL}/llms-full.txt — the full text of every page

Home: ${SITE_URL}/
`;
}
