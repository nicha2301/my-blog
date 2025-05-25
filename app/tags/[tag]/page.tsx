import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPostsByTag, getAllTags } from "../../lib/contentful";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map(tag => ({ tag }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag);
  
  return {
    title: `Bài viết về ${tag} - My Blog`,
    description: `Tất cả bài viết liên quan đến chủ đề ${tag}`,
    openGraph: {
      title: `Bài viết về ${tag}`,
      description: `Tất cả bài viết liên quan đến chủ đề ${tag}`,
    }
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag);
  const posts = await getPostsByTag(tag);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/tags" className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">
            Tags
          </Link>
          <span className="text-gray-400">/</span>
          <h1 className="text-2xl font-bold">{tag}</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {posts.length} bài viết với tag {tag}
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="space-y-10">
          {posts.map(post => (
            <article key={post.id} className="group">
              <Link href={`/posts/${post.slug}`}>
                <div className="flex flex-col md:flex-row gap-6">
                  {post.coverImage && (
                    <div className="md:w-1/3 relative h-48 md:h-auto rounded-lg overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className={post.coverImage ? "md:w-2/3" : "w-full"}>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {post.date}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <Link
                          key={tag}
                          href={`/tags/${encodeURIComponent(tag)}`}
                          className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400">
            Không tìm thấy bài viết nào với tag {tag}
          </p>
          <Link href="/posts" className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline">
            Xem tất cả bài viết
          </Link>
        </div>
      )}
    </div>
  );
} 