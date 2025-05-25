import Image from "next/image";
import Link from "next/link";
import NewsletterSignup from "./components/NewsletterSignup";
import { getAllTags } from "./lib/contentful";

interface Post {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
  coverImage?: string;
}

// Sample posts - these would typically come from a CMS or database
const featuredPosts: Post[] = [
  {
    id: "hello-world",
    title: "Hello World",
    date: "May 25, 2025",
    description: "Introduction to my new blog, my goals and what you can expect in the coming months as I share my journey in design and development.",
    category: "Personal",
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "minimalist-design",
    title: "The Beauty of Minimalist Design",
    date: "May 24, 2025",
    description: "Exploring the principles of minimalist design and how to apply them effectively to create impactful digital and physical products.",
    category: "Design",
    coverImage: "https://images.unsplash.com/photo-1493606278519-11aa9f86e40a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "nextjs-blog",
    title: "Building a Blog with Next.js",
    date: "May 23, 2025",
    description: "A technical overview of how this blog was built using Next.js and TailwindCSS, focusing on performance optimizations and SEO.",
    category: "Development",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "photography-basics",
    title: "Photography Basics: Composition",
    date: "May 22, 2025",
    description: "Learn the fundamental principles of photographic composition to improve your photography skills instantly.",
    category: "Photography",
    coverImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop"
  }
];

export default async function Home() {
  const popularTags = await getAllTags();

  return (
    <div className="max-w-4xl mx-auto">
      <section className="py-10 sm:py-16">
        <div className="flex flex-col md:flex-row gap-10 items-center mb-12">
          <div className="md:w-2/3">
            <h1 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight">
              Khám phá ý tưởng về <span className="text-gray-600 dark:text-gray-300">thiết kế</span>, <span className="text-gray-600 dark:text-gray-300">phát triển web</span>, và <span className="text-gray-600 dark:text-gray-300">nhiếp ảnh</span>
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Blog chia sẻ những suy nghĩ và kinh nghiệm về thiết kế tối giản, phát triển web và nhiếp ảnh. Được viết bởi một nhà thiết kế và phát triển.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/posts" className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600">
                Đọc bài viết
              </Link>
              <Link href="/projects" className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Xem dự án
              </Link>
            </div>
          </div>
          <div className="md:w-1/3 relative bg-gray-100 dark:bg-gray-800 rounded-xl p-2">
            <Image 
              src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=400&auto=format&fit=crop" 
              alt="Workspace with laptop and notebook" 
              width={400} 
              height={300}
              className="rounded-lg object-cover aspect-[4/3]"
            />
          </div>
        </div>
        
        <div className="h-[2px] w-32 bg-gray-300 dark:bg-gray-700 my-12 mx-auto"></div>
      </section>

      <section className="mb-16">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-2xl font-bold">Bài viết gần đây</h2>
          <Link href="/posts" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm">
            Xem tất cả →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredPosts.slice(0, 2).map((post) => (
            <article key={post.id} className="group flex flex-col bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all">
              <Link href={`/posts/${post.id}`} className="h-full flex flex-col">
                {post.coverImage && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 px-2 py-1 text-xs rounded-full">
                      {post.category}
                    </div>
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">{post.date}</div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm flex-grow">
                    {post.description}
                  </p>
                  <div className="mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium">
                    Đọc tiếp →
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
        
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {featuredPosts.slice(2, 4).map((post) => (
            <article key={post.id} className="group flex bg-white dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-md transition-all">
              <Link href={`/posts/${post.id}`} className="flex flex-row w-full">
                {post.coverImage && (
                  <div className="relative w-1/3 min-h-full">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4 w-2/3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{post.date}</span>
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">
                    {post.description}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/posts" className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors inline-flex items-center">
            Xem tất cả bài viết
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
      
      <NewsletterSignup />

      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Chủ đề được quan tâm</h2>
          <Link href="/tags" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm">
            Xem tất cả →
          </Link>
        </div>
        <div className="flex flex-wrap gap-3">
          {popularTags.slice(0, 9).map((tag) => (
            <Link 
              key={tag} 
              href={`/tags/${encodeURIComponent(tag)}`} 
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
