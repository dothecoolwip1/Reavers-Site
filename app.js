(async () => {
  const TEAM = await (window.REAVERS_DATA_PROMISE || Promise.resolve(window.REAVERS_DATA || {}));
  const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  const safeHref = value => {
    const href = String(value || "").trim();
    if (!href) return "#";
    if (/^(https?:|mailto:|#|[a-z0-9_.-]+\.html(?:[#?].*)?$)/i.test(href)) return href;
    return "#";
  };

  document.querySelectorAll("[data-year]").forEach(el => { el.textContent = String(new Date().getFullYear()); });
  document.querySelectorAll("[data-season]").forEach(el => { el.textContent = TEAM.season || "2026"; });

  function edmontonNow() {
    const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Edmonton", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
    const map = Object.fromEntries(parts.map(p => [p.type, p.value]));
    return new Date(Number(map.year), Number(map.month) - 1, Number(map.day), Number(map.hour), Number(map.minute), Number(map.second));
  }

  function parseClock(label) {
    const m = String(label).match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!m) return { hour: 17, minute: 0 };
    let hour = Number(m[1]) % 12;
    if (m[3].toUpperCase() === "PM") hour += 12;
    return { hour, minute: Number(m[2]) };
  }

  function getNextPractice() {
    const now = edmontonNow();
    const sessions = (TEAM.practice && TEAM.practice.sessions) || [];
    let best = null;
    for (const session of sessions) {
      const clock = parseClock(session.time);
      const d = new Date(now);
      const delta = (session.day - now.getDay() + 7) % 7;
      d.setDate(now.getDate() + delta);
      d.setHours(clock.hour, clock.minute, 0, 0);
      if (d <= now) d.setDate(d.getDate() + 7);
      if (!best || d < best.date) best = { ...session, date: d };
    }
    return best;
  }

  const practice = getNextPractice();
  if (practice) {
    const dateText = new Intl.DateTimeFormat("en-CA", { weekday: "short", month: "short", day: "numeric" }).format(practice.date).toUpperCase();
    document.querySelectorAll("[data-next-practice-date]").forEach(el => { el.textContent = dateText; });
    document.querySelectorAll("[data-next-practice-title]").forEach(el => { el.textContent = `${practice.label} practice`; });
    document.querySelectorAll("[data-next-practice-meta]").forEach(el => { el.textContent = `${practice.time} to ${practice.end} · ${practice.venue || TEAM.practice.venue}`; });
  }

  const practiceTimes = document.querySelector("[data-practice-times]");
  if (practiceTimes) {
    practiceTimes.innerHTML = (TEAM.practice?.sessions || []).map(session => `<div><span>${escapeHtml(String(session.label || "").slice(0, 3).toUpperCase())}</span><strong>${escapeHtml(session.time)}</strong><small>to ${escapeHtml(session.end)}</small></div>`).join("");
  }

  const practiceSchedule = document.querySelector("[data-practice-schedule]");
  if (practiceSchedule) {
    practiceSchedule.innerHTML = (TEAM.practice?.sessions || []).map(session => `<div class="schedule-row"><span>${escapeHtml(String(session.label || "").slice(0, 3).toUpperCase())}</span><strong>${escapeHtml(session.time)} to ${escapeHtml(session.end)}</strong></div>`).join("");
  }
  document.querySelectorAll("[data-practice-venue]").forEach(el => { el.textContent = TEAM.practice?.venue || "Springbrook Archery Centre"; });
  document.querySelectorAll("[data-practice-fee]").forEach(el => { el.textContent = TEAM.practice?.fee || "$10"; });

  function eventCard(event) {
    if (!event) return `<div class="hub-empty"><span class="status-dot"></span><div><strong>No public event confirmed</strong><small>The next tournament or demo will appear here once it is locked in.</small></div></div>`;
    return `<a class="hub-live" href="${escapeHtml(safeHref(event.href || "events.html"))}"><span class="hub-kicker">${escapeHtml(event.date || "Date TBA")}</span><strong>${escapeHtml(event.title || "Upcoming event")}</strong><small>${escapeHtml(event.location || "")}</small></a>`;
  }

  function resultCard(result) {
    if (!result) return `<div class="hub-empty"><span class="status-dot muted-dot"></span><div><strong>No result posted yet</strong><small>Competition results will stay here once entered.</small></div></div>`;
    return `<a class="hub-live" href="${escapeHtml(safeHref(result.href || "events.html"))}"><span class="hub-kicker">${escapeHtml(result.date || "Latest")}</span><strong>${escapeHtml(result.title || result.event || "Latest result")}</strong><small>${escapeHtml(result.result || "")}</small></a>`;
  }

  document.querySelectorAll("[data-upcoming-event]").forEach(el => { el.innerHTML = eventCard((TEAM.upcomingEvents || [])[0]); });
  document.querySelectorAll("[data-latest-result]").forEach(el => { el.innerHTML = resultCard((TEAM.results || [])[0]); });

  const eventList = document.querySelector("[data-event-list]");
  if (eventList) {
    const events = TEAM.events || [];
    eventList.innerHTML = events.length ? events.map(event => `<article class="public-event-card"><div class="public-event-date"><strong>${escapeHtml(event.date)}</strong>${event.startTime ? `<span>${escapeHtml(event.startTime)}${event.endTime ? ` to ${escapeHtml(event.endTime)}` : ""}</span>` : ""}</div><div><span class="event-type-pill">${escapeHtml(event.type || "event")}</span><h3>${escapeHtml(event.title)}</h3>${event.location ? `<p>${escapeHtml(event.location)}</p>` : ""}${event.details ? `<small>${escapeHtml(event.details)}</small>` : ""}</div></article>`).join("") : `<div class="roster-empty"><strong>No dates are posted yet.</strong><p>Confirmed tournaments, demos and team events will appear here automatically when they are added by the team.</p></div>`;
  }

  const updatesEl = document.querySelector("[data-team-updates]");
  if (updatesEl) {
    const updates = TEAM.updates || [];
    updatesEl.innerHTML = updates.map(item => `<a class="news-card" href="${escapeHtml(safeHref(item.href || "#"))}"><span>${escapeHtml(item.tag || "Update")}</span><h3>${escapeHtml(item.title || "")}</h3><p>${escapeHtml(item.copy || "")}</p><b>${escapeHtml(item.cta || "Read more")} →</b></a>`).join("");
  }

  const rosterGrid = document.querySelector("[data-roster-grid]");
  if (rosterGrid) {
    const roster = TEAM.roster || [];
    if (roster.length) {
      rosterGrid.innerHTML = roster.map(member => {
        const initials = String(member.name || "R").split(/\s+/).map(part => part[0]).join("").slice(0, 2).toUpperCase();
        const media = member.photo ? `<img src="${escapeHtml(member.photo)}" alt="${escapeHtml(member.name)}" loading="lazy" decoding="async">` : `<div class="roster-placeholder" aria-hidden="true"><img src="assets/reavers-logo.jpg" alt=""><b>${escapeHtml(initials)}</b></div>`;
        return `<article class="roster-card">${media}<div><span>${escapeHtml(member.role || "Team member")}</span><h3>${escapeHtml(member.name)}</h3>${member.discipline ? `<p>${escapeHtml(member.discipline)}</p>` : ""}${member.bio ? `<small class="roster-bio">${escapeHtml(member.bio)}</small>` : ""}${member.isExample ? `<em class="sample-profile">Sample profile</em>` : ""}</div></article>`;
      }).join("");
    } else {
      rosterGrid.innerHTML = `<div class="roster-empty"><strong>Roster profiles are coming.</strong><p>The team can add fighters, support crew and leadership from the admin page.</p></div>`;
    }
  }
  document.querySelectorAll("[data-roster-count]").forEach(el => {
    const count = (TEAM.roster || []).length;
    el.textContent = count ? String(count) : "Team";
  });

  const galleryImages = Array.from({ length: 22 }, (_, i) => `assets/gallery/image (${i + 1}).jpg`);
  const galleryGrid = document.querySelector("[data-gallery-grid]");
  const galleryDialog = document.querySelector("[data-gallery-dialog]");
  const galleryImage = document.querySelector("[data-gallery-image]");
  const galleryCaption = document.querySelector("[data-gallery-caption]");
  let galleryIndex = 0;
  function renderGallery(index) {
    if (!galleryDialog || !galleryImage || !galleryCaption) return;
    galleryIndex = (index + galleryImages.length) % galleryImages.length;
    galleryImage.src = galleryImages[galleryIndex];
    galleryImage.alt = `Red Deer Reavers photo ${galleryIndex + 1}`;
    galleryCaption.textContent = `${galleryIndex + 1} / ${galleryImages.length}`;
  }
  function openGallery(index) {
    renderGallery(index);
    if (galleryDialog && !galleryDialog.open) galleryDialog.showModal();
  }
  if (galleryGrid) {
    galleryGrid.innerHTML = galleryImages.map((src, index) => `<button class="gallery-button" type="button" data-gallery-index="${index}" aria-label="Open Reavers photo ${index + 1}"><img src="${src}" alt="Red Deer Reavers photo ${index + 1}" loading="${index < 2 ? "eager" : "lazy"}" decoding="async"></button>`).join("");
    galleryGrid.addEventListener("click", event => {
      const button = event.target.closest("[data-gallery-index]");
      if (button) openGallery(Number(button.dataset.galleryIndex));
    });
  }
  document.querySelector("[data-gallery-close]")?.addEventListener("click", () => galleryDialog?.close());
  document.querySelector("[data-gallery-prev]")?.addEventListener("click", () => renderGallery(galleryIndex - 1));
  document.querySelector("[data-gallery-next]")?.addEventListener("click", () => renderGallery(galleryIndex + 1));
  galleryDialog?.addEventListener("click", event => { if (event.target === galleryDialog) galleryDialog.close(); });
  galleryDialog?.addEventListener("keydown", event => { if (event.key === "ArrowLeft") renderGallery(galleryIndex - 1); if (event.key === "ArrowRight") renderGallery(galleryIndex + 1); });
  let touchX = null;
  galleryDialog?.addEventListener("touchstart", event => { touchX = event.changedTouches[0]?.clientX ?? null; }, { passive: true });
  galleryDialog?.addEventListener("touchend", event => {
    if (touchX === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchX;
    const delta = endX - touchX;
    if (Math.abs(delta) > 55) renderGallery(galleryIndex + (delta < 0 ? 1 : -1));
    touchX = null;
  }, { passive: true });

  const joinForm = document.querySelector("[data-join-form]");
  joinForm?.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(joinForm);
    const name = String(data.get("name") || "").trim();
    const contact = String(data.get("contact") || "").trim();
    const interest = String(data.get("interest") || "Trying a practice").trim();
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(`Reavers inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nBest contact: ${contact}\nInterested in: ${interest}\n\n${message}`);
    window.location.href = `mailto:${TEAM.contactEmail || "reddeerreavers@gmail.com"}?subject=${subject}&body=${body}`;
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }
})();
