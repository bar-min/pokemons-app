import { createStore } from 'vuex';
import axios from 'axios';
import pokemon from './pokemon';
import likes from './likes';
import search from './search';

export default createStore({
  state(){
    return {
      pokemons: [],
      showLoading: false,
      pokemonsPerPage: 8,
      pokemonsFrom: 0,
      imgURL: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/",
      gifURL: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/"
    }
  },

  getters: {
    pokePerPage(state){
      return state.pokemonsPerPage;
    },
    pokeFrom(state){
      return state.pokemonsFrom;
    },
    pokemons(state){
      return state.pokemons;
    },
    loading(state){
      return state.showLoading;
    }
  },

  mutations: {
    switchLoader(state, boolean){
      state.showLoading = boolean;
    }, 
    changePage(state){
      state.pokemonsFrom += 8;
    },
    setPokemons(state, results){
      let modifiedArray = results.map((item) => {

        let id = item.url.split('/').find((item) => parseInt(item));

        let validName = item.name[0].toUpperCase() + item.name.slice(1).toLowerCase();

        return { name: item.name, validName, id, picture: state.imgURL + id + '.png'}
      });
      
      state.pokemons = state.pokemons.concat(modifiedArray);
    },
  },

  actions: {
    async loadPokemons({ commit, getters }){
      try {
        commit('switchLoader', true)
        
        let { pokePerPage, pokeFrom } = getters;
        
        let { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/`, 
        { params: { limit: pokePerPage , offset: pokeFrom }});
        
        commit('setPokemons', data.results);  
      } 
      catch(err) {
        console.log(err)
      } 
      finally {
        commit('switchLoader', false)
      }
    },

    nextRequest({ commit, dispatch }){
      commit('changePage');
      dispatch('loadPokemons');
    },
  },

  modules: { pokemon, likes, search }
})