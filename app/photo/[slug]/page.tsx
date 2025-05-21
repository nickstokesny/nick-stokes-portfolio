import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/app/components/header";
import { contentfulClient } from "../../../lib/contentful/contentful";
import type { ContentfulPhoto } from "../../../lib/contentful/contentful";

interface PhotoDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function PhotoDetailPage({ params }: PhotoDetailPageProps) {
  const slug = params.slug;
  
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'photo',
      'fields.slug': slug,
      include: 2,
    });
    
    if (response.items.length === 0) {
      notFound();
    }
    
    const item = response.items[0] as any;
    
    const photo = {
      title: item.fields.title as string,
      imageUrl: item.fields.image ? (item.fields.image as any).fields.file.url as string : null,
      category: item.fields.category ? (item.fields.category as any).fields.title as string : null
    };
    
    return (
      <main>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Link href="/" className="text-gray-600 hover:text-black">
              ← Back to Portfolio
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative aspect-square">
              {photo.imageUrl ? (
                <Image
                  src={`https:${photo.imageUrl}`}
                  alt={photo.title}
                  width={800}
                  height={800}
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>
            
            <div>
              <h1 className="text-3xl font-bold mb-4">{photo.title}</h1>
              {photo.category && (
                <p className="text-gray-600 mb-6">Category: {photo.category}</p>
              )}
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error: any) {
    console.error('Error fetching photo:', error);
    return (
      <main>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold mb-4">Error</h1>
            <p className="text-gray-500">There was an error loading this photo.</p>
            <div className="mt-6">
              <Link href="/" className="text-gray-600 hover:text-black">
                ← Back to Portfolio
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }
}