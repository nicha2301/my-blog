export type Author = {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  }
};

export type Category = {
  id: string;
  name: string;
  description: string;
  slug: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  categorySlug: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  tags: string[];
};

export const authors: Author[] = [
  {
    id: "1",
    name: "Alex Morgan",
    role: "Lead Designer",
    bio: "Alex is a digital product designer with over 10 years of experience in creating user-centered interfaces for web and mobile applications. He focuses on minimalist approaches to complex problems.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop",
    social: {
      twitter: "alexmorgan",
      linkedin: "alex-morgan",
      instagram: "alex.design"
    }
  },
  {
    id: "2",
    name: "Emily Chen",
    role: "Content Strategist",
    bio: "Emily specializes in content strategy and UX writing. With a background in journalism, she brings a unique perspective to digital products, focusing on clear communication and engaging narratives.",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1471&auto=format&fit=crop",
    social: {
      twitter: "emilychen",
      linkedin: "emily-chen",
      instagram: "emilychen.writer"
    }
  },
  {
    id: "3",
    name: "Michael Torres",
    role: "UX Engineer",
    bio: "Michael is a UX engineer bridging the gap between design and development. He's passionate about creating accessible, performant interfaces that delight users while maintaining technical excellence.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1374&auto=format&fit=crop",
    social: {
      twitter: "michael_ux",
      linkedin: "michael-torres",
      instagram: "michael.codes"
    }
  }
];

export const categories: Category[] = [
  {
    id: "design",
    name: "Design",
    description: "Explorations in visual design, UI patterns, and design systems for digital products.",
    slug: "design"
  },
  {
    id: "typography",
    name: "Typography",
    description: "Articles focused on type design, font selection, and typographic principles for digital interfaces.",
    slug: "typography"
  },
  {
    id: "development",
    name: "Development",
    description: "Technical articles exploring front-end development, best practices, and new technologies.",
    slug: "development"
  },
  {
    id: "strategy",
    name: "Strategy",
    description: "Insights into product strategy, user research, and making data-driven design decisions.",
    slug: "strategy"
  },
  {
    id: "philosophy",
    name: "Philosophy",
    description: "Explorations in philosophical concepts and their applications in various fields.",
    slug: "philosophy"
  }
];

export const posts: Post[] = [
  {
    id: "1",
    title: "The Art of Minimalism in Digital Design",
    slug: "minimalism-in-digital-design",
    excerpt: "Explore how the principles of minimalism can create more effective, elegant, and user-friendly digital experiences that stand the test of time.",
    content: `# The Art of Minimalism in Digital Design

In an age of information overload and constant digital noise, minimalism stands as a breath of fresh air. This design philosophy, rooted in the principle of "less is more," has become increasingly relevant in our complex digital landscape.

## Origins of Minimalist Design

Minimalism as an art movement emerged in the early 20th century, but its principles have found new relevance in digital design. The core tenets of minimalism—simplicity, clarity, and purpose—align perfectly with the goals of effective user experience design.

## Why Minimalism Works in Digital Design

### 1. Improved User Focus

By removing unnecessary elements, minimalist design creates clearer paths for users to follow. When a screen is cluttered with too many options, users experience what psychologists call "choice paralysis." Minimalist interfaces reduce cognitive load, allowing users to focus on what truly matters.

### 2. Enhanced Usability

Minimalist designs often feature intuitive navigation, clear hierarchies, and purposeful white space. These elements combine to create interfaces that users can understand and navigate with minimal learning curve.

### 3. Faster Load Times

From a technical perspective, minimalist designs typically require fewer resources, resulting in faster loading pages and smoother performance—critical factors in user retention and satisfaction.

## Principles of Minimalist Digital Design

### Purposeful White Space

White space (or negative space) isn't empty; it's a powerful design element that gives content room to breathe. Proper use of white space improves readability, highlights important elements, and creates a sense of elegance.

### Limited Color Palette

Minimalist designs often employ a restrained color palette, typically with 2-3 primary colors. This constraint forces designers to use color purposefully rather than decoratively, creating stronger visual hierarchies and more cohesive experiences.

### Typography as a Central Element

In the absence of decorative elements, typography takes center stage in minimalist design. Font choice, sizing, and spacing become critical design decisions that shape the entire user experience.

## Balancing Minimalism with Functionality

While minimalism advocates for removing the unnecessary, it's crucial to distinguish between decoration and function. A common criticism of minimalist design is that it can sometimes sacrifice usability in pursuit of aesthetic simplicity.

The key is to practice "practical minimalism"—removing what's unnecessary while keeping elements that serve a clear purpose, even if they add some visual complexity.

## Conclusion

Minimalism isn't about making things plain or boring—it's about intentionality and focus. In digital design, this translates to creating experiences that respect users' time and attention, guiding them effortlessly toward their goals.

As we continue to navigate an increasingly complex digital world, the principles of minimalist design offer a valuable framework for creating interfaces that endure, function beautifully, and provide clarity amidst the noise.`,
    date: "June 12, 2023",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=1974&auto=format&fit=crop",
    category: "Design",
    categorySlug: "design",
    author: {
      id: "1",
      name: "Alex Morgan",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop"
    },
    tags: ["minimalism", "user experience", "interface design"]
  },
  {
    id: "2",
    title: "Typography Trends That Will Dominate This Year",
    slug: "typography-trends",
    excerpt: "A deep dive into the typography trends that are shaping digital design this year, from variable fonts to experimental typefaces.",
    content: `# Typography Trends That Will Dominate This Year

Typography is far more than just selecting a pleasing font. It's a fundamental element of design that communicates personality, sets tone, and greatly impacts user experience. As we move through the year, several typography trends are emerging as dominant forces in digital design.

## Variable Fonts: Flexibility Meets Performance

Variable fonts represent one of the most significant advancements in typography for the digital age. These fonts store a range of variations within a single font file, allowing designers to adjust weight, width, slant, and other attributes without loading multiple font files.

### Benefits of Variable Fonts:

- **Performance improvements** through reduced file sizes
- **Design flexibility** with infinite variations along defined axes
- **Responsive typography** that can adapt to different screen sizes and contexts

Major type foundries and even Google Fonts now offer variable font options, making this technology accessible to designers of all levels.

## Kinetic Typography

Text in motion—kinetic typography—continues to gain popularity as processing power increases across devices. From subtle hover animations to full-blown typographic videos, moving text captures attention in ways static text cannot.

We're seeing designers use kinetic type to:

- Emphasize key messages
- Guide users through interfaces
- Add personality to otherwise static pages
- Create memorable brand moments

## Experimental and Custom Typefaces

As brands strive for distinctive identities, we're seeing a surge in custom and experimental typefaces. These bespoke fonts help companies stand out in crowded markets and communicate unique brand attributes.

The rise of variable font technology has also enabled more experimental approaches, as designers can create typefaces with wide ranges of expression within a single font family.

## Brutalist Typography

The brutalist design movement, characterized by raw, unpolished aesthetics, continues to influence typography. Expect to see more designs featuring:

- Stark contrasts between type sizes
- Unconventional layouts that break traditional grid systems
- Monospaced fonts used in unexpected contexts
- Intentionally "imperfect" type treatments

## Accessibility-First Typography

With digital accessibility regulations becoming more stringent worldwide, we're seeing a welcome trend toward typography that prioritizes readability and inclusivity.

This includes:

- Higher contrast ratios between text and backgrounds
- More generous line heights and letter spacing
- Increased font sizes, particularly on mobile
- Thoughtful font choices that consider readers with dyslexia and other reading challenges

## Conclusion

Typography continues to evolve as technology advances and design sensibilities shift. The trends we're seeing this year reflect both technological possibilities and cultural movements toward authenticity, accessibility, and distinctive brand expression.

For designers looking to stay current, experimenting with variable fonts and considering the accessibility implications of typographic choices represent valuable starting points. The best typography doesn't just look good—it enhances readability, supports brand identity, and improves overall user experience.`,
    date: "May 3, 2023",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1569235186275-626cb53b83ce?q=80&w=1378&auto=format&fit=crop",
    category: "Typography",
    categorySlug: "typography",
    author: {
      id: "2",
      name: "Emily Chen",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1471&auto=format&fit=crop"
    },
    tags: ["typography", "design trends", "fonts"]
  },
  {
    id: "3",
    title: "The Philosophy of a Deflated Ball: Value, Neglect, and Memory",
    slug: "philosophy-of-deflated-ball",
    excerpt: "A philosophical exploration of the paradox of neglect and value through the metaphor of an abandoned, deflated soccer ball.",
    content: `# The Philosophy of a Deflated Ball: Value, Neglect, and Memory

Trong thế giới vật lý, hình ảnh một quả bóng xẹp, rách nát và bị bỏ quên là một hiện tượng giản dị nhưng cũng gợi ra vô vàn tầng ý nghĩa. Câu hỏi "quả bóng bị bỏ đi vì hết hơi, hay nó hết hơi vì bị bỏ đi?" dường như là một nghịch lý đơn giản, nhưng khi ngẫm sâu hơn, nó lại trở thành một phép ẩn dụ thấm đẫm suy tư về quan hệ nhân – quả, về giá trị và sự lãng quên, về chức năng và tình cảm.

## The Physics of Neglect

Từ góc nhìn vật lý học, một quả bóng xì hơi có thể do nhiều yếu tố: thay đổi nhiệt độ, vật liệu xuống cấp, tác động lực lặp đi lặp lại, hoặc đơn giản là do không được bảo dưỡng đúng cách. Trong cách lý giải này, việc quả bóng mất đi khả năng đàn hồi, không còn giữ được không khí, là hệ quả của quá trình bị bỏ mặc. Sự bỏ bê không diễn ra đột ngột, mà như một chuỗi dài của những lần "không để ý", những lúc "tạm gác lại", và cuối cùng là "lãng quên vĩnh viễn".

Tuy nhiên, cũng có thể lập luận rằng quả bóng bị bỏ lại sau khi nó không còn dùng được. Một khi nó đã xẹp, không còn nảy, không còn tạo ra niềm vui, thì người ta không còn mặn mà với nó nữa. Sự vô dụng kéo theo sự lãng quên – một kiểu bỏ đi hợp lý, như cách con người thường làm với đồ vật không còn khả năng phục vụ.

## The Causality Paradox

Chính tại điểm giao nhau của hai lập luận này, ta gặp phải một vòng xoáy nhân quả khó phân định: sự xẹp đi dẫn đến bỏ mặc, hay bỏ mặc mới làm nó xẹp đi? Câu hỏi này không chỉ đơn thuần là sự phân tích trình tự các sự kiện, mà còn gợi mở về tính chất đan xen, phức hợp của hiện thực – nơi mà nguyên nhân và kết quả thường không tuần tự, mà chồng chéo và tác động lẫn nhau.

## Beyond the Physical: Symbolism of Value

Nhưng vượt qua lớp vỏ vật lý, hình ảnh quả bóng rách còn mang chiều sâu biểu tượng của sự hao mòn giá trị. Nó từng là trung tâm của niềm vui, của những trận đấu trẻ thơ, của tiếng cười vang khắp sân đất bụi. Nhưng rồi, khi không còn giữ được hình dáng, chức năng – nó trở thành một thứ "vô ích", bị đẩy sang bên lề, như một ký ức cũ không còn ai nhắc đến.

Ở đây, vật và người không còn là hai thái cực xa cách. Cách con người đối xử với quả bóng – bỏ quên khi nó không còn hoàn hảo – là hình ảnh phản chiếu chính cách con người đối xử với nhau, với những mối quan hệ, hay thậm chí với chính bản thân mình. Khi ta không còn "nảy", không còn "giữ hơi", liệu ta có bị xã hội lãng quên như chính quả bóng kia?

## The Question of Appreciation

Câu hỏi ban đầu vì thế không còn là chuyện của riêng một quả bóng nữa. Nó trở thành câu hỏi về lòng trân quý. Liệu ta có chỉ nâng niu những gì đang rực rỡ, đang tròn đầy? Hay ta có đủ tinh tế và chân thành để giữ gìn, vá víu, và nâng niu cả khi điều đó không còn hoàn hảo?

## Conclusion

Cuối cùng, nghịch lý "hết hơi vì bị bỏ hay bị bỏ vì hết hơi" không nhằm tìm ra một đáp án dứt khoát. Nó là một lời nhắc – rằng trong cuộc sống, có những điều quý giá dần mất đi không phải vì chúng không còn xứng đáng, mà vì ta đã ngừng nhìn nhận giá trị của chúng từ trước khi chúng thực sự mất đi. Và nếu không đủ nhạy cảm để nhận ra điều đó, có lẽ chính chúng ta cũng đang dần trở thành những "quả bóng cũ" – bị quên lãng trong cơn lốc xoáy của sự thờ ơ.`,
    date: "July 15, 2023",
    readTime: "7 min read",
    image: "https://png.pngtree.com/background/20230703/original/pngtree-old-soccer-ball-poor-school-soccer-field-leisure-ground-tile-photo-picture-image_4124623.jpg",
    category: "Philosophy",
    categorySlug: "philosophy",
    author: {
      id: "3",
      name: "Michael Torres",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1374&auto=format&fit=crop"
    },
    tags: ["philosophy", "metaphor", "value", "neglect", "memory"]
  }
];

// Helper function to get post by slug
export const getPostBySlug = (slug: string): Post | undefined => {
  return posts.find(post => post.slug === slug);
};

// Helper function to get author by ID
export const getAuthorById = (id: string): Author | undefined => {
  return authors.find(author => author.id === id);
};

// Helper function to get category by ID
export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};

// Helper function to get related posts
export const getRelatedPosts = (postId: string, categoryId: string, limit: number = 3): Post[] => {
  // First try to get posts from the same category
  const sameCategoryPosts = posts
    .filter(post => post.id !== postId && post.categorySlug === categoryId)
    .slice(0, limit);
  
  // If we don't have enough posts from the same category, add some more
  if (sameCategoryPosts.length < limit) {
    const otherPosts = posts
      .filter(post => post.id !== postId && post.categorySlug !== categoryId)
      .slice(0, limit - sameCategoryPosts.length);
    
    return [...sameCategoryPosts, ...otherPosts];
  }
  
  return sameCategoryPosts;
};

// Helper function to get posts by category
export const getPostsByCategory = (categoryId: string): Post[] => {
  return posts.filter(post => post.categorySlug === categoryId);
};

// Helper function to get posts by tag
export const getPostsByTag = (tag: string): Post[] => {
  return posts.filter(post => post.tags.includes(tag));
};

// Helper function to get posts by author
export const getPostsByAuthor = (authorId: string): Post[] => {
  return posts.filter(post => post.author.id === authorId);
}; 