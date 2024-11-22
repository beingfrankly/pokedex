import { PokemonAbility } from './pokemon-ability';
import { PokemonStat } from './pokemon-stat';
import { PokemonType } from './pokemon-type';

export type PokemonBase = {
  name: string;
  id: number;
  is_favorite: boolean;
};

export type PokemonList = {
  pokemon: PokemonBase[];
  next?: number;
  previous?: number;
};

export type Pokemon = PokemonBase & {
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
};

export type SortablePokemonProps = Pick<PokemonBase, 'name' | 'id'>;
