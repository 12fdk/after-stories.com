// Structured data and search snippets for every page (#30). One JSON-LD @graph per page, with
// stable @ids so search engines and AI answer engines see one entity, "After Stories", made by
// 12f ApS, behind every page. Keep it to facts that are true today: no ratings, no price, no
// App Store link until there is one (docs/messaging.md, rules 3 and 9).

export const SITE_URL = "https://after-stories.com";
export const SITE_NAME = "After Stories";

/** One sentence that says what After Stories is: the definition answer engines quote. */
export const DEFINITION =
  "After Stories is a private iPhone app for one group trip, party or night out: friends vote on the plan, share photos in one stream, and wake up to a morning-after story. Everything is deleted 48 hours after, once everyone has saved the photos.";

export const FEATURES = [
  "Polls that turn into decisions",
  "A timeline of everything the group decided",
  "One private stream for messages and photos",
  "The morning-after summary: the most-liked photo, the line of the night, the decisions",
  "Save every photo to your phone with one tap",
  "Deleted for everyone 48 hours after the event",
  "Up to 50 people per event",
  "Friends without an iPhone join from the web",
  "Photos stripped of location and camera data before upload",
];

export const ids = {
  organization: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
  app: `${SITE_URL}/#app`,
};

/** Search results cut titles at about 60 characters and descriptions at about 160. */
export const TITLE_LENGTH = { min: 30, max: 60 };
export const DESCRIPTION_LENGTH = { min: 110, max: 160 };

export const absolute = (path: string) => new URL(path, SITE_URL).href;

export interface Crumb {
  name: string;
  path: string;
}

export interface Question {
  q: string;
  a: string;
}

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  /** The page's share image, a site path. */
  image: string;
  /** Home first, this page last. Omit on the home page. */
  breadcrumb?: Crumb[];
  faq?: Question[];
  modified?: Date;
}

type Node = Record<string, unknown>;

function siteNodes(): Node[] {
  return [
    {
      "@type": "Organization",
      "@id": ids.organization,
      name: "12f ApS",
      url: "https://12f.dk",
      email: "support@12f.dk",
      address: { "@type": "PostalAddress", addressCountry: "DK" },
    },
    {
      "@type": "WebSite",
      "@id": ids.website,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      description: DEFINITION,
      inLanguage: "en",
      publisher: { "@id": ids.organization },
    },
    {
      "@type": "MobileApplication",
      "@id": ids.app,
      name: SITE_NAME,
      alternateName: "After Stories app",
      description: DEFINITION,
      url: `${SITE_URL}/`,
      image: absolute("/icon-512.png"),
      operatingSystem: "iOS",
      availableOnDevice: "iPhone",
      applicationCategory: "SocialNetworkingApplication",
      inLanguage: "en",
      featureList: FEATURES,
      publisher: { "@id": ids.organization },
      author: { "@id": ids.organization },
    },
  ];
}

/** The page's JSON-LD: the site's entities, the page, its breadcrumb and its questions. */
export function pageGraph(page: PageMeta): Node {
  const url = absolute(page.path);
  const webPage: Node = {
    "@type": page.faq?.length ? ["WebPage", "FAQPage"] : "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    inLanguage: "en",
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.app },
    primaryImageOfPage: { "@type": "ImageObject", url: absolute(page.image), width: 1200, height: 630 },
    // The headline and the lede are the page's answer, read aloud by voice assistants.
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".lede"] },
  };
  if (page.modified) webPage.dateModified = page.modified.toISOString();
  if (page.faq?.length) {
    webPage.mainEntity = page.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    }));
  }

  const nodes = [...siteNodes(), webPage];
  if (page.breadcrumb?.length) {
    webPage.breadcrumb = { "@id": `${url}#breadcrumb` };
    nodes.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: page.breadcrumb.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: absolute(c.path),
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": nodes };
}

/** JSON for a <script type="application/ld+json">: "<" escaped so text can't close the tag. */
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
