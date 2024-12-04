import { getBlogPosts } from "@/lib/blog";

export default function UpdatesPage() {
  const posts = getBlogPosts();

  return (
    <div className="container max-w-[1140px] mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Actualizaciones</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.slug} className="border p-4 rounded-md">
            <h2 className="text-2xl font-semibold">{post.metadata.title}</h2>
            <p className="text-gray-600">{post.metadata.summary}</p>
            <p className="text-sm text-gray-400">Publicado el: {post.metadata.publishedAt}</p>
            <a href={`/updates/${post.slug}`} className="text-blue-500 hover:underline">
              Leer más
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}