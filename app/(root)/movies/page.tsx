import { Metadata } from "next";
import MoviesClient from "./MoviesClient";

export async function generateMetadata(): Promise<Metadata> {  
  return {
    title: `Latest Hindi & English Movies 2025`,
    alternates: {
      canonical: "/movies",
    },
  };
}

export default function Page() {
  return <MoviesClient />;
}
