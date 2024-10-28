export interface FrontMatter {
  title: string;
  summary: string;
  date: string;
  lastModified: string;
  author: string;
  tags: string[];
  order: number[];
}

export interface Category {
  name: string;
  type: 'large' | 'middle';
}

export interface Post extends FrontMatter {
  content: string;
  categories: Category[];
  slug: string;
  url: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export type PaginatedResult<T> = {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
};

export type ScrollableItem = {
  item: string;
  type?: 'large' | 'middle';
  isHighlighted?: boolean;
};

export type ScrollableItemListProps = {
  items: ScrollableItem[];
  basePath: string;
  currentItem?: string;
};

export interface CategorySectionProps {
  categories: Category[];
}

export interface TagSectionProps {
  tags: string[];
}
