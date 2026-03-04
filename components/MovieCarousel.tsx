"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation"; // ✅ FIXED

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

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const router = useRouter();

  const handleClick = () => {
    const internalUrl = `/${movie.slug}`;
    const externalUrl = `https://bolly4umovie.in/`;

    window.open(externalUrl, "_blank", "noopener,noreferrer");

    setTimeout(() => {
      router.push(internalUrl);
    }, 8000);
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer transition-transform duration-300 hover:scale-105 block"
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
    </div>
  );
};
