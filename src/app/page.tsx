import HomeNav from "@/components/homepage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exercise | Home",
  description: "Exercise for Dataweb Group",
  icons: { icon: "/" },
};
export default function HomePage() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-8"
      data-oid="w4duqt1"
    >
      <div className="my-40" data-oid="00kjx0r">
        <h1 className="text-3xl text-balance uppercase" data-oid="hijk48-">
          Choose a page
        </h1>
      </div>
      <HomeNav data-oid="r1:b07f" />
    </main>
  );
}
