import Link from "next/link";
import Image from "next/image";
import { Header } from "@/app/components/header";
import { contentfulClient } from "@/app/lib/contentful";

export default async function WorkPage() {
  // Add error handling
  let categories = [];
  let photos = [];
  
  try {
    // Fetch categories from Contentful
    const categoriesResponse = await contentfulClient.getEntries({
      content_type: 'category',
    });
    
    // Map the response to a simpler format
    categories = categoriesResponse.items.map(item => ({
      id: item.sys.id,
      title: item.fields.title,
      slug: item.fields.slug,
    }));
    
    // Fetch photos from Contentful
    const photosResponse = await contentfulClient.getEntries({
      content_type: 'photo',
      include: 2, // Include linked entries (categories)
    });
    
    // Map the response to a simpler format
    photos = photosResponse.items.map(item => {
      const categoryField = item.fields.category;
      return {
        id: item.sys.id,
        title: item.fields.title,
        slug: item.fields.slug,
        imageUrl: item.fields.image ? item.fields.image.fields.file.url : '',
        category: categoryField ? categoryField.fields.title : 'Uncategorized',
      };
    });
    
    console.log('Photos fetched:', photos); // Debug log
  } catch (error) {
    console.error('Error fetching data from Contentful:', error);
  }

  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Portfolio</h1>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/work" 
              className="px-4 py-2 text-sm font-medium hover:underline"
            >
              ALL
            </Link>
            
            {categories.map((category) => (
              <Link 
                key={category.id}
                href={`/work?category=${category.slug}`}
                className="px-4 py-2 text-sm font-medium hover:underline"
              >
                {category.title.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
        
        {photos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <Link key={photo.id} href={`/work/${photo.slug}`}>
                <div className="group">
                  <div className="relative aspect-square overflow-hidden">
                    {photo.imageUrl ? (
                      <Image
                        src={`https:${photo.imageUrl}`}
                        alt={photo.title}
                        width={500}
                        height={500}
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                  <h3 className="mt-2 text-lg font-medium">{photo.title}</h3>
                  <p className="text-sm text-gray-600">{photo.category}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No photos found. Make sure you've published photos in Contentful.</p>
          </div>
        )}
      </div>
    </main>
  );
}