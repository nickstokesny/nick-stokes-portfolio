"use client"

import { useState } from "react"
import Link from "next/link"
import { Instagram } from "lucide-react"
import { MobileMenu } from "./mobile-menu"

interface HeaderProps {
  activePage?: "work" | "about" | "contact"
}

export function Header({ activePage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header>
      <div>
        <Link href="/" className="logo">
          NICK STOKES
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <Link href="/" className={activePage === "work" ? "active" : ""}>
            Work
          </Link>
          <Link href="/about" className={activePage === "about" ? "active" : ""}>
            About
          </Link>
          <Link href="/contact" className={activePage === "contact" ? "active" : ""}>
            Contact
          </Link>
          <Link
            href="https://www.instagram.com/nickstokesny/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-button" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} activePage={activePage} />
    </header>
  )
}
