'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Tiêu đề và nội dung mẫu cho trang kết quả tìm kiếm
export const metadata = {
  title: "Tìm kiếm - My Blog",
  description: "Tìm kiếm bài viết và dự án",
};

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'post' | 'project';
  url: string;
  date?: string;
  category?: string;
}

// Dữ liệu mẫu để mô phỏng kết quả tìm kiếm
const allContent: SearchResult[] = [
  {
    id: "hello-world",
    title: "Hello World",
    description: "Introduction to my new blog, my goals and what you can expect.",
    type: "post",
    url: "/posts/hello-world",
    date: "May 25, 2025",
    category: "Personal"
  },
  {
    id: "minimalist-design",
    title: "The Beauty of Minimalist Design",
    description: "Exploring the principles of minimalist design and how to apply them effectively.",
    type: "post",
    url: "/posts/minimalist-design",
    date: "May 24, 2025",
    category: "Design"
  },
  {
    id: "nextjs-blog",
    title: "Building a Blog with Next.js",
    description: "A technical overview of how this blog was built using Next.js and TailwindCSS.",
    type: "post",
    url: "/posts/nextjs-blog",
    date: "May 23, 2025",
    category: "Development"
  },
  {
    id: "photography-basics",
    title: "Photography Basics: Composition",
    description: "Learn the fundamental principles of photographic composition.",
    type: "post",
    url: "/posts/photography-basics",
    date: "May 22, 2025",
    category: "Photography"
  },
  {
    id: "future-of-web",
    title: "The Future of Web Development",
    description: "My thoughts on where web development is heading in the next few years.",
    type: "post",
    url: "/posts/future-of-web",
    date: "May 21, 2025",
    category: "Development"
  },
  {
    id: "web-interface-guidelines",
    title: "Web Interface Guidelines",
    description: "A collection of best practices for creating effective web interfaces",
    type: "project",
    url: "/projects",
  },
  {
    id: "portfolio-website",
    title: "Personal Portfolio",
    description: "A minimalist portfolio website built with Next.js and TailwindCSS",
    type: "project",
    url: "/projects",
  },
  {
    id: "command-menu",
    title: "⌘K Menu",
    description: "A customizable command menu component for React applications",
    type: "project",
    url: "/projects",
  },
  {
    id: "ui-playground",
    title: "UI Playground",
    description: "An experimental laboratory for creating and testing user interface components",
    type: "project",
    url: "/projects",
  },
  {
    id: "digital-journal",
    title: "Digital Journal",
    description: "A minimal journaling application with a focus on privacy and simplicity",
    type: "project",
    url: "/projects",
  }
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (query) {
      const normalizedQuery = query.toLowerCase();
      const filtered = allContent.filter(
        item => 
          item.title.toLowerCase().includes(normalizedQuery) || 
          item.description.toLowerCase().includes(normalizedQuery) ||
          (item.category && item.category.toLowerCase().includes(normalizedQuery))
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">Kết quả tìm kiếm</h1>
      {query ? (
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {results.length} kết quả cho "{query}"
        </p>
      ) : (
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Vui lòng nhập từ khóa để tìm kiếm
        </p>
      )}

      {results.length > 0 ? (
        <div className="space-y-10">
          {results.map(result => (
            <article key={result.id} className="group">
              <Link href={result.url}>
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-medium group-hover:underline underline-offset-4">
                      {result.title}
                    </h3>
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                      {result.type === 'post' ? 'Bài viết' : 'Dự án'}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    {result.description}
                  </p>
                  
                  {result.type === 'post' && result.date && result.category && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>{result.date}</span>
                      <span>•</span>
                      <span>{result.category}</span>
                    </div>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Không tìm thấy kết quả nào cho "{query}"
          </p>
          <p className="mt-2">
            Thử tìm với từ khóa khác hoặc duyệt tất cả 
            <Link href="/posts" className="text-blue-600 dark:text-blue-400 ml-1 hover:underline">
              bài viết
            </Link>
          </p>
        </div>
      ) : null}
    </div>
  );
} 