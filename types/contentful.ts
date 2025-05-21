// types/contentful.ts

// Basic Contentful system metadata
export interface Sys {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  contentType?: {
    sys: {
      id: string;
      linkType: string;
      type: string;
    };
  };
}

// Asset file details
export interface AssetFile {
  url: string;
  details: {
    size: number;
    image?: {
      width: number;
      height: number;
    };
  };
  fileName: string;
  contentType: string;
}

// Asset structure
export interface Asset {
  sys: Sys;
  fields: {
    title: string;
    description?: string;
    file: AssetFile;
  };
}

// Category content type
export interface CategoryEntry {
  sys: Sys;
  fields: {
    title: string;
    slug: string;
  };
}

// Photo content type
export interface PhotoEntry {
  sys: Sys;
  fields: {
    title: string;
    image: Asset;
    category: CategoryEntry;
  };
}

// Generic entry response
export interface EntryCollection<T> {
  total: number;
  skip: number;
  limit: number;
  items: T[];
}