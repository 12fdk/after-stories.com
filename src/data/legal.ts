// The search snippets for the legal pages (src/pages/privacy.astro, src/pages/terms.astro), kept
// here so src/lib/seo.test.ts checks them with every other page's.
export const legalPages = {
  privacy: {
    path: "/privacy/",
    title: "Privacy Policy for the App and Website | After Stories",
    description:
      "What the After Stories app and this website collect, why, who can see it, where it's kept and how long, and your rights. In Danish and English.",
  },
  terms: {
    path: "/terms/",
    title: "Terms of Use for the App | After Stories",
    description:
      "The After Stories app's terms of use: what you must not post, how to report and block, what happens to your content, and Apple's licence. Danish and English.",
  },
} as const;
