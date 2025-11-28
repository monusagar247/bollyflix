import Image from "next/image";
import { Mail } from "lucide-react";

type Props = {
  name?: string;
  role?: string;
  avatarSrc?: string;
  bio?: string;
  profileUrl?: string;
};

export default function AuthorBox({
  name = "Monu Sagar",
  role = "Content Writer",
  avatarSrc = "/profile.jpeg",
  bio = `Monu Sagar has been writing about films since his college days in Chennai, where he studied Media and Communication. He’s drawn to stories with strong characters, and the kind of cinema that sparks conversations. When he’s not reviewing, you'll find him at the first day–first show of a big release or debating movie plots over cups of filter coffee.`,
}: Props) {
  return (
    <aside
      className="w-full rounded-2xl overflow-hidden"
      aria-label={`About the author ${name}`}
    >
      <div
        className="p-6 md:p-8 rounded-2xl"
        style={{
          backgroundColor: "var(--other-element-color)",
          border: "1px solid rgba(255,255,255,0.03)",
          boxShadow: "0 6px 24px rgba(2,6,23,0.6)",
        }}
      >
        <div className="flex flex-col md:flex-row gap-5 items-center md:items-start text-center md:text-left">

          {/* Avatar */}
          <div className="shrink-0">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-1 ring-white/6 mx-auto md:mx-0">
              <Image
                src={avatarSrc}
                alt={name}
                width={96}
                height={96}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h3
                className="text-lg md:text-xl font-semibold"
                style={{ color: "var(--text-color)" }}
              >
                {name}
              </h3>

              <a
                href={`mailto:editor@example.com`}
                className="inline-flex items-center justify-center p-1 rounded text-(--secondary-color) hover:opacity-90"
              >
                <Mail size={16} className="text-(--secondary-color)" />
              </a>
            </div>

            <p className="text-sm text-gray-400 mt-1">{role}</p>

            <p className="text-sm text-gray-300 mt-4 leading-relaxed">
              {bio}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
