"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/app/components/header"
import { Footer } from "@/app/components/footer"
import { getPhotoById, getRelatedPhotos, type Photo } from "@/app/data/photos"
import { SocialShare } from "@/app/components/social-share"

export default function PhotoDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [photo, setPhoto] = useState<Photo | null>(null)
  const [relatedPhotos, setRelatedPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, you'd fetch from Sanity here
    // For now, we'll use our local data
    const fetchedPhoto = getPhotoById(id)
    if (fetchedPhoto) {
      setPhoto(fetchedPhoto)
      setRelatedPhotos(getRelatedPhotos(id))
    }
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  if (!photo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Photo not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header activePage="work" />

      <div className="w-full h-px bg-gray-200 mt-2"></div>

      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="mb-8">
          <Link href="/work" className="text-gray-500 hover:text-black transition-colors">
            ← Back to Work
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Image
              src={photo.imageUrl || "/placeholder.svg"}
              alt={photo.title}
              width={photo.width || 1200}
              height={photo.height || 800}
              className="w-full h-auto"
              priority
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-4">{photo.title}</h1>
            {photo.description && <p className="text-gray-700 mb-6">{photo.description}</p>}

            <div className="mb-8">
              <h2 className="text-lg font-medium mb-2">Category</h2>
              <Link
                href={`/work?category=${photo.category}`}
                className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
              >
                {photo.category}
              </Link>
            </div>

            <SocialShare
              url={`https://nickstokes.com/work/${photo.id}`}
              title={`Nick Stokes Photography - ${photo.title}`}
              description={photo.description || "Photography by Nick Stokes"}
            />
          </div>
        </div>

        {relatedPhotos.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold mb-6">Related Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedPhotos.map((relatedPhoto) => (
                <Link key={relatedPhoto.id} href={`/work/${relatedPhoto.id}`} className="block group">
                  <div className="relative overflow-hidden">
                    <Image
                      src={relatedPhoto.imageUrl || "/placeholder.svg"}
                      alt={relatedPhoto.title}
                      width={400}
                      height={300}
                      className="w-full h-auto transition-transform duration-700 group-hover:scale-110 object-cover aspect-[4/3]"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  </div>
                  <h3 className="mt-2 text-gray-800">{relatedPhoto.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
