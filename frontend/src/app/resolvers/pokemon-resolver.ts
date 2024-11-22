import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Pokemon } from '../types/pokemon';
import { inject } from '@angular/core';
import { SearchService } from '../services/search.service';

export const pokemonResolver: ResolveFn<Pokemon> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(SearchService).getPokemonById(
    parseInt(route.paramMap.get('id')!)
  );
};
