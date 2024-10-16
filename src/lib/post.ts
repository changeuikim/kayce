import path from 'node:path';
import fs from 'node:fs/promises';
import { Category, FrontMatter, PaginatedResult, Post, ScrollableItem } from '@/config/types';
import matter from 'gray-matter';

// 상대경로를 절대경로로 변환
const BASE_PATH = './src/data/posts';
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

// (1) 포스트 페이지네이션

/**
 * 특정 태그에 대한 페이지네이션된 포스트 목록을 반환하는 함수
 *
 * @param tag - 필터링할 태그
 * @param itemsPerPage - 페이지당 표시할 아이템 수 (기본값: 10)
 * @param currentPage - 현재 페이지 번호 (문자열, 기본값: '1')
 * @returns 페이지네이션된 포스트 목록과 페이지 정보
 * @since 24.10.16
 */
export const getPaginatedPostsByTag = async (
  tag: string,
  itemsPerPage: number = 10,
  currentPage: string = '1'
): Promise<PaginatedResult<Post>> => {
  const tagPosts = await getPostsByTag(tag);
  const page = parsePageNumber(currentPage);
  return paginateResults(tagPosts, itemsPerPage, page);
};

/**
 * 특정 카테고리에 대한 페이지네이션된 포스트 목록을 반환하는 함수
 *
 * @param category - 필터링할 카테고리
 * @param itemsPerPage - 페이지당 표시할 아이템 수 (기본값: 10)
 * @param currentPage - 현재 페이지 번호 (문자열, 기본값: '1')
 * @returns 페이지네이션된 포스트 목록과 페이지 정보
 * @since 24.10.16
 */
export const getPaginatedPostsByCategory = async (
  category: string,
  itemsPerPage: number = 10,
  currentPage: string = '1'
): Promise<PaginatedResult<Post>> => {
  const categoryPosts = await getPostsByCategory(category);
  const page = parsePageNumber(currentPage);
  return paginateResults(categoryPosts, itemsPerPage, page);
};

/**
 * 최신 포스트에 대한 페이지네이션된 목록을 반환하는 함수
 *
 * @param itemsPerPage - 페이지당 표시할 아이템 수 (기본값: 10)
 * @param currentPage - 현재 페이지 번호 (문자열, 기본값: '1')
 * @returns 페이지네이션된 포스트 목록과 페이지 정보
 * @since 24.10.16
 */
export const getPaginatedRecentPosts = async (
  itemsPerPage: number = 10,
  currentPage: string = '1'
): Promise<PaginatedResult<Post>> => {
  const allPosts = await getRecentPosts();
  const page = parsePageNumber(currentPage);
  return paginateResults(allPosts, itemsPerPage, page);
};

/**
 * 문자열로 된 페이지 번호를 숫자로 파싱하는 유틸리티 함수
 *
 * 유효하지 않은 페이지 번호가 입력될 경우 기본값 1을 반환합니다.
 *
 * @param currentPage - 파싱할 페이지 번호 문자열
 * @returns 파싱된 페이지 번호 (유효하지 않을 경우 1)
 * @since 24.10.16
 */
const parsePageNumber = (currentPage: string): number => {
  const num = parseInt(currentPage, 10);
  return isNaN(num) ? 1 : num;
};

/**
 * 주어진 아이템 배열을 페이지네이션하는 유틸리티 함수
 *
 * @param items - 페이지네이션할 아이템 배열
 * @param itemsPerPage - 페이지당 표시할 아이템 수
 * @param page - 현재 페이지 번호
 * @returns 페이지네이션된 결과와 페이지 정보를 포함하는 객체
 * @since 24.10.16
 */
const paginateResults = <T>(items: T[], itemsPerPage: number, page: number): PaginatedResult<T> => {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    items: items.slice(startIndex, endIndex),
    currentPage,
    totalPages,
    totalItems,
  };
};

// (2) 카테고리 및 태그 추출

/**
 * 모든 포스트의 태그를 추출하여 고유한 목록으로 반환하는 함수
 *
 * @returns 고유한 태그 배열
 * @throws getAllPosts 함수에서 오류가 발생하면 이를 상위로 전파합니다.
 * @since 24.10.16
 */
export const getAllTags = async (): Promise<ScrollableItem[]> => {
  try {
    const allPosts = await getAllPosts();
    const allTags = allPosts.flatMap((post) => post.tags || []);
    const uniqueTags = Array.from(new Set(allTags));

    return uniqueTags.map((tag) => ({
      item: tag,
    }));
  } catch (error) {
    console.error(
      `태그 추출 중 오류 발생: ${error instanceof Error ? error.message : String(error)}`
    );
    throw error;
  }
};

/**
 * 모든 포스트의 카테고리를 추출하여 고유한 목록으로 반환하는 함수
 *
 * @returns 카테고리명과 타입(large/middle)을 포함한 고유 카테고리 배열
 * @throws getAllPosts 함수에서 오류가 발생하면 이를 상위로 전파합니다.
 * @since 24.10.16
 */
export const getAllCategories = async (): Promise<ScrollableItem[]> => {
  try {
    const allPosts = await getAllPosts();
    const categoryMap = new Map<string, 'large' | 'middle'>();

    allPosts.forEach((post) => {
      post.categories.forEach((category) => {
        categoryMap.set(category.name, category.type);
      });
    });

    const uniqueCategories = Array.from(categoryMap);

    return uniqueCategories.map(([name, type]) => ({
      item: name,
      type,
    }));
  } catch (error) {
    console.error(
      `카테고리 추출 중 오류 발생: ${error instanceof Error ? error.message : String(error)}`
    );
    throw error;
  }
};

// (3) 포스트 정렬

/**
 * 특정 태그가 포함된 포스트들을 찾아 반환하는 함수
 *
 * @param tag - 찾고자 하는 태그 이름
 * @returns 해당 태그를 포함하는 포스트 배열
 * @since 24.10.16
 */
export const getPostsByTag = async (tag: string): Promise<Post[]> => {
  const allPosts = await getSortedPosts();
  return allPosts.filter((post) => post.tags && post.tags.includes(tag));
};

/**
 * 특정 카테고리에 속한 포스트들을 찾는 함수
 *
 * @param category - 찾고자 하는 카테고리 이름
 * @returns 해당 카테고리에 속한 포스트 배열
 * @since 24.10.16
 */
export const getPostsByCategory = async (category: string): Promise<Post[]> => {
  const allPosts = await getSortedPosts();
  return allPosts.filter((post) => post.categories.some((cat) => cat.name === category));
};

/**
 * 커스텀 정렬이 적용된 모든 포스트를 가져오는 함수
 *
 * 정렬 기준:
 * 1. order 배열의 각 요소를 순차적으로 비교하여 내림차순으로 정렬합니다.
 * 2. order 배열의 모든 요소가 같을 경우, date를 기준으로 내림차순 정렬합니다.
 *
 * @returns 정렬된 Post 객체 배열
 * @since 24.10.16
 */
export const getSortedPosts = async (): Promise<Post[]> => {
  const allPosts = await getAllPosts();
  return allPosts.sort((a, b) => {
    for (let i = 0; i < Math.max(a.order.length, b.order.length); i++) {
      const aVal = a.order[i] || 0;
      const bVal = b.order[i] || 0;
      if (aVal !== bVal) {
        return bVal - aVal;
      }
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};

/**
 * 모든 블로그 포스트를 최신순으로 정렬하여 가져오는 함수
 *
 * date 프로퍼티를 Date 객체로 변환한 후, 내림차순으로 정렬합니다.
 *
 * @returns 최신순으로 정렬된 모든 포스트
 * @since 24.10.16
 */
export const getRecentPosts = async (): Promise<Post[]> => {
  const allPosts = await getAllPosts();
  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// (4) 전체 포스트 및 개별 포스트

/**
 * 프로젝트의 모든 블로그 포스트를 파싱하는 함수
 *
 * getPostPaths로 얻은 각 경로에 대해 parsePost를 병렬로 실행합니다.
 * 파싱 실패한 포스트는 무시하고 성공한 포스트만 반환합니다.
 *
 * @returns 성공적으로 파싱된 포스트 객체 배열
 * @since 24.10.16
 */
export const getAllPosts = async (): Promise<Post[]> => {
  const postPaths = await getPostPaths();
  const postPromises = postPaths.map((postPath) => parsePost(postPath));
  const posts = await Promise.all(postPromises);
  return posts.filter((post): post is Post => post !== null);
};

/**
 * 주어진 slug 배열을 기반으로 특정 포스트를 파싱하여 반환하는 함수
 *
 * POSTS_PATH를 기준으로 전달받은 slug 배열을 결합하여 완전한 파일 경로를 생성한 후,
 * 해당 경로의 MDX 파일을 파싱합니다.
 *
 * @param slug - 포스트 경로를 구성하는 문자열 배열 (예: ['blog', 'mdx-blog', 'refactoring'])
 * @returns 파싱된 포스트 객체 또는 파싱 실패시 null
 * @since 24.10.16
 */
export const getPostBySlug = async (slug: string[]): Promise<Post | null> => {
  const postPath = path.join(POSTS_PATH, ...slug);
  try {
    return await parsePost(postPath);
  } catch (error) {
    console.error(
      `포스트 ${postPath} 처리 중 오류 발생, 건너뜁니다: ${error instanceof Error ? error.message : String(error)}`
    );
    return null;
  }
};

/**
 * MDX 파일을 읽어 Post 객체로 파싱하는 함수
 *
 * 상대경로와 파일명을 결합해 파일 경로를 생성한 후, 파일을 읽어와 내용을 파싱합니다.
 * MDX 파일의 프론트 매터, 내용, 메타 데이터를 추출한 후, 이를 Post 객체로 반환합니다.
 *
 * @param postPath - MDX 파일이 위치한 디렉토리의 상대 경로
 * @returns 파싱된 Post 객체
 * @since 24.10.16
 */
export const parsePost = async (postPath: string): Promise<Post> => {
  const filePath = path.join(postPath, 'content.mdx');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  // 메타 데이터 추출
  const relativePath = path.relative(POSTS_PATH, postPath);
  const pathParts = relativePath.split(path.sep);
  const categories = pathParts
    .slice(0, 2)
    .map(
      (pathPart, index): Category => ({ name: pathPart, type: index === 0 ? 'large' : 'middle' })
    );
  const slug = pathParts.slice(2).join('/');
  const url = `/posts/${categories.map((category) => category.name).join('/')}/${slug}`;

  const post: Post = {
    categories,
    slug,
    url,
    content,
    ...(data as FrontMatter),
  };
  return post;
};

/**
 * 프로젝트 내 모든 MDX 파일의 상대경로를 추출해서 반환하는 함수
 *
 * posts 경로 하위의 모든 디렉토리와 파일을 재귀적으로 읽어온 후, 파일명이 content.mdx인 부모 경로를 추출해 배열로 반환합니다.
 *
 * @returns MDX 파일이 위치한 디렉토리 경로 배열
 * @example ['blog/mdx-blog/set-up/mdx', 'blog/mdx-blog/set-up/mdx-parsing']
 * @since 24.10.16
 */
export const getPostPaths = async (): Promise<string[]> => {
  try {
    const entries = await fs.readdir(POSTS_PATH, { withFileTypes: true, recursive: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name === 'content.mdx')
      .map((file) => file.parentPath);
  } catch (error) {
    console.error(
      `경로를 읽을 수 없습니다.: ${error instanceof Error ? error.message : String(error)}`
    );
    return [];
  }
};
