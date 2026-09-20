const galleryImages = Array.from({ length: 22 }, (_, index) => `assets/gallery/image (${index + 1}).jpg`);

const events = [];

const faqs = [
  ["Do I need my own armor?", "No. You do not need to buy armor before trying the sport. Limited loaner gear may be available when fit permits, and the team can help you understand what to buy later if you decide to continue."],
  ["Do I need to be in great shape first?", "No. Buhurt is demanding, but practice is where you build sport specific fitness. Newcomers can scale drills, take breaks, and build capacity over time."],
  ["Am I going to get hit at my first practice?", "Not unless you choose an appropriate controlled drill after it has been explained. A first visit can be mostly watching, learning, movement work, and low intensity practice."],
  ["Is Buhurt safe?", "It is a full contact combat sport, so risk cannot be removed. Armor and weapons are checked, rules are enforced, and training is built around control, progression, and knowing when to stop."],
  ["Can my child join?", "The current fighter program is for adults 18 and older. The Reavers also take part in community and educational activities, and youth programming may be explored as the organization grows."],
  ["What happens after I decide to stay?", "The team can help you plan regular training, HACSA insurance, equipment, conditioning, and a realistic path toward armored practice and competition if that is your goal."],
  ["Can I just watch first?", "Absolutely. Message the team before practice so we can confirm the session is running, then come see what a real practice looks like before deciding whether to participate."],
  ["Do you do private demos or school events?", "Yes. Availability depends on the team calendar, but community demonstrations, educational sessions, photos, and event appearances are all things you can ask us about."]
];

const menuButton = document.querySelector("[data-menu-button]");
const menu = document.querySelector("[data-menu]");
const header = document.querySelector("[data-header]");
const year = document.querySelector("[data-year]");

if (year) year.textContent = new Date().getFullYear();

function setHeaderState() {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 20);
}

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const eventsRoot = document.querySelector("[data-events]");

if (eventsRoot) {
  if (events.length === 0) {
    eventsRoot.innerHTML = `
      <article class="event-card empty">
        <div>
          <p class="event-kicker">Next dates</p>
          <h3>New event details are coming.</h3>
          <p>We only post confirmed dates here so you are not planning around stale tournament information.</p>
        </div>
        <a class="button button-secondary" href="https://www.facebook.com/profile.php?id=61566406838469" target="_blank" rel="noreferrer">Check Facebook</a>
      </article>`;
  } else {
    eventsRoot.innerHTML = events.map(event => `
      <article class="event-card">
        <div>
          <p class="event-kicker">${event.date}</p>
          <h3>${event.title}</h3>
          <p>${event.description}</p>
        </div>
        ${event.url ? `<a class="text-button" href="${event.url}" target="_blank" rel="noreferrer">Event details →</a>` : ""}
      </article>`).join("");
  }
}

const galleryGrid = document.querySelector("[data-gallery-grid]");
const dialog = document.querySelector("[data-gallery-dialog]");
const dialogImage = document.querySelector("[data-gallery-image]");
const dialogCaption = document.querySelector("[data-gallery-caption]");
let currentGalleryIndex = 0;

function openGallery(index) {
  if (!dialog || !dialogImage || !dialogCaption) return;
  currentGalleryIndex = (index + galleryImages.length) % galleryImages.length;
  dialogImage.src = galleryImages[currentGalleryIndex];
  dialogImage.alt = `Red Deer Reavers photo ${currentGalleryIndex + 1}`;
  dialogCaption.textContent = `Photo ${currentGalleryIndex + 1} of ${galleryImages.length}`;
  if (!dialog.open) dialog.showModal();
}

function moveGallery(direction) {
  openGallery(currentGalleryIndex + direction);
}

if (galleryGrid) {
  galleryGrid.innerHTML = galleryImages.slice(0, 6).map((src, index) => `
    <button class="gallery-item" type="button" data-gallery-index="${index}" aria-label="Open Reavers photo ${index + 1}">
      <img src="${src}" alt="Red Deer Reavers photo ${index + 1}" loading="${index < 2 ? "eager" : "lazy"}">
    </button>`).join("");

  galleryGrid.addEventListener("click", event => {
    const button = event.target.closest("[data-gallery-index]");
    if (button) openGallery(Number(button.dataset.galleryIndex));
  });
}

document.querySelectorAll("[data-open-gallery]").forEach(button => {
  button.addEventListener("click", () => openGallery(Number(button.dataset.openGallery || 0)));
});

document.querySelector("[data-gallery-close]")?.addEventListener("click", () => dialog?.close());
document.querySelector("[data-gallery-prev]")?.addEventListener("click", () => moveGallery(-1));
document.querySelector("[data-gallery-next]")?.addEventListener("click", () => moveGallery(1));

dialog?.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

dialog?.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft") moveGallery(-1);
  if (event.key === "ArrowRight") moveGallery(1);
});

const faqRoot = document.querySelector("[data-faq-list]");

if (faqRoot) {
  faqRoot.innerHTML = faqs.map(([question, answer], index) => `
    <article class="faq-item${index === 0 ? " open" : ""}">
      <button class="faq-question" type="button" aria-expanded="${index === 0 ? "true" : "false"}">
        <span>${question}</span><span aria-hidden="true">${index === 0 ? "−" : "+"}</span>
      </button>
      <div class="faq-answer"><p>${answer}</p></div>
    </article>`).join("");

  faqRoot.addEventListener("click", event => {
    const button = event.target.closest(".faq-question");
    if (!button) return;
    const item = button.closest(".faq-item");
    const willOpen = !item.classList.contains("open");
    item.classList.toggle("open", willOpen);
    button.setAttribute("aria-expanded", String(willOpen));
    button.lastElementChild.textContent = willOpen ? "−" : "+";
  });
}

const joinForm = document.querySelector("[data-join-form]");

joinForm?.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(joinForm);
  const name = String(data.get("name") || "").trim();
  const contact = String(data.get("contact") || "").trim();
  const interest = String(data.get("interest") || "Trying a practice").trim();
  const message = String(data.get("message") || "").trim();
  const subject = encodeURIComponent(`Reavers website inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nBest contact: ${contact}\nInterested in: ${interest}\n\n${message}`);
  window.location.href = `mailto:reddeerreavers@gmail.com?subject=${subject}&body=${body}`;
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}
