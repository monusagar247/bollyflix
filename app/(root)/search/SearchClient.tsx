"use client";

import { MovieCarousel } from "@/components/MovieCarousel";
import { useState } from "react";
import { Search, X } from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    limit: 12,
    total_results: 0,
    total_pages: 1,
    current_page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");

  const transformData = (item: any): Movie => ({
    slug: item.movie_slug,
    title: item.movie_name,
    year: new Date(item.movie_releasedate).getFullYear(),
    genre: item.movie_subcategory.split(/[,&]/)[0].trim(),
    rating: item.movie_rating,
    posterPath: item.movie_posterurl,
  });

  const fetchMovies = async (query: string, page: number) => {
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    setCurrentSearchQuery(query);

    try {
      const res = await fetch(
        `https://admin.bolly4umovie.in/admin/api/api?x=get_movies_by_query&query=${encodeURIComponent(
          query
        )}&page=${page}`
      );
      const { data, pagination: paginationData } = await res.json();

      if (data && data.length > 0) {
        setMovies(data.map(transformData));
        setPagination(paginationData);
      } else {
        setMovies([]);
        setPagination({
          limit: 12,
          total_results: 0,
          total_pages: 1,
          current_page: 1,
        });
      }

      window.scrollTo({ top: 200, behavior: "smooth" });
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchMovies(searchQuery, 1);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    setMovies([]);
    setHasSearched(false);
    setCurrentSearchQuery("");
    setPagination({
      limit: 12,
      total_results: 0,
      total_pages: 1,
      current_page: 1,
    });
  };

  const handlePageChange = (page: number) => {
    if (currentSearchQuery) {
      fetchMovies(currentSearchQuery, page);
    }
  };

  const renderPagination = (
    currentPage: number,
    totalPages: number,
    isLoading: boolean
  ) => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center items-center gap-2 mt-8 px-3 sm:px-4 md:px-6 lg:px-12">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
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
                onClick={() => handlePageChange(pageNum)}
                disabled={isLoading}
                className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                  currentPage === pageNum
                    ? "bg-(--secondary-color) text-white"
                    : "bg-[#0b1225] text-white hover:bg-[#1a2744]"
                } disabled:cursor-not-allowed`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          className="px-4 py-2 bg-[#0b1225] text-white rounded-lg hover:bg-[#1a2744] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen py-8">
      <div className="mx-auto max-w-4xl px-3 sm:px-4 md:px-6 lg:px-12 mb-8">
        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for movies, series, actors..."
              className="w-full px-4 py-2.5 pr-10 bg-(--other-element-color) text-(--text-color) border-2 border-(--secondary-color) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--secondary-color) placeholder-gray-500 text-base"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={loading || !searchQuery.trim()}
            className="px-6 py-2.5 bg-(--secondary-color) text-white font-semibold rounded-lg hover:bg-[#0096d1] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
          >
            <Search size={18} />
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {hasSearched && !loading && (
          <div className="mt-6">
            <p className="text-gray-300 text-sm md:text-base text-center">
              {movies.length > 0 ? (
                <>
                  Found{" "}
                  <span className="text-(--secondary-color) font-semibold">
                    {pagination.total_results}
                  </span>{" "}
                  results for "{currentSearchQuery}"
                </>
              ) : (
                <>No results found for "{currentSearchQuery}"</>
              )}
            </p>
          </div>
        )}
      </div>

      <div className="w-full space-y-8">
        {loading && (
          <div className="text-center text-white py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-(--secondary-color) border-t-transparent"></div>
            <p className="mt-4 text-lg">Searching...</p>
          </div>
        )}

        {!loading && movies.length > 0 && (
          <>
            <MovieCarousel title={`Search Results`} movies={movies} />
            {renderPagination(
              pagination.current_page,
              pagination.total_pages,
              loading
            )}
          </>
        )}
      </div>
    </div>
  );
}
