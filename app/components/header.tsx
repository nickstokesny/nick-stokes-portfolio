// app/components/header.tsx
import Link from "next/link";

interface HeaderProps {
  activePage?: string;
}

export function Header({ activePage }: HeaderProps = {}) {
  return (
    <header>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[100px]">
          <h1 className="text-4xl font-bold mb-8">Nick Stokes Photography</h1>
          
          <nav className="flex space-x-6 mb-8">
            <Link 
              href="/" 
              className={`text-lg ${activePage === 'home' ? 'font-bold' : ''}`}
            >
              HOME
            </Link>
            <Link 
              href="/about" 
              className={`text-lg ${activePage === 'about' ? 'font-bold' : ''}`}
            >
              ABOUT
            </Link>
            <Link 
              href="/contact" 
              className={`text-lg ${activePage === 'contact' ? 'font-bold' : ''}`}
            >
              CONTACT
            </Link>
          </nav>
          
          <a
            href="https://instagram.com/nickstokesny/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-600"
          >
            <Instagram size={20} />
            <span>Follow on Instagram</span>
          </a>
        </div>
      </div>
    </header>
  );
}

// Instagram icon component
function Instagram({ size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}