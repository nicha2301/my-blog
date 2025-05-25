export default function Footer() {
  return (
    <footer className="py-6 w-full border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <div>© {new Date().getFullYear()} My Blog</div>
        <div className="flex space-x-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white">
            Twitter
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
} 