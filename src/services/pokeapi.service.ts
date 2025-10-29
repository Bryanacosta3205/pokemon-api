import axios, { AxiosInstance } from 'axios';
import { config } from '../config';
import { PokeApiPokemonList, PokeApiPokemon } from '../interfaces/pokeapi.interface';

class PokeApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.pokeApi.baseUrl,
      timeout: config.pokeApi.requestTimeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getPokemonList(limit: number = 1302, offset: number = 0): Promise<PokeApiPokemonList> {
    try {
      const response = await this.client.get<PokeApiPokemonList>(
        `/pokemon?limit=${limit}&offset=${offset}`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Error fetching Pokemon list from PokeAPI', error);
        throw new Error(`${error.response?.status || 500}`);
      } else {
        throw new Error('500');
      }
    }
  }

  async getPokemonDetails(nameOrId: string | number): Promise<PokeApiPokemon> {
    try {
      const response = await this.client.get<PokeApiPokemon>(`/pokemon/${nameOrId}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(`Error fetching Pokemon details for ${nameOrId}`, error);
        throw new Error(`${error.response?.status || 500}`);
      } else {
        throw new Error('500');
      }
    }
  }

  async getPokemonDetailsInBatch(urls: string[]): Promise<PokeApiPokemon[]> {
    try {
      console.info(`Fetching ${urls.length} Pokemon details in batch`);
      const promises = urls.map(url => axios.get<PokeApiPokemon>(url));
      const responses = await Promise.all(promises);
      return responses.map(response => response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Error fetching Pokemon batch details', error);
        throw new Error(`${error.response?.status || 500}`);
      } else {
        throw new Error('500');
      }
    }
  }
}

export const pokeApiService = new PokeApiService();
