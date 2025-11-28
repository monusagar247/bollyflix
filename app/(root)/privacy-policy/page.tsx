import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
}

type ApiResp = {
  status: string;
  message: string;
  data?: { privacy?: string };
};

const privacy_URL =
  "https://bollyflix300.in/admin/api/api?x=get_extra&extra=privacy";

const Page = async () => {
  const res = await fetch(privacy_URL);

  const json: ApiResp = await res.ok
    ? await res.json()
    : { status: "error", message: "api error" };

  const privacyHTML =
    json?.data?.privacy ?? "<p>No privacy info found.</p>";

  return (
    <div className="page-container mx-auto px-4 sm:px-8 md:px-12 lg:px-24 py-6">
      <div
        className="prose prose-invert max-w-6xl text-white leading-relaxed"
        dangerouslySetInnerHTML={{ __html: privacyHTML }}
      />
    </div>
  );
};

export default Page;
