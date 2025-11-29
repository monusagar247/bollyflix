import { MetadataRoute } from 'next';

const CATEGORIES = [
  "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama",
  "Family", "Fantasy", "History", "Horror", "Music", "Mystery", "Romance",
  "Science Fiction", "TV Movie", "Thriller", "War", "Western",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bollyflix300.in';
  
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/latest-reviews`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/movies`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tv-series`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((category) => ({
    url: `${baseUrl}/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  try {
    // Fetch movies
    const moviesRes = await fetch(
      'https://admin.bolly4umovie.in/admin/api/api?x=get_movie_by_type&type=movie&page=1',
      { next: { revalidate: 3600 } }
    );
    const { data: movies } = await moviesRes.json();

    // Fetch TV shows
    const tvShowsRes = await fetch(
      'https://admin.bolly4umovie.in/admin/api/api?x=get_movie_by_type&type=tv&page=1',
      { next: { revalidate: 3600 } }
    );
    const { data: tvShows } = await tvShowsRes.json();

    const movieRoutes: MetadataRoute.Sitemap = movies.map((movie: any) => ({
      url: `${baseUrl}/${movie.movie_slug}`,
      lastModified: new Date(movie.movie_createdat || movie.movie_releasedate),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    const tvShowRoutes: MetadataRoute.Sitemap = tvShows.map((show: any) => ({
      url: `${baseUrl}/${show.movie_slug}`,
      lastModified: new Date(show.movie_createdat || show.movie_releasedate),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    return [...staticRoutes, ...categoryRoutes, ...movieRoutes, ...tvShowRoutes];

  } catch (error) {
    console.error('Error generating sitemap:', error);
    return [...staticRoutes, ...categoryRoutes];
  }
}
