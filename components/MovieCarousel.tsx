"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface Movie {
  slug: string;
  title: string;
  year: number;
  genre: string;
  rating: number;
  posterPath: string;
}

interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(movie);
    }
  };

  const Wrapper = onClick ? "div" : "a";
  const wrapperProps = onClick
    ? { onClick: handleClick }
    : { href: `/${movie.slug}` };

  return (
    <Wrapper
      className="group cursor-pointer transition-transform duration-300 hover:scale-105 block"
      {...wrapperProps}
    >
      <div className="relative overflow-hidden rounded-lg shadow-2xl aspect-[2/2.8]">
        <Image
          src={movie.posterPath}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 16vw"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-teal-400 text-xs font-medium tracking-wide">
          {movie.year} / {movie.genre}
        </p>
        <h3 className="text-[#EBFAFF] text-base font-semibold leading-tight line-clamp-2">
          {movie.title}
        </h3>
      </div>
    </Wrapper>
  );
};

interface MovieCarouselProps {
  title?: string;
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
}

export const MovieCarousel: React.FC<MovieCarouselProps> = ({
  title = "Featured Movies",
  movies,
  onMovieClick,
}) => {
  return (
    <section className="w-full py-6">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-12">
        {title && (
          <div className="mb-6 sm:mb-8 md:mb-10">
            <h2 className="text-xl sm:text-xxl md:text-2xl font-bold text-white mb-2">
              {title}
            </h2>
            <div className="w-20 h-1 bg-linear-to-r from-(--secondary-color) to-transparent rounded-full"></div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
          {movies.map((movie) => (
            <MovieCard key={movie.slug} movie={movie} onClick={onMovieClick} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface MovieCarouselScrollProps {
  title?: string;
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
}

export const MovieCarouselScroll: React.FC<MovieCarouselScrollProps> = ({
  title = "Featured Movies",
  movies,
  onMovieClick,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full py-8 relative group/carousel">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-12">
        {title && (
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#EBFAFF] mb-4 sm:mb-6 md:mb-8 tracking-wide">
            {title}
          </h2>
        )}

        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#0b1225]/80 hover:bg-[#0b1225] text-[#EBFAFF] p-2 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 backdrop-blur-sm hidden sm:block"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#0b1225]/80 hover:bg-[#0b1225] text-[#EBFAFF] p-2 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 backdrop-blur-sm hidden sm:block"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {movies.map((movie) => (
              <div
                key={movie.slug}
                className="flex-none w-36 sm:w-40 md:w-48 lg:w-56"
              >
                <MovieCard movie={movie} onClick={onMovieClick} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};