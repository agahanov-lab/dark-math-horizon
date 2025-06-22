import { useState, useMemo } from 'react';

interface PaginationProps<T> {
  items: T[];
  itemsPerPage: number;
}

interface PaginationResult<T> {
  currentItems: T[];
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  canNextPage: boolean;
  canPreviousPage: boolean;
}

export function usePagination<T>({ items, itemsPerPage }: PaginationProps<T>): PaginationResult<T> {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return {
    currentItems,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    previousPage,
    canNextPage: currentPage < totalPages,
    canPreviousPage: currentPage > 1,
  };
}
