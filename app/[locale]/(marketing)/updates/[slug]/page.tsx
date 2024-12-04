import { PostAuthor } from "@/components/post-author";
import { PostStatus } from "@/components/post-status";
import { getBlogPosts } from "@/lib/blog";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  const { slug } = params;

  const post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container max-w-[1140px] flex justify-center">

      <article className="max-w-[680px] pt-[80px] md:pt-[150px] w-full">
        <PostStatus status={post.metadata.tag} />

        <h2 className="font-medium text-2xl mb-6">{post.metadata.title}</h2>

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

        <div className="mt-10">
          <PostAuthor author="pontus" />
        </div>
      </article>
    </div>
  );
}