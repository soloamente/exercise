import DataTable from "@/components/data-table";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col gap-10 px-8">
        <DataTable />
      </div>
    </main>
  );
}
