import { PokemonAbility } from "./pokemon-ability";
import { PokemonEvolution } from "./pokemon-evolution";
import { PokemonStat } from "./pokemon-stat";
import { PokemonType } from "./pokemon-type";

export type Pokemon = {
  id: number;
  name: string;
  evolutions: PokemonEvolution[] | undefined;
  stats: PokemonStat[];
  types: PokemonType[];
  abilities: PokemonAbility[];
}
