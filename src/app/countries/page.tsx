import CountriesTable from "@/components/countries-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exercise | Countries",
  description: "Countries data from REST Countries API",
  icons: { icon: "/" },
};

export default function CountriesPage() {
  return (
    <main
      className="mb-64 flex min-h-screen flex-col items-center justify-center transition-all duration-700"
      data-oid="zwr460b"
    >
      <div className="flex flex-col gap-10 px-8" data-oid="xbkbacy">
        <CountriesTable data-oid="1e6:6nu" />
      </div>
    </main>
  );
}
