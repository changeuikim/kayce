import Link from 'next/link';
import { PaginationProps } from '@/config/types';

const Pagination = ({ currentPage, totalPages, basePath }: PaginationProps) => {
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <div className="flex justify-center space-x-4 mt-8">
      {prevPage && (
        <Link
          href={`${basePath}?page=${prevPage}`}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          이전
        </Link>
      )}
      <span className="px-4 py-2">
        {totalPages} 중 {currentPage} 페이지
      </span>
      {nextPage && (
        <Link
          href={`${basePath}?page=${nextPage}`}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          다음
        </Link>
      )}
    </div>
  );
};

export default Pagination;
