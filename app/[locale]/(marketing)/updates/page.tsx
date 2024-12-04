"use client";

import { useState } from "react";
import { getBlogPosts } from "@/lib/blog";
import Article from "@/components/article";
import { UpdatesToolbar } from "@/components/updates-toolbar";

export default function Page() {
  const posts = getBlogPosts(); // Llama a getBlogPosts para obtener los posts
  const [currentIndex, setCurrentIndex] = useState(0); // Estado para el índice actual

  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const handleNavigate = (index: number) => {
    setCurrentIndex(index); // Actualiza el índice actual
  };

  return (
    <div className="max-w-[1140px] mx-auto py-10 pl-4">
      <UpdatesToolbar posts={sortedPosts} currentIndex={currentIndex} onNavigate={handleNavigate} />
      <div className="space-y-6">
        <Article key={sortedPosts[currentIndex].slug} post={sortedPosts[currentIndex]} firstPost={currentIndex === 0} />
      </div>
    </div>
  );
}