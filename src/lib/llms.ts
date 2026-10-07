import { events, eventHref, defaultPrivacy } from "../data/events";
import { homeDescription, homeFaq } from "../data/home";
import { DEFINITION, FEATURES, SITE_URL, absolute, type Question } from "./seo";

// The site as plain Markdown for AI assistants and answer engines (https://llmstxt.org, #30).
// llms.txt is the short version: what After Stories is, the facts, and a link to every page.
// llms-full.txt adds each page's story and questions, so an assistant can answer from one file.
// Both are built from the data the pages are built from, so they can't drift from the site.

/** Launch posture, without a contact address (that @ belongs only in llms.txt, as plain text). */
export const LAUNCH_STATUS =
  "Status: coming soon to the App Store for iPhone, with a web version for friends without an iPhone. English. Made by 12f ApS, Denmark (https://12f.dk).";

const status = `${LAUNCH_STATUS} Contact: support@12f.dk.`;

const pages = () => [
  `- [After Stories](${SITE_URL}/): ${homeDescription}`,
  ...events.map((e) => `- [${e.name}](${absolute(eventHref(e))}): ${e.description}`),
];

const qa = (faq: Question[]) => faq.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n");

export function llmsTxt(): string {
  return `# After Stories

> ${DEFINITION}

${status}

## Key facts

${FEATURES.map((f) => `- ${f}`).join("\n")}

## Pages

${pages().join("\n")}

## Optional

- [Full text of every page](${SITE_URL}/llms-full.txt): each use case, how it works, and every question answered on the site
- [Privacy policy for the app and this website](${SITE_URL}/privacy/)
- [Terms of use for the app](${SITE_URL}/terms/)
`;
}

export function llmsFullTxt(): string {
  const sections = events.map((e) => {
    const privacy = e.privacy ?? defaultPrivacy;
    return `## ${e.title.split(" | ")[0]}

URL: ${absolute(eventHref(e))}

${e.headline.join(" ")} ${e.lede}

${e.problem}

How it works:

${e.beats.map((b, i) => `${i + 1}. **${b.name}** (${b.when.toLowerCase()}): ${b.text}`).join("\n")}

Works for: ${e.occasions.map((o) => o.name).join(", ")}.

Privacy: ${privacy.map((f) => `${f.title} ${f.text}`).join(" ")}

${qa(e.faq)}`;
  });

  return `# After Stories: the full site

> ${DEFINITION}

${status}

## Key facts

${FEATURES.map((f) => `- ${f}`).join("\n")}

## Questions about After Stories

URL: ${SITE_URL}/

${qa(homeFaq)}

${sections.join("\n\n")}
`;
}
