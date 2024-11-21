import { HttpParams } from "@angular/common/http";
import { PokemonSearch } from "../types/pokemon-search";

export function buildParams(search: PokemonSearch): HttpParams {
  let params = new HttpParams()
    .set('limit', search.limit.toString())
    .set('offset', search.offset.toString());

  return params;
}
