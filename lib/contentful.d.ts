declare module 'contentful' {
  export function createClient(config: {
    space: string;
    accessToken: string;
  }): {
    getEntries: <T = any>(query?: any) => Promise<{
      items: Array<{
        sys: {
          id: string;
        };
        fields: T;
      }>;
    }>;
  };
}