import Image from "next/image"
import Link from "next/link"
import { Header } from "@/app/components/header"
import { Footer } from "@/app/components/footer" // Fixed path
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { urlForImage } from "@/lib/sanity-image"

// Define the Photo type
interface Photo {
  _id: string
  title: string
  image: any
  category: string
  aspectRatio?: number
  description?: string
}

export default async function PhotoDetailPage({ params }: { params: { id: string } }) {
  // Fetch photo from Sanity instead of local data
  const photo = await client.fetch<Photo>(
    `*[_type == "photo" && _id == $id][0] {
      _id,
      title,
      image,
      "category": category->title,
      description,
      "aspectRatio": image.asset->metadata.dimensions.width / image.asset->metadata.dimensions.height
    }`,
    { id: params.id }
  )

  if (!photo) {
    notFound()
  }

  // Find related photos (same category, excluding current)
  const relatedPhotos = await client.fetch<Photo[]>(
    `*[_type == "photo" && _id != $id && category->title == $category][0...3] {
      _id,
      title,
      image,
      "category": category->title,
      "aspectRatio": image.asset->metadata.dimensions.width / image.asset->metadata.dimensions.height
    }`,
    { id: params.id, category: photo.category }
  )

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
              src={photo.image ? urlForImage(photo.image) : "/placeholder.svg"}
              alt={photo.title}
              width={1200}
              height={Math.round(1200 / (photo.aspectRatio || 1))}
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
          </div>
        </div>

        {relatedPhotos.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold mb-6">Related Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedPhotos.map((relatedPhoto: Photo) => (
                <Link key={relatedPhoto._id} href={`/work/${relatedPhoto._id}`} className="block group">
                  <div className="relative overflow-hidden">
                    <Image
                      src={relatedPhoto.image ? urlForImage(relatedPhoto.image) : "/placeholder.svg"}
                      alt={relatedPhoto.title}
                      width={400}
                      height={Math.round(400 / (relatedPhoto.aspectRatio || 1))}
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