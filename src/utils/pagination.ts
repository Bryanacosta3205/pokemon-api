import { PaginatedResponse } from '../interfaces/pagination.interface';

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 20;
export const MAX_LIMIT = 100;

export function paginateArray<T>(
  data: T[],
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_LIMIT
): PaginatedResponse<T> {
  const validPage = Math.max(1, Math.floor(page));
  const validLimit = Math.min(MAX_LIMIT, Math.max(1, Math.floor(limit)));

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / validLimit);
  const startIndex = (validPage - 1) * validLimit;
  const endIndex = startIndex + validLimit;

  const paginatedData = data.slice(startIndex, endIndex);

  return {
    success: true,
    data: paginatedData,
    pagination: {
      currentPage: validPage,
      totalPages,
      totalItems,
      itemsPerPage: validLimit,
      hasNextPage: validPage < totalPages,
      hasPreviousPage: validPage > 1,
    },
  };
}

export function parsePaginationQuery(query: { page?: string; limit?: string }): {
  page: number;
  limit: number;
} {
  const page = query?.page ? parseInt(query.page, 10) : DEFAULT_PAGE;
  const limit = query?.limit ? parseInt(query.limit, 10) : DEFAULT_LIMIT;

  return {
    page: isNaN(page) ? DEFAULT_PAGE : page,
    limit: isNaN(limit) ? DEFAULT_LIMIT : limit,
  };
}
