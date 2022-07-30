export default {
  namespaced: true,
  
  state(){
    return {
      likes: JSON.parse(localStorage.getItem('favorites')) || [],
      favorites: [],
    }
  },

  getters: {
    likes(state){
      return state.likes;
    },
    likesIDs(state){
      return state.likes.map(item => item.id)
    },
    favorites(state){
      return state.favorites;
    },
  },

  mutations: {
    setLikes(state, pokemon){
      state.likes.push(pokemon);
    },
    setFavorites(state, pokeFromLS){
      state.favorites = pokeFromLS;
    },
    delLikes(state, id){
      state.likes = state.likes.filter(item => item.id !== id);
    }
  },

  actions: {
    likePokemon({ commit, dispatch, getters }, payload ){
      let { likes } = getters;

      payload.liked = true;

      if(!likes.length) {
        commit('setLikes', payload);
      } else {
        let similarID = likes.findIndex(item => item.id === payload.id);
      
        if(similarID === -1) commit('setLikes', payload);
      }

      dispatch('savePokemons');
    },

    savePokemons({ getters }){
      let { likes } = getters;
      
      localStorage.setItem('favorites', JSON.stringify(likes));
    },

    renderPokemons({ commit }){
      if(localStorage.getItem('favorites')){
        commit('setFavorites', JSON.parse(localStorage.getItem('favorites')));
      }
    },

    removePokemon({ commit, dispatch, rootState }, { pokemon, render }){
      let { pokemons } = rootState;

      let currentPokemon = pokemons.find(item => item.name === pokemon.name);

      if(currentPokemon) currentPokemon.liked = false;

      pokemon.liked = false;

      commit('delLikes', pokemon.id);

      dispatch('savePokemons');

      if(render) dispatch('renderPokemons');
    }
  }
}