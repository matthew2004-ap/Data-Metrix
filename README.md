# Adewale Insights — Personal Blog

A full-featured starter personal blog built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, next-themes and Lucide React.

## Run

```bash
npm install
npm run dev
```

Open <http://localhost:3000>

## Production

```bash
npm run build
npm start
```

For a fresh deployment, configure `DATABASE_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in the hosting provider's environment settings. Run `npx prisma migrate deploy` and `npm run db:seed` once against the production database before opening the site. To change an existing admin password, run `npm run db:set-password` locally with the production `DATABASE_URL`. Prisma Client is generated automatically during install.

## Included

- Responsive homepage
- Mobile navigation
- Light/dark theme
- Article search
- Category filtering
- 10 long-form starter articles
- Dynamic article routes
- Related articles
- Reading progress indicator
- Newsletter UI
- About section
- SEO metadata

## Content

Edit `data/posts.ts` to add or change articles.

## Next recommended phase

Connect PostgreSQL and an admin dashboard so articles can be created from the browser instead of editing TypeScript files.

## PostgreSQL database

This version is prepared for Prisma ORM 7 + managed PostgreSQL. See `DATABASE-SETUP.md` for the exact setup process. The database schema includes users, categories, posts, comments and subscribers, and the seed script imports the 10 existing articles.

> A real cloud database connection string cannot be bundled into a downloadable project. Create/claim your own Prisma Postgres database with `npx create-db`, then place the private connection string in `.env`.
