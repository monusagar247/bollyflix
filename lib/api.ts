import { Movie } from "@/components/MovieCarousel";

interface TVShow {
  movie_slug: string;
  movie_name: string;
  movie_releasedate: string;
  movie_subcategory: string;
  movie_rating: number;
  movie_posterurl: string;
}

interface PaginationInfo {
  limit: number;
  total_results: number;
  total_pages: number;
  current_page: number;
}

const API_BASE =
  "https://admin.bolly4umovie.in/admin/api/api";

const transformToMovie = (item: TVShow): Movie => ({
  slug: item.movie_slug,
  title: item.movie_name,
  year: new Date(item.movie_releasedate).getFullYear(),
  genre: item.movie_subcategory.split(/[,&]/)[0].trim(),
  rating: item.movie_rating,
  posterPath: item.movie_posterurl,
});

/*
Safe fetch helper
Prevents crashes + adds caching
*/
async function safeFetch(url: string) {
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // cache 1 hour
    });

    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    console.error("API fetch failed:", url, error);
    return null;
  }
}

export async function fetchTVShows(): Promise<Movie[]> {
  const json = await safeFetch(`${API_BASE}?x=get_all_tv`);

  if (!json?.data) return [];

  return json.data.map(transformToMovie);
}

export async function fetchLatestMovies(): Promise<Movie[]> {
  const json = await safeFetch(
    `${API_BASE}?x=get_movie_by_type&type=movie&page=1`
  );

  if (!json?.data) return [];

  return json.data.map(transformToMovie);
}

export async function fetchHindiMovies(): Promise<Movie[]> {
  const json = await safeFetch(
    `${API_BASE}?x=get_movies_by_language&language=hindi`
  );

  if (!json?.data) return [];

  return json.data.map(transformToMovie);
}

export async function fetchEnglishMovies(): Promise<Movie[]> {
  const json = await safeFetch(
    `${API_BASE}?x=get_movies_by_language&language=english`
  );

  if (!json?.data) return [];

  return json.data.map(transformToMovie);
}

export async function fetchMoviesByCategory(
  subcategory: string,
  type: "movie" | "tv" = "movie"
): Promise<Movie[]> {

  const json = await safeFetch(
    `${API_BASE}?x=get_movies_by_subcategory&subcategory=${encodeURIComponent(
      subcategory
    )}&type=${type}`
  );

  if (!json?.data) return [];

  return json.data.map(transformToMovie);
}

export async function fetchMoviesByType(
  type: "movie" | "tv",
  page: number = 1
): Promise<{ movies: Movie[]; pagination: PaginationInfo | null }> {

  const json = await safeFetch(
    `${API_BASE}?x=get_movie_by_type&type=${type}&page=${page}`
  );

  if (!json?.data) {
    return {
      movies: [],
      pagination: null,
    };
  }

  return {
    movies: json.data.map(transformToMovie),
    pagination: json.pagination,
  };
}
