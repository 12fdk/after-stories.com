// One entry per event-type page, rendered by src/pages/[event].astro.
// Copy and use cases: docs/positioning.md › The use cases. Voice: warm and witty, cheeky, never
// laddish. Never mention price. Never mention deletion without saving the photos first.

import type * as Lucide from "lucide-static";

/** A Lucide icon, by its export name (https://lucide.dev/icons). */
export type IconName = Exclude<keyof typeof Lucide, "default">;

export interface Beat {
  when: string;
  name: string;
  text: string;
}

export interface Fact {
  title: string;
  text: string;
}

export interface EventType {
  slug: string;
  /** Name on the tiles that link here. */
  name: string;
  icon: IconName;
  title: string;
  description: string;
  /** Each string is one line of the hero headline. */
  headline: string[];
  lede: string;
  fineprint: string;
  /** The hero photo, one per page (public/). Warm, event-lit, candid — the opposite of stock. */
  hero: {
    src: string;
    alt: string;
    /** Scrim strength over the photo (0–1, higher = more veil). The photo's own light wins. */
    scrim?: { light?: number; dark?: number };
  };
  /** The hero mock: an event of this type while it's being planned. */
  mock: {
    title: string;
    people: number;
    question: string;
    options: { label: string; votes: number }[];
    decided: string[];
  };
  todayTitle: string;
  /** StoryBrand: how organising this feels (internal), and why it shouldn't (philosophical). */
  problem: string;
  today: { icon: IconName; text: string }[];
  todayOne: string;
  todayText: string;
  howTitle: string;
  /** StoryBrand: the guide's empathy, then what After Stories takes off the organiser's hands. */
  empathy: string;
  beats: Beat[];
  occasionsTitle: string;
  occasions: { icon: IconName; name: string }[];
  privacyTitle: string;
  privacy?: Fact[];
  faq: { q: string; a: string }[];
  closer: string;
  /** StoryBrand: the morning after, when it went right. */
  success: string;
  /** StoryBrand: the group-chat alternative. A taste, never fear. */
  stakes: string;
}

export const defaultPrivacy: Fact[] = [
  { title: "No feed, no followers, no strangers.", text: "Each event is its own private space." },
  {
    title: "Never your location.",
    text: "Places are venues you pick. Photos are stripped of GPS and camera data before upload.",
  },
  {
    title: "Gone 48 hours after.",
    text: "Save every photo with one tap first. Then the chat, the polls and the photos are deleted for everyone.",
  },
  {
    title: "Nobody left out.",
    text: "Friends without an iPhone join from the web. Sign in with Apple means no passwords.",
  },
];

/** "Can … without an iPhone join?", naming the page's own people (friends, family, teammates…). */
const nonIphoneFor = (who: string) => ({
  q: `Can ${who} without an iPhone join?`,
  a: `Yes. The invite link works for everyone. ${who[0].toUpperCase()}${who.slice(1)} without an iPhone join from the web.`,
});

const nonIphone = nonIphoneFor("friends");

const after48 = {
  q: "What happens after 48 hours?",
  a: "The event is deleted for everyone: the chat, the polls and the photos. Before that, everyone gets a reminder and can save all the photos to their own phone with one tap.",
};

const groupSize = {
  q: "How many people can join one event?",
  a: "Up to 50. That fits most groups, from a handful of friends to a big party.",
};

/**
 * An event closes at 06:00 on its own clock; multi-day events (12fdk/after-stories#273) aren't
 * built. Pages that are naturally longer say so honestly. Change this when #273 ships.
 */
const oneDay = (q: string, what: string) => ({
  q,
  a: `Not yet. One event covers one day and its night, until 6 the next morning. For ${what}, make one event per day.`,
});

export const events: EventType[] = [
  {
    slug: "trips",
    name: "Day trip",
    icon: "MountainSnow",
    title: "Group Day Trip Planner for Friends | After Stories",
    description:
      "Plan the day trip together: vote on the day and where to go, keep every decision in one timeline, and save everyone's photos. Gone 48 hours after.",
    headline: ["Plan the trip together.", "Bring every photo home."],
    lede: "Vote on the day, the place and who drives. Share the trip in one stream. Then get everyone's photos in one place, before the whole thing disappears.",
    fineprint: "For iPhone. Friends without one join from the web.",
    hero: {
      src: "/hero-trips.webp",
      alt: "Five friends on a lake house deck at golden hour, one holding a phone up to take the photo",
    },
    mock: {
      title: "Day at the lake",
      people: 8,
      question: "Where do we go?",
      options: [
        { label: "Swimming at the lake", votes: 4 },
        { label: "Hike to the ridge", votes: 2 },
        { label: "Day in the old town", votes: 1 },
      ],
      decided: ["Saturday 12 June, 9:00", "Jonas and Maya drive"],
    },
    todayTitle: "Six phones, one trip, and nobody has all the photos.",
    problem:
      "And it's always the same person picking the place, chasing replies and asking for the photos afterwards. A day away should be the easy part of having friends.",
    today: [
      { icon: "CalendarX", text: "A day nobody actually confirmed" },
      { icon: "Link", text: "Three links to places, buried in the chat" },
      { icon: "Car", text: "Who's driving? Still unclear" },
      { icon: "Images", text: "Hundreds of photos stuck on six phones" },
    ],
    todayOne: "One trip.",
    todayText:
      "The day, the place, the plan and every photo, in one place. Save the photos, and the rest is gone 48 hours later.",
    howTitle: "From which day to the photos.",
    empathy:
      "We've all been the one with the spreadsheet and the car keys. After Stories keeps the plan and collects the photos, so you get to enjoy the trip you organised.",
    beats: [
      {
        when: "Before",
        name: "Decide the trip",
        text: "Which day, where to, who brings what. Polls become decisions, jobs get a name, and it all stays on top in order. Nobody scrolls back to find the address.",
      },
      {
        when: "During",
        name: "One stream for the trip",
        text: "“At the petrol station, want anything?”, the hike photos, where dinner is. Everyone sees it, and nobody has to forward anything.",
      },
      {
        when: "The morning after",
        name: "Bring every photo home",
        text: "Everyone gets the summary: the photo of the trip, the line of the day, what you decided. Then save every photo to your phone with one tap.",
      },
    ],
    occasionsTitle: "Every kind of day away.",
    occasions: [
      { icon: "Waves", name: "Lake day" },
      { icon: "Building2", name: "City trip" },
      { icon: "CableCar", name: "Ski day" },
      { icon: "Umbrella", name: "Beach day" },
      { icon: "Car", name: "Road trip" },
      { icon: "Mountain", name: "Hiking day" },
      { icon: "Sailboat", name: "Boat trip" },
    ],
    privacyTitle: "What happens on the trip stays in the trip.",
    faq: [
      {
        q: "How is it different from a group chat and a shared album?",
        a: "A group chat buries the plan, and somebody has to run the album. In After Stories every poll becomes a decision you can see at a glance, everyone's photos land in the same event, and the morning after you get the story without anyone making it.",
      },
      after48,
      nonIphone,
      groupSize,
      oneDay("Can one event cover a whole weekend?", "a weekend away"),
    ],
    closer: "The next trip, without the 300 messages.",
    success:
      "Come home with every photo from every phone, the photo of the trip and the line of the day, without anyone making an album.",
    stakes: "Or plan it in the group chat again, and keep asking for those photos for the rest of the year.",
  },
  {
    slug: "nights-out",
    name: "Night out",
    icon: "MoonStar",
    title: "Night Out Planner for Friends | After Stories",
    description:
      "Plan the night out together: vote on where to meet and where to go next, share it in one stream, and wake up to the story with every photo saved.",
    headline: ["Plan the night out.", "Piece it together tomorrow."],
    lede: "Vote on where to meet and where to go next. Share the night in one private stream. The morning after, get the story: the best photo, the line of the night, every picture. Then it disappears.",
    fineprint: "For iPhone. Friends without one join from the web.",
    hero: {
      src: "/hero-nights-out.webp",
      alt: "A group of friends laughing on a city street at night, warm shop lights behind them",
    },
    mock: {
      title: "Saturday night",
      people: 6,
      question: "Where do we start?",
      options: [
        { label: "Bar Luna", votes: 3 },
        { label: "The rooftop", votes: 1 },
        { label: "Drinks at Maya's first", votes: 1 },
      ],
      decided: ["Meet at 21:00", "Then dancing at The Basement"],
    },
    todayTitle: "The plan changed four times. The chat has 400 messages.",
    problem:
      "Someone always ends up as the night's coordinator, typing “where are you?” instead of being there. A night out shouldn't need a project manager.",
    today: [
      { icon: "MessageCircleQuestion", text: "“where are you guys??”" },
      { icon: "Repeat", text: "A plan that changed four times" },
      { icon: "Smartphone", text: "Photos on everyone's phone but yours" },
      { icon: "CircleHelp", text: "“What actually happened last night?”" },
    ],
    todayOne: "One night.",
    todayText:
      "Where you meet, where you go next and every photo of the night, in one place that's gone 48 hours later.",
    howTitle: "From where do we meet to what happened.",
    empathy:
      "We've all been the friend on the pavement typing “where are you?”. After Stories keeps everyone on the same plan, so you get to be out instead of coordinating.",
    beats: [
      {
        when: "Before",
        name: "Pick the place",
        text: "Ask the group where to start and where to go next. The answer becomes a decision on top of the event, so latecomers know where to find you.",
      },
      {
        when: "During",
        name: "One stream for the night",
        text: "“Moved to the rooftop”, the blurry photos, the one quote everyone will repeat. Tap ❤️ on the ones that matter.",
      },
      {
        when: "The morning after",
        name: "Piece it together",
        text: "Everyone gets the story of last night: the most-liked photo, the line of the night, what you decided. Save every photo with one tap.",
      },
    ],
    occasionsTitle: "Every kind of night out.",
    occasions: [
      { icon: "Martini", name: "Friday drinks" },
      { icon: "Disc3", name: "Club night" },
      { icon: "CircleHelp", name: "Pub quiz" },
      { icon: "MicVocal", name: "Karaoke" },
      { icon: "Beer", name: "Bar crawl" },
      { icon: "Guitar", name: "Gig night" },
      { icon: "Sparkles", name: "New Year's Eve" },
    ],
    privacyTitle: "Last night stays with the people who were there.",
    faq: [
      {
        q: "Who can see the photos from the night?",
        a: "Only the people in the event. There is no public feed, no followers and no discovery. Everyone can save the photos with one tap, and 48 hours after the event ends it's deleted for everyone.",
      },
      after48,
      nonIphone,
      groupSize,
    ],
    closer: "Make tonight easy to plan, and tomorrow easy to remember.",
    success:
      "Wake up to the story of last night: the best photo, the quote everyone's repeating, what you decided. Every photo saved with one tap.",
    stakes: "Or piece it together from six camera rolls and a chat nobody wants to scroll.",
  },
  {
    slug: "birthdays",
    name: "Birthday",
    icon: "Cake",
    title: "Birthday Party Planner for Friends | After Stories",
    description:
      "Plan the birthday together: vote on the date and the venue, share the party in one stream, and give everyone every photo of the party, saved with one tap.",
    headline: ["Plan the birthday together.", "Everyone gets the photos."],
    lede: "Vote on the date and the venue, and put a name on who brings what. Share the party in one private stream. The morning after, everyone gets every photo of the party, not just the ones they took.",
    fineprint: "For iPhone. Friends without one join from the web.",
    hero: {
      src: "/hero-birthdays.webp",
      alt: "Friends around a table at night with a birthday cake with lit candles and string lights",
    },
    mock: {
      title: "Sara turns 30",
      people: 14,
      question: "Where do we celebrate?",
      options: [
        { label: "Trattoria Nonna", votes: 7 },
        { label: "The rooftop bar", votes: 3 },
        { label: "Picnic in the park", votes: 2 },
      ],
      decided: ["Saturday 10 April", "Ali brings the cake"],
    },
    todayTitle: "One birthday, three chats, and the best photo is on someone else's phone.",
    problem:
      "And whoever organises it asks the same questions in three chats, then begs for the photos afterwards. Celebrating someone should be fun for the people throwing it too.",
    today: [
      { icon: "CalendarX", text: "A date poll half the group ignored" },
      { icon: "ClipboardList", text: "“Who's bringing what?”, asked three times" },
      { icon: "Image", text: "The best photo of Sara, on Jonas's phone" },
      { icon: "Send", text: "“Can you send me that one?”" },
    ],
    todayOne: "One party.",
    todayText:
      "The date, the place, the plan and every photo of the night, in one place that's gone 48 hours later.",
    howTitle: "From which Saturday to the photos.",
    empathy:
      "We've all organised a birthday in two chats at once. After Stories keeps the plan in one place, so you get to enjoy the party you threw.",
    beats: [
      {
        when: "Before",
        name: "Decide it together",
        text: "Vote on the date and the venue, and give each job a name: who brings the cake, who books the table. It all sits on top of the event, so nobody asks again.",
      },
      {
        when: "During",
        name: "One stream for the party",
        text: "The speeches, the cake, “who has a lighter?”. Everyone's photos land in the same place as they're taken.",
      },
      {
        when: "The morning after",
        name: "Everyone gets the photos",
        text: "A summary of the party and every photo anyone took, saved to your phone with one tap.",
      },
    ],
    occasionsTitle: "Every kind of celebration.",
    occasions: [
      { icon: "Cake", name: "Milestone birthday" },
      { icon: "Gift", name: "Surprise party" },
      { icon: "Utensils", name: "Birthday dinner" },
      { icon: "KeyRound", name: "Housewarming" },
      { icon: "GraduationCap", name: "Graduation" },
      { icon: "Heart", name: "Anniversary" },
      { icon: "Hand", name: "Farewell party" },
    ],
    privacyTitle: "Only the guests. Nobody else.",
    faq: [
      {
        q: "Can we plan a surprise party?",
        a: "Yes, with one catch: anyone who joins sees the whole event from the start, the planning included. Keep the surprise out of the event, or add the guest of honour knowing they'll see the plan.",
      },
      {
        q: "How many guests can join?",
        a: "Up to 50 per event. That fits most birthday parties, though not a 200-person wedding.",
      },
      nonIphone,
      after48,
    ],
    closer: "The next birthday, planned in one place.",
    success:
      "The morning after, every photo of the party is in one place, from every phone, saved with one tap.",
    stakes: "Or ask around for weeks, and still miss the best photo of the night.",
  },
  {
    slug: "bachelor-parties",
    name: "Bachelor & bachelorette",
    icon: "Gem",
    title: "Bachelor & Bachelorette Party Planner | After Stories",
    description:
      "Plan the bachelor or bachelorette party in one private event: vote on the plan, keep every decision, save the photos, and it's all gone 48 hours later.",
    headline: ["Plan the send-off together.", "Keep the photos. Lose the chat."],
    lede: "One organiser, a dozen decisions and a group that won't answer. Put every vote in one private event, share the day in one stream, and save the photos before everything disappears 48 hours later.",
    fineprint: "For iPhone. Friends without one join from the web.",
    hero: {
      src: "/hero-bachelor-parties.webp",
      alt: "A friend group in matching T-shirts celebrating in a go-kart arena",
    },
    mock: {
      title: "Jonas's send-off",
      people: 11,
      question: "What do we do on Saturday?",
      options: [
        { label: "Go-karting", votes: 5 },
        { label: "Cooking class", votes: 3 },
        { label: "Boat trip", votes: 2 },
      ],
      decided: ["Saturday 8 May", "Matching T-shirts, sadly"],
    },
    todayTitle: "One organiser. A dozen decisions. Nobody answering.",
    problem:
      "The organiser chases ten opinions and gets none back. It's a celebration, not a second job.",
    today: [
      { icon: "BellRing", text: "One person chasing everyone for replies" },
      { icon: "MessagesSquare", text: "A poll in one chat, the plan in another" },
      { icon: "CalendarX", text: "A date that's still not confirmed" },
      { icon: "Infinity", text: "Photos that live in a group chat forever" },
    ],
    todayOne: "One event.",
    todayText:
      "Every vote, the day itself and every photo, in one place. Save the photos, and the rest is gone 48 hours later.",
    howTitle: "From the first poll to the morning after.",
    empathy:
      "We've all watched a send-off poll sit at two votes for a week. After Stories turns every answer into a decision, so the organiser gets to be a guest too.",
    beats: [
      {
        when: "Before",
        name: "Decide it, finally",
        text: "Which Saturday, which activity, who books the table. Votes become decisions and jobs get a name, on top of the event, so the organiser can stop chasing replies.",
      },
      {
        when: "During",
        name: "One stream for the day",
        text: "“Taxi in 5”, the costume photos, where to go next. Only the people in the event can see it.",
      },
      {
        when: "The morning after",
        name: "Save the photos. Let the rest go.",
        text: "Everyone gets the story of the day and saves every photo with one tap. 48 hours after, the event is deleted for everyone.",
      },
    ],
    occasionsTitle: "Every kind of send-off.",
    occasions: [
      { icon: "PartyPopper", name: "Bachelor party" },
      { icon: "Gem", name: "Bachelorette party" },
      { icon: "Crown", name: "Hen do" },
      { icon: "Beer", name: "Stag do" },
      { icon: "Bath", name: "Spa day" },
      { icon: "Flag", name: "Activity day" },
      { icon: "Building2", name: "Night in the city" },
    ],
    privacyTitle: "What happens at the send-off stays at the send-off.",
    faq: [
      {
        q: "Can the bride or groom see the planning?",
        a: "Only if they're in the event, and then they see all of it: anyone who joins sees the event from the start. Keep the surprises out, or add them knowing they'll see the plan.",
      },
      after48,
      groupSize,
      nonIphone,
      oneDay("Can one event cover a whole weekend?", "a weekend send-off"),
    ],
    closer: "Make the organiser's job the easy part.",
    success:
      "A send-off where the plan just happened, everyone got the photos, and 48 hours later the chat quietly disappeared.",
    stakes: "Or run it from a group chat that lives on in everyone's phone, forever.",
  },
  {
    slug: "festivals",
    name: "Festival",
    icon: "Tent",
    title: "Festival Planner for Groups of Friends | After Stories",
    description:
      "Plan the festival day with your group: vote on the day, settle the meeting point, share it in one stream, and save everyone's photos. Gone 48 hours after.",
    headline: ["Plan the festival together.", "Keep every photo of the chaos."],
    lede: "Vote on which day to go and where to meet when someone gets lost. Share the festival in one stream, and get everyone's photos in one place before it all disappears.",
    fineprint: "For iPhone. Friends without one join from the web.",
    hero: {
      src: "/hero-festivals.webp",
      alt: "Friends in front of a festival crowd at dusk, stage lights and tents behind them",
    },
    mock: {
      title: "Festival Saturday",
      people: 7,
      question: "Where do we meet if we get split up?",
      options: [
        { label: "The big flag by the bar", votes: 3 },
        { label: "Left of the main stage", votes: 2 },
        { label: "The food trucks", votes: 1 },
      ],
      decided: ["Gates at 14:00", "Northern Lights at 21:00, all of us"],
    },
    todayTitle: "Five phones on 4%, and nobody remembers where to meet.",
    problem:
      "And someone always spends the day as the group's lost and found instead of watching the bands. A festival should be the one place you don't have to organise anything.",
    today: [
      { icon: "Ticket", text: "Who has the tickets again?" },
      { icon: "Signpost", text: "“meet at the… which stage?”" },
      { icon: "Clock", text: "The set times, buried in the chat" },
      { icon: "ImageOff", text: "Photos you'll never see" },
    ],
    todayOne: "One festival day.",
    todayText:
      "The tickets, the meeting point, the line-up and every photo, in one place that's gone 48 hours later.",
    howTitle: "From the line-up to the photos.",
    empathy:
      "We've all lost a friend somewhere between two stages. After Stories keeps the meeting point and the plan one tap away, so you get to watch the bands.",
    beats: [
      {
        when: "Before",
        name: "Sort it before you go",
        text: "Which day, which act you see together, where to meet. Every vote becomes a decision on top of the event, quick to find on one bar of signal.",
      },
      {
        when: "During",
        name: "One stream for the festival",
        text: "“At the main stage, left side”, the crowd shots, the sunrise. Everyone in the group sees it as it happens.",
      },
      {
        when: "The morning after",
        name: "Every photo, in one place",
        text: "Everyone gets the summary and saves every photo with one tap. Nobody has to ask for the pictures three weeks later.",
      },
    ],
    occasionsTitle: "Every kind of live event.",
    occasions: [
      { icon: "Tent", name: "Music festival" },
      { icon: "Music", name: "Concert" },
      { icon: "Sandwich", name: "Food festival" },
      { icon: "PartyPopper", name: "Street party" },
      { icon: "Clapperboard", name: "Open-air cinema" },
      { icon: "Trophy", name: "Big match" },
      { icon: "Drama", name: "Comic con" },
    ],
    privacyTitle: "Only your crew. Not the whole festival.",
    faq: [
      {
        q: "Does it share where we are?",
        a: "No. After Stories never uses your location. Meeting points are places you type or pick, and photos are stripped of GPS and camera data before upload.",
      },
      groupSize,
      after48,
      nonIphone,
      oneDay("Can one event cover the whole festival?", "a three-day festival"),
    ],
    closer: "The next festival, sorted before you get there.",
    success:
      "Get home with the sets you saw, the sunrise everyone shot and every photo from the whole crew, in one place.",
    stakes: "Or come home with your own blurry photos, and never see anyone else's.",
  },
  {
    slug: "dinner-nights",
    name: "Dinner night",
    icon: "UtensilsCrossed",
    title: "Dinner Party, Game & Movie Night Planner | After Stories",
    description:
      "Plan the dinner, game or movie night: vote on the day and the film, name who cooks, share the night in one stream and save the photos. Gone 48 hours after.",
    headline: ["Which night?", "Which film?", "Who's cooking?"],
    lede: "Put the questions to a vote and get the answers in one place. Plan the dinner, game or movie night, share it in one stream, and save the photos before it all disappears.",
    fineprint: "For iPhone. Friends without one join from the web.",
    hero: {
      src: "/hero-dinner-nights.webp",
      alt: "Friends around a candlelit dinner table at home, food on the table and a film playing",
    },
    mock: {
      title: "Movie night",
      people: 6,
      question: "Which film?",
      options: [
        { label: "Alien", votes: 3 },
        { label: "Casablanca", votes: 1 },
        { label: "Paddington 2", votes: 1 },
      ],
      decided: ["Friday at Maya's", "Ali brings the pizza"],
    },
    todayTitle: "Six people, three possible evenings, and the date still isn't set.",
    problem:
      "Picking one evening for six people shouldn't take two weeks of messages. Hosting should be about the food, not the logistics.",
    today: [
      { icon: "CalendarX", text: "“What about the 14th?” “Can't.”" },
      { icon: "Film", text: "Thirty film suggestions, no decision" },
      { icon: "ChefHat", text: "Who's cooking? Who brings what?" },
      { icon: "Meh", text: "Everyone says “whatever works”" },
    ],
    todayOne: "One night in.",
    todayText:
      "The day, the menu, the film and who brings what, decided in one place. Save the photos, and the rest clears itself away.",
    howTitle: "From which night to the last slice.",
    empathy:
      "We've all sent “so… which night works?” three times. After Stories puts a few evenings to a vote, so you get to spend the evening hosting, not scheduling.",
    beats: [
      {
        when: "Before",
        name: "Ask, vote, decide",
        text: "Put three evenings to a vote and the group picks one. Then the game, and a name on who cooks. It all sits on top of the event, so the “what are we doing?” messages stop.",
      },
      {
        when: "During",
        name: "One stream for the night",
        text: "“Running late, start without me”, the food photos, the final score. All in one place.",
      },
      {
        when: "The morning after",
        name: "The story of a good night",
        text: "Everyone gets the summary: the best photo, the line of the night, what you decided. Save the photos with one tap.",
      },
    ],
    occasionsTitle: "Every kind of night in.",
    occasions: [
      { icon: "UtensilsCrossed", name: "Dinner party" },
      { icon: "Dice5", name: "Game night" },
      { icon: "Popcorn", name: "Movie night" },
      { icon: "BookOpen", name: "Book club" },
      { icon: "Soup", name: "Potluck" },
      { icon: "Tv", name: "Watch party" },
      { icon: "Flame", name: "Barbecue" },
    ],
    privacyTitle: "Only the people at the table.",
    faq: [
      {
        q: "Isn't it a lot for a small dinner?",
        a: "Not when the hard part is picking a date. Put three evenings to a vote and the group picks one, quicker than a thread. Save the photos, and 48 hours later the event clears itself away.",
      },
      {
        q: "Can we use it every week?",
        a: "Yes. Each night is its own event, so make a new one each time. Last week's chat doesn't pile up.",
      },
      nonIphone,
      after48,
    ],
    closer: "The next night in, decided in minutes.",
    success:
      "A night that came together in minutes, a table full of people you like, and the next morning the photos of the food and the final score, saved with one tap.",
    stakes: "Or keep throwing dates into the chat, and watch the plan fizzle out again.",
  },
  {
    // Calmer than the friend pages: warm, still witty, no nightlife jokes (positioning.md › The office event).
    slug: "office-events",
    name: "Office party",
    icon: "Briefcase",
    title: "Office Party & Team Event Planner | After Stories",
    description:
      "Plan the team dinner, holiday party or offsite in one private event: vote on the date, pick the place, save the photos. No email threads. Gone 48 hours after.",
    headline: ["Plan the team event.", "Skip the 30 emails."],
    lede: "Vote on the date, decide the place, share the photos. One private event for the whole team, instead of a calendar poll, an email thread and a shared folder. Save the photos, then it's gone.",
    fineprint: "Colleagues without an iPhone join from the web.",
    hero: {
      src: "/hero-office-events.webp",
      alt: "A team of colleagues at a holiday party, raising glasses in a warm restaurant room",
    },
    mock: {
      title: "Team holiday party",
      people: 23,
      question: "Which Friday?",
      options: [
        { label: "Fri 4 Dec", votes: 11 },
        { label: "Fri 11 Dec", votes: 6 },
        { label: "Fri 18 Dec", votes: 2 },
      ],
      decided: ["Dinner at The Old Brewery", "Secret Santa, one gift each"],
    },
    todayTitle: "Four tools, one party, and nobody knows what was decided.",
    problem:
      "And the colleague who always organises it spends a week answering the same three questions. A team event should bring people together, not fill inboxes.",
    today: [
      { icon: "CalendarClock", text: "A calendar invite nobody can change" },
      { icon: "Vote", text: "A date poll in another tool" },
      { icon: "Mails", text: "30 emails, half of them reply-all" },
      { icon: "FolderX", text: "A shared folder nobody uploads to" },
    ],
    todayOne: "One event.",
    todayText:
      "The votes, the decisions, the evening itself and the photos, in one place. Everyone saves the photos, then it's gone.",
    howTitle: "From the first date poll to the photos.",
    empathy:
      "We've all been the colleague who ends up organising the party. After Stories answers the same three questions for you, so you get to enjoy the evening with your team.",
    beats: [
      {
        when: "Before",
        name: "Decide it in one place",
        text: "Ask the team which Friday and which restaurant, and put a name on who books the table. Every answer sits on top of the event, in order. No one has to chase the replies.",
      },
      {
        when: "On the day",
        name: "One stream for the event",
        text: "“Running 10 minutes late”, the table photos, where everyone is heading after. One private stream for the people who are there, nothing else.",
      },
      {
        when: "The morning after",
        name: "Everyone gets the photos",
        text: "A summary of the event and every photo, saved to each person's phone with one tap. Then the event is deleted. No work chat left behind.",
      },
    ],
    occasionsTitle: "Every event on the team calendar.",
    occasions: [
      { icon: "Utensils", name: "Team dinner" },
      { icon: "Beer", name: "Friday bar" },
      { icon: "Sun", name: "Summer party" },
      { icon: "TreePine", name: "Christmas party" },
      { icon: "Compass", name: "Offsite" },
      { icon: "Hand", name: "Leaving do" },
      { icon: "Rocket", name: "Kick-off" },
    ],
    privacyTitle: "Nothing left on a work drive.",
    privacy: [
      { title: "Only the people in the event.", text: "No admins, no profiles, no feed." },
      {
        title: "Gone 48 hours after.",
        text: "Everyone saves the photos first. Then the chat, the polls and the photos are deleted for everyone.",
      },
      {
        title: "Never your location.",
        text: "Places are venues you pick. Photos are stripped of GPS and camera data before upload.",
      },
      { title: "Sign in with Apple.", text: "No new password, no company account." },
    ],
    faq: [
      {
        q: "Do my colleagues need an iPhone?",
        a: "No. Anyone with the invite link can join. Colleagues with an iPhone use the app, everyone else joins from the web.",
      },
      {
        q: "Does IT need to set anything up?",
        a: "No. There are no company accounts, licences or admin settings. You create an event, share the link, and people join. Sign in with Apple means nobody makes a new password.",
      },
      {
        q: "How many people can join one event?",
        a: "Up to 50. That fits a team, a department or a small company.",
      },
      {
        q: "Who can see what's shared?",
        a: "Only the people in the event. There are no admins, no public profiles and no feed. Everyone saves the photos first, and 48 hours after the event ends it's deleted for everyone.",
      },
      {
        q: "How is this better than a calendar poll?",
        a: "A calendar poll asks who can when, and someone still has to decide. In an event the team picks one date, then the place and the menu, and every answer sits in one place, with the photos after.",
      },
    ],
    closer: "The next team event, without the email thread.",
    success:
      "The date decided in a day, the evening running itself, and the next morning everyone saves the photos with one tap. No work chat left behind.",
    stakes: "Or start the 30-email thread again, and find out on the day who never saw the invite.",
  },
  {
    // An adult amateur team: teammates and the partners and friends who come to watch. Never
    // children: the terms require users to be 18+ and forbid photos of anyone under 18 (#53).
    slug: "match-day",
    name: "Soccer match day",
    icon: "Whistle",
    title: "Soccer Match Day Carpool & Photos | After Stories",
    description:
      "Plan match day with your teammates: sort the carpool, share the game privately, and save the photo of the match and every other one. Gone 48 hours after.",
    headline: ["The carpool, sorted.", "The photo of the match, saved."],
    lede: "Vote on who drives, who rides with whom and where you meet. Share the match in one private stream. The next morning, the photo everyone liked most is waiting, and everyone saves every photo. Then it disappears.",
    fineprint: "For iPhone. Teammates without one join from the web.",
    hero: {
      src: "/hero-match-day.webp",
      alt: "An empty community soccer pitch at golden morning light, two white goals and training cones on the grass, team bags on the sideline bench, cars parked on the lot behind the fence",
    },
    mock: {
      title: "Away at Birkelund",
      people: 18,
      question: "Where do we meet?",
      options: [
        { label: "Clubhouse, 9:15", votes: 9 },
        { label: "At Birkelund, 10:00", votes: 5 },
        { label: "Petrol station, 9:30", votes: 2 },
      ],
      decided: ["Ali and Mette drive: 10 seats", "Kick-off 10:30, pitch 2"],
    },
    todayTitle: "Eighteen players, one away game, and the carpool is in the team chat.",
    problem:
      "Who drives, who has a spare seat, where you meet and who brings the kit, all buried under a hundred messages. And the best photo of the goal stays on one partner's phone. Match day should be about the match.",
    today: [
      { icon: "Car", text: "Three cars, fourteen players, and nobody sure who's in which" },
      { icon: "CalendarX", text: "A meeting time nobody confirmed" },
      { icon: "MessageCircle", text: "“Anyone got a spare seat?” buried in the team chat" },
      { icon: "ImageOff", text: "The goal photo, stuck on one partner's phone" },
    ],
    todayOne: "One match.",
    todayText:
      "The carpool, the plan and every photo of the match, in one place that's gone 48 hours later.",
    howTitle: "From who drives to the photo of the match.",
    empathy:
      "We've all been the teammate counting seats on match morning. After Stories keeps the carpool and the plan in one place, so you get to play the match instead of running the carpool.",
    beats: [
      {
        when: "Before",
        name: "Sort the carpool",
        text: "Who drives, who rides with whom, where you meet, who brings the kit. Every vote becomes a decision on top of the event, so match morning starts with a plan, not a text thread.",
      },
      {
        when: "During",
        name: "One stream for the match",
        text: "“Parked, see you at pitch 2”, the goal, the celebration on the sideline. Every photo from the sideline lands in the same place, for the ones at home too.",
      },
      {
        when: "The next morning",
        name: "The photo of the match",
        text: "The photo everyone liked most is on top, with everything you decided. Save every photo of the game to your phone with one tap. 48 hours after, the event is deleted for everyone.",
      },
    ],
    occasionsTitle: "Every kind of team match.",
    occasions: [
      { icon: "Flag", name: "Away day" },
      { icon: "Calendar", name: "Sunday league" },
      { icon: "Trophy", name: "Cup match" },
      { icon: "Goal", name: "Five-a-side" },
      { icon: "Users", name: "Tournament day" },
      { icon: "Whistle", name: "Friendly" },
      { icon: "Star", name: "Veterans match" },
    ],
    privacyTitle: "Just the squad and the people cheering them on.",
    faq: [
      {
        q: "Does one event cover the whole season?",
        a: "One event per match. Each fixture gets a fresh event: the carpool is settled in minutes, the photos are saved first, and 48 hours after the match the event is deleted for everyone.",
      },
      {
        q: "Who picks the photo of the match?",
        a: "Everyone does. Like the photos you love during the match. The one with the most likes leads the summary the next morning.",
      },
      after48,
      nonIphoneFor("teammates"),
      {
        q: "How many people can join one event?",
        a: "Up to 50 per event. That fits a squad and the partners and friends who come along, from five-a-side to a club's away day.",
      },
    ],
    closer: "The next away game, with the carpool already sorted.",
    success:
      "A match day where everyone knew whose car they were in, and the next morning the photo of the match and every other photo, saved with one tap.",
    stakes: "Or plan it in the team chat again, and keep asking for the goal photo all season.",
  },
  {
    slug: "graduation",
    name: "Graduation",
    icon: "GraduationCap",
    title: 'Graduation Party Planner for Friends | After Stories',
    description:
      "Plan the graduation party together: vote on the date and the venue, share the celebration in one stream, and save everyone's photos. Gone 48 hours after.",
    headline: ["Plan the celebration together.", "Everyone gets the photos."],
    lede: "Vote on the date, the venue and the food. Share the party in one private stream. The morning after, everyone gets every photo of the day, not just the ones they took. Then it disappears.",
    fineprint: "For iPhone. Friends without one join from the web.",
    hero: {
      src: "/hero-graduation.webp",
      alt: "A graduation celebration set up in a sunny park at golden hour, string lights, balloons, a cake and a banner on a long table",
    },
    mock: {
      title: "Priya graduates",
      people: 16,
      question: "Where do we celebrate?",
      options: [
        { label: "The park pavilion", votes: 8 },
        { label: "Rooftop bar", votes: 4 },
        { label: "A backyard", votes: 2 },
      ],
      decided: ["Saturday 15 May", "Ali gives the speech"],
    },
    todayTitle: "One graduation, three chats, and the best photo is on someone else's phone.",
    problem:
      "And the friends who organise it ask the same questions in three chats. Celebrating someone's big day should be a joy, not a second job.",
    today: [
      { icon: "CalendarX", text: "A date nobody has confirmed" },
      { icon: "Utensils", text: "“Who's bringing the food?”, asked twice" },
      { icon: "Image", text: "The group photo, on Jonas's phone" },
      { icon: "Send", text: "“Can you send me that one?”" },
    ],
    todayOne: "One celebration.",
    todayText:
      "The date, the place, the food and every photo of the day, in one place that's gone 48 hours later.",
    howTitle: "From which Saturday to the speech.",
    empathy:
      "We've all planned a big celebration while the plan is scattered across chats. After Stories keeps it in one place, so you get to celebrate the graduate instead of running the logistics.",
    beats: [
      {
        when: "Before",
        name: "Decide it together",
        text: "Which date, which venue, what's on the menu. Every vote turns into a decision on top of the event, so nobody has to ask again in the chat.",
      },
      {
        when: "During",
        name: "One stream for the party",
        text: "The speech, the cake, the group photo. Everyone's photos land in the same place as they're taken, from the whole group.",
      },
      {
        when: "The morning after",
        name: "Everyone gets the photos",
        text: "A summary of the day and every photo of the party, saved to each person's phone with one tap.",
      },
    ],
    occasionsTitle: "Every kind of big day.",
    occasions: [
      { icon: "GraduationCap", name: "Graduation" },
      { icon: "Cake", name: "Milestone birthday" },
      { icon: "Gift", name: "Surprise party" },
      { icon: "KeyRound", name: "Housewarming" },
      { icon: "Heart", name: "Anniversary" },
      { icon: "PartyPopper", name: "Engagement" },
      { icon: "Sparkles", name: "Promotion" },
    ],
    privacyTitle: "Only the guests. Nobody else.",
    faq: [
      {
        q: "Can we plan a surprise for the graduate?",
        a: "Yes, with one catch: anyone who joins sees the whole event from the start, the planning included. Keep the surprise out of the event, or add the graduate knowing they'll see the plan.",
      },
      {
        q: "How many people can join?",
        a: "Up to 50 per event. That fits most graduations and celebration parties, though not a 200-person event.",
      },
      nonIphone,
      after48,
    ],
    closer: "The next big day, planned in one place.",
    success:
      "The morning after, every photo of the party is in one place, from every phone, the speech included, saved with one tap.",
    stakes: "Or ask around for weeks, and still miss the group photo.",
  },
  {
    // Adults only: no kids in the copy or the mock (#53).
    slug: "family-reunion",
    name: "Family reunion",
    icon: "Users",
    title: 'Family Reunion Planner for Groups | After Stories',
    description:
      "Plan the family reunion together: vote on the day and the place, keep every decision in one timeline, and save everyone's photos. Gone 48 hours after.",
    headline: ["Plan the reunion together.", "Bring every photo home."],
    lede: "Vote on the day, the place and who drives. Keep every decision in one timeline, share the whole day in one stream, and save everyone's photos before the whole thing disappears.",
    fineprint: "For iPhone. Family without one joins from the web.",
    hero: {
      src: "/hero-family-reunion.webp",
      alt: "An empty wooden lakeside deck and dock at golden hour with warm string lights, a picnic table set with plates, a calm lake behind",
    },
    mock: {
      title: "The Halden reunion",
      people: 24,
      question: "Which Saturday?",
      options: [
        { label: "Saturday 19 June", votes: 10 },
        { label: "Saturday 26 June", votes: 6 },
        { label: "Saturday 3 July", votes: 4 },
      ],
      decided: ["The lake house, from 12:00", "Lunch on the deck"],
    },
    todayTitle: "Twenty-four people, one lake, and the plan is in a family group chat.",
    problem:
      "Aunts, uncles and cousins all arguing about the date, the place and who drives, across a group chat nobody can scroll. Planning a reunion shouldn't be the family's least favourite part.",
    today: [
      { icon: "CalendarX", text: "A date that suits nobody, confirmed by no one" },
      { icon: "Link", text: "Four places suggested, half the family lost" },
      { icon: "Car", text: "Who drives, who brings the grill? Unclear" },
      { icon: "Images", text: "Hundreds of photos stuck on twenty-four phones" },
    ],
    todayOne: "One day.",
    todayText:
      "The day, the place, the plan and every photo, in one place. Save the photos, and the rest is gone 48 hours later.",
    howTitle: "From which Saturday to the photos.",
    empathy:
      "We've all been the cousin with the spreadsheet and the deposit, chasing replies from the whole family. After Stories keeps the plan and collects the photos, so you get to enjoy the reunion you organised.",
    beats: [
      {
        when: "Before",
        name: "Decide the reunion",
        text: "Which Saturday, which place, who brings what. Polls become decisions, jobs get a name, and it all stays on top in order. Aunts and cousins alike can see the plan without scrolling.",
      },
      {
        when: "During",
        name: "One stream for the day",
        text: "“Where's the grill?”, the lake photos, who's coming for dinner. Everyone sees it, and nobody has to forward anything.",
      },
      {
        when: "The morning after",
        name: "Bring every photo home",
        text: "Everyone gets the summary: the photo of the day, the line of the reunion, what you decided. Then save every photo to your phone with one tap.",
      },
    ],
    occasionsTitle: "Every kind of family get-together.",
    occasions: [
      { icon: "Users", name: "Family reunion" },
      { icon: "Mountain", name: "Family day out" },
      { icon: "Sun", name: "Summer lunch" },
      { icon: "Umbrella", name: "Beach day" },
      { icon: "Flower2", name: "Garden party" },
      { icon: "Hand", name: "Farewell lunch" },
      { icon: "Heart", name: "Golden anniversary" },
    ],
    privacyTitle: "What happens at the reunion stays in the family.",
    faq: [
      {
        q: "Can a big family join one event?",
        a: "Up to 50 people per event. That fits most family reunions, from a handful of cousins to a whole extended family.",
      },
      after48,
      nonIphoneFor("family members"),
      oneDay("Can one event cover a whole weekend?", "a reunion weekend"),
    ],
    closer: "The next reunion, without the family group chat.",
    success:
      "Come home with every photo from every phone, the photo of the day and the line of the reunion, without anyone making an album.",
    stakes: "Or plan it in the family group chat again, and keep asking for those photos all year.",
  },
  {
    // Adult performances (a choir, a band, amateur theatre or dance) and the friends and family
    // who come to watch. Never a school recital: the terms forbid photos of anyone under 18 (#53).
    slug: "recital",
    name: "Concert & show",
    icon: "Music",
    title: "Concert & Show Night Planner for Groups | After Stories",
    description:
      "Plan the night you watch a friend's concert or show: vote on where to meet and eat, share it in one stream, and save everyone's photos. Gone 48 hours after.",
    headline: ["Plan the show night together.", "Everyone gets the photos."],
    lede: "Friends and family coming to watch, and a plan to sort. Vote on where to meet and where to eat after, share the show in one private stream, and get every photo of the performance before it disappears.",
    fineprint: "For iPhone. Friends and family without one join from the web.",
    hero: {
      src: "/hero-recital.webp",
      alt: "An empty stage in a warm community hall with a microphone and a music stand under a soft spotlight, rows of empty seats behind",
    },
    mock: {
      title: "Choir spring concert",
      people: 15,
      question: "Where do we eat after?",
      options: [
        { label: "Trattoria Nonna", votes: 6 },
        { label: "The pub by the hall", votes: 4 },
        { label: "Pizza at Maya's", votes: 2 },
      ],
      decided: ["Friday 19:00, doors 18:30", "Meet at the foyer bar, 18:15"],
    },
    todayTitle: "Fifteen people, one show, and nobody knows where to meet.",
    problem:
      "Who has the spare ticket, who's giving whom a lift, where to eat after, all across the family group chat. Show night should be about the performance, not the logistics.",
    today: [
      { icon: "MapPin", text: "“Where are you? We're at the door”" },
      { icon: "Ticket", text: "Who has the spare ticket?" },
      { icon: "Image", text: "The best photo, on someone else's phone" },
      { icon: "Car", text: "Who's giving whom a lift?" },
    ],
    todayOne: "One show.",
    todayText:
      "The meeting point, the lifts and every photo of the performance, in one place that's gone 48 hours later.",
    howTitle: "From the foyer to the bow.",
    empathy:
      "We've all been the friend who ends up the show-night coordinator. After Stories keeps the plan in one place, so you get to enjoy the performance.",
    beats: [
      {
        when: "Before",
        name: "Sort the evening",
        text: "Where to meet, who gives whom a lift, where to eat after. Every vote becomes a decision on top of the event, so nobody has to ask the same question twice.",
      },
      {
        when: "During",
        name: "One stream for the show",
        text: "“Two rows back”, the curtain-up photo, the bows. Everyone's photos land in the same place as they're taken.",
      },
      {
        when: "The next day",
        name: "Everyone gets the photos",
        text: "A summary of the night and every photo of the performance, saved to each person's phone with one tap.",
      },
    ],
    occasionsTitle: "Every kind of performance night.",
    occasions: [
      { icon: "Music", name: "Choir concert" },
      { icon: "Guitar", name: "Band gig" },
      { icon: "Drama", name: "Amateur theatre" },
      { icon: "Sparkles", name: "Dance show" },
      { icon: "MicVocal", name: "Open mic night" },
      { icon: "Clapperboard", name: "Musical" },
      { icon: "Piano", name: "Orchestra concert" },
    ],
    privacyTitle: "Only the people who came to watch.",
    faq: [
      {
        q: "Can we vote on the date of the show?",
        a: "No need: the venue sets the date. Use the votes for what's yours to decide, like where to meet before and where to eat after.",
      },
      {
        q: "How many people can join?",
        a: "Up to 50 per event. That fits the friends and family who come to watch.",
      },
      nonIphoneFor("friends and family"),
      after48,
    ],
    closer: "The next show, planned in minutes.",
    success:
      "A show night where the meeting point and the lifts just worked, and the next morning everyone saves every photo of the performance with one tap.",
    stakes: "Or plan it in the family chat again, and miss the photo of the bows.",
  },
  {
    // The volunteer crew only, never the public event. Shifts are tasks (product.md › Tasks, #270).
    slug: "fundraiser",
    name: "Volunteer crew",
    icon: "Flag",
    title: "Charity Volunteer Crew Planner | After Stories",
    description:
      "Plan the volunteer crew for a charity day: hand out the shifts, pick where to meet, share the day in one stream and save the photos. Gone 48 hours after.",
    headline: ["Run the volunteer crew together.", "Save the photos, drop the chat."],
    lede: "Twenty-two volunteers, a dozen shifts and a hundred things to sort. Put the crew in one private event: who's on which shift, where to meet, who brings what. Save the photos before the whole thing disappears.",
    fineprint: "For iPhone. Volunteers without one join from the web.",
    hero: {
      src: "/hero-fundraiser.webp",
      alt: "The start line of an outdoor charity 5k in a park, a start arch and a timing scoreboard, cones and a banner on the grass",
    },
    mock: {
      title: "Fun run crew",
      people: 22,
      question: "Where does the crew meet?",
      options: [
        { label: "Start arch, 7:30", votes: 9 },
        { label: "Clubhouse, 7:15", votes: 5 },
        { label: "Car park, 7:45", votes: 3 },
      ],
      decided: ["Water table: Ali, Mette, Jonas", "Finish line: Priya and Sam"],
    },
    todayTitle: "Twenty-two volunteers, a dozen shifts, and the plan is in a group chat.",
    problem:
      "Who's on which shift, who's bringing the water, where the crew meets, all scattered across a group chat nobody has time to scroll. A fundraiser should be about the cause, not the coordination.",
    today: [
      { icon: "CalendarX", text: "A meeting time nobody confirmed" },
      { icon: "Users", text: "A shift list that's out of date" },
      { icon: "MapPin", text: "Where the crew meets, buried" },
      { icon: "ImageOff", text: "The crew's photos, spread over twenty phones" },
    ],
    todayOne: "One crew.",
    todayText:
      "The shifts, the meeting point and every photo of the crew, in one place that's gone 48 hours later.",
    howTitle: "From the first shift to the photos.",
    empathy:
      "We've all been the one sorting volunteers and chasing who's on which shift. After Stories keeps the plan in one place, so you get to spend the day on the cause.",
    beats: [
      {
        when: "Before",
        name: "Sort the shifts",
        text: "Each shift is a task with names on it, and anyone can take an open one with a tap. Where to meet goes to a vote. It all sits on top of the event, so the volunteers can stop asking.",
      },
      {
        when: "During",
        name: "One stream for the day",
        text: "“Two more at the water table, please”, the crew photos, who's on next. Everyone in the crew sees it as it happens.",
      },
      {
        when: "The next day",
        name: "Save the photos, let the chat go",
        text: "Everyone gets the story of the day and saves every photo with one tap. 48 hours after, the event is deleted for everyone.",
      },
    ],
    occasionsTitle: "Every kind of volunteer crew.",
    occasions: [
      { icon: "Flag", name: "Race-day crew" },
      { icon: "Heart", name: "Fundraiser team" },
      { icon: "Users", name: "Clean-up crew" },
      { icon: "Cookie", name: "Bake sale team" },
      { icon: "ShoppingBasket", name: "Food drive" },
      { icon: "Star", name: "Charity walk crew" },
      { icon: "ShieldCheck", name: "Event stewards" },
    ],
    privacyTitle: "Only the people who helped.",
    faq: [
      {
        q: "Can a big group of volunteers join?",
        a: "Up to 50 people per event. That fits most volunteer crews, from a handful of helpers to a whole race-day team.",
      },
      after48,
      nonIphoneFor("volunteers"),
      {
        q: "How do the shifts work?",
        a: "Each shift is a task: what it is and who's on it. Anyone can take an open shift with one tap, and the people on it tick it off when it's done. It's for the crew, not the public.",
      },
    ],
    closer: "The next fundraiser, without the group chat.",
    success:
      "A day where the shifts just worked, the plan sat on top of one event, and the next morning everyone saves every photo of the crew with one tap.",
    stakes: "Or plan it in the group chat again, and keep chasing the volunteers all year.",
  },
];

export const eventHref = (e: EventType) => `/${e.slug}/`;
