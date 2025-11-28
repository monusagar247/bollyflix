import { Metadata } from "next";
import TvSeriesClient from "./TvSeriesClient";

export async function generateMetadata(): Promise<Metadata> {  
  return {
    title: `Latest Hindi & English Web Series 2025`,
    alternates: {
      canonical: "/tv-series",
    },
  };
}

export default function Page() {
  return <TvSeriesClient />;
}
