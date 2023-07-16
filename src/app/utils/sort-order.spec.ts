import { SortablePokemonProps } from "../types/pokemon";
import { SortOrder } from "../types/sort-order";
import { getSortOrder } from "./sort-order";

describe('getSortOrder', () => {
  it('should return ASC if previous sort field is different from current sort field', () => {
    const result = getSortOrder<SortablePokemonProps>("id", "height", SortOrder.DESC);
    expect(result).toBe(SortOrder.ASC);
  });

  it('should return DESC if previous sort order is ASC and both sort fields are the same', () => {
    const result = getSortOrder<SortablePokemonProps>(
      "id",
      "id",
      SortOrder.ASC
    );
    expect(result).toBe(SortOrder.DESC);
  });

  it('should return ASC if previous sort order is DESC and both sort fields are the same', () => {
    const result = getSortOrder<SortablePokemonProps>(
      "id",
      "id",
      SortOrder.DESC
    );
    expect(result).toBe(SortOrder.ASC);
  });
});
