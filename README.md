# Video Conferencing App

A modern video conferencing web app built with Next.js, Clerk authentication, and Stream Video SDK.

Repository: https://github.com/pragatipandey25/Video-Conferencing-App

## Overview

This project includes:

- Secure authentication with Clerk
- Instant and scheduled meetings
- Personal meeting rooms
- Upcoming and previous meetings views
- Meeting recordings list
- Stream-powered real-time video calls
- Responsive UI with Tailwind CSS + shadcn/ui

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Clerk (`@clerk/nextjs`)
- Stream Video SDK (`@stream-io/video-react-sdk`, `@stream-io/node-sdk`)
- Tailwind CSS
- shadcn/ui

## Project Structure

```text
actions/                 Server actions (token generation)
app/                     App Router pages/layouts
components/              Reusable UI + feature components
constants/               App constants
hooks/                   Custom React hooks
lib/                     Utility helpers (including Clerk key validation)
providers/               App providers (Clerk/Stream)
public/                  Static assets (icons/images)
middleware.ts            Route protection + dev bypass behavior
```

## Environment Variables

Create `.env.local` in the project root and add:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_STREAM_API_KEY=
STREAM_SECRET_KEY=

# Optional (used for invite links in UI)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Important Auth Note (Development)

This project has a development-safe auth bypass for invalid/missing Clerk publishable keys:

- `middleware.ts` bypasses route protection in development when the key is invalid.
- `lib/clerk.ts` validates key format and decodability to avoid Clerk `InvalidCharacterError` crashes.
- A safe fallback key is used only to keep provider initialization stable during dev bypass.

Use real Clerk keys in `.env.local` to fully enable authentication.

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/pragatipandey25/Video-Conferencing-App.git
cd Video-Conferencing-App
```

2. Install dependencies

```bash
npm install
```

3. Add `.env.local` variables (see above)

4. Start development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run Next.js linting
```

## Key Functional Areas

- Home dashboard with quick meeting actions
- Personal room flow (`/personal-room`)
- Upcoming meetings (`/upcoming`)
- Previous meetings (`/previous`)
- Recordings (`/recordings`)
- Meeting room by ID (`/meeting/[id]`)

## Deployment

For production deployment:

- Add valid Clerk and Stream keys in the hosting environment
- Set `NEXT_PUBLIC_BASE_URL` to your deployed URL
- Build and run using:

```bash
npm run build
npm run start
```

## Troubleshooting

- `InvalidCharacterError` from Clerk:
  - Ensure `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is a real valid Clerk key.
  - Placeholder values like `pk_test_xxxxx...` can fail base64 parsing.
- Stream token errors:
  - Verify `NEXT_PUBLIC_STREAM_API_KEY` and `STREAM_SECRET_KEY` are set correctly.
- Port already in use:
  - Next.js will auto-switch ports in development.
