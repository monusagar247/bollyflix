"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { usePathname } from "next/navigation";

type NavItem = { name: string; href?: string; children?: NavItem[] };

const CATEGORIES = [
  "Action","Adventure","Animation","Comedy","Crime","Documentary","Drama",
  "Family","Fantasy","History","Horror","Music","Mystery","Romance",
  "Science Fiction","TV Movie","Thriller","War","Western",
];

const NAV: NavItem[] = [
  { name: "Latest Reviewes", href: "/latest-reviews" },
  { name: "Movies", href: "/movies" },
  { name: "TV Series", href: "/tv-series" },
  {
    name: "Categories",
    children: CATEGORIES.map((c) => ({
      name: c,
      href: `/category/${c.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    })),
  },
  {
    name: "More",
    children: [
      { name: "Contact us", href: "/contact-us" },
      { name: "Privacy policy", href: "/privacy-policy" },
      { name: "Disclaimer", href: "/disclaimer" },
      { name: "About us", href: "/about-us" },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname() || "/";
  const [openDesktopIdx, setOpenDesktopIdx] = useState<number | null>(null);
  const [openMobile, setOpenMobile] = useState(false);
  const [mobileOpenIdx, setMobileOpenIdx] = useState<number | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) {
        setOpenDesktopIdx(null);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  useEffect(() => {
    setOpenMobile(false);
    setMobileOpenIdx(null);
    setOpenDesktopIdx(null);
    document.body.style.overflow = "";
  }, [pathname]);

  // Lock/unlock body scroll
  useEffect(() => {
    document.body.style.overflow = openMobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openMobile]);

  const toggleDesktop = (idx: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setOpenDesktopIdx((p) => (p === idx ? null : idx));
  };

  const toggleMobile = (idx: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setMobileOpenIdx((p) => (p === idx ? null : idx));
  };

  const isActive = (item: NavItem) =>
    (item.href && pathname === item.href) ||
    (item.children && item.children.some((c) => c.href === pathname));

  const closeMobileMenu = () => {
    setOpenMobile(false);
    setMobileOpenIdx(null);
    document.body.style.overflow = "";
  };

  return (
    <header className="sticky top-0 z-50">
      <nav
        ref={navRef}
        className="w-full bg-(--other-element-color) border-b border-slate-800 transition-all duration-200 backdrop-blur-lg"
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.png" alt="logo" width={35} height={35} />
              <span className="text-lg font-semibold text-white">Bollyflix300</span>
            </Link>

            <ul className="hidden lg:flex items-center gap-6">
              {NAV.map((item, idx) =>
                item.children ? (
                  <li key={item.name} className="relative">
                    <button
                      type="button"
                      onClick={(e) => toggleDesktop(idx, e)}
                      aria-expanded={openDesktopIdx === idx}
                      className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                    >
                      {item.name}
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openDesktopIdx === idx ? "rotate-180" : ""
                        }`} 
                      />
                    </button>

                    {openDesktopIdx === idx && (
                      <ul className="absolute right-0 mt-2 w-48 bg-[rgba(3,10,27,0.95)] rounded-lg py-2 max-h-72 overflow-y-auto z-50 border border-white/10 shadow-xl">
                        {item.children.map((c) => (
                          <li key={c.name}>
                            <Link 
                              href={c.href || "#"} 
                              className="block px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                              onClick={() => setOpenDesktopIdx(null)}
                            >
                              {c.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={item.name}>
                    <Link 
                      href={item.href!} 
                      className={`px-1 py-1 rounded transition-colors ${
                        isActive(item) ? "text-(--secondary-color)" : "text-white hover:text-gray-300"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                )
              )}

              <li>
                <Link 
                  href="/search" 
                  className="flex items-center gap-2 bg-(--secondary-color) text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
                >
                  <Search className="w-4 h-4" /> Search
                </Link>
              </li>
            </ul>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenMobile(!openMobile);
              }}
              className="lg:hidden text-white hover:text-gray-300 transition-colors"
              aria-label={openMobile ? "Close menu" : "Open menu"}
              aria-expanded={openMobile}
            >
              {openMobile ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {openMobile && (
        <div 
          className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-slate-900 overflow-y-auto z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-4 pb-6 pt-4">
            <ul className="space-y-2 text-white">
              <li>
                <Link 
                  href="/search" 
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 py-3 px-5 rounded-full font-medium bg-(--secondary-color) text-white hover:opacity-90 transition-opacity"
                >
                  <Search className="w-4 h-4" /> 
                  <span>Search</span>
                </Link>
              </li>

              {NAV.map((item, idx) => (
                <li key={item.name}>
                  {!item.children ? (
                    <Link 
                      href={item.href || "#"} 
                      onClick={closeMobileMenu}
                      className={`block w-full py-3 px-3 rounded-md transition-colors ${
                        isActive(item) 
                          ? "text-(--secondary-color) bg-slate-800/50" 
                          : "text-white hover:bg-slate-800"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <div>
                      <button
                        type="button"
                        onClick={(e) => toggleMobile(idx, e)}
                        aria-expanded={mobileOpenIdx === idx}
                        className={`w-full flex items-center justify-between py-3 px-3 rounded-md transition-colors ${
                          isActive(item)
                            ? "text-(--secondary-color) bg-slate-800/50"
                            : "text-white hover:bg-slate-800"
                        }`}
                      >
                        <span className="font-medium">{item.name}</span>
                        <ChevronDown 
                          className={`w-5 h-5 transition-transform duration-300 ${
                            mobileOpenIdx === idx ? "rotate-180" : ""
                          }`} 
                        />
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          mobileOpenIdx === idx ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <ul className="pl-4 mt-2 space-y-1 max-h-64 overflow-y-auto">
                          {item.children.map((c) => (
                            <li key={c.name}>
                              <Link
                                href={c.href || "#"}
                                onClick={closeMobileMenu}
                                className={`block py-2.5 px-3 rounded-md transition-colors ${
                                  pathname === c.href
                                    ? "text-(--secondary-color) bg-slate-800/70"
                                    : "text-gray-300 hover:bg-slate-800 hover:text-white"
                                }`}
                              >
                                {c.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}