'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface PopularPage {
  path: string;
  title: string;
  views: number;
}

export default function PopularPosts() {
  const [popularPages, setPopularPages] = useState<PopularPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPopularPages() {
      try {
        const response = await fetch('/api/analytics/popular');
        if (!response.ok) {
          throw new Error('Không thể lấy dữ liệu trang phổ biến');
        }
        const data = await response.json();
        
        // Lọc chỉ lấy các trang blog post
        const blogPosts = data.filter((page: PopularPage) => 
          page.path.includes('/blog/') && !page.path.includes('/page/')
        );
        
        setPopularPages(blogPosts.slice(0, 5));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPopularPages();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
        <h3 className="text-xl font-semibold mb-4">Bài viết phổ biến</h3>
        <div className="space-y-2">
          <p>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
        <h3 className="text-xl font-semibold mb-4">Bài viết phổ biến</h3>
        <div className="space-y-2">
          <p>Lỗi: {error}</p>
        </div>
      </div>
    );
  }

  if (!popularPages || popularPages.length === 0) {
    return (
      <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
        <h3 className="text-xl font-semibold mb-4">Bài viết phổ biến</h3>
        <div className="space-y-2">
          <p>Không có dữ liệu bài viết phổ biến</p>
        </div>
      </div>
    );
  }

  // Hàm rút gọn tiêu đề quá dài
  const truncateTitle = (title: string, maxLength: number = 50) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + '...';
  };

  // Hàm lấy đường dẫn bài viết từ URL
  const getPostSlug = (path: string) => {
    // Loại bỏ các tham số URL
    const cleanPath = path.split('?')[0];
    // Lấy slug từ đường dẫn /blog/[slug]
    const slugMatch = cleanPath.match(/\/blog\/([^/]+)/);
    return slugMatch ? slugMatch[1] : '';
  };

  return (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
      <h3 className="text-xl font-semibold mb-4">Bài viết phổ biến</h3>
      <div className="space-y-3">
        {popularPages.map((page, index) => (
          <div key={index} className="border-b border-white/10 pb-2 last:border-0">
            <Link href={`/blog/${getPostSlug(page.path)}`} className="hover:text-purple-300 transition">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium line-clamp-1">{truncateTitle(page.title)}</h4>
                </div>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  {page.views} lượt xem
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
} 