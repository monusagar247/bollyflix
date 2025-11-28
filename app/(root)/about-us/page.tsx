import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
}

type ApiResp = {
  status: string;
  message: string;
  data?: { about?: string };
};

const ABOUT_URL =
  "https://bollyflix300.in/admin/api/api?x=get_extra&extra=about";

const Page = async () => {
  const res = await fetch(ABOUT_URL);

  const json: ApiResp = await res.ok
    ? await res.json()
    : { status: "error", message: "api error" };

  const aboutHTML =
    json?.data?.about ?? "<p>No about info found.</p>";

  return (
    <div className="page-container mx-auto px-4 sm:px-8 md:px-12 lg:px-24 py-6">
      <div
        className="prose prose-invert max-w-6xl text-white leading-relaxed"
        dangerouslySetInnerHTML={{ __html: aboutHTML }}
      />
    </div>
  );
};

export default Page;
