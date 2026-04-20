import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { isClerkDevBypassActive } from '@/lib/clerk';

const protectedRoute = createRouteMatcher([
  '/',
  '/upcoming',
  '/meeting(.*)',
  '/previous',
  '/recordings',
  '/personal-room',
]);

const isDevBypassActive = isClerkDevBypassActive();

if (isDevBypassActive) {
  console.warn(
    '[auth] Clerk middleware bypass is active in development because NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is missing or invalid. Add real Clerk keys in .env.local to re-enable auth.'
  );
}

const middleware =
  isDevBypassActive
    ? () => NextResponse.next()
    : clerkMiddleware((auth, req) => {
        if (protectedRoute(req)) auth().protect();
      });

export default middleware;

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
