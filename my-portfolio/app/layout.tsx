import "./global.css";
import type { Metadata } from "next";
import { Spectral, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://localhost:3000"),
  title: {
    default: "Zoey (Zhiyao) Shu",
    template: "%s | Zoey Shu",
  },
  description:
    "Zoey (Zhiyao) Shu — PhD student in Information Science & Technology at George Mason University. Computer vision and human–AI collaboration.",
  openGraph: {
    title: "Zoey (Zhiyao) Shu",
    description:
      "PhD student in Information Science & Technology at George Mason University. Computer vision and human–AI collaboration.",
    url: "https://localhost:3000",
    siteName: "Zoey's Research",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const cx = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(spectral.variable, jetbrainsMono.variable)}
      suppressHydrationWarning
    >
      <body className="antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
