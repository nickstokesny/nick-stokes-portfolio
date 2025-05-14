import Link from "next/link"
import { Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="container mx-auto px-4 py-8 border-t border-gray-200 mt-12">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">© 2024 Nick Stokes. All rights reserved.</p>
        <Link
          href="https://www.instagram.com/nickstokesny/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:opacity-70 transition-opacity"
        >
          <Instagram className="w-5 h-5" />
        </Link>
      </div>
    </footer>
  )
}
