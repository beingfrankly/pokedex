import { SortField } from '../types/sort-field';
import { SortOrder } from '../types/sort-order';

export function getSortOrder(
  previousSortField: SortField,
  currentSortField: SortField,
  previousSortOrder: SortOrder,
): SortOrder {
  if (previousSortField !== currentSortField) {
    return SortOrder.ASC;
  } else if (
    previousSortField === currentSortField &&
    previousSortOrder === SortOrder.DESC
  ) {
    return SortOrder.ASC;
  } else {
    return SortOrder.DESC;
  }
}
