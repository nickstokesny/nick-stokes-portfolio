"use client"

import { Facebook, Twitter, Linkedin } from "lucide-react"

interface SocialShareProps {
  url: string
  title: string
  description: string
}

export function SocialShare({ url, title, description }: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`

  return (
    <div className="flex space-x-4">
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="hover:opacity-70 transition-opacity"
      >
        <Facebook className="w-5 h-5" />
      </a>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
        className="hover:opacity-70 transition-opacity"
      >
        <Twitter className="w-5 h-5" />
      </a>
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="hover:opacity-70 transition-opacity"
      >
        <Linkedin className="w-5 h-5" />
      </a>
    </div>
  )
}
