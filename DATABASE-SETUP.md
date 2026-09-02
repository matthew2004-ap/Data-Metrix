# Adewale Insights — PostgreSQL + Prisma Setup

This project is prepared for Prisma ORM 7 + PostgreSQL. It includes the schema, Prisma client, seed script, database health check, and your 10 blog articles as seed data.

## 1. Install dependencies

```bash
npm install
```

## 2. Create your managed PostgreSQL database

Run:

```bash
npx create-db
```

Copy the direct `postgres://...` connection string returned by the command.

## 3. Configure the environment

Copy `.env.example` to `.env`:

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Then edit `.env` and replace `DATABASE_URL` with the private connection string returned by Prisma Postgres.

Do not commit `.env` to GitHub.

## 4. Create the tables

```bash
npm run db:migrate -- --name init
```

## 5. Generate Prisma Client

```bash
npm run db:generate
```

## 6. Seed the database

```bash
npm run db:seed
```

This creates/updates:

- 1 admin user record
- 9 categories (based on the article categories)
- 10 published blog posts
- Empty comment and subscriber tables ready for later features

The seed is safe to run again because users, categories and posts are upserted.

## 7. Test the connection

```bash
npm run db:test
```

You should see:

```text
Database connection: OK
Users: 1
Posts: 10
Categories: 9
```

## 8. Inspect the database

```bash
npm run db:studio
```

## 9. Start the blog

```bash
npm run dev
```

Database health endpoint:

```text
http://localhost:3000/api/health/db
```

## Important

The downloadable project does not contain a real cloud database credential. You must create/claim your own Prisma Postgres database and place its private connection string in `.env`. Never share that connection string publicly.
