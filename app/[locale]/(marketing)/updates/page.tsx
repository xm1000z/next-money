import { getBlogPosts } from "@/lib/blog";
import { Article } from "@/components/article";
import { UpdatesToolbar } from "@/components/updates-toolbar";

export default async function Page() {
  const data = getBlogPosts(); // Llamar a getBlogPosts sin pasar el locale

  const posts = data.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  return (
    <div className="container max-w-[1140px] mx-auto py-10">
      <UpdatesToolbar />
      <h1 className="text-3xl font-bold mb-6">Actualizaciones</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <Article key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}