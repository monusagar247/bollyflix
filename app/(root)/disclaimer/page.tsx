import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  alternates: {
    canonical: "/disclaimer",
  },
};

type ApiResp = {
  status: string;
  message: string;
  data?: { disclaimer?: string };
};

const disclaimer_URL =
  "https://bollyflix300.in/admin/api/api?x=get_extra&extra=disclaimer";

const Page = async () => {
  const res = await fetch(disclaimer_URL);

  const json: ApiResp = await res.ok
    ? await res.json()
    : { status: "error", message: "api error" };

  const disclaimerHTML =
    json?.data?.disclaimer ?? "<p>No disclaimer info found.</p>";

  return (
    <div className="page-container mx-auto px-4 sm:px-8 md:px-12 lg:px-24 py-6">
      <div
        className="prose prose-invert max-w-6xl text-white leading-relaxed"
        dangerouslySetInnerHTML={{ __html: disclaimerHTML }}
      />
    </div>
  );
};

export default Page;
