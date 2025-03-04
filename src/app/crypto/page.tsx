import CryptoTable from "@/components/crypto-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exercise | Cryptocurrencies",
  description: "Cryptocurrency data from CoinGecko API",
  icons: { icon: "/" },
};

export default function CryptoPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col gap-10 px-8">
        <CryptoTable />
      </div>
    </main>
  );
}
