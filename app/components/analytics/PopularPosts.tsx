'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PopularPost {
  title: string;
  path: string;
  pageViews: number;
  averageTimeOnPage?: string;
}

interface PopularPostsResponse {
  popularPosts: PopularPost[];
}

export default function PopularPosts() {
  const [postsData, setPostsData] = useState<PopularPostsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPopularPosts() {
      try {
        setLoading(true);
        const response = await fetch('/api/analytics/popular');
        if (!response.ok) {
          throw new Error('Không thể lấy dữ liệu bài viết phổ biến');
        }
        const data = await response.json();
        setPostsData(data);
        setError(null);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
      } finally {
        setLoading(false);
      }
    }

    fetchPopularPosts();
  }, []);

  // 格式化阅读时间 (从秒转为分:秒)
  const formatReadingTime = (seconds?: string | number): string => {
    if (!seconds) return '0:00';
    
    const totalSeconds = typeof seconds === 'string' ? parseInt(seconds, 10) : seconds;
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = Math.floor(totalSeconds % 60);
    
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // 获取文章中的第一张图片URL (假设有图片提取逻辑)
  const getPostImage = (path: string): string => {
    // 返回默认图片
    return '/images/placeholder.jpg';
  };

  // 截取标题长度
  const truncateTitle = (title: string, maxLength: number = 60): string => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 animate-pulse">
        <h3 className="text-xl font-semibold mb-4">Bài viết phổ biến</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded"></div>
              <div className="flex-1">
                <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-white/20 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
        <h3 className="text-xl font-semibold mb-4">Bài viết phổ biến</h3>
        <div className="h-64 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 mb-2">Lỗi: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary/80 hover:bg-primary transition rounded-md text-sm font-medium"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!postsData || !postsData.popularPosts || postsData.popularPosts.length === 0) {
    return (
      <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
        <h3 className="text-xl font-semibold mb-4">Bài viết phổ biến</h3>
        <div className="h-64 flex items-center justify-center">
          <p className="text-white/60">Chưa có dữ liệu bài viết phổ biến</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
      <h3 className="text-xl font-semibold mb-6">Bài viết phổ biến</h3>
      
      <div className="space-y-4">
        {postsData.popularPosts.map((post, index) => (
          <Link 
            href={post.path} 
            key={index}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/10 transition group"
          >
            <div className="flex-shrink-0 w-16 h-16 relative rounded-md overflow-hidden border border-white/20">
              <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                <span className="text-xl font-bold opacity-30">#{index + 1}</span>
              </div>
              {/* 如果有真实图片可以替换下方的占位符 */}
              {/* <Image 
                src={getPostImage(post.path)} 
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition"
              /> */}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-medium mb-1 truncate">
                {truncateTitle(post.title)}
              </h4>
              <div className="flex text-xs text-white/60 gap-4">
                <div className="flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {post.pageViews} lượt xem
                </div>
                {post.averageTimeOnPage && (
                  <div className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatReadingTime(post.averageTimeOnPage)}
                  </div>
                )}
              </div>
            </div>
            
            <svg className="w-5 h-5 text-white/30 group-hover:text-white/70 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
} 