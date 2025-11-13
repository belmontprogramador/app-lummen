export interface PaginationResponse<T> {
  page: number;
  limit: number;
  pages: number;
  total: number;
  items: T[];
}

export interface ApiError {
  error: string;
}
