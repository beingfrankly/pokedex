import { SortOrder } from '../types/sort-order';

export function getSortOrder<T>(
  currentSortField: keyof T,
  nextSortField: keyof T,
  currentSortOrder: SortOrder,
): SortOrder {
  if (currentSortField !== nextSortField) {
    return SortOrder.ASC;
  } else if (
    currentSortField === nextSortField &&
    currentSortOrder === SortOrder.DESC
  ) {
    return SortOrder.ASC;
  } else {
    return SortOrder.DESC;
  }
}
