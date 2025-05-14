"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageLightboxProps {
  images: {
    id: string
    imageUrl: string
    title: string
    width: number
    height: number
  }[]
  initialImageId?: string
  isOpen: boolean
  onClose: () => void
}

export function ImageLightbox({ images, initialImageId, isOpen, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (isOpen && initialImageId) {
      const index = images.findIndex((img) => img.id === initialImageId)
      if (index !== -1) {
        setCurrentIndex(index)
      }
    }
  }, [isOpen, initialImageId, images])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft") {
        prevImage()
      } else if (e.key === "ArrowRight") {
        nextImage()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const currentImage = images[currentIndex]

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          aria-label="Close lightbox"
        >
          <X className="h-8 w-8" />
        </button>

        <button
          onClick={prevImage}
          className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>

        <div className="relative max-w-5xl max-h-[90vh] px-4">
          <Image
            src={currentImage.imageUrl || "/placeholder.svg"}
            alt={currentImage.title}
            width={currentImage.width}
            height={currentImage.height}
            className="max-h-[90vh] w-auto object-contain"
          />
          <p className="text-white text-center mt-4">{currentImage.title}</p>
        </div>

        <button
          onClick={nextImage}
          className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10"
          aria-label="Next image"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>
    </div>
  )
}