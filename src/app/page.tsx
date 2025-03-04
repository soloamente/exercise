import HomeNav from "@/components/homepage";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="my-40">
        <h1 className="text-3xl text-balance uppercase">Choose a page</h1>
      </div>
      <HomeNav />
    </main>
  );
}
