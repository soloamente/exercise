import PostsGrid from "@/components/posts-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exercise | Posts",
  description: "Posts data from JSONPlaceholder",
  icons: { icon: "/" },
};

export default function PostsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col gap-10 px-8">
        <PostsGrid />
      </div>
    </main>
  );
}
