// Site metadata for SEO and social sharing

interface SiteMetadata {
  title: string;
  description: string;
  siteUrl: string;
  siteName: string;
  defaultOpenGraph: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
    locale: string;
    type: string;
  };
  twitter: {
    card: string;
    creator: string;
  };
}

export const siteMetadata: SiteMetadata = {
  title: 'Minimal Journal | Design Blog',
  description: 'A minimalist journal dedicated to exploring the art of modern design, thoughtful interactions, and clean aesthetics.',
  siteUrl: 'https://minimal-journal.com',
  siteName: 'Minimal Journal',
  defaultOpenGraph: {
    title: 'Minimal Journal | Design Blog',
    description: 'A minimalist journal dedicated to exploring the art of modern design, thoughtful interactions, and clean aesthetics.',
    url: 'https://minimal-journal.com',
    siteName: 'Minimal Journal',
    images: [
      {
        url: 'https://minimal-journal.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Minimal Journal - Design Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@minimaljournal',
  }
}; 