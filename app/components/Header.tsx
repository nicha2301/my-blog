import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header className="py-6 md:py-10 w-full border-b border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <Link href="/" className="text-xl font-semibold">
          My Blog
        </Link>
        
        <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          {/* Thanh tìm kiếm - hiển thị trên mobile */}
          <div className="w-full sm:hidden mb-2">
            <SearchBar />
          </div>
          
          {/* Navigation */}
          <nav className="hidden sm:flex space-x-6">
            <Link href="/posts" className="hover:underline hover:underline-offset-4 transition-all">
              Posts
            </Link>
            <Link href="/projects" className="hover:underline hover:underline-offset-4 transition-all">
              Projects
            </Link>
            <Link href="/photos" className="hover:underline hover:underline-offset-4 transition-all">
              Photos
            </Link>
          </nav>
          
          {/* Thanh tìm kiếm - ẩn trên mobile */}
          <div className="hidden sm:block">
            <SearchBar />
          </div>
          
          {/* Theme toggle và menu mobile */}
          <div className="flex items-center gap-2 absolute top-6 right-4 sm:static">
            <ThemeToggle />
            <button className="sm:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 