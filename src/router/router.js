import { createRouter, createWebHistory } from 'vue-router';
import PokeList from '../components/PokeList';
import PokeLikes from '../components/PokeLikes';
import PokeItem from '../components/PokeItem';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/pokemons', component: PokeList, alias: '/',
    },

    {
      path: '/pokemons/:pokeName', 
      component: PokeItem, 
      name: 'Pokemon', 
      props: true
    },
    
    {
      path: '/my-likes', component: PokeLikes
    }
   
  ]
});

export default router;