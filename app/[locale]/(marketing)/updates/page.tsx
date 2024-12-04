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

  const [currentIndex, setCurrentIndex] = useState(0); // Estado para el índice actual

  const handleNavigate = (index: number) => {
    setCurrentIndex(index); // Actualiza el índice actual
  };

  return (
    <div className="container max-w-[1140px] mx-auto py-10">
      <UpdatesToolbar posts={sortedPosts} currentIndex={currentIndex} onNavigate={handleNavigate} />
      <h1 className="text-3xl font-bold mb-6 text-center">Actualizaciones</h1>
      <div className="space-y-6">
        {sortedPosts.map((post, index) => (
          <div key={post.slug} className={`transition-all duration-300 ${index === currentIndex ? "bg-gray-100" : ""}`}>
            <Article post={post} firstPost={index === 0} />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => window.scrollTo(0, 0)} // Botón para ir arriba
        >
          Ir Arriba
        </button>
        <button
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => window.scrollTo(0, document.body.scrollHeight)} // Botón para ir abajo
        >
          Ir Abajo
        </button>
      </div>
    </div>
  );
}