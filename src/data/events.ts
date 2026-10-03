// One entry per event-type page, rendered by src/pages/[event].astro.
// Copy and use cases: docs/positioning.md › The use cases. Voice: warm and witty, cheeky, never
// laddish. Never mention price. Never mention deletion without saving the photos first.

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
  emoji: string;
  title: string;
  description: string;
  /** Each string is one line of the hero headline. */
  headline: string[];
  lede: string;
  fineprint: string;
  /** The hero mock: an event of this type while it's being planned. */
  mock: {
    title: string;
    people: number;
    question: string;
    options: { label: string; votes: number }[];
    decided: string[];
  };
  todayTitle: string;
  today: { icon: string; text: string }[];
  todayOne: string;
  todayText: string;
  howTitle: string;
  beats: Beat[];
  occasionsTitle: string;
  occasions: { emoji: string; name: string }[];
  privacyTitle: string;
  privacy?: Fact[];
  faq: { q: string; a: string }[];
  closer: string;
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
  { title: "Sign in with Apple.", text: "No passwords to remember or leak." },
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
    emoji: "🏔️",
    title: "Group Trip Planner — Plan a Weekend Away with Friends | After Stories",
    description:
      "Plan the weekend away together: vote on the dates and the house, keep every decision in one timeline, and get everyone's photos the morning after. Gone 48 hours after.",
    headline: ["Plan the trip together.", "Bring every photo home."],
    lede: "Vote on the dates, the house and who drives. Share the trip in one stream. Then get everyone's photos in one place, before the whole thing disappears.",
    fineprint: "For iPhone. Friends without one join from the web.",
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
    today: [
      { icon: "🗓️", text: "A weekend nobody actually confirmed" },
      { icon: "🏠", text: "Three house links buried in the chat" },
      { icon: "🚗", text: "Who's driving? Still unclear" },
      { icon: "📸", text: "Hundreds of photos stuck on six phones" },
    ],
    todayOne: "One trip.",
    todayText:
      "The dates, the house, the plan for the day and every photo, in one place that cleans itself up.",
    howTitle: "From which weekend to the photos.",
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
      { emoji: "🏡", name: "Cabin weekend" },
      { emoji: "🏙️", name: "City break" },
      { emoji: "⛷️", name: "Ski trip" },
      { emoji: "🏖️", name: "Beach house" },
      { emoji: "🚗", name: "Road trip" },
      { emoji: "⛺", name: "Camping" },
      { emoji: "🫂", name: "Reunion weekend" },
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
  },
  {
    slug: "nights-out",
    name: "Night out",
    emoji: "🌙",
    title: "Night Out Planner for Friends — After Stories",
    description:
      "Plan the night out together: vote on where to meet and where to go next, share it in one private stream, and wake up to the story of last night. Gone 48 hours after.",
    headline: ["Plan the night out.", "Piece it together tomorrow."],
    lede: "Vote on where to meet and where to go next. Share the night in one private stream. The morning after, get the story: the best photo, the line of the night, every picture. Then it disappears.",
    fineprint: "For iPhone. Friends without one join from the web.",
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
    today: [
      { icon: "📍", text: "“where are you guys??”" },
      { icon: "🔁", text: "A plan that changed four times" },
      { icon: "🤳", text: "Photos on everyone's phone but yours" },
      { icon: "🤔", text: "“What actually happened last night?”" },
    ],
    todayOne: "One night.",
    todayText:
      "Where you meet, where you go next and every photo of the night, in one place that's gone 48 hours later.",
    howTitle: "From where do we meet to what happened.",
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
      { emoji: "🍸", name: "Friday drinks" },
      { emoji: "🪩", name: "Club night" },
      { emoji: "🧠", name: "Pub quiz" },
      { emoji: "🎤", name: "Karaoke" },
      { emoji: "🍺", name: "Bar crawl" },
      { emoji: "🎸", name: "Gig night" },
      { emoji: "🎆", name: "New Year's Eve" },
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
  },
  {
    slug: "birthdays",
    name: "Birthday",
    emoji: "🎂",
    title: "Birthday Party Planner — Plan It with Friends | After Stories",
    description:
      "Plan the birthday with the group: vote on the date and the venue, share the party in one stream, and give everyone the photos of the guest of honour. Gone 48 hours after.",
    headline: ["Plan the birthday together.", "Everyone gets the photos."],
    lede: "Vote on the date, the venue and what to bring. Share the party in one private stream. The morning after, everyone gets the photos of the guest of honour, not just whoever took them.",
    fineprint: "For iPhone. Friends without one join from the web.",
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
    today: [
      { icon: "🗓️", text: "A date poll half the group ignored" },
      { icon: "🎁", text: "A secret side chat about the gift" },
      { icon: "📸", text: "The best photo of Sara, on Jonas's phone" },
      { icon: "🔁", text: "“Can you send me that one?”" },
    ],
    todayOne: "One party.",
    todayText:
      "The date, the place, the plan and every photo of the night, in one place that's gone 48 hours later.",
    howTitle: "From which Saturday to the photos.",
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
      { emoji: "🎂", name: "Milestone birthday" },
      { emoji: "🤫", name: "Surprise party" },
      { emoji: "🍽️", name: "Birthday dinner" },
      { emoji: "🏠", name: "Housewarming" },
      { emoji: "🎓", name: "Graduation" },
      { emoji: "🥂", name: "Anniversary" },
      { emoji: "👋", name: "Farewell party" },
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
  },
  {
    slug: "bachelor-parties",
    name: "Bachelor & bachelorette",
    emoji: "💍",
    title: "Bachelor & Bachelorette Party Planner — After Stories",
    description:
      "Plan the bachelor or bachelorette party in one private event: vote on the plan, keep the decisions in one place, save the photos, and know it's all gone 48 hours later.",
    headline: ["Plan the send-off together.", "Keep the photos. Lose the chat."],
    lede: "One organiser, a dozen decisions and a group that won't answer. Put every vote in one private event, share the day in one stream, and save the photos before everything disappears 48 hours later.",
    fineprint: "For iPhone. Friends without one join from the web.",
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
    today: [
      { icon: "🙋", text: "One person chasing everyone for replies" },
      { icon: "📊", text: "A poll in one chat, the plan in another" },
      { icon: "🗓️", text: "A date that's still not confirmed" },
      { icon: "📸", text: "Photos that live in a group chat forever" },
    ],
    todayOne: "One event.",
    todayText:
      "Every vote, the day itself and every photo, in one place that cleans itself up 48 hours later.",
    howTitle: "From the first poll to the morning after.",
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
      { emoji: "🤵", name: "Bachelor party" },
      { emoji: "👰", name: "Bachelorette party" },
      { emoji: "👑", name: "Hen do" },
      { emoji: "🦌", name: "Stag do" },
      { emoji: "🧖", name: "Spa day" },
      { emoji: "🏎️", name: "Activity day" },
      { emoji: "🏙️", name: "City weekend" },
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
  },
  {
    slug: "festivals",
    name: "Festival",
    emoji: "🎪",
    title: "Festival Planner for Friends — Plan It, Share the Photos | After Stories",
    description:
      "Plan the festival with your group: vote on the acts, settle the meeting point, share it in one stream, and get everyone's photos when it's over. Gone 48 hours after.",
    headline: ["Plan the festival together.", "Keep every photo of the chaos."],
    lede: "Vote on which acts to see and where to meet when someone gets lost. Share the festival in one stream, and get everyone's photos in one place before it all disappears.",
    fineprint: "For iPhone. Friends without one join from the web.",
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
    today: [
      { icon: "🎟️", text: "Who has the tickets again?" },
      { icon: "🗺️", text: "“meet at the… which stage?”" },
      { icon: "⛺", text: "Where camp is, buried in the chat" },
      { icon: "📸", text: "Photos you'll never see" },
    ],
    todayOne: "One festival.",
    todayText:
      "The tickets, the meeting point, the line-up and every photo, in one place that's gone 48 hours later.",
    howTitle: "From the line-up to the photos.",
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
      { emoji: "🎪", name: "Music festival" },
      { emoji: "🎸", name: "Concert" },
      { emoji: "🌮", name: "Food festival" },
      { emoji: "🪩", name: "Club weekender" },
      { emoji: "🎬", name: "Open-air cinema" },
      { emoji: "⚽", name: "Big match" },
      { emoji: "🦸", name: "Comic con" },
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
  },
  {
    slug: "dinner-nights",
    name: "Dinner night",
    emoji: "🍝",
    title: "Dinner Party, Game & Movie Night Planner — After Stories",
    description:
      "Plan the dinner, game or movie night with friends: vote on the day, the film and who cooks, then share the night in one stream. Gone 48 hours after.",
    headline: ["Which night?", "Which film?", "Who's cooking?"],
    lede: "Put the questions to a vote and get the answers in one place. Plan the dinner, game or movie night, share it in one stream, and save the photos before it all disappears.",
    fineprint: "For iPhone. Friends without one join from the web.",
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
    today: [
      { icon: "📅", text: "“What about the 14th?” “Can't.”" },
      { icon: "🎬", text: "Thirty film suggestions, no decision" },
      { icon: "🍲", text: "Who's cooking? Who brings what?" },
      { icon: "😴", text: "Everyone says “whatever works”" },
    ],
    todayOne: "One night in.",
    todayText:
      "The day, the menu, the film and who brings what, decided in one place that clears itself away.",
    howTitle: "From which night to the last slice.",
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
      { emoji: "🍝", name: "Dinner party" },
      { emoji: "🎲", name: "Game night" },
      { emoji: "🍿", name: "Movie night" },
      { emoji: "📚", name: "Book club" },
      { emoji: "🥘", name: "Potluck" },
      { emoji: "📺", name: "Watch party" },
      { emoji: "🔥", name: "Barbecue" },
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
  },
  {
    // Calmer than the friend pages: warm, still witty, no nightlife jokes (positioning.md › The office event).
    slug: "office-events",
    name: "Office party",
    emoji: "🥂",
    title: "Office Party & Team Event Planner — After Stories",
    description:
      "Plan the team dinner, holiday party or offsite in one private event: vote on the date, decide the place, share the photos. No calendar polls, no 30-email threads. Gone 48 hours after.",
    headline: ["Plan the team event.", "Skip the 30 emails."],
    lede: "Vote on the date, decide the place, share the photos. One private event for the whole team, instead of a calendar poll, an email thread and a shared folder. Gone 48 hours after.",
    fineprint: "Colleagues without an iPhone join from the web.",
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
    today: [
      { icon: "📅", text: "A calendar invite nobody can change" },
      { icon: "🗳️", text: "A date poll in another tool" },
      { icon: "✉️", text: "30 emails, half of them reply-all" },
      { icon: "📁", text: "A shared folder nobody uploads to" },
    ],
    todayOne: "One event.",
    todayText:
      "The votes, the decisions, the day itself and the photos, in one place that cleans itself up.",
    howTitle: "From the first date poll to the photos.",
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
      { emoji: "🍽️", name: "Team dinner" },
      { emoji: "🍻", name: "Friday bar" },
      { emoji: "☀️", name: "Summer party" },
      { emoji: "🎄", name: "Christmas party" },
      { emoji: "🧭", name: "Offsite" },
      { emoji: "👋", name: "Leaving do" },
      { emoji: "🚀", name: "Kick-off" },
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
  },
];

export const eventHref = (e: EventType) => `/${e.slug}/`;
