import { Article } from "@/components/article";
import { UpdatesToolbar } from "@/components/updates-toolbar";
import { getBlogPosts } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Updates",
  description: "Keep up to date with product updates and announcments.",
};

export default async function Page({ params }: { params: { locale: string } }) {
  const { locale } = params;

  const data = getBlogPosts(locale);

  const posts = data
    .sort((a, b) => {
      return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    })
    .map((post, index) => (
      <Article data={post} firstPost={index === 0} key={post.slug} />
    ));

  return (
    <div className="container flex justify-center scroll-smooth">
      <div className="max-w-[680px] pt-[80px] md:pt-[150px] w-full">
        {posts}
      </div>

      <UpdatesToolbar
        posts={data.map((post) => ({
          slug: post.slug,
          title: post.metadata.title,
        }))}
      />
    </div>
  );
}