"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import AuthorBox from "@/components/AuthorBox";
import { MovieCarousel, Movie } from "@/components/MovieCarousel";

// Types
interface MovieData {
  id: number;
  type: string;
  movie_id: number;
  movie_name: string;
  movie_posterurl: string;
  movie_releasedate: string;
  movie_review: string;
  movie_createdat: string;
}

interface TMDBDetails {
  backdrop_path: string;
  images: { backdrops: { file_path: string }[] };
  videos: { results: { key: string; type: string; site: string }[] };
}

// Utility
const cleanParagraphs = (html: string): string[] => {
  if (!html) return [];
  const withBreaks = html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "</p>\n");
  return withBreaks
    .split("\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
};

// Component
const Page = () => {
  const { movie: slug } = useParams();

  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [tmdbDetails, setTmdbDetails] = useState<TMDBDetails | null>(null);
  const [latestMovies, setLatestMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const trailer = useMemo(
    () =>
      tmdbDetails?.videos?.results?.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      ),
    [tmdbDetails]
  );

  // fetch data
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          `https://admin.bolly4umovie.in/admin/api/api?x=get_movie_by_slug&movie_slug=${slug}`
        );
        const { data } = await res.json();
        setMovieData(data);

        const tmdbType = data.type === "tv" ? "tv" : "movie";

        const tmdbRes = await fetch(
          `https://api.themoviedb.org/3/${tmdbType}/${data.movie_id}?api_key=3346ffc3a5e1e0f930da843a96b5e56d&append_to_response=images,videos`
        );

        const tmdb = await tmdbRes.json();
        setTmdbDetails(tmdb);
      } catch (e) {
        console.log("err", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [slug]);

  // fetch latest TV shows
  useEffect(() => {
    const loadLatestMovies = async () => {
      try {
        const res = await fetch(
          "https://admin.bolly4umovie.in/admin/api/api?x=get_movie_by_type&type=movie&page=1"
        );
        const { data } = await res.json();

        const movies: Movie[] = data.map((item: any) => ({
          slug: item.movie_slug,
          title: item.movie_name,
          year: new Date(item.movie_releasedate).getFullYear(),
          genre: item.movie_subcategory || "TV Show",
          rating: item.movie_rating || 0,
          posterPath: item.movie_posterurl,
        }));

        setLatestMovies(movies);
      } catch (e) {
        console.log("Error fetching latest movies:", e);
      }
    };

    loadLatestMovies();
  }, []);

  if (loading)
    return <div className="p-20 text-center text-white">Loading…</div>;
  if (!movieData)
    return <div className="p-20 text-center text-white">Movie not found</div>;

  const paragraphs = cleanParagraphs(movieData.movie_review);

  const backdrops =
    tmdbDetails?.images?.backdrops?.slice(0, 6).map((b) => b.file_path) || [];

  return (
    <div className="w-full min-h-screen bg-(--primary-color) text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-white leading-tight mb-4 wrap-break-word">
          {movieData.movie_name}
        </h1>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 md:w-8 md:h-8 rounded-full overflow-hidden ring-1 ring-white/10">
            <Image
              src="/profile.jpeg"
              width={40}
              height={40}
              alt="Monu Sagar"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex items-center gap-2 text-sm md:text-base">
            <span className="text-(--secondary-color) font-medium">
              Monu Sagar
            </span>

            <span className="text-gray-500">·</span>

            <time className="text-gray-400">
              {new Date(
                movieData.movie_createdat || movieData.movie_releasedate
              ).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </div>

        <div className="space-y-10">
          {paragraphs.map((p, i) => {
            const bp =
              backdrops.length > 0 ? backdrops[i % backdrops.length] : null;

            return (
              <div key={i} className="space-y-6">
                <p
                  className="text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: p }}
                />

                {bp && (
                  <div className="relative w-full rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={`https://image.tmdb.org/t/p/original${bp}`}
                      alt={`Backdrop ${i + 1}`}
                      width={1200}
                      height={700}
                      className="rounded-xl object-cover"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Trailer */}
        {trailer && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-4">Official Trailer</h2>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        )}
        <div className="my-5 -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-12">
          <div className="px-3 sm:px-4 md:px-6 lg:px-12">
            <AuthorBox />
          </div>
        </div>
        <div className="-mx-3 sm:-mx-4 md:-mx-6 lg:-mx-12">
          <MovieCarousel title="Latest Reviews" movies={latestMovies} />
        </div>
      </div>
    </div>
  );
};

export default Page;
