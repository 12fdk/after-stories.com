import type { Question } from "../lib/seo";

// The home page's search snippet and questions, here so llms.txt (src/lib/llms.ts) says the same.

// The title carries the search words; the one-liner is the h1 (src/lib/seo.ts has the limits).
export const homeTitle = "After Stories: Plan Group Trips, Parties & Nights Out";

export const homeDescription =
  "A private iPhone app for your group's trip, party or night out. Vote on the plan, share photos in one stream, and wake up to the story with every photo saved.";

// The first two answer what people ask an assistant before they know the app: what it is, and
// when they can have it. Keep the first answer to the definition in src/lib/seo.ts.
export const homeFaq: Question[] = [
  {
    q: "What is After Stories?",
    a: "A private iPhone app for one trip, party or night out. Your group votes on the plan, shares photos in one stream, and wakes up to the morning-after story: the best photo, the line of the night and what you decided. 48 hours later it's deleted, after everyone has saved the photos.",
  },
  {
    q: "When can I get After Stories?",
    a: "Now. After Stories is on the App Store for iPhone, with iOS 27 or later. Get it with the button on this page.",
  },
  {
    q: "How is it different from a group chat and a shared album?",
    a: "A group chat buries the plan, and somebody has to run the album. In After Stories every poll becomes a decision you can see at a glance, everyone's photos land in the same event, and the morning after you get the story without anyone making it.",
  },
  {
    q: "What happens after 48 hours?",
    a: "The event is deleted for everyone: the chat, the polls and the photos. Before that, everyone gets a reminder and can save all the photos to their own phone with one tap.",
  },
  {
    q: "Can friends without an iPhone join?",
    a: "No. After Stories is an iPhone app. Friends join the event from the app, on an iPhone with iOS 27 or later.",
  },
  {
    q: "Who can see what we share?",
    a: "Only the people in the event. There is no public feed, no followers and no discovery. Photos are stripped of location and camera data before they're uploaded.",
  },
  {
    q: "Can we use it for a work event?",
    a: "Yes. Vote on the date, decide the place and share the photos from the team dinner or the summer party, instead of a calendar poll and a dozen emails. And there's no work chat left behind afterwards.",
  },
];
