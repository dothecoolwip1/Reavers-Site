# Red Deer Reavers website

Public team website and lightweight team administration for the Red Deer Reavers in Central Alberta.

## Architecture

- Static HTML, CSS, and JavaScript hosted on GitHub Pages
- Supabase PostgreSQL for practices, events, roster, site settings, and community inquiries
- Supabase Edge Function `reavers-site-api` for public data and the password protected admin workflow
- Progressive Web App manifest and service worker for installable mobile use

## Public pages

- `index.html` team hub
- `team.html` opt in public team profiles
- `training.html` practice information and newcomer flow
- `events.html` tournaments, appearances, and schedule
- `community.html` schools, demos, events, birthdays, and partnership inquiries
- `media.html` team gallery

## Admin

Open `admin.html` to manage:

- Events
- Roster profiles and Show on website visibility
- Recurring practices
- Community inquiries
- Basic site settings

Routine content changes are designed to be made from Admin rather than by editing site files.
