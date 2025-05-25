import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CommentSection from "../../components/CommentSection";
import ShareButtons from "../../components/ShareButtons";

interface Post {
  id: string;
  title: string;
  date: string;
  content: string;
  category: string;
  coverImage?: string;
  author: {
    name: string;
    avatar: string;
    bio?: string;
  };
  relatedPosts?: string[];
}

// Sample posts database - in a real app, this would come from a CMS or API
const posts: Record<string, Post> = {
  "hello-world": {
    id: "hello-world",
    title: "Hello World",
    date: "May 25, 2025",
    category: "Personal",
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop",
    author: {
      name: "Minh Nguyễn",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Nhà phát triển web và nhà thiết kế UI/UX với niềm đam mê với trải nghiệm người dùng"
    },
    relatedPosts: ["minimalist-design", "nextjs-blog"],
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
    `
  },
  "minimalist-design": {
    id: "minimalist-design",
    title: "The Beauty of Minimalist Design",
    date: "May 24, 2025",
    category: "Design",
    coverImage: "https://images.unsplash.com/photo-1493606278519-11aa9f86e40a?q=80&w=1200&auto=format&fit=crop",
    author: {
      name: "Minh Nguyễn",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Nhà phát triển web và nhà thiết kế UI/UX với niềm đam mê với trải nghiệm người dùng"
    },
    relatedPosts: ["nextjs-blog", "hello-world"],
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
    `
  },
  "nextjs-blog": {
    id: "nextjs-blog",
    title: "Building a Blog with Next.js",
    date: "May 23, 2025",
    category: "Development",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop",
    author: {
      name: "Minh Nguyễn",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Nhà phát triển web và nhà thiết kế UI/UX với niềm đam mê với trải nghiệm người dùng"
    },
    relatedPosts: ["minimalist-design", "hello-world"],
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
    `
  }
};

export function generateStaticParams() {
  return Object.keys(posts).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const post = posts[slug];
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - My Blog`,
    description: post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160),
      type: 'article',
      authors: [post.author.name],
      images: post.coverImage ? [post.coverImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.content.substring(0, 160),
      images: post.coverImage ? [post.coverImage] : [],
    }
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const post = posts[slug];

  if (!post) {
    notFound();
  }

  // Lấy bài viết liên quan
  const relatedPostsData = post.relatedPosts
    ? post.relatedPosts.map(relatedSlug => posts[relatedSlug])
    : [];

  // This is a simple markdown renderer - in a real app, you'd use a proper markdown library
  const contentHtml = post.content
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl sm:text-4xl font-bold mb-6">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold mt-8 mb-4">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-medium mt-6 mb-3">$1</h3>')
    .replace(/^\- (.*$)/gm, '<li class="ml-6 list-disc my-1">$1</li>')
    .replace(/^\d+\. (.*$)/gm, '<li class="ml-6 list-decimal my-1">$1</li>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p class="my-4">');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/posts" className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Quay lại danh sách bài viết
        </Link>
      </div>
      
      <article>
        {post.coverImage && (
          <div className="mb-8 relative h-[400px] rounded-xl overflow-hidden">
            <Image 
              src={post.coverImage} 
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-1/3" />
          </div>
        )}
        
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
          
          <div className="flex items-center gap-4 my-6">
            <Image 
              src={post.author.avatar}
              alt={post.author.name}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <div className="font-medium">{post.author.name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {post.date} · {Math.ceil(post.content.length / 1000)} phút đọc
              </div>
            </div>
          </div>

          {/* Nút chia sẻ mạng xã hội */}
          <div className="md:hidden mt-4">
            <ShareButtons title={post.title} description={post.content.substring(0, 100)} />
          </div>
        </div>
        
        {/* Sidebar chia sẻ (hiển thị trên màn hình lớn) */}
        <div className="hidden md:block fixed left-4 top-1/3 -translate-x-full z-10 transform">
          <ShareButtons title={post.title} description={post.content.substring(0, 100)} />
        </div>
        
        <div 
          className="prose prose-lg prose-gray dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Nút chia sẻ dưới nội dung (hiển thị trên di động) */}
        <div className="md:hidden mb-10">
          <ShareButtons title={post.title} description={post.content.substring(0, 100)} />
        </div>

        {/* Thông tin tác giả */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-12">
          <Image 
            src={post.author.avatar}
            alt={post.author.name}
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <h3 className="text-xl font-semibold mb-2">Viết bởi {post.author.name}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{post.author.bio}</p>
            <div className="flex gap-4">
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Twitter</a>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">GitHub</a>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Website</a>
            </div>
          </div>
        </div>
        
        {/* Bài viết liên quan */}
        {relatedPostsData.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6">Bài viết liên quan</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPostsData.map(relatedPost => (
                <Link 
                  key={relatedPost.id} 
                  href={`/posts/${relatedPost.id}`}
                  className="group flex border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-md transition-all"
                >
                  {relatedPost.coverImage && (
                    <div className="relative w-1/3 min-h-full">
                      <Image
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4 w-2/3">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {relatedPost.date}
                    </div>
                    <h4 className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {relatedPost.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {/* Phần bình luận */}
        <CommentSection postId={post.id} />
      </article>
    </div>
  );
} 