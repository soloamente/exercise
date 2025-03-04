import "@/styles/globals.css";

import { type Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { Preferences } from "@/components/ui/preferences";
import { ReactLenis } from "lenis/react";
import Navbar from "@/components/ui/navbar";

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
      data-oid="vz18qdv"
    >
      <body data-oid="edp_72r">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          data-oid=".s8mcop"
        >
          <ReactLenis
            root
            options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}
            data-oid="h5oq3s0"
          >
            <Preferences data-oid="sgozbwx" />
            <Navbar />
            {children}
          </ReactLenis>
        </ThemeProvider>
      </body>
    </html>
  );
}
