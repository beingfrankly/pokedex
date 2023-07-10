import { SortField } from "./sort-field";
import { SortOrder } from "./sort-order";

export type PokemonSearch = {
  offset: number;
  limit: number;
  sortField: SortField;
  sortOrder: SortOrder;
  name?: string;
  type?: number;
};
