import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ClerkProviderWrapper from "@/providers/ClerkProviderWrapper";
import {
  getSafeClerkPublishableKey,
  isClerkDevBypassActive,
} from "@/lib/clerk";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YOOM",
  description: "Video calling App",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const isDevBypassActive = isClerkDevBypassActive();
  const publishableKey = getSafeClerkPublishableKey();

  if (isDevBypassActive) {
    console.warn(
      "[auth] ClerkProvider bypass is active in development because NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is missing or invalid. Add real Clerk keys in .env.local to re-enable auth."
    );
  }

  return (
    <html lang="en">
      <ClerkProviderWrapper publishableKey={publishableKey}>
        <body className={`${inter.className} bg-dark-2`}>
          <Toaster />
          {children}
        </body>
      </ClerkProviderWrapper>
    </html>
  );
}
