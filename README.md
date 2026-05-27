# Next.js + Clerk + Neon Postgres Starter

A minimal starter for building authenticated apps with **Next.js 15**, **Clerk**, **Neon Postgres**, and **Prisma**.

## What's included

* **Next.js 15** (App Router, Turbopack)
* **Clerk** — sign-in modal, protected routes via middleware, `UserButton`
* **Neon Postgres** — serverless Postgres with Prisma Neon adapter
* **Prisma** — `User` model synced from Clerk webhooks; sample `Counter` model
* **Tailwind CSS 4** + **shadcn/ui** (Base UI)
* **Dark mode** via `next-themes`

## Prerequisites

* [Node.js](https://nodejs.org/) 20+
* [Clerk](https://clerk.com/) application
* [Neon](https://neon.tech/) database

## Getting started

1. **Clone and install**
```bash
git clone https://github.com/Vasumitra-Gajbhiye/starter-template-nextjs-clerk-neon-postgres.git
cd starter-template-nextjs-clerk-neon-postgres
npm install

```


2. **Environment variables**  
   Copy `.env.example` to `.env` and fill in:

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Neon pooled connection string |
| `DIRECT_URL` | Neon direct connection (for Prisma CLI) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `WEBHOOK_SECRET` | Clerk webhook signing secret |


3. **Database**
```bash
npx prisma migrate dev
npx prisma generate

```


4. **Clerk webhook**
Tunnel your app using ngrok to get an endpoint:
```text
ngrok http 3000
```

5. In the Clerk Dashboard, add a webhook endpoint:
```text
https://your-ngrok-domain.com/api/webhooks/clerk
```


Subscribe to `user.created`, `user.updated`, and `user.deleted`. Use the signing secret as `WEBHOOK_SECRET`.

6. **Run**
```bash
npm run dev

```


Open http://localhost:3000.

---

## Project structure

```text
src/
├── app/                        # App Router pages & API routes
│   └── api/webhooks/clerk/     # Clerk -> Prisma user sync
├── components/                 # UI components (shadcn)
├── generated/prisma/           # Generated Prisma client
├── lib/db.ts                   # Prisma + Neon client singleton
└── middleware.ts               # Clerk auth middleware
prisma/
└── schema.prisma               # User & Counter models

```

---

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma init` | Initialize Prisma |
| `npx prisma generate` | Generate Prisma client |
| `npx prisma db push` | Push schema to database |
| `npx prisma studio` | Open Prisma Studio |
| `ngrok http 3000` | Expose local port 3000 via ngrok |
