# Minimal Journal - Elegant Next.js Blog

A sophisticated, minimalist blog built with Next.js, inspired by Ramotion's design aesthetics. This project showcases modern web development practices including smooth animations, responsive design, and elegant typography.

![Minimal Journal](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1770&auto=format&fit=crop)

## Features

- **Modern Design**: Clean, minimalist interface with luxury design elements
- **Smooth Animations**: Page transitions and scroll-based animations using GSAP and Framer Motion
- **Responsive Layout**: Fully optimized for all device sizes
- **Elegant Typography**: Thoughtful typography using Geist font family
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Smooth Scrolling**: Enhanced scrolling experience using Lenis
- **Optimized Images**: Fast loading with Next.js Image component
- **Blog Functionality**: Category filtering and search capabilities

## Pages

- **Home**: Showcases featured articles, categories, and newsletter signup
- **About**: Company story, team profiles, mission statement, and values
- **Blog**: Comprehensive blog with filtering by category and search functionality
- **Contact**: Contact form with validations and company information
- **404**: Custom error page

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for React
- **GSAP**: Professional-grade animation library
- **Lenis**: Smooth scroll library
- **Next Themes**: Theme management

## Project Structure

```
my-blog/
├── app/
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── providers/       # Context providers
│   ├── about/           # About page
│   ├── blog/            # Blog page and articles
│   ├── contact/         # Contact page
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── public/              # Static assets
└── next.config.js       # Next.js configuration
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/minimal-journal.git
   cd minimal-journal
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```bash
   # For faster development with Turbopack (may have some issues)
   npm run dev
   
   # For more stable development without Turbopack
   npm run dev:safe
   ```

4. Open your browser and navigate to http://localhost:3000

### Known Issues and Workarounds

There are some issues with Next.js 15.3.2 and the useSearchParams hook that might cause build errors. The following workarounds have been implemented:

1. Added a `--no-lint` flag to the build command
2. Created a `dev:safe` script that uses the standard Next.js development server instead of Turbopack
3. Wrapped components using useSearchParams in Suspense boundaries
4. Set image optimization to unoptimized for static export compatibility

## Building for Production

```bash
npm run build
# or
yarn build
```

## Acknowledgements

- Design inspiration from [Ramotion](https://www.ramotion.com/)
- Images from [Unsplash](https://unsplash.com/)
- Icons from [Heroicons](https://heroicons.com/)

## License

This project is licensed under the MIT License.
