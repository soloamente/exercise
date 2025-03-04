import CryptoTable from "@/components/crypto-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exercise | Cryptocurrencies",
  description: "Cryptocurrency data from CoinGecko API",
  icons: { icon: "/" },
};

export default function CryptoPage() {
  return (
    <main
      className="mb-64 flex min-h-screen flex-col items-center justify-center"
      data-oid="je.f5fx"
    >
      <div className="flex flex-col gap-10 px-8" data-oid="v:8.5g8">
        <CryptoTable data-oid="q9edx14" />
      </div>
    </main>
  );
}
