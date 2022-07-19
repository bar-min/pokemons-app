import axios from 'axios';

export default {
  state(){
    return {
      defaultPokemons: [],
      allPokemons: [],
      // default pokemons create in store.js (in loadPokemons request)
    }
  },

  getters: {
    allPokemons(state){
      return state.allPokemons;
    },
    defaultPokemons(state){
      return state.defaultPokemons;
    },
  },

  mutations: {
    setAllPokemons(state, results){
      state.allPokemons = results;
    },
    setDefaultPokemons(state, results){
      state.defaultPokemons = state.defaultPokemons.concat(results);
    }
  },

  actions: {
    async loadAllPokemons({ commit }){
      let { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/`, 
      { params: { limit: 500 , offset: 0 }});

      commit('setAllPokemons', data.results)
    },

    searchPokemon({ commit, getters }, inputValue ){
      let { allPokemons, defaultPokemons } = getters;

      let searchedPokemons = allPokemons.filter(item => item.name.startsWith(inputValue));

      commit('setPokemons', { data: searchedPokemons, concat: false })
      
      if(!inputValue) commit('setPokemons', { data: defaultPokemons, concat: false });
    }
  }
}