import { SortablePokemonProps } from "./pokemon";
import { SortOrder } from "./sort-order";

export type PokemonSearch = {
  offset: number;
  limit: number;
  sortField: keyof SortablePokemonProps;
  sortOrder: SortOrder;
  name?: string;
  type?: number;
};
