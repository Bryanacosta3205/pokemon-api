import { Pokemon } from '../interfaces/pokemon.interface';
import { memoryCache } from '../cache/memory-cache';
import { pokeApiService } from './pokeapi.service';
import { config } from '../config';
import { PokeApiPokemon } from '../interfaces/pokeapi.interface';

class PokemonService {
  private readonly CACHE_KEY = 'all_pokemons';
  private readonly BATCH_SIZE = 100;

  async getAllPokemons(): Promise<Pokemon[]> {
    const cachedData = memoryCache.get<Pokemon[]>(this.CACHE_KEY);
    if (cachedData) {
      return cachedData;
    }

    const pokemonList = await pokeApiService.getPokemonList(config.pokeApi.limit);

    const urls = pokemonList.results.map(pokemonItem => pokemonItem.url);

    const allPokemonDetails: PokeApiPokemon[] = [];
    for (let i = 0; i < urls.length; i += this.BATCH_SIZE) {
      const batch = urls.slice(i, i + this.BATCH_SIZE);

      const batchDetails = await pokeApiService.getPokemonDetailsInBatch(batch);
      allPokemonDetails.push(...batchDetails);

      if (i + this.BATCH_SIZE < urls.length) {
        await this.delay(100);
      }
    }

    const pokemons = allPokemonDetails.map(this.transformPokemon);

    memoryCache.set(this.CACHE_KEY, pokemons);

    return pokemons;
  }

  async getPokemon(nameOrId: string | number): Promise<Pokemon> {
    const pokemon = await pokeApiService.getPokemonDetails(nameOrId);
    const parsedPokemon = this.transformPokemon(pokemon);
    return parsedPokemon;
  }

  private transformPokemon = (apiPokemon: PokeApiPokemon): Pokemon => ({
    name: apiPokemon.name,
    types: apiPokemon.types.map(({ type }) => type.name),
    image: this.selectImage(apiPokemon.sprites),
  });

  private selectImage(sprites: PokeApiPokemon['sprites']): string {
    return (
      sprites.other?.['official-artwork']?.front_default ||
      sprites.other?.home?.front_default ||
      sprites.front_default ||
      ''
    );
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  clearCache(): void {
    memoryCache.clear();
  }
}

export const pokemonService = new PokemonService();
