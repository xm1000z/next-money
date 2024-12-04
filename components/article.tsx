import React from "react";
import { ArticleInView } from "@/components/article-in-view";
import { PostStatus } from "@/components/post-status";

interface Post {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
    tag: string;
  };
  content: string;
}

interface ArticleProps {
  post: Post;
  firstPost?: boolean;
}

const Article: React.FC<ArticleProps> = ({ post, firstPost }) => {
  return (
    <ArticleInView slug={post.slug}>
      <div className={`updates ${firstPost ? "first-post" : ""} mb-6 p-4 border rounded-lg shadow-md`}>
        <h2 className="text-xl font-bold">{post.metadata.title}</h2>
        <p className="text-gray-500 text-sm">{post.metadata.publishedAt}</p>
        <p className="text-gray-700">{post.metadata.summary}</p>
        {post.metadata.image && (
          <img src={post.metadata.image} alt={post.metadata.title} className="my-4 rounded" />
        )}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className="mt-4">
          <span className="text-sm text-gray-500">Tag: {post.metadata.tag}</span>
        </div>
        <PostStatus post={post} />
      </div>
    </ArticleInView>
  );
};

export default Article;