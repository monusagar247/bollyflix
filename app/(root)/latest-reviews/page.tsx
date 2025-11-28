import { Metadata } from "next";
import LatestReviews from "./LatestReviewsClients";

export async function generateMetadata(): Promise<Metadata> {  
  return {
    title: `Latest Reviews`,
  };
}

export default function Page() {
  return <LatestReviews />;
}
