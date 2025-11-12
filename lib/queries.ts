export const allMatches = `*[_type == "match"]{date, competitor, category, type, result, scoreFor, scoreAgainst, "eventTitle": event->title}`

export const allMedals = `*[_type == "medal"]{date, competitor, category, medal, "eventTitle": event->title}`

export const eventsByDate = `*[_type == "event" && published == true]|order(date desc){title, date, time, location, type, "slug": slug.current}`
