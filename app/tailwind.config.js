/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
          "2xl": "1280px",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            a: {
              color: 'var(--primary)',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            h1: {
              marginTop: '2.5rem',
            },
            h2: {
              marginTop: '2rem',
            },
            h3: {
              marginTop: '1.5rem',
            },
            code: {
              backgroundColor: 'var(--neutral-100)',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              color: 'var(--secondary)',
              fontWeight: '500',
            },
            pre: {
              backgroundColor: 'var(--neutral-100)',
              borderRadius: '0.25rem',
              code: {
                backgroundColor: 'transparent',
                padding: '0',
              },
            },
          },
        },
        invert: {
          css: {
            code: {
              backgroundColor: 'var(--neutral-800)',
            },
            pre: {
              backgroundColor: 'var(--neutral-800)',
              code: {
                backgroundColor: 'transparent',
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} 