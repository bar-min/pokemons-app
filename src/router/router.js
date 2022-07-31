import { createRouter, createWebHistory } from 'vue-router';
import PokeList from '../views/PokeList';
import PokeLikes from '../views/PokeLikes';
import PokeItem from '../views/PokeItem';
import PokeSearch from '../views/PokeSearch';

const router = createRouter({
  history: createWebHistory(),

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  
  routes: [
    {
      path: '/pokemons', 
      component: PokeList, 
      name: 'Pokemons',
      alias: '/',
    },

    {
      path: '/pokemons/:pokeName', 
      component: PokeItem, 
      name: 'Pokemon', 
      props: true
    },
  
    {
      path: '/my-likes', component: PokeLikes
    },

    {
      path: '/search', component: PokeSearch
    },
  ]
});

export default router;