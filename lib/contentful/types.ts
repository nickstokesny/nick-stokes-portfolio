// Contentful type definitions
export interface ContentfulImage {
  fields: {
    file: {
      url: string;
      details?: {
        size?: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName?: string;
      contentType?: string;
    };
    title?: string;
    description?: string;
  };
}

export interface Category {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    slug: string;
  };
}

export interface Photo {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    slug: string;
    image: ContentfulImage;
    category?: {
      sys: {
        id: string;
      };
      fields: {
        title: string;
        slug: string;
      };
    };
  };
}

export interface CategoryEntry {
  id: string;
  title: string;
  slug: string;
}

export interface PhotoEntry {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  category: string;
}