import React from "react";
import { ArticleInView } from "@/components/article-in-view";
import { PostStatus } from "@/components/post-status";
import Image from "next/image";
import Link from "next/link";

interface Post {
  slug: string;
  metadata: {
    tag: string;
    title: string;
    image?: string;
  };
  content: string;
}

interface ArticleProps {
  firstPost: boolean;
  post: Post;
}

export function Article({ post, firstPost }: ArticleProps) {
  return (
    <article key={post.slug} className="pt-28 mb-20 -mt-28" id={post.slug}>
      <ArticleInView slug={post.slug} firstPost={firstPost} />

      <PostStatus status={post.metadata.tag} />
      <Link className="mb-6 block" href={`/updates/${post.slug}`}>
        <h2 className="font-medium text-2xl mb-6">{post.metadata.title}</h2>
      </Link>

      <div className="updates">
        {post.metadata.image && (
          <Image
            src={post.metadata.image}
            alt={post.metadata.title}
            width={680}
            height={442}
            className="mb-12"
          />
        )}
        <div className="prose">{post.content}</div>
      </div>
    </article>
  );
}