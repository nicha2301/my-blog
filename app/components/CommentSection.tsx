'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
}

interface CommentSectionProps {
  postId: string;
}

// Dữ liệu mẫu - trong thực tế sẽ được lấy từ API
const sampleComments: Record<string, Comment[]> = {
  'hello-world': [
    {
      id: '1',
      author: 'Thảo Nguyễn',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      content: 'Rất thích bài viết của bạn! Tôi mong chờ được đọc nhiều bài viết hơn từ blog này.',
      date: '4 giờ trước'
    },
    {
      id: '2',
      author: 'Minh Phạm',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      content: 'Chào mừng đến với thế giới blog. Tôi cũng là một blogger và rất háo hức được theo dõi hành trình của bạn!',
      date: '1 ngày trước'
    }
  ],
  'minimalist-design': [
    {
      id: '1',
      author: 'Hà Trần',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      content: 'Bài viết rất hay về thiết kế tối giản. Tôi đang áp dụng những nguyên tắc này cho website của mình.',
      date: '2 giờ trước'
    }
  ],
  'nextjs-blog': [
    {
      id: '1',
      author: 'Tuấn Vũ',
      avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
      content: 'Cảm ơn vì hướng dẫn chi tiết! Đang tìm hiểu về Next.js và bài viết này giúp ích rất nhiều.',
      date: '3 giờ trước'
    },
    {
      id: '2',
      author: 'Lan Anh',
      avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
      content: 'Bạn có thể chia sẻ thêm về cách bạn tối ưu hóa hiệu suất cho blog của mình không?',
      date: '1 ngày trước'
    },
    {
      id: '3',
      author: 'Hoàng Nam',
      avatar: 'https://randomuser.me/api/portraits/men/91.jpg',
      content: 'Đang tìm hiểu về Server Components. Rất thích cách bạn giải thích!',
      date: '2 ngày trước'
    }
  ]
};

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Mô phỏng việc lấy dữ liệu bình luận
    const postComments = sampleComments[postId] || [];
    setComments(postComments);
  }, [postId]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim() || !userName.trim()) return;
    
    setIsLoading(true);
    
    // Mô phỏng API call
    setTimeout(() => {
      const newCommentObj: Comment = {
        id: Date.now().toString(),
        author: userName,
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${Math.floor(Math.random() * 100)}.jpg`,
        content: newComment,
        date: 'Vừa xong'
      };
      
      setComments(prevComments => [newCommentObj, ...prevComments]);
      setNewComment('');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
      <h3 className="text-2xl font-semibold mb-8">Bình luận ({comments.length})</h3>
      
      {/* Form bình luận */}
      <form onSubmit={handleSubmitComment} className="mb-10">
        <div className="mb-4">
          <label htmlFor="userName" className="block mb-2 text-sm">Tên của bạn</label>
          <input
            id="userName"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
            placeholder="Nhập tên của bạn"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="comment" className="block mb-2 text-sm">Bình luận của bạn</label>
          <textarea
            id="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
            placeholder="Viết bình luận của bạn..."
            required
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          className={`px-5 py-2 rounded-lg transition-colors ${
            isLoading
              ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isLoading ? 'Đang gửi...' : 'Gửi bình luận'}
        </button>
      </form>
      
      {/* Danh sách bình luận */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment.id} className="flex gap-4">
              <div className="flex-shrink-0">
                <Image
                  src={comment.avatar}
                  alt={comment.author}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div className="flex-grow">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-medium">{comment.author}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{comment.date}</span>
                </div>
                <p className="text-gray-800 dark:text-gray-200">{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-6">
            Chưa có bình luận. Hãy là người đầu tiên bình luận!
          </p>
        )}
      </div>
    </div>
  );
} 