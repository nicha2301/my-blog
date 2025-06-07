# Minimal Journal - Luxury Blog

A sophisticated blog featuring clean design and thoughtful content, with luxury design elements inspired by Ramotion's aesthetics.

## Features

- Modern, luxury design with deep purples and warm taupes
- Smooth page transitions and animations
- Responsive layout for all devices
- Dark/light theme support
- Glass effect UI components
- Full Next.js App Router support
- Sanity CMS integration for content management
- Google Analytics 4 integration

## Getting Started

### Development

To run the development server:

```bash
npm run dev:safe
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Production Build

To create a production build:

```bash
npm run build
```

### Static Export (for GitHub Pages)

To create a static export for GitHub Pages:

```bash
npm run deploy
```

This will create a `out` directory with the static export and a `.nojekyll` file for GitHub Pages.

## Deployment

This project can be deployed to GitHub Pages or any static hosting service.

### GitHub Pages

The project includes a GitHub Actions workflow for automatic deployment to GitHub Pages. Push to the `main` branch to trigger the deployment.

## Content Management

### Sanity CMS Integration

The blog is integrated with Sanity CMS for content management:

- **Sanity Studio**: Deployed at [nicha.sanity.studio](https://nicha.sanity.studio)
- **Content Types**: Posts, Authors, Categories, and Tags
- **Features**: 
  - Rich text editor with Markdown support
  - Image management with hotspot/crop
  - Relationship fields between content types
  - Draft and publish workflow

#### Content Schema
The CMS is configured with the following content types:
- **Posts**: Blog articles with title, content, featured image, author, etc.
- **Authors**: Content creators with name, bio, and image
- **Categories**: Topic groups for organizing content
- **Tags**: Additional content classification

#### Implementation
- Uses `next-sanity` and `@sanity/image-url` packages
- GROQ queries for fetching content
- Optimized image delivery with Sanity's CDN

## Internationalization

The blog supports multiple languages, currently English (default) and Vietnamese:

### System Structure
- **Client-side**: Custom I18nProvider to manage languages and translations
- **URL**: Supports language-based routing via path structure (e.g., `/en/blog`, `/vi/blog`)
- **Sanity CMS**: Post schema supports language fields and translation relationships

## Analytics

### Google Analytics Integration

The blog is integrated with Google Analytics 4 to track visitor traffic and user behavior:

#### Basic Tracking
- Page views
- Time on page
- Traffic sources
- Device and browser information

#### Custom Tracking
- Scroll depth tracking (25%, 50%, 75%, 100%)
- On-site search tracking
- Category filter tracking
- Post interaction tracking
- External link tracking

#### Configuration
Google Analytics is integrated through the `GoogleAnalytics` component in `/app/components/GoogleAnalytics.tsx`.
Measurement ID: `G-2ELCSPG6HW`

To change the analytics ID, update the `measurementId` variable in the `app/components/GoogleAnalytics.tsx` file.

## Technical Notes

- Built with Next.js 15.3.2 and React 19
- Uses framer-motion for animations
- Studio Freight Lenis for smooth scrolling
- Zustand for state management
- Suspense boundaries to handle client-side data fetching
- Custom loading indicators and navigation progress
- next-sanity for Sanity CMS integration
- GROQ for querying Sanity content

## Known Issues

- Next.js 15.3.2 has some issues with `useSearchParams()` in client components. We've added Suspense boundaries as a workaround.
- The experimental configuration in next.config.js may show warnings but can be safely ignored.

## License

MIT
