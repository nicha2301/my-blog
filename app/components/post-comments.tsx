"use client";

import { useEffect, useState } from "react";
import Giscus from "@giscus/react";
import { useTheme } from "../providers/theme-provider";

interface PostCommentsProps {
  slug: string; // Slug của bài viết
}

type GiscusTheme = "light" | "light_high_contrast" | "light_protanopia" | "dark" | "dark_high_contrast" | "dark_protanopia" | "dark_dimmed" | "transparent_dark" | "preferred_color_scheme";

export function PostComments({ slug }: PostCommentsProps) {
  const [giscusTheme, setGiscusTheme] = useState<GiscusTheme>("light");
  const [isMounted, setIsMounted] = useState(false);
  const { theme, systemTheme } = useTheme();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    
    if (typeof slug !== 'string') {
      console.error('Invalid slug type:', typeof slug, slug);
      setError(`Invalid slug type: ${typeof slug}`);
    } else if (!slug) {
      console.error('Empty slug');
      setError('Empty slug');
    }
  }, [slug]);

  useEffect(() => {
    if (!isMounted) return;
    
    const currentTheme = theme === 'system' ? systemTheme : theme;
    
    if (currentTheme === "dark") {
      setGiscusTheme("dark_dimmed"); 
    } else {
      setGiscusTheme("light");
    }
  }, [theme, systemTheme, isMounted]);

  if (!isMounted) {
    return (
      <div className="py-12 border-t border-neutral-200 dark:border-neutral-800">
        <div className="animate-pulse h-[300px] rounded-lg bg-neutral-200 dark:bg-neutral-800"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 border-t border-neutral-200 dark:border-neutral-800">
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
          <h2 className="font-bold text-xl mb-2">Failed to load comments</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 border-t border-neutral-200 dark:border-neutral-800">
      <h2 className="text-3xl font-bold mb-8">Comments</h2>
      <Giscus
        id="comments"
        repo="nicha2301/my-blog"
        repoId="R_kgDOOwOzww"
        category="Announcements"
        categoryId="DIC_kwDOOwOzw84CrHgX"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={giscusTheme}
        lang="en"
        loading="lazy"
        strict="0"
        term={slug}
      />
    </div>
  );
}
