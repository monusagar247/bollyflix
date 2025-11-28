import { Metadata } from "next";
import LatestReviews from "./LatestReviewsClients";

export async function generateMetadata(): Promise<Metadata> {  
  return {
    title: `Latest Reviews`,
    alternates: {
      canonical: "/latest-reviews",
    },
  };
}

export default function Page() {
  return <LatestReviews />;
}
