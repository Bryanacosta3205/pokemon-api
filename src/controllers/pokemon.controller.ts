import { type Request, type Response, type NextFunction } from 'express';
import { pokemonService } from '../services/pokemon.service';
import { paginateArray, parsePaginationQuery } from '../utils/pagination';

class PokemonController {
  getAllPokemons = async (req: Request, res: Response, _next: NextFunction) => {
    console.info('GET /pokemons - Request received');

    const allPokemon = await pokemonService.getAllPokemons();

    const { page, limit } = parsePaginationQuery(req.query);

    if (req.query?.page || req.query?.limit) {
      const paginatedResponse = paginateArray(allPokemon, page, limit);
      return res.status(200).json(paginatedResponse);
    }

    res.status(200).json({
      success: true,
      count: allPokemon.length,
      data: allPokemon,
    });

    console.info(`GET /pokemons - Returned ${allPokemon.length} Pokemon`);
  };

  getPokemon = async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const { idOrName } = req.params;

      const pokemon = await pokemonService.getPokemon(idOrName);
      res.status(200).json({
        success: true,
        data: pokemon,
      });
    } catch (e) {
      res.status(400).json({
        success: false,
        data: 'Not found',
      });
    }
  };

  clearCache = async (req: Request, res: Response, _next: NextFunction) => {
    pokemonService.clearCache();

    res.status(200).json({
      success: true,
      message: 'Cache cleared successfully',
    });

    console.info('POST /pokemons/cache/clear - Cache cleared');
  };

  healthCheck = (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: 'Pokemon API is running',
      timestamp: new Date().toISOString(),
    });
  };
}

export const pokemonController = new PokemonController();
