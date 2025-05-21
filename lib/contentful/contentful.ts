import { createClient } from 'contentful';

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

export interface ContentfulCategory {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    slug: string;
  };
}

export interface ContentfulImage {
  fields: {
    file: {
      url: string;
      details: {
        image?: {
          width: number;
          height: number;
        };
      };
    };
  };
}

export interface ContentfulPhoto {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    slug: string;
    image: ContentfulImage;
    category?: ContentfulCategory;
  };
}