import { Request, Response } from 'express';
import { pokemonController } from '../../../src/controllers/pokemon.controller';
import { pokemonService } from '../../../src/services/pokemon.service';

jest.mock('../../../src/services/pokemon.service');

describe('PokemonController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  describe('getAllPokemons', () => {
    it('should return all pokemons with success response', async () => {
      const mockPokemons = [
        { name: 'pikachu', types: ['electric'], image: 'pikachu.png' },
        { name: 'charizard', types: ['fire', 'flying'], image: 'charizard.png' },
      ];

      (pokemonService.getAllPokemons as jest.Mock).mockResolvedValue(mockPokemons);

      await pokemonController.getAllPokemons(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        count: 2,
        data: mockPokemons,
      });
    });
  });

  describe('getPokemon', () => {
    it('should return a single pokemon by id or name', async () => {
      const mockPokemon = {
        name: 'pikachu',
        types: ['electric'],
        image: 'pikachu.png',
      };

      mockRequest.params = { idOrName: 'pikachu' };
      (pokemonService.getPokemon as jest.Mock).mockResolvedValue(mockPokemon);

      await pokemonController.getPokemon(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(pokemonService.getPokemon).toHaveBeenCalledWith('pikachu');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockPokemon,
      });
    });

    it('should return 400 when pokemon not found', async () => {
      mockRequest.params = { idOrName: 'invalid' };
      (pokemonService.getPokemon as jest.Mock).mockRejectedValue(new Error('Not found'));

      await pokemonController.getPokemon(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        data: 'Not found',
      });
    });
  });

  describe('clearCache', () => {
    it('should clear cache and return success message', async () => {
      (pokemonService.clearCache as jest.Mock).mockImplementation(() => {});

      await pokemonController.clearCache(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(pokemonService.clearCache).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: 'Cache cleared successfully',
      });
    });
  });

  describe('healthCheck', () => {
    it('should return health status', () => {
      pokemonController.healthCheck(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Pokemon API is running',
          timestamp: expect.any(String),
        })
      );
    });
  });
});
