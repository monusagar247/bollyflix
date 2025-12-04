import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from '@next/third-parties/google'


const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bollyflix300 - Latest Films, Tv Series & Release Updates 2025",
    template: "%s | Bollyflix300"
  },
  description:
    "Bollyflix300 brings you the latest films, TV series updates, 2025 release news, trailers, reviews, cast info, OTT updates, and box office insights.",
  keywords: [
    "bollyflix300",
    "top movies 2025",
    "new Hollywood movies 2025",
    "upcoming Bollywood movies 2025",
    "south indian movies",
    "upcoming movies",
    "latest movie reviews",
    "latest movie trailers",
    "movie trailers",
    "ott releases 2025",
    "hindi movies review",
  ],
  openGraph: {
    title: "Bollyflix300 - Latest Films, Tv Series & Release Updates 2025",
    description:
      "Read the latest movie updates, ratings, and trailers from Bollywood, Hollywood, and South Indian cinema on bollyflix300.",
    url: "https://www.bollyflix300.in",
    siteName: "bollyflix300",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.bollyflix300.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bollyflix300",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bollyflix300 - Latest Films, Tv Series & Release Updates 2025",
    description:
      "Get honest reviews, updates & critic scores, and the latest updates from Bollywood, Hollywood, and South cinema.",
    images: [""],
  },
  metadataBase: new URL("https://www.bollyflix300.in"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5036750120250042"
      crossOrigin="anonymous"></script>
      <body
        className={`${lato.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Navbar/>
         <main className="text-white">
          {children}
        </main>
        <Footer/>
      </body>
      <GoogleAnalytics gaId="G-78ETZ580M6" />
    </html>
  );
}
