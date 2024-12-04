import { PostAuthor } from "@/components/post-author";
import { PostStatus } from "@/components/post-status";
import { getBlogPosts } from "@/lib/blog";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

// Define la interfaz para el tipo de post
interface Post {
  slug: string; // Asegúrate de que slug esté definido
  metadata: Metadata;
  content: string;
}

// Modifica la función getBlogPosts para que devuelva un array de Post
export function getBlogPosts(): Post[] {
  const posts = getMDXData(path.join(process.cwd(), "src", "app", "updates", "posts"));
  
  return posts.map((post) => ({
    slug: post.metadata.slug, // Asegúrate de que slug esté en metadata
    metadata: post.metadata,
    content: post.content,
  }));
}

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug, // Ahora debería funcionar correctamente
  }));
}

export async function generateMetadata(props): Promise<Metadata | undefined> {
  const params = await props.params;
  const post = getBlogPosts().find((post) => post.slug === params.slug);
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
          url: image || '',
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image || ''],
    },
  };
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
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: `${post.metadata.image}`,
            url: `/updates/${post.slug}`,
          }),
        }}
      />

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