"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface ArticleInViewProps {
  slug: string;
  children: React.ReactNode;
}

export const ArticleInView: React.FC<ArticleInViewProps> = ({ slug, children }) => {
  const inView = true;

  const pathname = usePathname();
  const fullSlug = `/updates/${slug}`;

  useEffect(() => {
    if (inView && pathname !== fullSlug) {
      window.history.pushState({ urlPath: fullSlug }, "", fullSlug);
    }
  }, [inView, fullSlug]);

  return (
    <div className="article-in-view">
      {children}
    </div>
  );
};