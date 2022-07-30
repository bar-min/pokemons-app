import axios from 'axios';

export default {
  namespaced: true,

  state(){
    return {
      name: 'pikachu',
      picture: '',
      gif: '',
      weight: 10,
      height: 10,
      abilities: [],
      abilityEffect: {},
      showAbility: false,
      types: [],
      evolution: [],
      evolutionForms: [],
    }
  },

  getters: {
    name(state){
      return state.name;
    },
    sizes(state){
      return [{ title: 'Weight', unit: state.weight / 10 + 'kg' }, { title: 'Height', unit: state.height / 10 + 'm' }]
    },
    pictureURL(state){
      return state.picture;
    },
    gifURL(state){
      return state.gif;
    },
    abilities(state){
      return state.abilities.map(item => {
        return { name: item.ability.name, url: item.ability.url }
      })
    },
    effect(state){
      return state.abilityEffect;
    },
    types(state){
      return state.types.map(item => {
        return { name: item.type.name }
      })
    },
    evolution(state){
      return state.evolution;
    },
    evolutionForms(state, _, rootState){
      return state.evolutionForms.map(item => {
        return { name: item.name, id: item.id, picture: rootState.imgURL + item.id + '.png'}
      });
    },
    loadingAbility(state){
      return state.showAbility;
    }
  },

  mutations: {
    setPokemonProperties(state, payload){
      state.name = payload.name;
      state.weight = payload.weight;
      state.height = payload.height;
      state.picture = payload.picURL;
      state.gif = payload.gifURL;
      state.abilities = payload.abilities;
      state.types = payload.types;
    },
    setAbilityEffect(state, payload){
      state.abilityEffect = payload;
    },
    setEvolution(state, species){
      state.evolution.push(species);
    },
    setEvolutionForms(state, payload){
      state.evolutionForms = payload;
    },
    clearEvolutionForms(state){
      state.evolutionForms = [];
      state.evolution = [];
    }, 
    switchLoaderAbility(state, boolean){
      state.showAbility = boolean;
    }
  },

  actions: {
    async loadPokemon({ commit, dispatch, rootState }, pokeName){
      try {
        commit('switchLoader', true, { root: true })
 
        let { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);

        commit('setPokemonProperties', {
          name: data.name,
          weight: data.weight,
          height: data.height, 
          picURL: rootState.imgURL + data.id + '.png',
          gifURL: rootState.gifURL + data.id + '.gif',
          abilities: data.abilities,
          types: data.types
        })

        await dispatch('clearEvolution');

        await dispatch('loadEvolution', pokeName);
      }
      catch(err) {
       console.log(err)
      }
      finally {
        commit('switchLoader', false, { root: true })
      }
     },

    async loadAbility({ commit }, url){
      try{
        commit('switchLoaderAbility', true);

        let { data: { effect_entries: effect } } = await axios.get(url);
      
        let currentEffect = effect.find((item) => item.language.name === 'en');
        
        commit('setAbilityEffect', { name: currentEffect['short_effect'], active: true });
      } 
      catch(err){
        console.log(err)
      }
      finally{
        commit('switchLoaderAbility', false)
      }
      
    },

    async loadEvolution({ dispatch }, url){
      let { data : { evolution_chain : evolution }} = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${url}`);

      let response  = await axios.get(evolution.url)

      let chain = response.data.chain;

      await dispatch('transformEvolution', chain);
      
      await dispatch('loadEvolutionForms');
    },

    async loadEvolutionForms({ commit, getters }){
      let { evolution } = getters;
      
      let species = [];

      for(let item of evolution){
       let response = await axios.get(item.url)
       species.push(response.data)
      }

      commit('setEvolutionForms', species);
    },

    clearEvolution({ commit }){
      commit('clearEvolutionForms');
    },

    transformEvolution({ commit, dispatch }, options){
      if(!Array.isArray(options)) {

        commit('setEvolution', options.species);

        if(options['evolves_to'].length) dispatch('transformEvolution', options['evolves_to'])

        return; 

      } else {
        let [obj] = options;
        
        dispatch('transformEvolution', obj);
      } 
    },
  }
}