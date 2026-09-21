# Red Deer Reavers website

Public team website and lightweight team administration for the Red Deer Reavers in Central Alberta.

## Architecture

- Static HTML, CSS, and JavaScript hosted on GitHub Pages
- Supabase PostgreSQL for practices, events, roster, site settings, and community inquiries
- Supabase Edge Function `reavers-site-api` for public data and the password protected admin workflow
- Progressive Web App manifest and service worker for installable mobile use
- GitHub Actions production build and quality checks

## Open source tooling

The site intentionally stays framework free while using focused libraries where they directly improve it:

- **Sharp** generates responsive WebP versions of every gallery photo during deployment.
- **PhotoSwipe** powers the mobile friendly, swipe and zoom media gallery.
- **SortableJS** lets Admin drag and save roster ordering.
- **Add to Calendar Button** gives public events Apple, Google, iCal, Microsoft, Outlook, and Yahoo calendar actions.
- **node-qrcode** generates printable SVG QR codes for the website, Join, Community, and Events pages.
- **Lighthouse CI** checks performance, accessibility, best practices, and SEO.
- **Pa11y CI** runs WCAG 2 AA accessibility checks against every public page.
- **Lychee** validates internal links in the built site.

Dependencies are pinned in `package.json`. Browser libraries are copied into the production artifact during `npm run build`; Node development tooling is never deployed.

## Build

```
npm install
npm run build
npm run check
```

The production output is written to `_site/`. GitHub Pages deploys only that directory.

## Public pages

- `index.html` team hub
- `team.html` opt in public team profiles
- `training.html` practice information and newcomer flow
- `events.html` tournaments, appearances, schedule, and calendar actions
- `community.html` schools, demos, events, birthdays, and partnership inquiries
- `media.html` optimized PhotoSwipe team gallery

## Admin

Open `admin.html` to manage:

- Events
- Roster profiles, public visibility, and drag ordering
- Recurring practices
- Community inquiries
- Printable/downloadable QR codes
- Basic site settings

Routine content changes are designed to be made from Admin rather than by editing site files.
