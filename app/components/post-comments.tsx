"use client";

import { useEffect, useState } from "react";
import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

interface PostCommentsProps {
  slug: string; // Slug của bài viết
}

export function PostComments({ slug }: PostCommentsProps) {
  const { resolvedTheme } = useTheme();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (resolvedTheme === "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [resolvedTheme]);

  if (!isMounted) {
    return (
      <div className="py-12 border-t border-neutral-200 dark:border-neutral-800">
        <div className="animate-pulse h-[300px] rounded-lg bg-neutral-200 dark:bg-neutral-800"></div>
      </div>
    );
  }

  return (
    <div className="py-12 border-t border-neutral-200 dark:border-neutral-800">
      <h2 className="text-3xl font-bold mb-8">Bình luận</h2>
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
        theme={theme}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
