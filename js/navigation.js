// Highlights the sidebar link for the section currently in view.
document.addEventListener("DOMContentLoaded", () => {
  const links = [...document.querySelectorAll(".sidebar-nav a[href^='#']")];
  const sections = links
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || sections.length === 0) return;

  const observer = new IntersectionObserver(entries => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    links.forEach(link => {
      const active = link.getAttribute("href") === `#${visible.target.id}`;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }, { rootMargin: "-15% 0px -70% 0px", threshold: [0, 0.2, 0.5] });

  sections.forEach(section => observer.observe(section));
});
