# Minimal Journal - Luxury Blog

A sophisticated blog featuring clean design and thoughtful content, with luxury design elements inspired by Ramotion's aesthetics.

## Features

- Modern, luxury design with deep purples and warm taupes
- Smooth page transitions and animations
- Responsive layout for all devices
- Dark/light theme support
- Glass effect UI components
- Full Next.js App Router support

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

## Technical Notes

- Built with Next.js 15.3.2 and React 19
- Uses framer-motion for animations
- Studio Freight Lenis for smooth scrolling
- Zustand for state management
- Suspense boundaries to handle client-side data fetching
- Custom loading indicators and navigation progress

## Known Issues

- Next.js 15.3.2 has some issues with `useSearchParams()` in client components. We've added Suspense boundaries as a workaround.
- The experimental configuration in next.config.js may show warnings but can be safely ignored.

## License

MIT
