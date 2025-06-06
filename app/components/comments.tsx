"use client";

import { useEffect, useState } from "react";
import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

interface CommentsProps {
  mapping: string; // Slug của bài viết
}

export function Comments({ mapping }: CommentsProps) {
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
        repo="your-github-username/your-blog-repo" // Thay thế bằng username và repository của bạn
        repoId="R_kgDOKxyzAB" // Thay thế bằng ID của repository
        category="Announcements" // Tên của category trong GitHub Discussions
        categoryId="DIC_kwDOKxyzAB4Cba" // Thay thế bằng ID của category
        mapping="specific"
        term={mapping}
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme}
        lang="vi"
        loading="lazy"
      />
    </div>
  );
} 