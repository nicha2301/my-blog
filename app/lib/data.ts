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
    title: "Building Performant React Applications",
    slug: "building-performant-react-applications",
    excerpt: "Learn essential techniques for optimizing React applications, from code splitting to memoization and efficient state management.",
    content: `
    # Building Performant React Applications

    React has become the library of choice for countless web applications, but with great flexibility comes the responsibility to ensure your applications perform well. In this article, we'll explore practical techniques to optimize React applications for speed and efficiency.

    ## Understanding React's Rendering Process

    Before diving into optimization techniques, it's crucial to understand how React renders components. React uses a virtual DOM to minimize costly DOM operations, but inefficient component design can still lead to performance bottlenecks.

    The rendering process follows these general steps:

    1. Component state or props change
    2. React builds a new virtual DOM tree
    3. React compares the new tree with the previous one (diffing)
    4. Only the necessary changes are applied to the actual DOM

    Many performance optimizations focus on preventing unnecessary rendering cycles or making the diffing process more efficient.

    ## Code Splitting

    One of the most effective ways to improve initial load time is through code splitting—breaking your application into smaller chunks that load on demand.

    React's lazy loading functionality combined with Suspense makes this straightforward:

    // Code example:
    import React, { Suspense, lazy } from 'react';

    // Instead of regular import
    // import ExpensiveComponent from './ExpensiveComponent';

    // Use lazy loading
    const ExpensiveComponent = lazy(() => import('./ExpensiveComponent'));

    function MyComponent() {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <ExpensiveComponent />
        </Suspense>
      );
    }

    This approach ensures users only download the code they need, when they need it.

    ## Memoization Techniques

    React provides several APIs to prevent unnecessary re-renders:

    ### React.memo

    For functional components, \`React.memo\` prevents re-rendering if props haven't changed:

    // Code example:
    const MyComponent = React.memo(function MyComponent(props) {
      // Your component logic
    });

    ### useMemo and useCallback

    These hooks help optimize expensive calculations and prevent unnecessary recreation of functions:

    // Code example:
    // Memoize expensive calculation results
    const calculatedValue = useMemo(() => {
      return expensiveCalculation(dependencies);
    }, [dependencies]);

    // Prevent recreation of callback functions
    const handleClick = useCallback(() => {
      doSomething(dependencies);
    }, [dependencies]);

    ## Efficient State Management

    How you structure and update state can significantly impact performance.

    ### State Colocation

    Keep state as close as possible to where it's used. Global state should only contain truly global information.

    ### Immutable Updates

    Always update state immutably to help React identify changes efficiently:

    // Code example:
    // Bad - mutating existing state
    const handleClick = () => {
      const newItems = items;
      newItems.push(newItem);
      setItems(newItems);
    };

    // Good - creating new state objects
    const handleClick = () => {
      setItems([...items, newItem]);
    };

    ## Virtualization for Long Lists

    When rendering large lists, virtualization techniques ensure only visible items are rendered:

    // Code example:
    import { FixedSizeList } from 'react-window';

    function MyList({ items }) {
      const Row = ({ index, style }) => (
        <div style={style}>
          {items[index].name}
        </div>
      );

      return (
        <FixedSizeList
          height={500}
          width="100%"
          itemCount={items.length}
          itemSize={35}
        >
          {Row}
        </FixedSizeList>
      );
    }

    Libraries like \`react-window\` and \`react-virtualized\` make this implementation straightforward.

    ## Conclusion

    Building performant React applications requires both an understanding of React's internal mechanisms and thoughtful application of optimization techniques. While this article covers the most common approaches, remember that premature optimization can lead to unnecessarily complex code. Always measure performance first to identify actual bottlenecks before applying optimizations.

    The React ecosystem continues to evolve with performance in mind, so staying current with best practices and new APIs is essential for maintaining high-performing applications.
    `,
    date: "April 18, 2023",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1331&auto=format&fit=crop",
    category: "Development",
    categorySlug: "development",
    author: {
      id: "3",
      name: "Michael Torres",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1374&auto=format&fit=crop"
    },
    tags: ["react", "performance", "javascript", "web development"]
  },
  {
    id: "4",
    title: "Data-Driven Design Decisions",
    slug: "data-driven-design-decisions",
    excerpt: "How to use quantitative and qualitative data to inform your design process and create more effective digital products.",
    content: `
    # Data-Driven Design Decisions

    In today's competitive digital landscape, design decisions based on assumptions or personal preferences aren't enough. Data-driven design combines creativity with analytical thinking, resulting in products that are both beautiful and effective.

    ## Why Data-Driven Design Matters

    Data provides an objective foundation for design decisions, helping teams:

    - **Validate assumptions** before investing significant resources
    - **Identify pain points** in existing user experiences
    - **Prioritize features** based on actual user needs
    - **Measure success** beyond aesthetic appeal
    - **Build stakeholder confidence** through tangible evidence

    Organizations that embrace data-driven design typically see higher conversion rates, improved user satisfaction, and better return on investment.

    ## Types of Data for Design Decisions

    ### Quantitative Data: The What

    Quantitative data answers questions about what users do. Sources include:

    - **Analytics tools** (Google Analytics, Mixpanel, etc.)
    - **A/B testing platforms**
    - **Heatmaps and scroll maps**
    - **Conversion and engagement metrics**
    
    This data reveals patterns in user behavior, helping identify where issues occur but not necessarily why they happen.

    ### Qualitative Data: The Why

    Qualitative data provides context and explains motivations. Sources include:

    - **User interviews**
    - **Usability testing**
    - **Customer support conversations**
    - **Survey responses**
    - **App store reviews**
    
    This information helps designers understand the reasoning behind behaviors observed in quantitative data.

    ## Implementing a Data-Driven Design Process

    ### 1. Establish Clear Metrics

    Before designing, define what success looks like with specific, measurable indicators aligned with business goals. Common metrics include:

    - Conversion rate
    - Time on task
    - Error rate
    - Net Promoter Score (NPS)
    - Customer satisfaction score
    - Feature adoption rate

    ### 2. Gather Baseline Data

    Collect data about the current state if redesigning an existing product, or about competitor products if creating something new. This baseline helps measure the impact of design changes.

    ### 3. Identify Opportunities

    Analyze the data to find patterns and anomalies that might represent design opportunities:

    - Pages with high bounce rates
    - Features with low adoption
    - Common user complaints
    - Conversion funnel drop-off points

    ### 4. Design and Prototype

    Create design solutions informed by data insights. This doesn't mean abandoning creativity—rather, it means channeling creative energy toward solving the actual problems users face.

    ### 5. Test and Validate

    Test designs before full implementation using methods like:

    - Usability testing
    - A/B or multivariate testing
    - Prototype testing
    - Beta releases

    ### 6. Analyze Results and Iterate

    Measure the impact of design changes against the established metrics and baseline data. Use these insights to refine designs further.

    ## Balancing Data with Design Intuition

    While data provides invaluable insights, it shouldn't be the only factor in design decisions. Effective data-driven design combines analytical thinking with:

    - **Design expertise** - Understanding principles that have stood the test of time
    - **Empathy** - Seeing beyond the numbers to understand the human experience
    - **Innovation** - Recognizing when to break conventions to create something better

    The best designers know when to follow the data and when to challenge it with informed intuition.

    ## Conclusion

    Data-driven design isn't about removing the human element from design—it's about enhancing human creativity and decision-making with objective insights. By establishing a process that values both quantitative evidence and qualitative understanding, design teams can create digital products that truly meet user needs while achieving business goals.

    As design tools and analytics capabilities continue to evolve, the barrier to implementing data-driven design processes is lower than ever. Organizations of all sizes can benefit from incorporating more analytical thinking into their design workflows, resulting in digital experiences that are both beautiful and effective.
    `,
    date: "March 29, 2023",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1374&auto=format&fit=crop",
    category: "Strategy",
    categorySlug: "strategy",
    author: {
      id: "2",
      name: "Emily Chen",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1471&auto=format&fit=crop"
    },
    tags: ["UX research", "data analysis", "design process"]
  },
  {
    id: "5",
    title: "The Principles of Gestalt in Modern UI Design",
    slug: "gestalt-principles-modern-ui",
    excerpt: "How century-old psychological principles continue to shape effective user interface design in today's digital products.",
    content: `
    # The Principles of Gestalt in Modern UI Design

    The Gestalt principles of visual perception, developed in the early 20th century by German psychologists, remain remarkably relevant to modern user interface design. These principles explain how the human mind organizes visual elements into groups or unified wholes, rather than perceiving them as simple collections of disconnected elements.

    ## Historical Context

    The term "Gestalt" roughly translates to "unified whole" or "form" in German. These principles emerged from the work of psychologists Max Wertheimer, Wolfgang Köhler, and Kurt Koffka, who studied how people naturally organize visual information. Their central insight—that "the whole is different from the sum of its parts"—revolutionized our understanding of perception.

    ## Key Gestalt Principles in UI Design

    ### Proximity

    Elements positioned close to each other are perceived as related, while elements spaced further apart appear distinct.

    **Application in UI Design:**
    - Grouping related navigation items
    - Creating visual relationships between form fields and labels
    - Organizing content into distinct sections without explicit borders

    ### Similarity

    Elements with shared visual characteristics (color, shape, size, etc.) are perceived as belonging to the same group.

    **Application in UI Design:**
    - Consistent styling of interactive elements (buttons, links)
    - Using color to differentiate between categories of information
    - Creating visual hierarchies through consistent typography

    ### Continuity

    The eye naturally follows lines or curves, perceiving continuous forms rather than disconnected segments.

    **Application in UI Design:**
    - Designing flowing layouts that guide users through content
    - Creating natural progressions in multi-step processes
    - Using subtle directional cues to lead the user's attention

    ### Closure

    The mind tends to perceive complete shapes even when parts of the outline are missing.

    **Application in UI Design:**
    - Simplified icons that imply complete forms
    - Designing "hamburger" and other minimalist navigation icons
    - Using partial borders to suggest contained areas

    ### Figure-Ground

    Elements are perceived as either standing out from (figure) or receding into (ground) their surroundings.

    **Application in UI Design:**
    - Modal dialogs and overlays
    - Highlighting active states against neutral backgrounds
    - Creating depth through subtle shadows and elevation

    ### Common Fate

    Elements that move or function together are perceived as belonging to the same group.

    **Application in UI Design:**
    - Animated elements that enter or exit the screen together
    - Interactive components that respond to user actions as a unit
    - Progress indicators that show related steps

    ### Symmetry and Order

    The mind prefers balanced, orderly visuals and may unconsciously group symmetrical elements.

    **Application in UI Design:**
    - Creating balanced layouts that feel stable and trustworthy
    - Aligning elements to invisible grid systems
    - Using consistent spacing and proportions

    ## Practical Application in Modern Interfaces

    ### Navigation Design

    Effective navigation systems utilize proximity and similarity to help users understand available options. Items within the same category are positioned close together and share visual characteristics, while different categories maintain appropriate separation and distinct styling.

    ### Form Design

    Forms benefit greatly from proximity (grouping related fields), similarity (consistent styling of input elements), and continuity (creating a natural flow from one field to the next). These principles help users understand the relationship between information and predict the sequence of interaction.

    ### Visual Hierarchy

    The figure-ground principle is crucial for directing attention to important elements. Primary actions should stand out as "figure" against the "ground" of less important interface elements. Similarly, similarity helps users quickly identify interactive elements across different screens.

    ### Responsive Design

    As interfaces adapt to different screen sizes, Gestalt principles ensure that relationships between elements remain clear. Proximity and similarity help maintain these relationships even when the absolute positioning of elements changes.

    ## Conclusion

    Despite being formulated long before digital interfaces existed, Gestalt principles remain fundamental to effective UI design. They work because they align with how our brains naturally process visual information, making interfaces more intuitive and reducing cognitive load.

    By consciously applying these principles, designers can create interfaces that feel natural and effortless to users, even when the underlying functionality is complex. The most successful digital products don't just leverage cutting-edge technology—they respect the timeless psychological principles that govern human perception.

    As interface paradigms continue to evolve beyond screens to voice, AR, VR, and other modalities, understanding these foundational principles of perception will remain essential for creating intuitive user experiences.
    `,
    date: "March 15, 2023",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1528&auto=format&fit=crop",
    category: "Design",
    categorySlug: "design",
    author: {
      id: "1",
      name: "Alex Morgan",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop"
    },
    tags: ["ui design", "psychology", "visual perception"]
  },
  {
    id: "6",
    title: "Accessible Color Systems",
    slug: "accessible-color-systems",
    excerpt: "Creating beautiful, flexible color systems that meet accessibility standards and work for all users.",
    content: `
    # Accessible Color Systems

    Color is one of the most powerful tools in a designer's toolkit—it conveys mood, emphasizes hierarchy, strengthens brand identity, and guides user attention. However, when color systems aren't designed with accessibility in mind, they can exclude millions of users with visual impairments or color vision deficiencies.

    ## Understanding Color Accessibility

    Approximately 300 million people worldwide have color vision deficiency (CVD), commonly called color blindness. Additionally, many users have low vision or other visual impairments that affect how they perceive color contrast.

    Color accessibility isn't just a nice-to-have—it's often a legal requirement:

    - **WCAG Guidelines** (Web Content Accessibility Guidelines) require sufficient contrast between text and background colors
    - **Section 508** in the U.S. mandates accessible digital experiences for federal agencies
    - **European Accessibility Act** sets requirements for digital accessibility

    Beyond compliance, accessible color systems benefit all users, especially in challenging viewing conditions like bright sunlight or on poor-quality displays.

    ## Common Challenges in Color Accessibility

    ### Insufficient Contrast Ratios

    Text that doesn't have enough contrast with its background can be difficult or impossible to read, particularly for users with low vision.

    ### Relying Solely on Color for Information

    Using only color to convey meaning (like red for errors, green for success) creates barriers for people with CVD, who may not perceive these differences.

    ### Problematic Color Combinations

    Certain color combinations—particularly red/green, blue/yellow, and red/black—can be especially challenging for people with different types of color vision deficiencies.

    ## Building an Accessible Color System

    ### 1. Start with Contrast Standards

    WCAG defines minimum contrast requirements:

    - **WCAG AA**: 4.5:1 ratio for normal text, 3:1 for large text
    - **WCAG AAA**: 7:1 ratio for normal text, 4.5:1 for large text

    Tools like the WebAIM Contrast Checker or Stark can help verify these ratios.

    ### 2. Create Broad Color Scales

    Develop extended scales for each color in your palette, with at least 10-12 steps from light to dark. This provides:

    - More options for maintaining contrast requirements
    - Flexibility for various UI components
    - Consistent color relationships across the system

    ### 3. Design with Color Blindness in Mind

    Test your palette with color blindness simulators to ensure it works across different types of CVD:

    - Protanopia (red-blind)
    - Deuteranopia (green-blind)
    - Tritanopia (blue-blind)
    - Achromatopsia (total color blindness)

    ### 4. Use Color as Enhancement, Not the Only Signal

    Always pair color with other visual cues:

    - Icons alongside colored status indicators
    - Patterns or textures in addition to color in charts and graphs
    - Text labels to reinforce color-coded information

    ### 5. Consider Light and Dark Modes

    An accessible color system should work in both light and dark interfaces:

    - Adjust contrast relationships appropriately for each mode
    - Don't simply invert colors; recalibrate for optimal readability
    - Test both modes with accessibility tools

    ## Practical Implementation

    ### Text and Background Colors

    Create pairs of text and background colors that have been pre-verified for accessibility:

    // CSS example:
    /* Example of accessible text/background combinations */
    --text-primary: #1A1A1A; /* Very dark gray */
    --bg-primary: #FFFFFF; /* White */
    /* Contrast ratio: 17.12:1 (Passes AAA) */

    --text-secondary: #FFFFFF; /* White */
    --bg-secondary: #4055A3; /* Medium blue */
    /* Contrast ratio: 4.62:1 (Passes AA) */

    ### Semantic Colors

    Design accessible semantic colors for states like success, warning, and error:

    // CSS example:
    /* Success - passes AA with black text */
    --success-light: #D4EDDA; /* Light green */
    --success-text: #155724; /* Dark green */

    /* Warning - passes AA with black text */
    --warning-light: #FFF3CD; /* Light yellow */
    --warning-text: #856404; /* Dark brown-yellow */

    /* Error - passes AA with black text */
    --error-light: #F8D7DA; /* Light red */
    --error-text: #721C24; /* Dark red */

    ### Interactive Elements

    Ensure focus states and interactive elements don't rely solely on color:

    // CSS example:
    /* Focus state that uses multiple signals */
    button:focus {
      background-color: var(--primary-color);
      outline: 2px solid var(--focus-color);
      box-shadow: 0 0 0 4px var(--focus-ring);
    }

    ## Testing and Validation

    Regular testing is essential for maintaining color accessibility:

    - **Automated tests** using tools like axe or Lighthouse
    - **Manual testing** with screen readers and keyboard navigation
    - **User testing** with participants who have various visual impairments

    ## Conclusion

    Creating an accessible color system requires thoughtful planning and continuous testing, but the benefits extend to all users. An accessible palette ensures your product can be used by everyone, regardless of visual ability, while still maintaining visual appeal and brand identity.

    The most successful color systems treat accessibility not as a constraint but as a foundation—designing with these requirements from the start leads to more robust, flexible systems that work better across all contexts and users.

    As digital products continue to evolve, accessible color systems will only become more important, ensuring that the power of color can be harnessed to create experiences that are truly inclusive.
    `,
    date: "February 28, 2023",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=1470&auto=format&fit=crop",
    category: "Design",
    categorySlug: "design",
    author: {
      id: "3",
      name: "Michael Torres",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1374&auto=format&fit=crop"
    },
    tags: ["accessibility", "color theory", "inclusive design"]
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