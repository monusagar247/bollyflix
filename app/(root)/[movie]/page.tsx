import { Metadata } from "next";
import MovieClient from "./MovieClient";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ movie: string }> 
}): Promise<Metadata> {
  const { movie } = await params;
  const displayMovie = movie.charAt(0).toUpperCase() + movie.slice(1);
  
  return {
    title: `${displayMovie}`,
    alternates: {
      canonical: `/${movie}`,
    },
  };
}

export async function generateStaticParams() {
  try {
    const res = await fetch(
      'https://bollyflix300.in/admin/api/api?x=get_all_movies'
    );
    
    const { data } = await res.json();
    
    return data.map((item: any) => ({
      movie: item.movie_slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}


export default function Page() {
  return <MovieClient />;
}
