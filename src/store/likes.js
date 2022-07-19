export default {
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
    likePokemon({ commit, getters }, payload ){
      let { likes } = getters;

      if(!likes.length) commit('setLikes', payload);

      let similar = false;

      likes.forEach(item => {
        if(item.id === payload.id) similar = true;
      })

      if(!similar) commit('setLikes', payload);
    },

    savePokemons({ getters }){
      let { likes } = getters;
      
      localStorage.setItem('favorites', JSON.stringify(likes));
    },

    renderPokemons({ commit }){
      commit('setFavorites', JSON.parse(localStorage.getItem('favorites')));
    },

    removePokemon({ commit, dispatch }, pokemon){
      commit('delLikes', pokemon);

      dispatch('savePokemons');

      dispatch('renderPokemons');
    }
  }
}