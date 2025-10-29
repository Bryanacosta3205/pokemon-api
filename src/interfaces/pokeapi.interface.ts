export interface PokeApiPokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeApiBasicPokemon[];
}

export interface PokeApiBasicPokemon {
  name: string;
  url: string;
}

export interface PokeApiPokemon {
  id: number;
  name: string;
  types: PokeApiType[];
  sprites: PokeApiSprites;
}

export interface PokeApiType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokeApiSprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other?: {
    dream_world?: {
      front_default: string | null;
      front_female?: string | null;
    };
    home?: {
      front_default: string | null;
      front_female?: string | null;
      front_shiny?: string | null;
      front_shiny_female?: string | null;
    };
    'official-artwork'?: {
      front_default: string | null;
      front_shiny?: string | null;
    };
    showdown?: {
      back_default?: string | null;
      back_female?: string | null;
      back_shiny?: string | null;
      back_shiny_female?: string | null;
      front_default?: string | null;
      front_female?: string | null;
      front_shiny?: string | null;
      front_shiny_female?: string | null;
    };
  };
  versions?: {
    [generation: string]: {
      [game: string]: PokeApiSprites & { animated?: PokeApiSprites };
    };
  };
}
