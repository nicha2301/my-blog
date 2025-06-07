// Định nghĩa kiểu cho window.gtag
declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'set',
      action: string,
      params?: Record<string, any>
    ) => void;
  }
}

/**
 * Gửi một sự kiện tùy chỉnh đến Google Analytics
 * @param action Tên của sự kiện
 * @param params Các tham số bổ sung cho sự kiện
 */
export const trackEvent = (action: string, params: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params);
  }
};

/**
 * Theo dõi một lượt xem trang
 * @param url URL của trang
 * @param title Tiêu đề trang
 */
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: url,
      page_title: title || document.title
    });
  }
};

/**
 * Theo dõi khi người dùng nhấp vào một bài viết
 * @param postId ID của bài viết
 * @param postTitle Tiêu đề bài viết
 */
export const trackPostClick = (postId: string, postTitle: string) => {
  trackEvent('post_click', {
    post_id: postId,
    post_title: postTitle
  });
};

/**
 * Theo dõi khi người dùng tìm kiếm
 * @param searchTerm Từ khóa tìm kiếm
 */
export const trackSearch = (searchTerm: string) => {
  trackEvent('search', {
    search_term: searchTerm
  });
}; 