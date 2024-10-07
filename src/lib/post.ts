import path from 'node:path';
import fs from 'node:fs/promises';
import { Post } from '@/config/types';
import matter from 'gray-matter';

// 상대경로를 절대경로로 변환
const BASE_PATH = './src/data/posts';
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

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
const parsePostMetaData = (postPath: string): Post => {
  const relativePath = path.relative(POSTS_PATH, postPath);
  const [category, ...slugParts] = relativePath.split(path.sep);
  const slug = slugParts.join('/');
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
