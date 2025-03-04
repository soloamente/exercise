import "@/styles/globals.css";

import { type Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { Preferences } from "@/components/ui/preferences";

const ingramMono = localFont({
  src: "../../public/fonts/IngramMono-Regular.ttf",
  variable: "--font-ingram",
});

const Inter = localFont({
  src: "../../public/fonts/InterVariable.ttf",
  variable: "--font-inter",
  fallback: ["sans-serif"],
});

export const metadata: Metadata = {
  title: "Exercise",
  description: "Exercise for Dataweb Group",
  icons: { icon: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${Inter.variable} ${ingramMono.variable} font-inter scroll-smooth`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Preferences />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
