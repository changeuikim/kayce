export interface PostMatter {
  title: string;
  summary: string;
  date: string;
  lastModified: string;
  author: string;
  tags: string[];
  order: number[];
}

export interface Post extends PostMatter {
  content: string;
  category: string;
  slug: string;
  url: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}
