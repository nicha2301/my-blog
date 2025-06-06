import { client } from './client';
import {
  allPostsQuery,
  postBySlugQuery,
  allCategoriesQuery,
  allAuthorsQuery,
  relatedPostsQuery,
  postsByCategoryQuery,
  postsByAuthorQuery,
  aboutPageQuery
} from './queries';

// Types có thể sử dụng lại từ data.ts hoặc định nghĩa mới
import { Post, Author, Category } from '../data';

// Get all posts
export async function getAllPosts(): Promise<Post[]> {
  return await client.fetch(allPostsQuery);
}

// Get a post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  return await client.fetch(postBySlugQuery, { slug });
}

// Get all categories
export async function getAllCategories(): Promise<Category[]> {
  return await client.fetch(allCategoriesQuery);
}

// Get a category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return await client.fetch(`*[_type == "category" && slug.current == $slug][0]`, { slug });
}

// Get all authors
export async function getAllAuthors(): Promise<Author[]> {
  return await client.fetch(allAuthorsQuery);
}

// Get an author by ID
export async function getAuthorById(id: string): Promise<Author | null> {
  return await client.fetch(`*[_type == "author" && _id == $id][0]`, { id });
}

// Get related posts
export async function getRelatedPosts(postId: string, categoryId: string, limit: number = 3): Promise<Post[]> {
  return await client.fetch(relatedPostsQuery, { postId, categoryId });
}

// Get posts by category
export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  return await client.fetch(postsByCategoryQuery, { categorySlug });
}

// Get posts by author
export async function getPostsByAuthor(authorId: string): Promise<Post[]> {
  return await client.fetch(postsByAuthorQuery, { authorId });
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<Post[]> {
  return await client.fetch(`*[_type == "post" && $tag in tags[]->title]`, { tag });
}

// 获取"关于我们"页面内容
export async function getAboutPageContent() {
  return await client.fetch(aboutPageQuery);
} 