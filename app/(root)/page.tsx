import type { Metadata } from "next";
export const dynamic = "force-dynamic";

import { MovieCarousel } from "@/components/MovieCarousel";
import Link from "next/link";
import {
  fetchLatestMovies,
  fetchTVShows,
  fetchHindiMovies,
  fetchEnglishMovies,
  fetchMoviesByCategory,
} from "@/lib/api";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.bollyflix300.in/",
  },
};

export default async function Page() {

  const results = await Promise.allSettled([
    fetchLatestMovies(),
    fetchTVShows(),
    fetchHindiMovies(),
    fetchEnglishMovies(),
    fetchMoviesByCategory("Action"),
    fetchMoviesByCategory("Comedy"),
  ]);

  const latestMovies =
    results[0].status === "fulfilled" ? results[0].value : [];

  const tvShows =
    results[1].status === "fulfilled" ? results[1].value : [];

  const hindiMovies =
    results[2].status === "fulfilled" ? results[2].value : [];

  const englishMovies =
    results[3].status === "fulfilled" ? results[3].value : [];

  const actionMovies =
    results[4].status === "fulfilled" ? results[4].value : [];

  const comedyMovies =
    results[5].status === "fulfilled" ? results[5].value : [];

  return (
    <div className="home-wrapper space-y-8">

      <header className="w-full py-8 sm:py-12 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">

          <h2 className="text-base sm:text-xl md:text-2xl text-(--text-color) mb-2 sm:mb-3">
            Never Compromise with Quality
          </h2>

          <h1 className="hero-animate text-3xl sm:text-4xl md:text-5xl font-bold text-(--text-color) mb-3 sm:mb-4">
            Bollyflix300
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-2">
            Get details about your favourite movies, TV shows & web series instantly.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap justify-center gap-3 sm:gap-4 max-w-3xl mx-auto">

            <Link
              href="/movies"
              className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg bg-(--other-element-color) text-(--text-color) text-sm sm:text-base border border-white/10 hover:bg-(--secondary-color) hover:text-white transition-all duration-300 text-center font-medium"
            >
              Hindi Movies
            </Link>

            <Link
              href="/movies"
              className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg bg-(--other-element-color) text-(--text-color) text-sm sm:text-base border border-white/10 hover:bg-(--secondary-color) hover:text-white transition-all duration-300 text-center font-medium"
            >
              English Movies
            </Link>

            <Link
              href="/tv-series"
              className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg bg-(--other-element-color) text-(--text-color) text-sm sm:text-base border border-white/10 hover:bg-(--secondary-color) hover:text-white transition-all duration-300 text-center font-medium"
            >
              TV Series
            </Link>

            <Link
              href="/category/comedy"
              className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg bg-(--other-element-color) text-(--text-color) text-sm sm:text-base border border-white/10 hover:bg-(--secondary-color) hover:text-white transition-all duration-300 text-center font-medium"
            >
              Comedy Movies
            </Link>

            <Link
              href="/category/action"
              className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg bg-(--other-element-color) text-(--text-color) text-sm sm:text-base border border-white/10 hover:bg-(--secondary-color) hover:text-white transition-all duration-300 text-center font-medium"
            >
              Action Movies
            </Link>

            <Link
              href="/category/adventure"
              className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg bg-(--other-element-color) text-(--text-color) text-sm sm:text-base border border-white/10 hover:bg-(--secondary-color) hover:text-white transition-all duration-300 text-center font-medium"
            >
              Adventure Movies
            </Link>

          </div>

          <p className="mt-8 sm:mt-10 text-xs sm:text-sm md:text-base text-gray-300 px-4">
            Please Bookmark this URL{" "}
            <span className="text-green-400 font-semibold break-all">
              "bollyflix300.in"
            </span>
            , and visit the site directly for all latest releases and updates!
          </p>

        </div>
      </header>

      <MovieCarousel title="Latest Reviewed" movies={latestMovies} />
      <MovieCarousel title="Hindi Movies" movies={hindiMovies} />
      <MovieCarousel title="English Movies" movies={englishMovies} />

      <section className="px-4 md:px-6 lg:px-12 max-w-7xl mx-auto space-y-4 text-gray-300 leading-relaxed">

        <h2 className="text-2xl md:text-3xl font-semibold text-(--text-color)">
          Latest Movies and Web Series on Bollyflix300
        </h2>

        <p>
          Discover the most recent updates on Bollyflix300, this is your only
          destination for the latest movies and web series. With Bollyflix300
          2024, you can stay up-to-date with all the trending releases from
          Bollywood, Tollywood, Kollywood, and beyond.
        </p>

        <h3 className="text-xl md:text-2xl font-semibold text-(--text-color)">
          Hindi, Bollywood, and Regional Hits
        </h3>

        <p>
          At Bollyflix300, we follow all major film industries including Hindi,
          Tamil, Telugu, and Punjabi cinema.
        </p>

        <h3 className="text-xl md:text-2xl font-semibold text-(--text-color)">
          Web Series and More
        </h3>

        <p>
          In addition to movies, Bollyflix300 keeps you updated on the hottest
          web series across all OTT platforms.
        </p>

      </section>

      <MovieCarousel title="Action Movies" movies={actionMovies} />
      <MovieCarousel title="Comedy Movies" movies={comedyMovies} />
      <MovieCarousel title="Popular Series" movies={tvShows} />

    </div>
  );
}
