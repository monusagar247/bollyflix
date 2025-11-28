import { Metadata } from "next";
import SearchClient from "./SearchClient";

export async function generateMetadata(): Promise<Metadata> {  
  return {
    title: `Search Movies & Web Series`,
    description: 'Search the latest Hindi & English movies, web series, OTT releases, trailers and cast details on Bollyflix300.',
    alternates: {
      canonical: "/search",
    },
  };
}

export default function Page() {
  return <SearchClient />;
}
