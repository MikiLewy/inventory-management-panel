export interface PaginatedResponse<T> {
  total: number;
  resources: T[];
}
