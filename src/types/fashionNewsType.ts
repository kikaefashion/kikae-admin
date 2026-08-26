export type FashionNewsStatus = 'draft' | 'published';

export interface FashionNews {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  status: FashionNewsStatus;
  published_at: string;
  author: string;
}

export type FashionNewsFormData = Omit<FashionNews, 'id'>;

export interface FashionNewsListResponse {
  status: boolean;
  message: string;
  data: {
    current_page: number;
    data: FashionNews[];
  };
}
