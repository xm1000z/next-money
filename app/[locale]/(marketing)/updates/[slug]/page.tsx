import { getBlogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";

export async function generateMetadata(props): Promise<Metadata | undefined> {
  const params = await props.params;
  const { slug } = params;

  const post = getBlogPosts().find((post) => post.slug === slug);
  if (!post) {
    notFound();
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