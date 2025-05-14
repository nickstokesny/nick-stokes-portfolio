// Make sure the export statement is at the beginning of the file and properly formatted
export const categories = ["ALL", "BEAUTY", "STILL LIFE", "EDITORIAL", "PORTRAIT"]

// Make sure all other exports are properly defined
export interface Photo {
  id: string
  title: string
  imageUrl: string
  category: string
  width: number
  height: number
  span?: boolean
  description?: string
}

// Sample photos data
export const photos: Photo[] = [
  {
    id: "photo1",
    title: "Beauty Portrait",
    imageUrl: "/placeholder.svg?key=g0yu8",
    category: "BEAUTY",
    width: 800,
    height: 600,
    description: "A stunning beauty portrait showcasing natural makeup techniques.",
  },
  {
    id: "photo2",
    title: "Still Life Composition",
    imageUrl: "/placeholder.svg?key=tz4wa",
    category: "STILL LIFE",
    width: 800,
    height: 600,
    description: "Elegant still life composition with minimalist aesthetics.",
  },
  {
    id: "photo3",
    title: "Editorial Fashion",
    imageUrl: "/placeholder.svg?key=8bi9v",
    category: "EDITORIAL",
    width: 1200,
    height: 900,
    span: true,
    description: "High-end editorial fashion photography for a leading magazine.",
  },
  {
    id: "photo4",
    title: "Portrait Study",
    imageUrl: "/portrait-photography.png",
    category: "PORTRAIT",
    width: 800,
    height: 600,
    description: "Intimate portrait study exploring human expression.",
  },
]

// Function to get photos by category
export function getPhotosByCategory(category: string): Photo[] {
  if (category === "ALL") {
    return photos
  }
  return photos.filter((photo) => photo.category === category)
}

// Function to get a photo by ID
export function getPhotoById(id: string): Photo | undefined {
  return photos.find((photo) => photo.id === id)
}

// Function to get related photos
export function getRelatedPhotos(photoId: string): Photo[] {
  const photo = getPhotoById(photoId)
  if (!photo) return []

  return photos.filter((p) => p.category === photo.category && p.id !== photoId).slice(0, 3)
}

// Default export for convenience
export default photos
