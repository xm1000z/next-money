import { PostAuthor } from "@/components/post-author";
import { PostStatus } from "@/components/post-status";
import { getBlogPosts } from "@/lib/blog";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const allPosts: { slug: string }[] = [];

  const posts = getBlogPosts();
  allPosts.push(...posts.map(post => ({ slug: post.slug })));

  return allPosts;
}

export async function generateMetadata(props): Promise<Metadata | undefined> {
  const { params } = await props;
  const { locale, slug } = params;

  const post = getBlogPosts(locale).find((post) => post.slug === slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `/updates/${post.slug}`,
      images: [
        {
          url: image || '/path/to/default/image.jpg',
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image || '/path/to/default/image.jpg'],
    },
  };
}

export default async function Page(props: { params: Promise<{ locale: string; slug: string }> }) {
  const params = await props.params;
  const { locale, slug } = params;

  const post = getBlogPosts(locale).find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;

  return (
    <div className="container max-w-[1140px] flex justify-center">
      <article className="max-w-[680px] pt-[80px] md:pt-[150px] w-full">
        <h2 className="font-medium text-2xl mb-6">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <p className="text-sm text-gray-400">Publicado el: {publishedTime}</p>
        {image && <img src={image} alt={title} className="mb-12" />}
        <div className="prose">{post.content}</div>
      </article>
    </div>
  );
}