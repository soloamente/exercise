import PostsGrid from "@/components/posts-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exercise | Posts",
  description: "Posts data from JSONPlaceholder",
  icons: { icon: "/" },
};

export default function PostsPage() {
  return (
    <main
      className="mb-64 flex min-h-screen flex-col items-center justify-center"
      data-oid="gst-d1g"
    >
      <div className="flex flex-col gap-10 px-8" data-oid="rmam_bw">
        <PostsGrid data-oid="8mo-0_p" />
      </div>
    </main>
  );
}
