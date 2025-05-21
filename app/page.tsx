// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { contentfulClient } from "../lib/contentful/contentful";
import type { ContentfulCategory, ContentfulPhoto } from "../lib/contentful/contentful";

interface Category {
  id: string;
  title: string;
  slug: string;
}

interface Photo {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  category: string;
}

interface HomePageProps {
  searchParams?: {
    category?: string;
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const categorySlug = searchParams?.category || null;
  
  let categories: Category[] = [];
  let photos: Photo[] = [];
  let siteSettings: any = null;
  let error: string | null = null;
  
  try {
    // Fetch site settings (adjust content_type as needed)
    try {
      const siteSettingsResponse = await contentfulClient.getEntries({
        content_type: 'siteSettings', // Change this to match your content type
        limit: 1,
      });
      
      if (siteSettingsResponse.items.length > 0) {
        siteSettings = siteSettingsResponse.items[0].fields;
      }
    } catch (err) {
      console.error("Error fetching site settings:", err);
    }
    
    // Fetch categories
    const categoriesResponse = await contentfulClient.getEntries<ContentfulCategory>({
      content_type: 'category',
    });
    
    categories = categoriesResponse.items.map((item: any) => ({
      id: item.sys.id,
      title: item.fields.title,
      slug: item.fields.slug,
    }));
    
    // Fetch photos
    let photoQuery: any = {
      content_type: 'photo',
      include: 2,
    };
    
    if (categorySlug) {
      const categoryEntry = await contentfulClient.getEntries({
        content_type: 'category',
        'fields.slug': categorySlug,
      });
      
      if (categoryEntry.items.length > 0) {
        photoQuery['fields.category.sys.id'] = categoryEntry.items[0].sys.id;
      }
    }
    
    const photosResponse = await contentfulClient.getEntries<ContentfulPhoto>(photoQuery);
    
    photos = photosResponse.items.map((item: any) => {
      const categoryField = item.fields.category;
      return {
        id: item.sys.id,
        title: item.fields.title,
        slug: item.fields.slug,
        imageUrl: item.fields.image ? item.fields.image.fields.file.url : '',
        category: categoryField ? categoryField.fields.title : 'Uncategorized',
      };
    });
  } catch (err: any) {
    error = err.message;
  }

  return (
    <main>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[100px]">
          <h1 className="text-4xl font-bold mb-8">NICK STOKES</h1>
          
          <div className="text-center">
            {/* Override the heading here */}
            <h2 className="text-5xl font-bold mb-8">WORK</h2>
            
            <div className="mb-12">
              <Link 
                href="/" 
                className="text-lg font-medium px-6 py-3 border border-black hover:bg-black hover:text-white"
              >
                View Portfolio
              </Link>
            </div>
            
            <a
              href="https://instagram.com/nickstokesny/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-600"
            >
              <span>Follow on Instagram</span>
            </a>
          </div>
        </div>
        
        <div className="mt-12">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>Error loading content: {error}</p>
              <p>Please check the console for more details.</p>
            </div>
          )}
          
          <div className="flex flex-wrap gap-4 mb-8">
            <Link 
              href="/" 
              className={`px-4 py-2 text-sm font-medium ${!categorySlug ? 'underline font-bold' : 'hover:underline'}`}
            >
              ALL
            </Link>
            
            {categories.map((category) => (
              <Link 
                key={category.id}
                href={`/?category=${category.slug}`}
                className={`px-4 py-2 text-sm font-medium ${categorySlug === category.slug ? 'underline font-bold' : 'hover:underline'}`}
              >
                {category.title.toUpperCase()}
              </Link>
            ))}
          </div>
          
          {photos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <Link key={photo.id} href={`/photo/${photo.slug}`}>
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
              <p className="text-gray-500 mt-2">Check the browser console for debugging information.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}