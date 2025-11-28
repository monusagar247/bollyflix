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

const transformToMovie = (item: TVShow): Movie => ({
  slug: item.movie_slug,
  title: item.movie_name,
  year: new Date(item.movie_releasedate).getFullYear(),
  genre: item.movie_subcategory.split(/[,&]/)[0].trim(),
  rating: item.movie_rating,
  posterPath: item.movie_posterurl,
});

export async function fetchTVShows(): Promise<Movie[]> {
  const res = await fetch(
    "https://bollyflix300.in/admin/api/api?x=get_all_tv"
  );
  
  if (!res.ok) throw new Error("Failed to fetch TV shows");
  
  const { data } = await res.json();
  return data.map(transformToMovie);
}

export async function fetchHindiMovies(): Promise<Movie[]> {
  const res = await fetch(
    "https://bollyflix300.in/admin/api/api?x=get_movies_by_language&language=hindi"
  );
  
  if (!res.ok) throw new Error("Failed to fetch Hindi movies");
  
  const { data } = await res.json();
  return data.map(transformToMovie);
}

export async function fetchEnglishMovies(): Promise<Movie[]> {
  const res = await fetch(
    "https://bollyflix300.in/admin/api/api?x=get_movies_by_language&language=english"
  );
  
  if (!res.ok) throw new Error("Failed to fetch English movies");
  
  const { data } = await res.json();
  return data.map(transformToMovie);
}

export async function fetchMoviesByCategory(
  subcategory: string,
  type: "movie" | "tv" = "movie"
): Promise<Movie[]> {
  const res = await fetch(
    `https://bollyflix300.in/admin/api/api?x=get_movies_by_subcategory&subcategory=${encodeURIComponent(subcategory)}&type=${type}`
  );
  
  if (!res.ok) throw new Error(`Failed to fetch ${subcategory} movies`);
  
  const { data } = await res.json();
  return data.map(transformToMovie);
}

export async function fetchMoviesByType(
  type: "movie" | "tv",
  page: number = 1
): Promise<{ movies: Movie[]; pagination: PaginationInfo }> {
  const res = await fetch(
    `https://bollyflix300.in/admin/api/api?x=get_movie_by_type&type=${type}&page=${page}`
  );
  
  if (!res.ok) throw new Error(`Failed to fetch ${type}s`);
  
  const { data, pagination } = await res.json();
  return {
    movies: data.map(transformToMovie),
    pagination,
  };
}