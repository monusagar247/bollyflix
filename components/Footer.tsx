import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";

const LINKS = [
  { label: "Latest Reviewes", href: "/latest-reviews" },
  { label: "Movies", href: "/movies" },
  { label: "TV Series", href: "/tv-series" },
  { label: "Contact us", href: "/contact-us" },
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "About us", href: "/about-us" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-(--text-color) bg-(--other-element-color) border-t border-slate-800 mt-4">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <p className="text-(--text-color) mb-6 leading-relaxed">
          <strong>Disclaimer:</strong> Bollyflix300 publishes film and
          web-series reviews, news, and industry updates only. All images,
          posters, and media used on this website are for informational purposes
          and remain the property of their respective owners under fair-use
          guidelines. We do NOT host or provide access to any copyrighted files.
          Content data such as cast, ratings, and summaries is sourced from
          TMDB, and we are not endorsed or certified by TMDB.
        </p>
        <nav aria-label="Footer navigation" className="flex justify-center">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm md:text-base justify-center">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex items-center gap-2 hover:text-(--secondary-color) transition-colors"
                >
                  <span>{l.label}</span>
                  <span aria-hidden className="text-(--secondary-color)/60">
                    ›
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 flex justify-center">
          <ul className="flex items-center gap-4">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-white/8 hover:bg-white/12 transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-white/8 hover:bg-white/12 transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </li>

            <li>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-white/8 hover:bg-white/12 transition"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-8 border-t border-white/6 pt-6">
          <div className="max-w-3xl mx-auto text-center text-xs md:text-sm text-(--text-color)/80">
            <p>
              © {year} Bollyflix300. All rights reserved. &nbsp;
              <span className="mx-1">•</span>
              Data & images are provided by{" "}
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-(--secondary-color)"
              >
                TMDB
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
