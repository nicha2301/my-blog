// GROQ queries để lấy dữ liệu từ Sanity

// Lấy tất cả bài viết
export const allPostsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    "date": publishedAt,
    "readTime": estimatedReadingTime,
    "image": mainImage.asset->url,
    "category": categories[0]->title,
    "categorySlug": categories[0]->slug.current,
    "author": {
      "id": author->_id,
      "name": author->name,
      "avatar": author->image.asset->url
    },
    "tags": tags[]->title
  }
`;

// Lấy một bài viết theo slug
export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    "date": publishedAt,
    "readTime": estimatedReadingTime,
    "image": mainImage.asset->url,
    "category": categories[0]->title,
    "categorySlug": categories[0]->slug.current,
    "author": {
      "id": author->_id,
      "name": author->name,
      "avatar": author->image.asset->url
    },
    "tags": tags[]->title
  }
`;

// Lấy tất cả danh mục
export const allCategoriesQuery = `
  *[_type == "category"] {
    _id,
    title,
    description,
    "slug": slug.current
  }
`;

// Lấy tất cả tác giả
export const allAuthorsQuery = `
  *[_type == "author"] {
    _id,
    name,
    "role": jobTitle,
    bio,
    "avatar": image.asset->url,
    "social": {
      "twitter": social.twitter,
      "linkedin": social.linkedin,
      "instagram": social.instagram
    }
  }
`;

// Lấy các bài viết liên quan
export const relatedPostsQuery = `
  *[_type == "post" && _id != $postId && $categoryId in categories[]->_id][0..2] {
    _id,
    title,
    slug,
    "date": publishedAt,
    "image": mainImage.asset->url,
    "category": categories[0]->title
  }
`;

// Lấy bài viết theo danh mục
export const postsByCategoryQuery = `
  *[_type == "post" && $categorySlug in categories[]->slug.current] {
    _id,
    title,
    slug,
    excerpt,
    "date": publishedAt,
    "readTime": estimatedReadingTime,
    "image": mainImage.asset->url,
    "category": categories[0]->title,
    "author": {
      "id": author->_id,
      "name": author->name,
      "avatar": author->image.asset->url
    }
  }
`;

// Lấy bài viết theo tác giả
export const postsByAuthorQuery = `
  *[_type == "post" && author->_id == $authorId] {
    _id,
    title,
    slug,
    excerpt,
    "date": publishedAt,
    "readTime": estimatedReadingTime,
    "image": mainImage.asset->url,
    "category": categories[0]->title
  }
`;

export const aboutPageQuery = `
  *[_type == "aboutPage"][0] {
    title,
    description,
    mission,
    values[] {
      title,
      description
    },
    team[] {
      name,
      role,
      bio,
      "image": photo.asset->url
    },
    "joinImage": joinImage.asset->url
  }
`; 