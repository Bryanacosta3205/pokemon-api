import { Router } from 'express';
import pokemonRoutes from './pokemon.routes';
import { pokemonController } from '../controllers/pokemon.controller';

const router = Router();

router.get('/health', pokemonController.healthCheck);
router.get('/clear', pokemonController.clearCache);
router.use('/pokemons', pokemonRoutes);

export default router;
