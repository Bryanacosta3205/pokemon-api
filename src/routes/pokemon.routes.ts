import { Router } from 'express';
import { pokemonController } from '../controllers/pokemon.controller';

const router = Router();

router.get('/', pokemonController.getAllPokemons);
router.get('/:idOrName', pokemonController.getPokemon);

export default router;
