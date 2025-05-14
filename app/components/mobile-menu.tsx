"use client"

import Link from "next/link"
import { X } from "lucide-react"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  activePage?: "work" | "about" | "contact"
}

export function MobileMenu({ isOpen, onClose, activePage }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <div className="mobile-menu">
      <div className="mobile-menu-close">
        <button onClick={onClose} aria-label="Close menu">
          <X size={24} />
        </button>
      </div>
      <nav className="mobile-nav">
        <Link href="/" className={`mobile-nav-link ${activePage === "work" ? "active" : ""}`} onClick={onClose}>
          Work
        </Link>
        <Link href="/about" className={`mobile-nav-link ${activePage === "about" ? "active" : ""}`} onClick={onClose}>
          About
        </Link>
        <Link
          href="/contact"
          className={`mobile-nav-link ${activePage === "contact" ? "active" : ""}`}
          onClick={onClose}
        >
          Contact
        </Link>
      </nav>
    </div>
  )
}
