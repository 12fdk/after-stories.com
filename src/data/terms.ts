// AFTER's terms of use — served at https://after-stories.com/terms/ (12fdk/after-stories#337).
// Moved here verbatim from the app repo's after.12f.dk worker (web/after-link/src/terms.js, #167);
// after.12f.dk/terms now 301s here. Only the links changed: the privacy policy is /privacy/ on
// this site, and the suspension page stays on after.12f.dk.
//
// Danish first (the app's source language), English below. The app shows a short version before
// anyone sees group content and records the acceptance (version + time) in the user's Appwrite
// account prefs; this page is the full text it links to. Apple's standard EULA applies on top.
//
// **Say only what the app does.** Version 2 (12fdk/after-stories#378, 2026-10-07) describes the
// one-event app: messages and photos, not moments; 18, the App Store age rating (18+).
//
// App Store guideline 1.2 is what this page answers: no tolerance for objectionable content or
// abusive users, a way to report and to block (both built, #29), and the operator acting on a
// report within 24 hours. #170 is what makes the last one operable (a report reaches a human) —
// keep the promise and that issue in step. #281 built the operator side: the admin site removes
// reported content and suspends accounts.
//
// **Bump `TERMS_VERSION` here and `Terms.version` in the app together**
// (after-stories/Features/Terms/Terms.swift; its RoutingTests pin the same number) when a change
// here is one people must agree to again; the app then asks everyone once more. Fixing a typo is
// not such a change. Change the dates whenever the text changes.

export const TERMS_VERSION = 2;
export const TERMS_UPDATED_DA = "7. oktober 2026";
export const TERMS_UPDATED_EN = "7 October 2026";

export const APPLE_EULA = "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";

export const TERMS_HTML = `
<nav class="lang"><a href="#da">Dansk</a> · <a href="#en">English</a></nav>

<article id="da" lang="da">
<h1>Vilkår for AFTER</h1>
<p class="meta">Senest opdateret ${TERMS_UPDATED_DA} · version ${TERMS_VERSION}</p>

<h2>Kort fortalt</h2>
<ul>
  <li>AFTER er en privat app til ét event ad gangen med dine venner. Det, du lægger op, kan kun ses af dem, der er med i eventet.</li>
  <li><strong>Der er nul tolerance over for stødende indhold og krænkende brugere.</strong></li>
  <li>Du kan rapportere en besked eller et billede og blokere en person direkte i appen.</li>
  <li>Du skal være mindst 18 år.</li>
</ul>

<h2>Det må du ikke lægge op</h2>
<p>Du må ikke dele indhold, der er ulovligt, chikanerende, truende, hadefuldt, seksuelt eksplicit, voldeligt eller krænker andres privatliv — fx billeder af folk, der ikke vil være med, eller af nogen under 18. Du må ikke bruge AFTER til at mobbe, true eller udstille andre.</p>

<h2>Rapportér og bloker</h2>
<p>Hold en besked nede for at rapportere den eller blokere den, der har lagt den op. Det samme kan du med billederne i opsummeringen. Du kan også blokere fra eventets liste over deltagere. Blokerer du en person, ser du ikke længere vedkommendes indhold. Vi gennemgår anmeldelser og handler <strong>inden for 24 timer</strong>: indhold, der bryder vilkårene, bliver fjernet, og en konto, der bryder dem, kan blive <strong>suspenderet</strong> — så kan den ikke logge ind. Vi skriver til kontoens e-mailadresse med begrundelsen, og du kan gøre indsigelse (<a href="https://after.12f.dk/konto/suspenderet">Din konto er suspenderet</a>).</p>

<h2>Dit indhold</h2>
<p>Det, du lægger op, er dit. Du giver de andre i eventet lov til at se det i appen, og os lov til at opbevare og vise det for dem, så længe eventet findes, eller indtil du sletter det. Et event slettes for alle 48 timer efter, det er slut. Du kan slette dine egne beskeder, billeder, likes og stemmer — og hele din konto — direkte i appen. Hvordan vi behandler data, står i <a href="/privacy/">privatlivspolitikken</a>.</p>

<h2>Apples standardvilkår</h2>
<p>AFTER hentes fra App Store, og Apples standardlicensaftale for apps gælder også: <a href="${APPLE_EULA}">Licensed Application End User License Agreement</a>.</p>

<h2>Ændringer og kontakt</h2>
<p>Ændrer vi vilkårene, så du skal acceptere dem igen, beder appen dig om det. Spørgsmål eller en klage: <a href="mailto:support@after-stories.com">support@after-stories.com</a>. AFTER udgives af 12f ApS, Danmark.</p>
</article>

<article id="en" lang="en">
<h1>Terms of use for AFTER</h1>
<p class="meta">Last updated ${TERMS_UPDATED_EN} · version ${TERMS_VERSION}</p>

<h2>In short</h2>
<ul>
  <li>AFTER is a private app for one event at a time with your friends. What you post can only be seen by the people in the event.</li>
  <li><strong>There is no tolerance for objectionable content or abusive users.</strong></li>
  <li>You can report a message or a photo and block a person right in the app.</li>
  <li>You must be at least 18.</li>
</ul>

<h2>What you must not post</h2>
<p>You must not share content that is illegal, harassing, threatening, hateful, sexually explicit, violent or that invades someone's privacy — for example photos of people who don't want to be in them, or of anyone under 18. You must not use AFTER to bully, threaten or expose anyone.</p>

<h2>Report and block</h2>
<p>Press and hold a message to report it or to block whoever posted it. You can do the same with the photos in the summary. You can also block from the event's list of people. Once you block someone, you no longer see what they post. We review reports and act <strong>within 24 hours</strong>: content that breaks these terms is removed, and an account that breaks them may be <strong>suspended</strong> — it then can't sign in. We write to the account's email address with the reason, and you can object (<a href="https://after.12f.dk/account/suspended">Your account is suspended</a>).</p>

<h2>Your content</h2>
<p>What you post is yours. You let the others in the event see it in the app, and us store it and show it to them for as long as the event exists or until you delete it. An event is deleted for everyone 48 hours after it ends. You can delete your own messages, photos, likes and votes — and your whole account — right in the app. How we handle data is in the <a href="/privacy/">privacy policy</a>.</p>

<h2>Apple's standard terms</h2>
<p>AFTER comes from the App Store, and Apple's standard licence for apps applies too: <a href="${APPLE_EULA}">Licensed Application End User License Agreement</a>.</p>

<h2>Changes and contact</h2>
<p>If we change these terms in a way you need to accept again, the app will ask you. Questions or a complaint: <a href="mailto:support@after-stories.com">support@after-stories.com</a>. AFTER is published by 12f ApS, Denmark.</p>
</article>
`;
