export interface IPost {
  id: number;
  attributes: {
    category?: Record<any, any>;
    content: string;
    createdAt: string;
    description: string | null;
    publishedAt: string;
    slug: string;
    title: string;
    updatedAt: string;
    image: Record<any, any>;
  };
}
