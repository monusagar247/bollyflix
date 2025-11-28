"use client";

import { MovieCarousel } from "@/components/MovieCarousel";
import { useState, useEffect } from "react";

interface Movie {
  slug: string;
  title: string;
  year: number;
  genre: string;
  rating: number;
  posterPath: string;
}

interface PaginationInfo {
  limit: number;
  total_results: number;
  total_pages: number;
  current_page: number;
}

export default function Page() {
  const [hindiMovies, setHindiMovies] = useState<Movie[]>([]);
  const [englishMovies, setEnglishMovies] = useState<Movie[]>([]);
  const [hindiPagination, setHindiPagination] = useState<PaginationInfo>({
    limit: 12,
    total_results: 0,
    total_pages: 1,
    current_page: 1,
  });
  const [englishPagination, setEnglishPagination] = useState<PaginationInfo>({
    limit: 12,
    total_results: 0,
    total_pages: 1,
    current_page: 1,
  });
  const [hindiLoading, setHindiLoading] = useState(false);
  const [englishLoading, setEnglishLoading] = useState(false);

  const transformData = (item: any): Movie => ({
    slug: item.movie_slug,
    title: item.movie_name,
    year: new Date(item.movie_releasedate).getFullYear(),
    genre: item.movie_subcategory.split(/[,&]/)[0].trim(),
    rating: item.movie_rating,
    posterPath: item.movie_posterurl,
  });

  const fetchHindiMovies = async (page: number) => {
    if (hindiLoading) return;
    setHindiLoading(true);
    try {
      const res = await fetch(
        `https://bollyflix300.in/admin/api/api?x=get_movies_by_language_createdat&language=hindi&page=${page}`
      );
      const { data, pagination } = await res.json();
      setHindiMovies(data.map(transformData));
      setHindiPagination(pagination);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Failed to fetch Hindi movies:", error);
    } finally {
      setHindiLoading(false);
    }
  };

  const fetchEnglishMovies = async (page: number) => {
    if (englishLoading) return;
    setEnglishLoading(true);
    try {
      const res = await fetch(
        `https://bollyflix300.in/admin/api/api?x=get_movies_by_language_createdat&language=english&page=${page}`
      );
      const { data, pagination } = await res.json();
      setEnglishMovies(data.map(transformData));
      setEnglishPagination(pagination);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Failed to fetch English movies:", error);
    } finally {
      setEnglishLoading(false);
    }
  };

  useEffect(() => {
    fetchHindiMovies(1);
    fetchEnglishMovies(1);
  }, []);

  const renderPagination = (
    currentPage: number,
    totalPages: number,
    isLoading: boolean,
    onPageChange: (page: number) => void
  ) => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center items-center gap-2 mt-8 px-3 sm:px-4 md:px-6 lg:px-12">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className="px-4 py-2 bg-[#0b1225] text-white rounded-lg hover:bg-[#1a2744] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
        >
          Previous
        </button>

        <div className="flex gap-2">
          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                disabled={isLoading}
                className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                  currentPage === pageNum
                    ? "bg-teal-500 text-white"
                    : "bg-[#0b1225] text-white hover:bg-[#1a2744]"
                } disabled:cursor-not-allowed`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          className="px-4 py-2 bg-[#0b1225] text-white rounded-lg hover:bg-[#1a2744] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="w-full space-y-12">
      <div>
        <MovieCarousel title="Hindi Movie Reviews" movies={hindiMovies} />
        {hindiLoading && (
          <div className="text-center text-white mt-6">Loading...</div>
        )}
        {renderPagination(
          hindiPagination.current_page,
          hindiPagination.total_pages,
          hindiLoading,
          fetchHindiMovies
        )}
      </div>

      <div>
        <MovieCarousel title="English Movie Reviews" movies={englishMovies} />
        {englishLoading && (
          <div className="text-center text-white mt-6">Loading...</div>
        )}
        {renderPagination(
          englishPagination.current_page,
          englishPagination.total_pages,
          englishLoading,
          fetchEnglishMovies
        )}
      </div>
    </div>
  );
}