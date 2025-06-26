export type Paginated<T> = {
  items: T[];
  nextCursor?: string;
};