import { createRouter, createWebHistory } from 'vue-router';
import PokeList from '../components/PokeList';
import PokeLikes from '../components/PokeLikes';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/', component: PokeList, alias: '/pokemons'
    },
    {
      path: '/my-likes', component: PokeLikes
    }
  ]
});

export default router;