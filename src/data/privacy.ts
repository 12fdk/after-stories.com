// After Stories' privacy policy — the app AFTER and this website, one page at /privacy/
// (12fdk/after-stories#337). Danish first (the app's source language), English below.
//
// The app part moved here verbatim from the app repo's after.12f.dk worker
// (web/after-link/src/privacy.js, as re-reviewed in 12fdk/after-stories#333); after.12f.dk/privacy
// now 301s here. Every statement in it is meant to be true of the app as built; the sources are
// docs/ in the app repo:
//   - identity.md   Sign in with Apple (id, relay email, the once-only name), sessions, in-app
//                   account deletion (#31)
//   - photos.md     every coordinate and every EXIF/XMP segment stripped on the phone
//   - schema.md     what is stored, who can read it (team-only), the deletion cascade, the
//                   invite/create throttles (expiresAt = window + 1 day, cleaned up on next use)
//   - product.md    the one-event model (#208/#223: messages, photos, places, @mentions, likes,
//                   polls, decisions and tasks — no moments, reactions, going home, cover, RSVP or
//                   agenda), places as venues (#217: MKLocalSearch with no region, no
//                   coordinates), saving photos with add-only access (#220), report & block (#29,
//                   #169), leaving, retention (#221: 48 h after the end, 90 days if never started,
//                   the 12 h warning push #256; #170: a deleted event's reports are kept 90 days
//                   more, ids + reason only, and each new report e-mails 12f), pushes (#30, #222, #237, #264,
//                   #270), the 17+ rating
// Hosting: app.12f.dk resolves to Oracle Cloud, Stockholm (checked 2026-09-30).
// (Issue numbers above are 12fdk/after-stories issues.)
//
// Product analytics (#373, owner 2026-10-07, superseding #33's "no SDK"): the app sends
// anonymous usage events and crash reports to PostHog (EU cloud, Frankfurt). Never identify()d,
// never the user id, a name or anything a member wrote; no session replay; the project discards
// IP addresses and the app disables GeoIP; on by default with an off switch in Profil › Konto
// (app repo docs/backend.md, CLAUDE.md › Analytics). The server-side daily totals stay.
//
// **Keep it true.** It changes in the same PR as any of: product analytics (#373 — anything
// beyond anonymous events and crashes, e.g. identifying people or session replay, changes this
// page *first*), report retention (#170, described since 2026-10-07), the SIWA token revoke on
// deletion (#173), the day-after photo window (#284), Add to calendar (#268). None of the last
// three is described here, because none has landed (re-reviewed 2026-10-04, #32). The terms acceptance (#167:
// version + time in the account prefs) is listed under "your settings" and links /terms/.
// #281: moderation (12f reviews a report with only the item and its neighbours), suspension
// (the e-mail to the account's address, Brevo as its processor), the audit log (2 years), a
// report's triage state (1 year) and the server-side daily counts (no person in them). Security
// review: reads are audited too, the audit keeps the operator after an erasure (legitimate
// interest), and a suspended person is erased on request by e-mail (#287).
//
// The website part ("Hjemmesiden after-stories.com" / "The website after-stories.com") is what
// this site's own policy said before the merge: the waitlist form (#271, the double opt-in #276),
// its storage and retention, GitHub Pages, Umami, the self-hosted fonts and the theme choice.
// Change it whenever the form, the backend's storage or the site's hosting or analytics change
// (CLAUDE.md › The waitlist form).
//
// Links to the suspension page stay absolute: /konto/suspenderet is served by after.12f.dk.
// Change the dates whenever the text changes. src/lib/legal.test.ts checks the shape.

export const PRIVACY_UPDATED_DA = "7. oktober 2026";
export const PRIVACY_UPDATED_EN = "7 October 2026";

export const PRIVACY_HTML = `
<nav class="lang"><a href="#da">Dansk</a> · <a href="#en">English</a></nav>

<article id="da" lang="da">
<h1>Privatlivspolitik for AFTER</h1>
<p class="meta">Senest opdateret ${PRIVACY_UPDATED_DA}</p>
<p>Den gælder appen AFTER og hjemmesiden after-stories.com. Det, der kun gælder hjemmesiden, står under <a href="#da-web">Hjemmesiden after-stories.com</a>.</p>

<h2>Kort fortalt</h2>
<ul>
  <li>AFTER er en privat app til ét event med en vennegruppe — en bytur, en tur, en fest. Det, du lægger op, kan kun ses af dem, der er med i eventet — ingen offentlig feed, ingen følgere, ingen søgning.</li>
  <li>Et event slettes for alle 48 timer efter, det er slut.</li>
  <li>Dine data ligger på vores egen server i EU (Stockholm, Sverige).</li>
  <li>Vi bruger aldrig din placering, dine kontakter eller reklame-id'er. Vi sælger ikke data, og vi sporer dig ikke på tværs af apps. Appen sender anonym brugsstatistik, som ikke kan føres tilbage til dig, og du kan slå den fra.</li>
  <li>Du kan slette din konto og dine beskeder, billeder og likes direkte i appen.</li>
</ul>

<h2>Hvem er ansvarlig</h2>
<p>Dataansvarlig er <strong>12f ApS</strong>, Danmark. Spørgsmål om dine data: <a href="mailto:support@after-stories.com">support@after-stories.com</a>.</p>

<h2>Hvad vi gemmer, og hvorfor</h2>
<ul>
  <li><strong>Din konto.</strong> Du logger ind med Apple. Vi får et bruger-id, den e-mailadresse, Apple giver os — ofte en anonym videresendingsadresse fra Apple — og første gang det navn, du deler med Apple, som forslag til dit navn i appen. Vi bruger kun e-mailadressen til at give dig besked, hvis din konto bliver suspenderet eller åbnet igen, og viser den ingen steder.</li>
  <li><strong>Tekniske oplysninger.</strong> Når du er logget ind, gemmer serveren din session: IP-adresse, land, enhedens og styresystemets navn og hvornår den sidst blev brugt. Det bruges til login og sikkerhed og slettes, når du logger ud eller sletter kontoen. Serveren fører også tekniske logfiler til drift og fejlfinding.</li>
  <li><strong>Dine indstillinger.</strong> Hvilken version af <a href="/terms/">vilkårene</a> du har accepteret, og hvornår; hvilke beskeder du vil have notifikationer om; og hvilke events du har slået notifikationer fra for eller fjernet fra Hjem. De gemmes på din konto, så en ny telefon kender dem, og slettes med kontoen.</li>
  <li><strong>Din profil.</strong> Det navn, du vælger, og dit profilbillede, hvis du tilføjer et. De kan kun ses af dem, der er med i dine events.</li>
  <li><strong>Events.</strong> Eventets navn, hvem der er med, hvem der oprettede det, hvornår det blev startet og sluttede, og den tidszone, det foregår i.</li>
  <li><strong>Det, du lægger op.</strong> Beskeder — tekst, billeder og steder — og hvem du nævner med @. Likes. Afstemninger, deres svarmuligheder og stemmerne. Beslutninger og opgaver: hvad I har besluttet, hvem der gør hvad, og om det er klaret. <strong>Alle billeder bliver renset på telefonen, før de sendes</strong>: placering og alle kameraoplysninger fjernes.</li>
  <li><strong>Steder.</strong> Et sted er et spisested, en bar eller en adresse, som I selv vælger: et navn, en adresse og et link til Apple Kort. Aldrig nogens position — appen gemmer ingen koordinater.</li>
  <li><strong>Kamera og billeder.</strong> Kun når du selv vælger det — for at tage et billede, vælge billeder eller scanne en invitations-QR-kode. Vi får kun de billeder, du vælger. Trykker du <em>Gem alle billeder</em>, beder appen kun om lov til at lægge billeder i dit billedbibliotek; resten af biblioteket kan den ikke se.</li>
  <li><strong>Blokeringer og rapporter.</strong> Hvem du har blokeret, og beskeder du har rapporteret, med den grund du valgte. Kun du kan se dem — og vi, når vi behandler en rapport. Bliver din besked rapporteret, gemmer vi rapporten med en henvisning til beskeden og dit bruger-id. Fører din rapport til en suspendering, noterer loggen, at den kom fra din rapport.</li>
  <li><strong>Moderation.</strong> 12f gennemgår rapporteret indhold og får en e-mail, hver gang der kommer en rapport, med rapportens id og grund — aldrig indholdet eller hvem det drejer sig om. Til det ser vi kun den rapporterede besked og dens billeder, forfatterens navn i eventet og op til fem beskeder før og efter den med afsendernes navne (uden billeder) — intet andet fra eventet. Bryder indholdet vilkårene, fjerner vi det. En konto, der bryder vilkårene, kan blive <strong>suspenderet</strong>: så kan den ikke logge ind, og vi skriver til kontoens e-mailadresse med begrundelsen (se <a href="https://after.12f.dk/konto/suspenderet">Din konto er suspenderet</a>). Hvad vi har gjort — hvem hos 12f, hvad, over for hvilket indhold eller hvilken konto, hvorfor og hvornår — logges og gemmes i 2 år; en rapports behandling gemmes i 1 år. Også når 12f åbner en rapport eller en konto, logges det (kun id'er, aldrig indholdet). Slettes en konto, fjerner vi dens id fra loggen — men hvem hos 12f der handlede, bliver stående, af hensyn til ansvarligheden for moderationen (vores legitime interesse, art. 6, stk. 1, litra f). En suspenderet konto kan ikke slettes i appen: skriv til <a href="mailto:support@after-stories.com">support@after-stories.com</a>, så sletter vi den.</li>
  <li><strong>Beskyttelse mod misbrug.</strong> Tællere for forkerte invitationskoder og for hvor mange events der oprettes, så ingen kan gætte sig ind i et event eller oversvømme serveren. De gemmes i op til to døgn og fjernes derefter ved næste oprydning.</li>
</ul>
<p><strong>Notifikationer.</strong> Slår du notifikationer til, gemmer vi din telefons push-token, så vi kan sende dem via Apple; det slettes, når du logger ud eller sletter kontoen. For at sende hver notifikation kun én gang noterer serveren, at den er sendt til dig (uden indhold); noten gemmes i 1–7 dage, for en opgave op til 92 dage, og slettes med kontoen. Du kan få besked om nye beskeder, når du bliver nævnt, når du får en opgave, når opsummeringen er klar morgenen efter, og 12 timer før et event slettes. En notifikation om en besked viser eventets navn, afsenderens fornavn og beskedens tekst; en om en opgave viser opgaven. Om de vises på låseskærmen, styrer du selv i iOS (Vis eksempler). Du vælger i appen, om du får besked om alle beskeder, kun når du bliver nævnt, eller ingen, og du kan slå notifikationer fra for et enkelt event. Påmindelser, som appen selv sætter, er lokale notifikationer på din telefon; de sendes ikke via os. Appen gemmer en kopi af jeres indhold på telefonen, så den virker uden net; den bliver liggende, hvis du logger ud, og slettes fra den telefon, du sletter kontoen på. På en anden telefon sletter du den ved at slette appen.</p>

<h2>Hvem kan se det</h2>
<p>Indhold i et event kan kun læses af dem, der er med i det. Det håndhæves af serveren, ikke kun af appen. Andre brugere, søgemaskiner og offentligheden kan ikke se det. Vi kigger ikke i jeres indhold, medmindre nogen rapporterer det, eller loven kræver det.</p>

<h2>Hvor det ligger, og hvem der hjælper os</h2>
<ul>
  <li><strong>Vores server</strong> kører i et Oracle Cloud-datacenter i Stockholm, Sverige (EU). Det er her, alle konti, events, beskeder og billeder ligger.</li>
  <li><strong>Apple</strong> står for login (Log ind med Apple) og leverer notifikationer (Apple Push Notification service). Søger du efter et sted, sendes din søgetekst til Apple Kort — uden din placering.</li>
  <li><strong>Cloudflare</strong> leverer invitationssiden på after.12f.dk og står foran hjemmesiden after-stories.com, hvor denne side ligger, og behandler din IP-adresse for at kunne vise dem. Vi logger intet om dig der.</li>
  <li><strong>Brevo</strong> (Frankrig, EU) sender e-mailen, hvis din konto bliver suspenderet eller åbnet igen.</li>
  <li><strong>PostHog</strong> modtager appens anonyme brugsstatistik og fejlrapporter og opbevarer dem i sin EU-sky (Frankfurt, Tyskland). Se <a href="#da-statistik">Statistik</a>.</li>
</ul>
<p>Alt, hvad du lægger op, opbevares i EU. Login, notifikationer og søgning efter steder går gennem Apple, som behandler dem efter sine egne regler og også uden for EU.</p>

<h2 id="da-statistik">Statistik</h2>
<p>For at se, hvad der virker, og rette fejl, sender appen <strong>anonym brugsstatistik</strong> til PostHog: hvilke trin der bliver brugt (fx at et event er oprettet, at der er stemt, at en besked er sendt med eller uden billede), og <strong>fejlrapporter</strong>, når appen går ned. Med følger appens version, telefonens model, iOS-version og sprog og et tilfældigt id, som appen laver på din telefon.</p>
<ul>
  <li><strong>Aldrig indhold.</strong> Ingen tekst, ingen billeder, ingen navne, intet events-navn, intet steds-navn og intet andet, nogen har skrevet. Ingen skærmoptagelse.</li>
  <li><strong>Ikke knyttet til dig.</strong> Det tilfældige id er ikke dit bruger-id, og vi forbinder det aldrig med din konto, dit navn eller din e-mail. Din IP-adresse når PostHog som en del af forbindelsen, men gemmes ikke, og der udledes ingen placering af den.</li>
  <li><strong>Du kan sige nej.</strong> Slå <em>Del anonym brugsstatistik</em> fra under Profil → Konto. Så sender appen intet mere. Fordi oplysningerne ikke er knyttet til dig, kan vi ikke finde dem frem eller slette dem for den enkelte — og de slettes ikke med din konto.</li>
  <li>Det sker på grundlag af vores legitime interesse i at forbedre appen og rette fejl (art. 6, stk. 1, litra f). Det bruges ikke til reklame og deles ikke med andre.</li>
</ul>
<p>På vores egen server tæller vi en gang i døgnet, hvor meget AFTER bruges — fx antal nye konti, events, beskeder, billeder og afstemninger. Det er kun tal for hele appen: intet indhold, ingen navne og intet om, hvem der gjorde hvad. Tallene slettes ikke med events.</p>

<h2>Hvad vi aldrig gør</h2>
<ul>
  <li>Ingen placering — appen spørger aldrig om adgang til din placering, og der gemmes ingen koordinater.</li>
  <li>Ingen adgang til dine kontakter.</li>
  <li>Ingen reklame, ingen reklame-id'er, ingen sporing på tværs af apps og websteder, ingen skærmoptagelse.</li>
  <li>Intet salg eller udlån af data.</li>
  <li>Ingen offentlige profiler, følgere eller søgning efter andre brugere.</li>
</ul>

<h2>Hvor længe</h2>
<ul>
  <li><strong>Et event slettes for alle 48 timer efter, det er slut</strong> — beskeder, billeder, likes, afstemninger, beslutninger og opgaver, eventet selv og alle medlemskaber af det. <strong>Rapporter</strong> om indhold i eventet gemmes i 90 dage mere — kun id'er, den valgte grund og tidspunktet, aldrig indholdet — så en rapport ikke forsvinder, før vi har behandlet den (vores legitime interesse, art. 6, stk. 1, litra f). 12 timer før får alle med, som ikke har slået notifikationer fra for det, en notifikation, så de kan gemme billederne på telefonen. Et event, der aldrig blev startet, slettes 90 dage efter, det blev oprettet. Den, der oprettede eventet, kan også slette det med det samme (Slet eventet). Det, du har gemt i din egen fotosamling, rører vi ikke.</li>
  <li>Sletter du en af dine beskeder, forsvinder den for alle, og dens tekst og billeder slettes. Tilbage er kun en tom markering af, hvem der skrev en besked og hvornår, så de andres likes ikke peger på ingenting.</li>
  <li>Forlader du et event, bliver det, du har lagt op, i eventet, og de andre kan stadig se dit navn og billede ved det. Forlader den sidste person et event, slettes det med alt indhold. Rapporter om indhold i det gemmes 90 dage mere, som ovenfor.</li>
  <li><strong>Sletter du din konto</strong> (Profil → Konto → Slet min konto), sletter vi med det samme dine beskeder og deres billeder, dine likes og de andres likes på dine beskeder, dine stemmer, dit navn og profilbillede, dit medlemskab af alle events, dine blokeringer og rapporter og dine indstillinger — og events, hvor du var den sidste. Det, andre har lagt op, bliver hos dem. Events, afstemninger, beslutninger og opgaver, du har oprettet, fortsætter uden dit navn, og tekst, du har skrevet i fælles ting som et events navn, en afstemning eller en beslutning, bliver stående. Andres beskeder holder op med at pege på dig, når de nævner dig (dit navn, som de skrev det, bliver stående i deres besked, som er deres), og du tages af de opgaver, du var sat på. Rapporter om dit indhold beholdes uden dit bruger-id. Til sidst slettes selve kontoen.</li>
</ul>

<h2>Retsgrundlag</h2>
<p>Vi behandler dine data for at levere den tjeneste, du har bedt om (GDPR art. 6, stk. 1, litra b). Beskyttelse mod misbrug, behandling af rapporter, tekniske logfiler og den anonyme brugsstatistik sker på grundlag af vores legitime interesse i en sikker app, der virker (art. 6, stk. 1, litra f).</p>

<h2 id="da-web">Hjemmesiden after-stories.com</h2>
<p>Dette afsnit gælder kun hjemmesiden.</p>

<h3>Besked, når vi lancerer</h3>
<p>Udfylder du formularen “Get an email when we launch” (få en e-mail, når vi lancerer), gemmer vi:</p>
<ul>
  <li>dit <strong>navn</strong> og din <strong>e-mailadresse</strong>;</li>
  <li>den <strong>side</strong>, du tilmeldte dig fra, så vi kan se, hvilken slags event der bragte dig hertil.</li>
</ul>
<p>Vi bruger dem til at sende dig <strong>én e-mail for at bekræfte din adresse</strong> og, når du har bekræftet, <strong>én e-mail, når After Stories er i App Store</strong>. Intet andet. Bekræfter du aldrig, får du aldrig lancerings-e-mailen. Vi sælger eller deler ikke dine oplysninger, og vi sætter dig ikke på nogen anden liste.</p>
<p>Det gør vi, fordi du har bedt om det (dit samtykke, GDPR art. 6, stk. 1, litra a). Du kan trække det tilbage når som helst.</p>

<h3>Hvor det ligger, og hvor længe</h3>
<ul>
  <li>Din tilmelding gemmes på <strong>vores egen server i EU</strong>, i en tabel, som ingen besøgende kan læse.</li>
  <li>Bekræftelses-e-mailen sendes via <strong>Brevo</strong>, en e-mailtjeneste i EU.</li>
  <li>Vi gemmer din tilmelding i <strong>højst et år</strong> og sletter den derefter.</li>
  <li>Som enhver webserver fører vores server en <strong>log over forespørgsler</strong>, også med din IP-adresse, i kort tid, for at holde tjenesten kørende og stoppe misbrug.</li>
</ul>

<h3>Sådan bliver du fjernet</h3>
<p>Skriv til <a href="mailto:support@12f.dk">support@12f.dk</a> fra den adresse, du tilmeldte dig med, så sletter vi din tilmelding.</p>

<h3>Når du besøger hjemmesiden</h3>
<ul>
  <li>Hjemmesiden ligger hos <strong>GitHub Pages</strong>. GitHub behandler din IP-adresse for at levere siderne; se <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHubs privatlivserklæring</a>.</li>
  <li>Vi tæller besøg med <strong>Umami</strong>, som vi selv driver. Det sætter ingen cookies og gemmer hverken din IP-adresse eller noget andet, der kan identificere dig.</li>
  <li>Skrifttyperne hentes fra denne hjemmeside, ikke fra en skrifttjeneste.</li>
  <li>Dit valg af lyst eller mørkt tema huskes i din egen browser og sendes aldrig til os.</li>
</ul>

<h2>Dine rettigheder</h2>
<p>Du har ret til indsigt, til at få rettet og slettet dine data, til begrænsning af behandlingen, til dataportabilitet og til at gøre indsigelse. Navn og billede retter du selv i appen, og sletning sker direkte i appen. Alt andet: skriv til <a href="mailto:support@after-stories.com">support@after-stories.com</a>. Du kan klage til Datatilsynet, <a href="https://www.datatilsynet.dk">datatilsynet.dk</a>.</p>

<h2>Alder</h2>
<p>AFTER er for personer på 17 år og derover.</p>

<h2>Ændringer</h2>
<p>Ændrer vi, hvordan vi behandler data, opdaterer vi denne side og datoen øverst.</p>
</article>

<hr>

<article id="en" lang="en">
<h1>AFTER privacy policy</h1>
<p class="meta">Last updated ${PRIVACY_UPDATED_EN}</p>
<p>It covers the app AFTER and the website after-stories.com. What applies only to the website is under <a href="#en-web">The website after-stories.com</a>.</p>

<h2>In short</h2>
<ul>
  <li>AFTER is a private app for one event with a group of friends — a night out, a trip, a party. What you post can only be seen by the people in the event — no public feed, no followers, no search.</li>
  <li>An event is deleted for everyone 48 hours after it ends.</li>
  <li>Your data lives on our own server in the EU (Stockholm, Sweden).</li>
  <li>We never use your location, your contacts or advertising identifiers. We don't sell data, and we don't track you across apps. The app sends anonymous usage statistics that can't be traced back to you, and you can turn them off.</li>
  <li>You can delete your account and your messages, photos and likes right in the app.</li>
</ul>

<h2>Who is responsible</h2>
<p>The data controller is <strong>12f ApS</strong>, Denmark. Questions about your data: <a href="mailto:support@after-stories.com">support@after-stories.com</a>.</p>

<h2>What we store, and why</h2>
<ul>
  <li><strong>Your account.</strong> You sign in with Apple. We receive a user id, the email address Apple gives us — often an anonymous relay address from Apple — and, the first time, the name you share with Apple, as a suggestion for your name in the app. We only use that email address to tell you if your account is suspended or opened again, and never show it.</li>
  <li><strong>Technical details.</strong> While you're signed in, the server keeps your session: IP address, country, device and operating-system name, and when it was last used. It's used for sign-in and security, and deleted when you sign out or delete your account. The server also keeps technical logs for operations and troubleshooting.</li>
  <li><strong>Your settings.</strong> Which version of the <a href="/terms/">terms</a> you accepted, and when; which messages you want to be notified about; and which events you've turned notifications off for or removed from Home. They're kept on your account, so a new phone knows them, and deleted with the account.</li>
  <li><strong>Your profile.</strong> The name you choose, and your profile picture if you add one. Only the people in your events can see them.</li>
  <li><strong>Events.</strong> The event's name, who is in it, who created it, when it was started and ended, and the time zone it takes place in.</li>
  <li><strong>What you post.</strong> Messages — text, photos and places — and who you mention with @. Likes. Polls, their options and the votes. Decisions and tasks: what you decided, who does what, and whether it's done. <strong>Every photo is cleaned on your phone before it is sent</strong>: location and all camera data are removed.</li>
  <li><strong>Places.</strong> A place is a restaurant, a bar or an address that you choose: a name, an address and a link to Apple Maps. Never anybody's position — the app stores no coordinates.</li>
  <li><strong>Camera and photos.</strong> Only when you choose to — to take a photo, pick photos or scan an invite QR code. We only get the photos you pick. If you tap <em>Save all photos</em>, the app only asks to add photos to your library; it can't see the rest of it.</li>
  <li><strong>Blocks and reports.</strong> Who you've blocked, and messages you've reported with the reason you chose. Only you can see them — and we do, when we handle a report. If your message is reported, we keep the report with a reference to the message and your user id. If your report leads to a suspension, the log notes that it came from your report.</li>
  <li><strong>Moderation.</strong> 12f reviews reported content, and gets an email for every new report with its id and reason — never the content or who it is about. To do so we see only the reported message and its photos, its author's name in the event and up to five messages before and after it with their senders' names (no photos) — nothing else from the event. Content that breaks the terms is removed. An account that breaks the terms may be <strong>suspended</strong>: it can't sign in, and we write to the account's email address with the reason (see <a href="https://after.12f.dk/account/suspended">Your account is suspended</a>). What we did — who at 12f, what, to which content or account, why and when — is logged and kept for 2 years; how a report was handled is kept for 1 year. Opening a report or an account at 12f is logged too (ids only, never the content). If an account is deleted, its id is removed from that log — but who at 12f acted stays, for accountability of moderation (our legitimate interest, Art. 6(1)(f)). A suspended account can't be deleted in the app: write to <a href="mailto:support@after-stories.com">support@after-stories.com</a> and we'll delete it.</li>
  <li><strong>Abuse protection.</strong> Counters for wrong invite codes and for how many events are created, so nobody can guess their way into an event or flood the server. They're kept for up to two days and removed at the next clean-up after that.</li>
</ul>
<p><strong>Notifications.</strong> If you turn notifications on, we store your phone's push token so we can send them through Apple; it's deleted when you sign out or delete your account. To send each notification only once, the server notes that it was sent to you (no content); the note is kept for 1–7 days, for a task up to 92 days, and deleted with the account. You can be told about new messages, when you're mentioned, when you're given a task, when the summary is ready the morning after, and 12 hours before an event is deleted. A notification about a message shows the event's name, the sender's first name and the message's text; one about a task shows the task. Whether they show on your lock screen is up to your iOS settings (Show Previews). In the app you choose whether you're told about every message, only when you're mentioned, or none, and you can turn notifications off for a single event. Reminders the app sets itself are local notifications on your phone; they're not sent through us. The app keeps a copy of your events' content on the phone so it works offline; it stays if you sign out, and is deleted from the phone you delete your account on. On another phone, delete the app to remove it.</p>

<h2>Who can see it</h2>
<p>Content in an event can only be read by the people in it. The server enforces that, not just the app. Other users, search engines and the public cannot see it. We don't look at your content unless someone reports it or the law requires it.</p>

<h2>Where it lives, and who helps us</h2>
<ul>
  <li><strong>Our server</strong> runs in an Oracle Cloud data centre in Stockholm, Sweden (EU). This is where all accounts, events, messages and photos are stored.</li>
  <li><strong>Apple</strong> provides sign-in (Sign in with Apple) and delivers notifications (Apple Push Notification service). If you search for a place, your search text goes to Apple Maps — without your location.</li>
  <li><strong>Cloudflare</strong> serves the invite page on after.12f.dk and sits in front of the website after-stories.com, where this page lives, and processes your IP address to deliver them. We log nothing about you there.</li>
  <li><strong>Brevo</strong> (France, EU) sends the email if your account is suspended or opened again.</li>
  <li><strong>PostHog</strong> receives the app's anonymous usage statistics and crash reports and stores them in its EU cloud (Frankfurt, Germany). See <a href="#en-statistics">Statistics</a>.</li>
</ul>
<p>Everything you post is stored in the EU. Sign-in, notifications and place search go through Apple, which handles them under its own terms, also outside the EU.</p>

<h2 id="en-statistics">Statistics</h2>
<p>To see what works and to fix bugs, the app sends <strong>anonymous usage statistics</strong> to PostHog: which steps are used (for example that an event was created, that someone voted, that a message was sent with or without a photo), and <strong>crash reports</strong> when the app fails. With them go the app version, the phone model, the iOS version and language, and a random id the app makes on your phone.</p>
<ul>
  <li><strong>Never content.</strong> No text, no photos, no names, no event name, no place name and nothing anyone wrote. No screen recording.</li>
  <li><strong>Not linked to you.</strong> The random id is not your user id, and we never connect it to your account, your name or your email. Your IP address reaches PostHog as part of the connection, but it is not stored, and no location is derived from it.</li>
  <li><strong>You can say no.</strong> Turn off <em>Share anonymous usage statistics</em> under Profile → Account. The app then sends nothing more. Because the data isn't linked to you, we can't look it up or delete it for one person — and it isn't deleted with your account.</li>
  <li>This rests on our legitimate interest in improving the app and fixing bugs (Art. 6(1)(f)). It isn't used for advertising and isn't shared with anyone else.</li>
</ul>
<p>On our own server we count, once a day, how much AFTER is used — for example the number of new accounts, events, messages, photos and polls. These are only totals for the whole app: no content, no names and nothing about who did what. The totals are not deleted with events.</p>

<h2>What we never do</h2>
<ul>
  <li>No location — the app never asks for your location, and no coordinates are stored.</li>
  <li>No access to your contacts.</li>
  <li>No advertising, no advertising identifiers, no tracking across apps and websites, no screen recording.</li>
  <li>No selling or lending of data.</li>
  <li>No public profiles, followers or searching for other users.</li>
</ul>

<h2>How long</h2>
<ul>
  <li><strong>An event is deleted for everyone 48 hours after it ends</strong> — messages, photos, likes, polls, decisions and tasks, the event itself and every membership of it. <strong>Reports</strong> about its content are kept 90 days more — ids, the reason chosen and the time only, never the content — so a report can't vanish before we've handled it (our legitimate interest, Art. 6(1)(f)). 12 hours before, everyone in it who hasn't turned its notifications off gets a notification so they can save the photos to their phone. An event that was never started is deleted 90 days after it was created. Whoever created the event can also delete it at once (Delete event). What you saved to your own photo library is never touched.</li>
  <li>If you delete one of your messages, it disappears for everyone, and its text and photos are deleted. All that is left is an empty marker of who wrote a message and when, so the others' likes don't point at nothing.</li>
  <li>If you leave an event, what you posted stays in it, and the others can still see your name and picture next to it. When the last person leaves an event, it is deleted with everything in it. Reports about its content are kept 90 days more, as above.</li>
  <li><strong>If you delete your account</strong> (Profile → Account → Delete my account), we immediately delete your messages and their photos, your likes and the others' likes on your messages, your votes, your name and profile picture, your membership of every event, your blocks and reports and your settings — and events where you were the last member. What others posted stays with them. Events, polls, decisions and tasks you created carry on without your name, and text you wrote into shared things, such as an event's name, a poll or a decision, stays. Other people's messages stop pointing to you where they mention you (your name as they typed it stays in their message, which is theirs), and you're taken off the tasks you were on. Reports about your content are kept without your user id. Finally the account itself is deleted.</li>
</ul>

<h2>Legal basis</h2>
<p>We process your data to provide the service you asked for (GDPR Art. 6(1)(b)). Abuse protection, handling reports, technical logs and the anonymous usage statistics rest on our legitimate interest in a safe app that works (Art. 6(1)(f)).</p>

<h2 id="en-web">The website after-stories.com</h2>
<p>This part covers only the website.</p>

<h3>Getting notified when we launch</h3>
<p>If you fill in the “Get an email when we launch” form, we collect:</p>
<ul>
  <li>your <strong>name</strong> and <strong>email address</strong>;</li>
  <li>the <strong>page</strong> you signed up from, so we can see which kind of event brought you here.</li>
</ul>
<p>We use them to send you <strong>one email to confirm your address</strong>, and once you've confirmed, <strong>one email when After Stories is in the App Store</strong>. Nothing else. If you never confirm, you never get the launch email. We don't sell or share your details, and we don't add you to any other list.</p>
<p>We do this because you asked us to (your consent, GDPR Art. 6(1)(a)). You can withdraw it at any time.</p>

<h3>Where it's kept, and for how long</h3>
<ul>
  <li>Your sign-up is stored on <strong>our own server in the EU</strong>, in a table no visitor can read.</li>
  <li>The confirmation email is sent through <strong>Brevo</strong>, an email service based in the EU.</li>
  <li>We keep your sign-up for <strong>at most one year</strong>, then delete it.</li>
  <li>Like any web server, ours keeps a <strong>request log</strong>, including your IP address, for a short period, to keep the service running and stop abuse.</li>
</ul>

<h3>Being removed</h3>
<p>Email <a href="mailto:support@12f.dk">support@12f.dk</a> from the address you signed up with, and we'll delete your sign-up.</p>

<h3>Visiting the website</h3>
<ul>
  <li>The site is hosted on <strong>GitHub Pages</strong>. GitHub processes your IP address to deliver the pages; see <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub's privacy statement</a>.</li>
  <li>We count visits with <strong>Umami</strong>, which we run ourselves. It sets no cookies and doesn't store your IP address or anything that identifies you.</li>
  <li>The fonts are served from this site, not from a font service.</li>
  <li>Your choice of light or dark theme is remembered in your own browser and never sent to us.</li>
</ul>

<h2>Your rights</h2>
<p>You have the right to access, rectify and erase your data, to restrict processing, to data portability and to object. You correct your name and photo yourself in the app, and deletion happens right in the app. Anything else: write to <a href="mailto:support@after-stories.com">support@after-stories.com</a>. You can complain to the Danish Data Protection Agency, <a href="https://www.datatilsynet.dk">datatilsynet.dk</a>.</p>

<h2>Age</h2>
<p>AFTER is for people aged 17 and over.</p>

<h2>Changes</h2>
<p>If we change how we process data, we update this page and the date at the top.</p>
</article>
`;
