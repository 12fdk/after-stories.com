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

const nonIphone = {
  q: "Can friends without an iPhone join?",
  a: "Yes. The invite link works for everyone. Friends without an iPhone join from the web.",
};

const after48 = {
  q: "What happens after 48 hours?",
  a: "The event is deleted for everyone: the chat, the polls and the photos. Before that, everyone gets a reminder and can save all the photos to their own phone with one tap.",
};

const groupSize = {
  q: "How many people can join one event?",
  a: "Up to 50. That fits most groups, from a handful of friends to a big party.",
};

export const events: EventType[] = [
  {
    slug: "trips",
    name: "Weekend away",
    icon: "MountainSnow",
    title: "Group Trip Planner for a Weekend Away | After Stories",
    description:
      "Plan the weekend away together: vote on the dates and the house, keep every decision in one timeline, and save everyone's photos. Gone 48 hours after.",
    headline: ["Plan the trip together.", "Bring every photo home."],
    lede: "Vote on the dates, the house and who drives. Share the trip in one stream. Then get everyone's photos in one place, before the whole thing disappears.",
    fineprint: "For iPhone. Friends without one join from the web.",
    hero: {
      src: "/hero-trips.webp",
      alt: "Five friends on a lake house deck at golden hour, one holding a phone up to take the photo",
    },
    mock: {
      title: "Lake house weekend",
      people: 8,
      question: "Which house?",
      options: [
        { label: "The lake house", votes: 6 },
        { label: "Cabin by the ski lift", votes: 3 },
        { label: "Flat in the old town", votes: 1 },
      ],
      decided: ["Weekend of 14 March", "Jonas and Maya drive"],
    },
    todayTitle: "Six phones, one trip, and nobody has all the photos.",
    problem:
      "And it's always the same person booking the house, chasing replies and asking for the photos afterwards. A weekend away should be the easy part of having friends.",
    today: [
      { icon: "CalendarX", text: "A weekend nobody actually confirmed" },
      { icon: "Link", text: "Three house links buried in the chat" },
      { icon: "Car", text: "Who's driving? Still unclear" },
      { icon: "Images", text: "Hundreds of photos stuck on six phones" },
    ],
    todayOne: "One trip.",
    todayText:
      "The dates, the house, the plan for the day and every photo, in one place that cleans itself up.",
    howTitle: "From which weekend to the photos.",
    empathy:
      "We've all been the one with the spreadsheet and the deposit. After Stories keeps the plan and collects the photos, so you get to enjoy the weekend you organised.",
    beats: [
      {
        when: "Before",
        name: "Decide the trip",
        text: "Which weekend, which house, who brings what. Every vote becomes a decision, and the decisions stay on top in order. Nobody scrolls back to find the address.",
      },
      {
        when: "During",
        name: "One stream for the trip",
        text: "“At the petrol station, want anything?”, the hike photos, where dinner is. Everyone sees it, and nobody has to forward anything.",
      },
      {
        when: "The morning after",
        name: "Bring every photo home",
        text: "Everyone gets the summary: the photo of the trip, the line of the weekend, what you decided. Then save every photo to your phone with one tap.",
      },
    ],
    occasionsTitle: "Every kind of weekend away.",
    occasions: [
      { icon: "House", name: "Cabin weekend" },
      { icon: "Building2", name: "City break" },
      { icon: "CableCar", name: "Ski trip" },
      { icon: "Umbrella", name: "Beach house" },
      { icon: "Car", name: "Road trip" },
      { icon: "Tent", name: "Camping" },
      { icon: "Users", name: "Reunion weekend" },
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
    ],
    closer: "The next trip, without the 300 messages.",
    success:
      "Come home with every photo from every phone, the photo of the trip and the line of the weekend, without anyone making an album.",
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
        { label: "Bar Luna", votes: 4 },
        { label: "The rooftop", votes: 2 },
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
        text: "Everyone gets the story of last night: the most-liked photo, the line of the night, where you ended up. Save every photo with one tap.",
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
        a: "Only the people in the event. There is no public feed, no followers and no discovery, and 48 hours after the event ends everything is deleted for everyone.",
      },
      after48,
      nonIphone,
      groupSize,
    ],
    closer: "Make tonight easy to plan, and tomorrow easy to remember.",
    success:
      "Wake up to the story of last night: the best photo, the quote everyone's repeating, where you ended up. All of it already on your phone.",
    stakes: "Or piece it together from six camera rolls and a chat nobody wants to scroll.",
  },
  {
    slug: "birthdays",
    name: "Birthday",
    icon: "Cake",
    title: "Birthday Party Planner for Friends | After Stories",
    description:
      "Plan the birthday together: vote on the date and the venue, share the party in one stream, and give everyone the photos of the guest of honour.",
    headline: ["Plan the birthday together.", "Everyone gets the photos."],
    lede: "Vote on the date, the venue and what to bring. Share the party in one private stream. The morning after, everyone gets the photos of the guest of honour, not just whoever took them.",
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
        { label: "Trattoria Nonna", votes: 8 },
        { label: "The rooftop bar", votes: 4 },
        { label: "Picnic in the park", votes: 2 },
      ],
      decided: ["Saturday 12 April", "Everyone chips in for one gift"],
    },
    todayTitle: "One birthday, three chats, and the best photo is on someone else's phone.",
    problem:
      "And whoever organises it does everything twice: once in the group chat, once in the secret chat about the gift. Celebrating someone should be fun for the people throwing it too.",
    today: [
      { icon: "CalendarX", text: "A date poll half the group ignored" },
      { icon: "Gift", text: "A secret side chat about the gift" },
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
        text: "Which date, which venue, what to bring. Every vote turns into a decision on top of the event, so nobody has to ask again in the chat.",
      },
      {
        when: "During",
        name: "One stream for the party",
        text: "The speeches, the cake, “who has a lighter?”. Everyone's photos land in the same place as they're taken.",
      },
      {
        when: "The morning after",
        name: "Everyone gets the photos",
        text: "A summary of the party and every photo of the guest of honour, saved to each person's phone with one tap.",
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
        a: "Yes. Only the people you invite can see the event, so plan it without the guest of honour and send them the invite link on the day. They'll get the photos too.",
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
      "The morning after, every photo of the guest of honour is in one place, from every phone, saved with one tap.",
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
        { label: "Go-karting", votes: 6 },
        { label: "Cooking class", votes: 3 },
        { label: "Boat trip", votes: 2 },
      ],
      decided: ["Saturday 3 May", "Matching T-shirts, sadly"],
    },
    todayTitle: "One organiser. Forty decisions. Nobody answering.",
    problem:
      "The organiser chases a dozen opinions and gets none back. It's a celebration, not a second job.",
    today: [
      { icon: "BellRing", text: "One person chasing everyone for replies" },
      { icon: "MessagesSquare", text: "A poll in one chat, the plan in another" },
      { icon: "CalendarX", text: "A date that's still not confirmed" },
      { icon: "Infinity", text: "Photos that live in a group chat forever" },
    ],
    todayOne: "One event.",
    todayText:
      "Every vote, the day itself and every photo, in one place that cleans itself up 48 hours later.",
    howTitle: "From the first poll to the morning after.",
    empathy:
      "We've all watched a send-off poll sit at two votes for a week. After Stories turns every answer into a decision, so the organiser gets to be a guest too.",
    beats: [
      {
        when: "Before",
        name: "Decide it, finally",
        text: "Which weekend, which activity, who books the table. Every vote becomes a decision on top of the event, so the organiser can stop chasing replies.",
      },
      {
        when: "During",
        name: "One stream for the day",
        text: "“Taxi in 5”, the costume photos, where to go next. Only the people who were there can see it.",
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
      { icon: "Building2", name: "City weekend" },
    ],
    privacyTitle: "What happens at the send-off stays at the send-off.",
    faq: [
      {
        q: "Can the bride or groom see the planning?",
        a: "Only if you invite them. Each event is private to the people in it, so plan without them and send them the invite link when the day comes.",
      },
      after48,
      groupSize,
      nonIphone,
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
      "Plan the festival with your group: vote on the acts, settle the meeting point, share it in one stream, and save everyone's photos. Gone 48 hours after.",
    headline: ["Plan the festival together.", "Keep every photo of the chaos."],
    lede: "Vote on which acts to see and where to meet when someone gets lost. Share the festival in one stream, and get everyone's photos in one place before it all disappears.",
    fineprint: "For iPhone. Friends without one join from the web.",
    hero: {
      src: "/hero-festivals.webp",
      alt: "Friends in front of a festival crowd at dusk, stage lights and tents behind them",
    },
    mock: {
      title: "Summer festival",
      people: 7,
      question: "Who do we see on Saturday?",
      options: [
        { label: "Northern Lights", votes: 5 },
        { label: "The Velvet Owls", votes: 2 },
        { label: "DJ Saltwater", votes: 1 },
      ],
      decided: ["Camp in area C", "Lost? Meet at the big flag by the bar"],
    },
    todayTitle: "Five phones on 4%, and nobody remembers where camp is.",
    problem:
      "And someone always spends the weekend as the group's lost and found instead of watching the bands. A festival should be the one place you don't have to organise anything.",
    today: [
      { icon: "Ticket", text: "Who has the tickets again?" },
      { icon: "Signpost", text: "“meet at the… which stage?”" },
      { icon: "Tent", text: "Where camp is, buried in the chat" },
      { icon: "ImageOff", text: "Photos you'll never see" },
    ],
    todayOne: "One festival.",
    todayText:
      "The tickets, the meeting point, the line-up and every photo, in one place that's gone 48 hours later.",
    howTitle: "From the line-up to the photos.",
    empathy:
      "We've all lost a friend somewhere between two stages. After Stories keeps the meeting point and the plan one tap away, so you get to watch the bands.",
    beats: [
      {
        when: "Before",
        name: "Sort it before you go",
        text: "Which day, which acts, who brings the tent. Every vote becomes a decision on top of the event, quick to find on one bar of signal.",
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
      { icon: "Disc3", name: "Club weekender" },
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
      "Plan the dinner, game or movie night: vote on the day, the film and who cooks, share the night in one stream and save the photos. Gone 48 hours after.",
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
        { label: "Something scary", votes: 4 },
        { label: "An old classic", votes: 2 },
        { label: "Whatever's new", votes: 1 },
      ],
      decided: ["Friday at Maya's", "Ali brings the pizza"],
    },
    todayTitle: "Six people, one free evening, and the date still isn't set.",
    problem:
      "Finding one free evening for six people shouldn't take two weeks of messages. Hosting should be about the food, not the logistics.",
    today: [
      { icon: "CalendarX", text: "“What about the 14th?” “Can't.”" },
      { icon: "Film", text: "Thirty film suggestions, no decision" },
      { icon: "ChefHat", text: "Who's cooking? Who brings what?" },
      { icon: "Meh", text: "Everyone says “whatever works”" },
    ],
    todayOne: "One night in.",
    todayText:
      "The day, the menu, the film and who brings what, decided in one place that clears itself away.",
    howTitle: "From which night to the last slice.",
    empathy:
      "We've all sent “so… which night works?” three times. After Stories puts it to a vote, so you get to spend the evening hosting, not scheduling.",
    beats: [
      {
        when: "Before",
        name: "Ask, vote, decide",
        text: "Which evening, which game, who cooks. Every vote becomes a decision on top of the event, so the “what are we doing?” messages stop.",
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
        a: "Not when the hard part is finding a date. A poll and a decision are quicker than a thread, and the event cleans itself up afterwards.",
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
      "A night that came together in minutes, a table full of people you like, and the next morning the photos of the food and the final score, on everyone's phone.",
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
    lede: "Vote on the date, decide the place, share the photos. One private event for the whole team, instead of a calendar poll, an email thread and a shared folder. Gone 48 hours after.",
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
        { label: "Fri 5 Dec", votes: 11 },
        { label: "Fri 12 Dec", votes: 6 },
        { label: "Thu 18 Dec", votes: 2 },
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
      "The votes, the decisions, the day itself and the photos, in one place that cleans itself up.",
    howTitle: "From the first date poll to the photos.",
    empathy:
      "We've all been the colleague who ends up organising the party. After Stories answers the same three questions for you, so you get to enjoy the evening with your team.",
    beats: [
      {
        when: "Before",
        name: "Decide it in one place",
        text: "Ask the team: which Friday, which restaurant, who books the table. Every vote turns into a decision, and the decisions sit on top of the event, in order. No one has to chase the replies.",
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
        a: "Only the people in the event. There are no admins, no public profiles and no feed, and 48 hours after the event ends everything is deleted for everyone.",
      },
      {
        q: "How is this better than a calendar poll?",
        a: "A calendar poll answers one question. An event answers all of them: the date, the place, the menu. Then it holds the day itself, and gives everyone the photos afterwards.",
      },
    ],
    closer: "The next team event, without the email thread.",
    success:
      "The date decided in a day, the evening running itself, and the next morning everyone has the photos. No work chat left behind.",
    stakes: "Or start the 30-email thread again, and find out on the day who never saw the invite.",
  },
  {
    slug: "match-day",
    name: "Soccer match day",
    icon: "Whistle",
    title: "Soccer Match Day Planner for Teams | After Stories",
    description:
      "Plan the away match together: settle the carpool, vote for the best player, share the game in one private stream and save every photo. Gone 48 hours later.",
    headline: ["The away game, sorted.", "The best player, voted."],
    lede: "Vote on who drives whom to the away game and who's the best player. Follow the match in one private stream. After the final whistle, everyone saves the photos. Then it disappears.",
    fineprint: "For iPhone. Parents without one join from the web.",
    hero: {
      src: "/hero-match-day.webp",
      alt: "An empty community soccer pitch at golden morning light, two white goals and training cones on the grass, team bags on the sideline bench, cars parked on the lot behind the fence",
    },
    mock: {
      title: "U10 vs. Birkelund",
      people: 24,
      question: "Who drives the carpool?",
      options: [
        { label: "Two cars: 5 and 4", votes: 12 },
        { label: "One van: 9 in", votes: 8 },
        { label: "Three cars: 3 each", votes: 4 },
      ],
      decided: ["Saturday 10:30, pitch 2", "Ali brings the spare keys"],
    },
    todayTitle: "Twenty-four parents, one away game, and the carpool is in a team chat.",
    problem:
      "Who drives whom, who's forgotten the kit, who has the spare keys — all buried under a hundred messages in the team chat. Match day should be about the match.",
    today: [
      { icon: "Car", text: "A carpool that doesn't fit the squad" },
      { icon: "CalendarX", text: "A kick-off nobody confirmed" },
      { icon: "MessageCircle", text: "“who's driving whom?” buried in the team chat" },
      { icon: "Star", text: "Best player of the match, argued instead of voted" },
    ],
    todayOne: "One match.",
    todayText:
      "The carpool, the best-player vote and every photo of the match, in one place that's gone 48 hours later.",
    howTitle: "From who drives whom to the final whistle.",
    empathy:
      "We've all been the parent chasing who's driving whom on match morning. After Stories keeps the plan in one place, so you get to be on the sideline instead of running the carpool.",
    beats: [
      {
        when: "Before",
        name: "Sort the carpool",
        text: "Who drives whom, which pitch, who brings what. Every vote becomes a decision on top of the event, so match morning starts with a plan, not a text thread.",
      },
      {
        when: "During",
        name: "One stream for the match",
        text: "“Pulled over, five minutes out”, the goal photo, the reaction on the sideline. Everyone sees it as it happens, at home or on the road.",
      },
      {
        when: "The next day",
        name: "The best player, voted",
        text: "The vote settles it: best player of the match, and every photo of the game, saved to each phone with one tap. 48 hours after, the event is deleted for everyone.",
      },
    ],
    occasionsTitle: "Every kind of team match.",
    occasions: [
      { icon: "Flag", name: "Away day" },
      { icon: "Calendar", name: "League day" },
      { icon: "Trophy", name: "Cup match" },
      { icon: "Medal", name: "Title run-in" },
      { icon: "Users", name: "Tournament weekend" },
      { icon: "Whistle", name: "Friendly" },
      { icon: "Star", name: "Season finale" },
    ],
    privacyTitle: "Just the squad's parents and coaches.",
    faq: [
      {
        q: "Does one event cover the whole season?",
        a: "One event per match. Each fixture gets a fresh event: the carpool is settled in minutes, the photos are saved first, and 48 hours after the match the event is deleted for everyone.",
      },
      after48,
      nonIphone,
      {
        q: "How many parents can join one event?",
        a: "Up to 50 per event. That fits most squads and their parents, from a U10 to a club's away day.",
      },
    ],
    closer: "The next away game, with the carpool already sorted.",
    success:
      "A match day where the carpool just worked, the best player was settled by a vote, and the next morning every photo of the match is on everyone's phone.",
    stakes: "Or plan it in the team chat again, and keep asking who's driving all season.",
  },
  {
    slug: "graduation",
    name: "Graduation",
    icon: "GraduationCap",
    title: 'Graduation Party Planner for Friends | After Stories',
    description:
      "Plan the graduation party together: vote on the date and the venue, share the celebration in one stream, and save everyone's photos. Gone 48 hours after.",
    headline: ["Plan the celebration together.", "Everyone gets the photos."],
    lede: "Vote on the date, the venue and the gift. Share the party in one private stream. The morning after, everyone gets the photos of the graduate, not just whoever took them. Then it disappears.",
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
        { label: "The park pavilion", votes: 9 },
        { label: "Rooftop bar", votes: 4 },
        { label: "A backyard", votes: 3 },
      ],
      decided: ["Saturday 16 May", "Everyone chips in for one gift"],
    },
    todayTitle: "One graduation, two chats, and the best photo is on a stranger's phone.",
    problem:
      "And the friends who organise it do everything twice: once in the group chat, once in the chat about the gift. Celebrating someone's big day should be a joy, not a second job.",
    today: [
      { icon: "CalendarX", text: "A date poll the graduate can't see" },
      { icon: "Gift", text: "A secret side chat about the gift" },
      { icon: "Image", text: "The photo of the cap toss, on Jonas's phone" },
      { icon: "Send", text: "“Can you send me that one?”" },
    ],
    todayOne: "One celebration.",
    todayText:
      "The date, the place, the gift and every photo of the day, in one place that's gone 48 hours later.",
    howTitle: "From which weekend to the cap toss.",
    empathy:
      "We've all planned a big celebration while the plan is scattered across chats. After Stories keeps it in one place, so you get to celebrate the graduate instead of running the logistics.",
    beats: [
      {
        when: "Before",
        name: "Decide it together",
        text: "Which date, which venue, what the group buys. Every vote turns into a decision on top of the event, so nobody has to ask again in the chat.",
      },
      {
        when: "During",
        name: "One stream for the party",
        text: "The toasts, the cake, the cap toss. Everyone's photos land in the same place as they're taken, from the whole group.",
      },
      {
        when: "The morning after",
        name: "Everyone gets the photos",
        text: "A summary of the day and every photo of the graduate, saved to each person's phone with one tap.",
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
        a: "Yes. Only the people you invite can see the event, so plan it without the graduate and send them the invite link on the day. They'll get the photos too.",
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
      "The morning after, every photo of the graduate is in one place, from every phone, the cap toss included, saved with one tap.",
    stakes: "Or ask around for weeks, and still miss the photo of the cap toss.",
  },
  {
    slug: "family-reunion",
    name: "Family reunion",
    icon: "Users",
    title: 'Family Reunion Planner for Groups | After Stories',
    description:
      "Plan the family reunion together: vote on the dates and the place, keep every decision in one timeline, and save everyone's photos. Gone 48 hours after.",
    headline: ["Plan the reunion together.", "Bring every photo home."],
    lede: "Vote on the dates, the place and who drives. Keep every decision in one timeline, share the whole weekend in one stream, and save everyone's photos before the whole thing disappears.",
    fineprint: "For iPhone. Family without one joins from the web.",
    hero: {
      src: "/hero-family-reunion.webp",
      alt: "An empty wooden lakeside deck and dock at golden hour with warm string lights, a picnic table set with plates, a calm lake behind",
    },
    mock: {
      title: "The Halden reunion",
      people: 24,
      question: "Which weekend?",
      options: [
        { label: "Weekend of 21 June", votes: 12 },
        { label: "Weekend of 28 June", votes: 7 },
        { label: "A long Friday", votes: 5 },
      ],
      decided: ["The lake house, 48 beds", "Cousins A–F drive"],
    },
    todayTitle: "Twenty-four people, one lake, and the plan is in a family group chat.",
    problem:
      "Aunts, cousins and three generations all arguing about the dates, the house and who drives, across a group chat nobody can scroll. Planning a reunion shouldn't be the family's least favourite part.",
    today: [
      { icon: "CalendarX", text: "A date that suits nobody, confirmed by no one" },
      { icon: "Link", text: "Four house listings, half the family lost" },
      { icon: "Car", text: "Who drives, who brings the grill? Unclear" },
      { icon: "Images", text: "Hundreds of photos stuck on twenty-four phones" },
    ],
    todayOne: "One weekend.",
    todayText:
      "The dates, the house, the plan and every photo, in one place that cleans itself up.",
    howTitle: "From which weekend to the photos.",
    empathy:
      "We've all been the cousin with the spreadsheet and the deposit, chasing replies from three generations. After Stories keeps the plan and collects the photos, so you get to enjoy the reunion you organised.",
    beats: [
      {
        when: "Before",
        name: "Decide the reunion",
        text: "Which weekend, which house, who brings what. Every vote becomes a decision, and the decisions stay on top in order. Aunts and cousins alike can see the plan without scrolling.",
      },
      {
        when: "During",
        name: "One stream for the weekend",
        text: "“Where's the grill?”, the lake photos, who's coming for dinner. Everyone sees it, and nobody has to forward anything.",
      },
      {
        when: "The morning after",
        name: "Bring every photo home",
        text: "Everyone gets the summary: the photo of the weekend, the line of the reunion, what you decided. Then save every photo to your phone with one tap.",
      },
    ],
    occasionsTitle: "Every kind of family get-together.",
    occasions: [
      { icon: "Users", name: "Family reunion" },
      { icon: "Mountain", name: "Multi-generational trip" },
      { icon: "CableCar", name: "Ski weekend" },
      { icon: "Umbrella", name: "Beach house" },
      { icon: "Car", name: "Road trip" },
      { icon: "Hand", name: "Farewell weekend" },
      { icon: "Heart", name: "Anniversary weekend" },
    ],
    privacyTitle: "What happens on the weekend stays in the family.",
    faq: [
      {
        q: "Can a big family join one event?",
        a: "Up to 50 people per event. That fits most family reunions, from a handful of cousins to a whole extended family.",
      },
      after48,
      nonIphone,
    ],
    closer: "The next reunion, without the family group chat.",
    success:
      "Come home with every photo from every phone, the photo of the weekend and the line of the reunion, without anyone making an album.",
    stakes: "Or plan it in the family group chat again, and keep asking for those photos all year.",
  },
  {
    slug: "youth-sports",
    name: "Youth sports",
    icon: "Goal",
    title: "Youth Sports Carpool & Team Planner | After Stories",
    description:
      "Plan the team season together: vote on the carpool and the game day, share it in one private stream, and save everyone's photos. Gone 48 hours after.",
    headline: ["Plan the team season.", "Sort the carpool for good."],
    lede: "Parents of twelve players, one carpool that won't fit and a season of game days. Put the plan in one private event: who drives with who, which pitch, who brings what. Save the photos before the whole thing disappears.",
    fineprint: "For iPhone. Parents without one join from the web.",
    hero: {
      src: "/hero-youth-sports.webp",
      alt: "An empty youth soccer field at golden hour with a goal and training cones on the grass, team bags on the sideline",
    },
    mock: {
      title: "U10 Saturday match",
      people: 18,
      question: "Who drives the carpool?",
      options: [
        { label: "Two cars, split 6 and 6", votes: 9 },
        { label: "One van, 12 in", votes: 5 },
        { label: "Three cars", votes: 4 },
      ],
      decided: ["Saturday 10:30, pitch 3", "Coaches bring the cones"],
    },
    todayTitle: "Eighteen parents, one carpool, and the plan is in a team chat.",
    problem:
      "Who drives with who, who's forgotten the kit, who has the spare keys — all buried in a team chat with a hundred messages. Planning a game day shouldn't be the second job nobody signed up for.",
    today: [
      { icon: "Car", text: "A carpool that doesn't fit twelve" },
      { icon: "CalendarX", text: "A game day nobody confirmed" },
      { icon: "MessageCircle", text: "“who's bringing the cones?” buried" },
      { icon: "ImageOff", text: "The photo of the match, on a parent's phone" },
    ],
    todayOne: "One game.",
    todayText:
      "The carpool, the pitch and every photo of the match, in one place that's gone 48 hours later.",
    howTitle: "From the carpool to the final whistle.",
    empathy:
      "We've all been the parent chasing who's driving and who's forgotten the kit. After Stories keeps the plan in one place, so you get to be at the sideline instead of running the carpool.",
    beats: [
      {
        when: "Before",
        name: "Sort the carpool",
        text: "Who drives with who, which pitch, who brings what. Every vote becomes a decision on top of the event, so nobody scrolls back to find who's picking up.",
      },
      {
        when: "During",
        name: "One stream for the match",
        text: "“Two minutes late”, the warm-up photos, who's on the field. Everyone in the group sees it, and nobody has to forward anything.",
      },
      {
        when: "The next day",
        name: "Save the photos, let the chat go",
        text: "Everyone gets the story of the match and saves every photo with one tap. 48 hours after, the event is deleted for everyone.",
      },
    ],
    occasionsTitle: "Every kind of team day.",
    occasions: [
      { icon: "Goal", name: "Weekend match" },
      { icon: "Volleyball", name: "Practice" },
      { icon: "RugbyBall", name: "Tournament day" },
      { icon: "Trophy", name: "Season opener" },
      { icon: "Medal", name: "Season finale" },
      { icon: "Flag", name: "Tournament weekend" },
      { icon: "SportShoe", name: "Friendly" },
    ],
    privacyTitle: "Only the parents and coaches who are there.",
    faq: [
      {
        q: "Can a whole team join one event?",
        a: "Up to 50 people per event. That fits most teams and their parents, from a youth squad to a club's home fixture.",
      },
      after48,
      nonIphone,
    ],
    closer: "The next match, with the carpool sorted.",
    success:
      "A game day where the carpool just worked, the plan sat on top of one event, and the next morning every photo of the match is on everyone's phone.",
    stakes: "Or plan it in the team chat again, and keep asking who's driving all season.",
  },
  {
    slug: "recital",
    name: "School recital",
    icon: "Music",
    title: "School Recital & Show Planner | After Stories",
    description:
      "Plan the recital or show night together: vote on seats and who brings what, share it in one stream, and save everyone's photos. Gone 48 hours after.",
    headline: ["Plan the show night together.", "Everyone gets the photos."],
    lede: "Parents, grandparents and a dozen people who can't all fit. Vote on seats and who brings what, share the show in one private stream, and get every photo of the performance before it disappears.",
    fineprint: "For iPhone. Family without one joins from the web.",
    hero: {
      src: "/hero-show-night.webp",
      alt: "An empty stage in a warm community hall with a microphone and a music stand under a soft spotlight, rows of empty seats behind",
    },
    mock: {
      title: "Spring recital",
      people: 15,
      question: "Where do we sit?",
      options: [
        { label: "Two front rows", votes: 8 },
        { label: "The back, closer to the door", votes: 4 },
        { label: "One table", votes: 3 },
      ],
      decided: ["Friday 18:00", "Grandma and uncle drive"],
    },
    todayTitle: "Fifteen people, one show, and the seats are still undecided.",
    problem:
      "Who's driving grandma, who has the spare ticket, who's taking photos of who, all across the family group chat. Show night should be about the performance, not the logistics.",
    today: [
      { icon: "CalendarX", text: "A date half the family can't make" },
      { icon: "Ticket", text: "Who has the spare seats?" },
      { icon: "Image", text: "The best photo, on someone else's phone" },
      { icon: "Car", text: "Who's driving grandma?" },
    ],
    todayOne: "One show.",
    todayText:
      "The seats, the carpool and every photo of the performance, in one place that's gone 48 hours later.",
    howTitle: "From the seats to the bow.",
    empathy:
      "We've all been the parent who ends up the show-night coordinator. After Stories keeps the plan in one place, so you get to enjoy the performance you arranged.",
    beats: [
      {
        when: "Before",
        name: "Pick the seats",
        text: "Where to sit, who drives, who brings what. Every vote becomes a decision on top of the event, so the family can stop asking the same question.",
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
      { icon: "Music", name: "Music recital" },
      { icon: "Guitar", name: "School concert" },
      { icon: "Drama", name: "Drama production" },
      { icon: "MicVocal", name: "Dance showcase" },
      { icon: "Sparkles", name: "Choir concert" },
      { icon: "Clapperboard", name: "Theatre night" },
      { icon: "Award", name: "Prize giving" },
    ],
    privacyTitle: "Only the family who came.",
    faq: [
      {
        q: "Can grandparents and other family join?",
        a: "Yes. Anyone with the invite link can join. Family with an iPhone use the app, everyone else joins from the web.",
      },
      {
        q: "How many people can join?",
        a: "Up to 50 per event. That fits most families and the grandparents who come to watch.",
      },
      nonIphone,
      after48,
    ],
    closer: "The next show, planned in minutes.",
    success:
      "A show night where the seats and the carpool just worked, and the next morning every photo of the performance is on everyone's phone.",
    stakes: "Or plan it in the family chat again, and miss the photo of the bows.",
  },
  {
    slug: "fundraiser",
    name: "Charity event",
    icon: "Flag",
    title: "Charity & Fundraiser Event Planner | After Stories",
    description:
      "Plan the charity event or 5k together: vote on the shifts and the tables, share the day in one stream, and save everyone's photos. Gone 48 hours after.",
    headline: ["Plan the fundraiser together.", "Save the photos, drop the chat."],
    lede: "A start line, a dozen volunteers and a hundred things to sort. Put the plan in one private event: the shifts, the tables, the route. Save the photos before the whole thing disappears.",
    fineprint: "For iPhone. Volunteers without one join from the web.",
    hero: {
      src: "/hero-fundraiser.webp",
      alt: "The start line of an outdoor charity 5k in a park, a start arch and a timing scoreboard, cones and a banner on the grass",
    },
    mock: {
      title: "The 5k fundraiser",
      people: 22,
      question: "Who runs the aid station?",
      options: [
        { label: "Volunteers A", votes: 8 },
        { label: "Volunteers B", votes: 6 },
        { label: "Rotating teams", votes: 5 },
      ],
      decided: ["Saturday 9:00", "Route checked, 5k"],
    },
    todayTitle: "Twenty-two volunteers, one event, and the plan is in a group chat.",
    problem:
      "Who's on which shift, who's bringing the water, where the start line is, all scattered across a group chat nobody has time to scroll. A fundraiser should be about the cause, not the coordination.",
    today: [
      { icon: "CalendarX", text: "A start time nobody confirmed" },
      { icon: "Users", text: "A volunteer list that's out of date" },
      { icon: "MapPin", text: "The route and start line, buried" },
      { icon: "ImageOff", text: "The photos of the day, on nobody's phone" },
    ],
    todayOne: "One event.",
    todayText:
      "The shifts, the route and every photo of the day, in one place that's gone 48 hours later.",
    howTitle: "From the first shift to the photos.",
    empathy:
      "We've all been the one sorting volunteers and chasing who's on which shift. After Stories keeps the plan in one place, so you get to spend the day on the cause.",
    beats: [
      {
        when: "Before",
        name: "Sort the shifts",
        text: "Who's on which table, who's bringing what, where the start line is. Every vote becomes a decision on top of the event, so the volunteers can stop asking.",
      },
      {
        when: "During",
        name: "One stream for the day",
        text: "“Two more minutes”, the start-line photos, where the next table is. Everyone in the group sees it as it happens.",
      },
      {
        when: "The next day",
        name: "Save the photos, let the chat go",
        text: "Everyone gets the story of the day and saves every photo with one tap. 48 hours after, the event is deleted for everyone.",
      },
    ],
    occasionsTitle: "Every kind of community event.",
    occasions: [
      { icon: "Flag", name: "The 5k" },
      { icon: "Heart", name: "Fundraiser" },
      { icon: "Users", name: "Community clean-up" },
      { icon: "Sun", name: "Open day" },
      { icon: "Music", name: "Charity concert" },
      { icon: "Star", name: "Awareness walk" },
      { icon: "Coffee", name: "Market morning" },
    ],
    privacyTitle: "Only the people who helped.",
    faq: [
      {
        q: "Can a big group of volunteers join?",
        a: "Up to 50 people per event. That fits most charity events and volunteer teams, from a 5k to a community clean-up.",
      },
      after48,
      nonIphone,
    ],
    closer: "The next fundraiser, without the group chat.",
    success:
      "A day where the shifts just worked, the plan sat on top of one event, and the next morning every photo of the event is on everyone's phone.",
    stakes: "Or plan it in the group chat again, and keep chasing the volunteers all year.",
  },
];

export const eventHref = (e: EventType) => `/${e.slug}/`;
