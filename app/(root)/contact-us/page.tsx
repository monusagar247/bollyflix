import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  alternates: {
    canonical: "/contact-us",
  },
};

type ApiResp = {
  status: string;
  message: string;
  data?: { contact?: string };
};

const CONTACT_URL =
  "https://bollyflix300.in/admin/api/api?x=get_extra&extra=contact";

const Page = async () => {
  const res = await fetch(CONTACT_URL);

  const json: ApiResp = await res.ok
    ? await res.json()
    : { status: "error", message: "api error" };

  const contactHTML =
    json?.data?.contact ?? "<p>No contact info found.</p>";

  return (
    <div className="page-container mx-auto px-4 sm:px-8 md:px-12 lg:px-24 py-6">
      <div
        className="prose prose-invert max-w-6xl text-white leading-relaxed"
        dangerouslySetInnerHTML={{ __html: contactHTML }}
      />
    </div>
  );
};

export default Page;
