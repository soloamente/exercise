import DataTable from "@/components/data-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exercise | Users ",
  description: "Exercise for Dataweb Group",
  icons: { icon: "/" },
};

export default function HomePage() {
  return (
    <main
      className="mb-64 flex min-h-screen flex-col items-center justify-center"
      data-oid="lt_e7hg"
    >
      <div className="flex flex-col gap-10 px-8" data-oid=".iwj:gp">
        <DataTable data-oid="2vudgpg" />
      </div>
    </main>
  );
}
