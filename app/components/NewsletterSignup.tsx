'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Vui lòng nhập email hợp lệ');
      return;
    }
    
    setStatus('loading');
    
    // Mô phỏng API call
    setTimeout(() => {
      setStatus('success');
      setMessage('Cảm ơn bạn đã đăng ký!');
      setEmail('');
      
      // Reset thông báo sau 3 giây
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    }, 1000);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 my-10">
      <h3 className="text-xl font-semibold mb-2">Đăng ký nhận tin</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Nhận thông báo khi có bài viết mới về thiết kế và phát triển web.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="flex-grow px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className={`px-6 py-2 rounded-lg font-medium transition-colors
            ${status === 'loading' 
              ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' 
              : 'bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-white'}`}
          >
            {status === 'loading' ? 'Đang xử lý...' : 'Đăng ký'}
          </button>
        </div>
      </form>
      
      {message && (
        <p className={`mt-3 text-sm ${status === 'error' ? 'text-red-500' : 'text-green-600 dark:text-green-400'}`}>
          {message}
        </p>
      )}
    </div>
  );
} 