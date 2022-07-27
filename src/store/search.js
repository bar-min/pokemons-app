import axios from 'axios';

export default {
  state(){
    return {
      allPokemons: JSON.parse(localStorage.getItem('all')) || [],
      searchedPokemons: JSON.parse(localStorage.getItem('searched')) || [],
    }
  },

  getters: {
    allPokemons(state){
      return state.allPokemons;
    },
    searchedPokemons(state){
      return state.searchedPokemons;
    }
  },

  mutations: {
    setAllPokemons(state, results){
      state.allPokemons = results;
    },
    setSearchedPokemons(state, { results, url }){
      let modifiedArray = results.map((item) => {

        let id = item.url.split('/').find((item) => parseInt(item));

        let validName = item.name[0].toUpperCase() + item.name.slice(1).toLowerCase();

        return { name: item.name, validName, id, picture: url + id + '.png'}
      });

      state.searchedPokemons = modifiedArray;
      
      localStorage.setItem('searched', JSON.stringify(state.searchedPokemons));
    }
  },

  actions: {
    async loadAllPokemons({ commit, getters }){
      let { allPokemons } = getters;

      if(!allPokemons.length){
        let { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/`, 
        { params: { limit: 500 , offset: 0 }});

        commit('setAllPokemons', data.results);

        localStorage.setItem('all', JSON.stringify(data.results));
      } 
    },

    filterPokemons({ commit, getters, rootState }, inputValue ){
      let { allPokemons } = getters;

      let searched = allPokemons.filter(item => item.name.startsWith(inputValue));

      commit('setSearchedPokemons', { results: searched, url: rootState.imgURL });
    },
  }
}