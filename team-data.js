(() => {
  const API = "https://oztfcnrwrovzasftsdwa.supabase.co/functions/v1/reavers-site-api";
  const fallback = {
    season: "2026",
    organization: "Red Deer Reavers",
    location: "Central Alberta",
    contactEmail: "reddeerreavers@gmail.com",
    practice: {
      venue: "Springbrook Archery Centre",
      fee: "$10",
      sessions: [
        { day: 3, label: "Wednesday", time: "5:30 PM", end: "8:00 PM", venue: "Springbrook Archery Centre", fee: "$10" },
        { day: 0, label: "Sunday", time: "5:00 PM", end: "8:00 PM", venue: "Springbrook Archery Centre", fee: "$10" }
      ]
    },
    upcomingEvents: [],
    events: [],
    results: [],
    roster: [],
    updates: [
      { tag: "Recruiting", title: "New fighters are welcome", copy: "No armour or combat experience is required to start. Come meet the team and try the basics first.", href: "training.html#start", cta: "Start here" },
      { tag: "Training", title: "Two team practices every week", copy: "Wednesday evenings and Sunday evenings at Springbrook Archery Centre.", href: "training.html", cta: "Training details" },
      { tag: "Community", title: "Book the Reavers", copy: "Armoured combat demos, school sessions, markets, festivals, birthdays and community events.", href: "events.html#demos", cta: "Demo options" }
    ]
  };

  const formatClock = value => {
    if (!value) return "";
    const [h, m] = String(value).split(":").map(Number);
    if (!Number.isFinite(h) || !Number.isFinite(m)) return String(value);
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
  };

  const todayEdmonton = () => {
    const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Edmonton", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
    const map = Object.fromEntries(parts.map(part => [part.type, part.value]));
    return `${map.year}-${map.month}-${map.day}`;
  };

  const displayDate = value => {
    if (!value) return "Date TBA";
    const [y, m, d] = String(value).split("-").map(Number);
    if (!y || !m || !d) return String(value);
    return new Intl.DateTimeFormat("en-CA", { month: "short", day: "numeric", year: "numeric" }).format(new Date(y, m - 1, d));
  };

  window.REAVERS_DATA = fallback;
  window.REAVERS_API = API;
  window.REAVERS_DATA_PROMISE = (async () => {
    try {
      const response = await fetch(API, { headers: { Accept: "application/json" }, cache: "no-store" });
      if (!response.ok) throw new Error(`Reavers data request failed: ${response.status}`);
      const data = await response.json();
      const settings = data.settings || {};
      const practices = Array.isArray(data.practices) ? data.practices : [];
      const events = Array.isArray(data.events) ? data.events : [];
      const roster = Array.isArray(data.roster) ? data.roster : [];
      const today = todayEdmonton();
      const publicEvents = events
        .filter(item => item.event_date >= today)
        .sort((a, b) => `${a.event_date} ${a.start_time || ""}`.localeCompare(`${b.event_date} ${b.start_time || ""}`));
      const sessions = practices.map(item => ({
        id: item.id,
        day: Number(item.weekday),
        label: item.label,
        time: formatClock(item.start_time),
        end: formatClock(item.end_time),
        venue: item.venue,
        fee: item.fee || "$10"
      }));
      const mappedEvents = publicEvents.map(item => ({
        id: item.id,
        title: item.title,
        type: item.event_type,
        rawDate: item.event_date,
        date: displayDate(item.event_date),
        startTime: formatClock(item.start_time),
        endTime: formatClock(item.end_time),
        location: item.location || "",
        details: item.details || "",
        href: item.href || "events.html"
      }));
      return {
        ...fallback,
        season: settings.season || fallback.season,
        organization: settings.organization || fallback.organization,
        location: settings.location || fallback.location,
        contactEmail: settings.contact_email || fallback.contactEmail,
        practice: {
          venue: sessions[0]?.venue || fallback.practice.venue,
          fee: sessions[0]?.fee || fallback.practice.fee,
          sessions: sessions.length ? sessions : fallback.practice.sessions
        },
        upcomingEvents: mappedEvents,
        events: mappedEvents,
        roster: roster.map(member => ({
          id: member.id,
          name: member.name,
          role: member.role,
          discipline: member.discipline || "",
          bio: member.bio || "",
          photo: member.photo_url || "",
          isExample: Boolean(member.is_example)
        }))
      };
    } catch (error) {
      console.warn("Using built-in Reavers data fallback.", error);
      return fallback;
    }
  })();
})();
