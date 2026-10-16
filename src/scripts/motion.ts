// The motion layer. Each [data-reveal] block lifts its children in turn the first time it comes
// into view; [data-flow] (the "many into one" diagram) gathers its dots. The classes only hide
// anything once this script runs (html.js is set inline in Base.astro), and every block shows
// at once if IntersectionObserver is missing.
const blocks = document.querySelectorAll<HTMLElement>("[data-reveal], [data-flow]");

for (const block of blocks) {
  if (block.hasAttribute("data-reveal")) {
    Array.from(block.children).forEach((child, i) => (child as HTMLElement).style.setProperty("--i", String(i)));
  }
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px" },
  );
  blocks.forEach((b) => observer.observe(b));
} else {
  blocks.forEach((b) => b.classList.add("is-in"));
}
