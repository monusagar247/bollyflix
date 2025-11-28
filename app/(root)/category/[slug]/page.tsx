import { Metadata } from "next";
import CategoryClient from "./CategoryClient";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const displayCategory = slug.charAt(0).toUpperCase() + slug.slice(1);
  
  return {
    title: `${displayCategory} Movies`,
    description: `Browse ${displayCategory} movies and reviews on Bollyflix`,
  };
}

export async function generateStaticParams() {
  try {
    const res = await fetch(
      'https://bollyflix300.in/admin/api/api?x=get_all_subcategories'
    );
    
    const { data } = await res.json();
    
    return data.map((item: any) => ({
      slug: item.subcategory_slug || item.subcategory_name.toLowerCase().replace(/\s+/g, '-'),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}


export default function Page() {
  return <CategoryClient />;
}
