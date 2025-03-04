import CountriesTable from "@/components/countries-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exercise | Countries",
  description: "Countries data from REST Countries API",
  icons: { icon: "/" },
};

export default function CountriesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col gap-10 px-8">
        <CountriesTable />
      </div>
    </main>
  );
}
