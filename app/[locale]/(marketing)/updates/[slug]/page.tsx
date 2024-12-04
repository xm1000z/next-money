import { getBlogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata | undefined> {
  const { slug } = params;

  const post = getBlogPosts().find((post) => post.slug === slug);
  if (!post) {
    notFound();
  }

  return {
    title: post.metadata.title,
    description: post.metadata.summary,
    // Otros metadatos...
  };
}

export default function Page({ params }) {
  const { slug } = params;

  const post = getBlogPosts().find((post) => post.slug === slug);
  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1>{post.metadata.title}</h1>
      <p>{post.metadata.summary}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
} 