import Link from "next/link";

interface Post {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
}

// Sample posts - these would typically come from a CMS or database
const allPosts: Post[] = [
  {
    id: "hello-world",
    title: "Hello World",
    date: "May 25, 2025",
    description: "Introduction to my new blog, my goals and what you can expect.",
    category: "Personal"
  },
  {
    id: "minimalist-design",
    title: "The Beauty of Minimalist Design",
    date: "May 24, 2025",
    description: "Exploring the principles of minimalist design and how to apply them effectively.",
    category: "Design"
  },
  {
    id: "nextjs-blog",
    title: "Building a Blog with Next.js",
    date: "May 23, 2025",
    description: "A technical overview of how this blog was built using Next.js and TailwindCSS.",
    category: "Development"
  },
  {
    id: "photography-basics",
    title: "Photography Basics: Composition",
    date: "May 22, 2025",
    description: "Learn the fundamental principles of photographic composition.",
    category: "Photography"
  },
  {
    id: "future-of-web",
    title: "The Future of Web Development",
    date: "May 21, 2025",
    description: "My thoughts on where web development is heading in the next few years.",
    category: "Development"
  }
];

export const metadata = {
  title: "All Posts - My Blog",
  description: "Browse all articles on design, development, and photography",
};

export default function PostsPage() {
  // Group posts by year for better organization
  const postsByYear = allPosts.reduce((acc, post) => {
    const year = post.date.split(', ')[1];
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as Record<string, Post[]>);

  // Sort years in descending order
  const years = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">All Posts</h1>
      
      {years.map(year => (
        <div key={year} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{year}</h2>
          <div className="space-y-8">
            {postsByYear[year].map(post => (
              <article key={post.id} className="group">
                <Link href={`/posts/${post.id}`}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline">
                    <div className="sm:w-32 text-sm text-gray-500 dark:text-gray-400 mb-1 sm:mb-0">
                      {post.date.split(',')[0]}
                    </div>
                    <div>
                      <h3 className="text-xl font-medium group-hover:underline underline-offset-4 mb-1">
                        {post.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        {post.description}
                      </p>
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 