"use client";

import { useState } from "react";
import { getBlogPosts } from "@/lib/blog";
import Article from "@/components/article";
import { UpdatesToolbar } from "@/components/updates-toolbar";

export default function Page() {
  const posts = getBlogPosts(); // Llama a getBlogPosts para obtener los posts

  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  return (
    <div className="container max-w-[1140px] mx-auto py-10">
      <UpdatesToolbar posts={sortedPosts} currentIndex={0} onNavigate={() => {}} />
      <h1 className="text-3xl font-bold mb-6 text-center">Actualizaciones</h1>
      <div className="space-y-6">
        {sortedPosts.map((post, index) => (
          <Article key={post.slug} post={post} firstPost={index === 0} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => window.scrollTo(0, 0)}
        >
          Ir Arriba
        </button>
        <button
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => window.scrollTo(0, document.body.scrollHeight)}
        >
          Ir Abajo
        </button>
      </div>
    </div>
  );
}