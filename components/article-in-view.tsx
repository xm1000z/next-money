"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type Props = {
  firstPost: boolean;
  slug: string;
};

export function ArticleInView({ slug, firstPost }: Props) {
  const inView = true;

  const pathname = usePathname();
  const fullSlug = `/updates/${slug}`;

  useEffect(() => {
    if (inView && pathname !== fullSlug) {
      window.history.pushState({ urlPath: fullSlug }, "", fullSlug);
    }
  }, [inView, fullSlug, firstPost]);

  return <div />;
}