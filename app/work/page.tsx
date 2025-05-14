"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/app/components/header"
import { Footer } from "../components/footer"
import { categories, getPhotosByCategory, type Photo } from "@/app/data/photos"
import { GalleryAnimation } from "@/app/components/gallery-animation"

export default function WorkPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const [activeCategory, setActiveCategory] = useState(categoryParam || "ALL")
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch photos based on category
  useEffect(() => {
    async function fetchPhotos() {
      setLoading(true)
      try {
        // In a real app, you'd fetch from Sanity here based on category
        // For now, we'll use our local data
        const filteredPhotos = getPhotosByCategory(activeCategory)
        setPhotos(filteredPhotos)
      } catch (error) {
        console.error("Error fetching photos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [activeCategory])

  // Update active category when URL parameter changes
  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam)
    } else if (!categoryParam) {
      setActiveCategory("ALL")
    }
  }, [categoryParam])

  return (
    <div className="min-h-screen flex flex-col">
      <Header activePage="work" />

      <div className="w-full h-px bg-gray-200 mt-2"></div>

      <main className="container mx-auto px-4 py-12 flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">WORK</h1>

        {/* Category Navigation - Horizontal links under the heading */}
        <div className="flex flex-wrap justify-center mb-12 gap-2 md:gap-8">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/work?category=${category}`}
              className={`px-2 py-1 uppercase text-sm tracking-wider transition-colors ${
                activeCategory === category
                  ? "text-black font-medium border-b-2 border-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {category}
            </Link>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (
          <>
            {photos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {photos.map((photo, index) => (
                  <GalleryAnimation key={photo.id} delay={index * 100}>
                    <div
                      className={`gallery-item overflow-hidden group relative ${photo.span ? "md:col-span-2 md:row-span-2" : ""}`}
                    >
                      <Link href={`/work/${photo.id}`} className="block">
                        <div className="relative">
                          <Image
                            src={photo.imageUrl || "/placeholder.svg"}
                            alt={photo.title}
                            width={photo.width}
                            height={photo.height}
                            className="w-full h-auto transition-transform duration-700 group-hover:scale-110 object-cover aspect-[4/3]"
                          />
                          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                        </div>
                      </Link>
                    </div>
                  </GalleryAnimation>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No photos available in this category yet.</p>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
