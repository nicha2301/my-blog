import { Metadata } from "next";
import Link from "next/link";
import { getAllTags, getPostsByTag } from "../lib/contentful";

export const metadata: Metadata = {
  title: "Tags - My Blog",
  description: "Tìm kiếm bài viết theo chủ đề",
};

export default async function TagsPage() {
  const tags = await getAllTags();

  // Nhóm tags theo chữ cái đầu tiên
  const tagsByFirstLetter = tags.reduce<Record<string, string[]>>((acc, tag) => {
    const firstLetter = tag.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(tag);
    return acc;
  }, {});

  // Sắp xếp các chữ cái
  const sortedFirstLetters = Object.keys(tagsByFirstLetter).sort();

  // Đếm số lượng bài viết cho mỗi tag
  const tagCounts: Record<string, number> = {};
  for (const tag of tags) {
    const posts = await getPostsByTag(tag);
    tagCounts[tag] = posts.length;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">Tags</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Duyệt bài viết theo chủ đề quan tâm
      </p>

      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Link 
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-colors group"
            >
              <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {tag}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                ({tagCounts[tag]})
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {sortedFirstLetters.map(letter => (
          <div key={letter}>
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
              {letter}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {tagsByFirstLetter[letter].map(tag => (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-between"
                >
                  <span>{tag}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({tagCounts[tag]})
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 