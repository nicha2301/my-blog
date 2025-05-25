// Mô phỏng kết nối với Contentful
// Trong thực tế, bạn sẽ cài đặt SDK Contentful và sử dụng các API của nó

import { cache } from 'react';

interface Author {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  updatedAt: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  category: string;
  author: Author;
  tags: string[];
}

// Mô phỏng dữ liệu Contentful
const authors: Author[] = [
  {
    id: 'author-1',
    name: 'Minh Nguyễn',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Nhà phát triển web và nhà thiết kế UI/UX với niềm đam mê với trải nghiệm người dùng'
  }
];

const posts: Post[] = [
  {
    id: 'post-1',
    title: 'Hello World',
    slug: 'hello-world',
    date: 'May 25, 2025',
    updatedAt: '2025-05-25T12:00:00.000Z',
    excerpt: 'Introduction to my new blog, my goals and what you can expect.',
    content: `
# Hello World

Welcome to my new blog! I'm excited to start sharing my thoughts and experiences with you all. 
This space will be dedicated to topics I'm passionate about: design, technology, photography, and more.

## Why I Started This Blog

I've always enjoyed writing, but never had a dedicated space to share my thoughts. This blog is my attempt to change that.
I hope to:

- Share my knowledge and experiences
- Connect with like-minded individuals
- Document my journey in design and development
- Improve my writing skills

I'll be posting regularly about my projects, thoughts on design trends, technical tutorials, and occasionally some personal reflections.

## What to Expect

My goal is to post at least once a week. Topics will range from technical deep-dives into web development to thoughts on 
minimalist design principles and photography techniques.

Thanks for joining me on this journey! Don't hesitate to reach out if you have any questions or topics you'd like me to cover.
    `,
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop',
    category: 'Personal',
    author: authors[0],
    tags: ['blog', 'personal', 'introduction']
  },
  {
    id: 'post-2',
    title: 'The Beauty of Minimalist Design',
    slug: 'minimalist-design',
    date: 'May 24, 2025',
    updatedAt: '2025-05-24T10:30:00.000Z',
    excerpt: 'Exploring the principles of minimalist design and how to apply them effectively.',
    content: `
# The Beauty of Minimalist Design

Minimalism in design is about more than just aesthetics; it's a philosophy that emphasizes simplicity, clarity, and purpose.
When done right, minimalist design can create powerful user experiences by removing distractions and focusing attention on what matters most.

## Core Principles of Minimalist Design

### 1. Simplicity

Eliminate unnecessary elements and focus on what's essential. As the saying goes: "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away."

### 2. Clarity

Every element should have a clear purpose. Typography, spacing, and hierarchy should guide users through the experience without confusion.

### 3. Negative Space

Also known as "white space," negative space is a powerful tool in minimalist design. It creates breathing room, improves readability, and emphasizes important elements.

## Benefits of Minimalist Design

- **Improved user focus**: Fewer distractions mean users can focus on what's important
- **Better performance**: Simpler designs typically load faster
- **Timelessness**: Minimalist designs tend to age better than trendy, complex designs
- **Accessibility**: Properly executed minimalist designs often improve accessibility

In future posts, I'll explore specific techniques for achieving effective minimalist designs in both digital and physical products.
    `,
    coverImage: 'https://images.unsplash.com/photo-1493606278519-11aa9f86e40a?q=80&w=1200&auto=format&fit=crop',
    category: 'Design',
    author: authors[0],
    tags: ['design', 'minimalism', 'ux', 'ui']
  },
  {
    id: 'post-3',
    title: 'Building a Blog with Next.js',
    slug: 'nextjs-blog',
    date: 'May 23, 2025',
    updatedAt: '2025-05-23T15:45:00.000Z',
    excerpt: 'A technical overview of how this blog was built using Next.js and TailwindCSS.',
    content: `
# Building a Blog with Next.js

Next.js has become my framework of choice for web development projects. Its combination of performance, developer experience, and flexibility makes it perfect for building modern websites and applications.

## Why I Chose Next.js for This Blog

Next.js offers several features that make it ideal for a blog:

### 1. File-based Routing

The app router in Next.js 13+ makes creating pages as simple as creating files in your project. Dynamic routes (like the one you're reading now) are handled elegantly without complex configuration.

### 2. Server Components

React Server Components allow me to render content on the server, improving both performance and SEO. This is crucial for a content-focused site like a blog.

### 3. Image Optimization

Next.js's Image component automatically optimizes images for different device sizes and formats, ensuring fast loading times without sacrificing quality.

### 4. Static Generation

For a blog, being able to pre-render pages at build time is perfect. It means visitors get lightning-fast page loads without waiting for server processing.

## The Stack

This blog uses:

- **Next.js** for the framework
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **Markdown** for content authoring

In the future, I plan to add features like a newsletter subscription, comments, and analytics. I'll write follow-up posts about the implementation details as I develop them.
    `,
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop',
    category: 'Development',
    author: authors[0],
    tags: ['next.js', 'react', 'tailwindcss', 'web development']
  }
];

// Cache các kết quả để tăng hiệu suất
export const getAllPosts = cache(async () => {
  // Trong thực tế, đây sẽ là API call đến Contentful
  // const response = await contentfulClient.getEntries<Post>({ content_type: 'blogPost' });
  
  // Mô phỏng độ trễ của mạng
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return posts;
});

export const getPostBySlug = cache(async (slug: string) => {
  // Trong thực tế, đây sẽ là API call đến Contentful
  // const response = await contentfulClient.getEntries<Post>({ 
  //   content_type: 'blogPost',
  //   'fields.slug': slug,
  //   limit: 1
  // });
  
  // Mô phỏng độ trễ của mạng
  await new Promise(resolve => setTimeout(resolve, 50));
  
  return posts.find(post => post.slug === slug);
});

export const getRelatedPosts = cache(async (currentSlug: string, limit = 2) => {
  // Trong thực tế, đây sẽ là API call phức tạp hơn để lấy bài viết liên quan dựa trên tags, category...
  // Mô phỏng độ trễ của mạng
  await new Promise(resolve => setTimeout(resolve, 50));
  
  const currentPost = posts.find(post => post.slug === currentSlug);
  
  if (!currentPost) return [];
  
  // Tìm bài viết có chung category hoặc có chung tags
  return posts
    .filter(post => 
      post.slug !== currentSlug && 
      (post.category === currentPost.category || 
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .slice(0, limit);
});

export const getPostsByCategory = cache(async (category: string) => {
  // Mô phỏng độ trễ của mạng
  await new Promise(resolve => setTimeout(resolve, 50));
  
  return posts.filter(post => post.category === category);
});

export const getPostsByTag = cache(async (tag: string) => {
  // Mô phỏng độ trễ của mạng
  await new Promise(resolve => setTimeout(resolve, 50));
  
  return posts.filter(post => post.tags.includes(tag));
});

export const getAllCategories = cache(async () => {
  // Mô phỏng độ trễ của mạng
  await new Promise(resolve => setTimeout(resolve, 30));
  
  const categories = Array.from(new Set(posts.map(post => post.category)));
  return categories;
});

export const getAllTags = cache(async () => {
  // Mô phỏng độ trễ của mạng
  await new Promise(resolve => setTimeout(resolve, 30));
  
  const allTags = posts.flatMap(post => post.tags);
  const uniqueTags = Array.from(new Set(allTags));
  return uniqueTags;
}); 