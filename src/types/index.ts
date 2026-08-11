export interface Article {
  id?: string;
  title: string;
  slug: string;
  thumbnail: string;
  category: 'Kehidupan' | 'Produktivitas' | 'Filosofi' | 'AI' | 'Keuangan' | 'Karier';
  content: string;
  metaTitle: string;
  metaDescription: string;
  status: 'Draft' | 'Published';
  likes: number;
  bookmarks: string[]; // Array of User IDs
  createdAt: any;
  updatedAt: any;
}

export interface Quote {
  id?: string;
  text: string;
  author: string;
  imageUrl?: string;
  scheduledDate: string; // YYYY-MM-DD
  isQuoteOfTheDay: boolean;
  createdAt: any;
}
