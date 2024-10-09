import path from 'node:path';
import fs from 'node:fs/promises';
import { Post } from '@/config/types';
import matter from 'gray-matter';

// 상대경로를 절대경로로 변환
const BASE_PATH = './src/data/posts';
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

// 정렬과 페이지네이션이 적용된 포스트 리스트를 반환
export const getPaginatedPostList = async (
  page: number,
  postsPerPage: number = 5
): Promise<{ posts: Post[]; totalPages: number }> => {
  const allPosts = await getSortedPosts();
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const startIdx = (page - 1) * postsPerPage;
  const endIdx = startIdx + postsPerPage;
  const posts = allPosts.slice(startIdx, endIdx);
  return { posts, totalPages };
};

// 최신 포스트 N개를 반환
export const getRecentPostList = async (count: number = 5, category?: string): Promise<Post[]> => {
  const postList = await getRecentPosts(category);
  return postList.slice(0, count);
};

// order 프로퍼티 기준으로 정렬된 포스트 리스트를 반환
export const getSortedPosts = async (category?: string): Promise<Post[]> => {
  const postList = await getPostList(category);
  return sortPostsByOrder(postList);
};

// Post[] 배열을 order 프로퍼티 기준으로 정렬하는 함수
const sortPostsByOrder = (postList: Post[]): Post[] => {
  return postList.sort((a, b) => {
    for (let i = 0; i < Math.max(a.order.length, b.order.length); i++) {
      const aVal = a.order[i] || 0;
      const bVal = b.order[i] || 0;
      if (aVal !== bVal) {
        return aVal - bVal;
      }
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};

// date 프로퍼티 기준으로 정렬된 포스트 리스트를 반환
export const getRecentPosts = async (category?: string): Promise<Post[]> => {
  const postList = await getPostList(category);
  return sortPostsByDate(postList);
};

// Post[] 배열을 date 프로퍼티 기준으로 정렬하는 함수
const sortPostsByDate = (postList: Post[]): Post[] => {
  return postList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// 모든 MDX 파일을 파싱한 리스트를 배열로 반환
export const getPostList = async (category?: string): Promise<Post[]> => {
  const postPaths = await getPostPaths(category);
  const postList = await Promise.all(postPaths.map(parsePost));
  return postList;
};

// 모든 MDX 파일에 대한 경로를 배열로 반환
export const getPostPaths = async (category?: string): Promise<string[]> => {
  const searchPath = category ? path.join(POSTS_PATH, category) : POSTS_PATH;
  const entries = await fs.readdir(searchPath, { withFileTypes: true, recursive: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name === 'content.mdx')
    .map((file) => file.parentPath);
};

// MDX 파일을 파싱
export const parsePost = async (postPath: string): Promise<Post> => {
  const metaData = parsePostMetaData(postPath);
  const contentData = await parsePostContent(postPath);
  return { ...metaData, ...contentData };
};

// MDX 파일의 meta data를 파싱
export const parsePostMetaData = (postPath: string): Post => {
  const relativePath = path.relative(POSTS_PATH, postPath);
  const parts = relativePath.split(path.sep);
  const category = parts[0];
  const slug = parts.slice(1).join('/');
  const url = `/posts/${category}/${slug}`;

  return { category, slug, url } as Post;
};

// MDX 파일의 front matter와 content를 파싱
const parsePostContent = async (postPath: string): Promise<Post> => {
  const filePath = path.join(postPath, 'content.mdx');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  return { ...data, content } as Post;
};

// category와 slug를 이용해 특정 포스트를 반환
export const getPostBySlug = async (category: string, slug: string): Promise<Post | null> => {
  const postPath = path.join(POSTS_PATH, category, slug);
  const post = await parsePost(postPath);
  return post;
};
