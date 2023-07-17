import { PokemonAbility } from './pokemon-ability';
import { PokemonEvolution } from './pokemon-evolution';
import { PokemonStat } from './pokemon-stat';
import { PokemonType } from './pokemon-type';

export type PokemonBase = {
  id: number;
  name: string;
  height: number;
  baseExperience: number;
  stats: PokemonStat[];
  types: PokemonType[];
};

export type Pokemon = PokemonBase & {
  evolutions: PokemonEvolution[] | undefined;
  abilities: PokemonAbility[];
};

export type SortablePokemonProps = Pick<PokemonBase, 'id' | 'name' | 'height'>;
