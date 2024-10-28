import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

const PostPagination = ({ currentPage, totalPages, basePath }: PaginationProps) => {
  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={`${basePath}/${i}`} isActive={i === currentPage}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        items.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
    return items;
  };

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`${basePath}/${currentPage - 1}`} />
          </PaginationItem>
        )}
        {renderPaginationItems()}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={`${basePath}/${currentPage + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PostPagination;
