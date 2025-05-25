import Script from 'next/script';

export function ThemeScript() {
  return (
    <Script
      id="theme-switcher"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function () {
            function getThemePreference() {
              if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
                return localStorage.getItem('theme');
              }
              return 'system';
            }
            
            function getSystemTheme() {
              return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            
            function setTheme(theme) {
              if (theme === 'system') {
                theme = getSystemTheme();
              }
              
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            }
            
            // Set initial theme to prevent flash
            setTheme(getThemePreference());
            
            // Add listener for system preference changes
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
              if (getThemePreference() === 'system') {
                setTheme('system');
              }
            });
          })();
        `,
      }}
    />
  );
} 