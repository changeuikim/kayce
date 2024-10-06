import path from 'node:path';
import fs from 'node:fs/promises';

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
