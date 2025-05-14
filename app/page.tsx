import Link from "next/link"
import { createClient } from "next-sanity"
import { Header } from "./components/header"
import { categories } from "./data/photos"
import { Instagram } from "lucide-react"

// This creates a connection to your Sanity project
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: false,
})

// Define the photo type
interface SanityPhoto {
  _id: string
  title: string
  imageUrl: string
  width: number
  height: number
}

// This function gets featured photos from Sanity
async function getFeaturedPhotos(): Promise<SanityPhoto[]> {
  // This is a query that gets featured photos
  return client.fetch(`*[_type == "photo"]{
    _id,
    title,
    "imageUrl": image.asset->url,
    width,
    height
  }`)
}

// This is your page component
export default async function HomePage() {
  // Get the photos data
  const featuredPhotos = await getFeaturedPhotos()

  return (
    <div className="container">
      <Header activePage="work" />

      <main>
        <h1>WORK</h1>

        {/* Category Navigation */}
        <div className="categories">
          {categories.map((category: string) => (
            <Link key={category} href={`/work?category=${category}`} className="category-link">
              {category}
            </Link>
          ))}
        </div>

        {/* Gallery Grid */}
        {featuredPhotos.length > 0 ? (
          <div className="gallery-grid">{/* Photos would go here */}</div>
        ) : (
          <div className="no-photos">
            <p>No photos found. Add some in your Sanity Studio!</p>
          </div>
        )}

        <div className="view-all">
          <Link href="/work">View All Work</Link>
        </div>
      </main>

      <footer>
        <p className="copyright">© 2024 Nick Stokes. All rights reserved.</p>
        <Link
          href="https://www.instagram.com/nickstokesny/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <Instagram className="w-5 h-5" />
        </Link>
      </footer>
    </div>
  )
}
