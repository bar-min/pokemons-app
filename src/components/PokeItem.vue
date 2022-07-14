<template>
  <div class="pokemon">
    <div class="pokemon__wrapper">
      <div class="pokemon__blocks">
        <div class="pokemon__description">
          <!-- Start pokemon__description -->
          <!-- Name and Gif -->
          <div class="pokemon__intro">
            <h1 class="pokemon__title pokemon-block">
               {{ validName(pokeName) }}
           </h1> 
           <div class="pokemon__gif pokemon-block">
            <img :src="gifURL" alt="">
           </div>
          </div>
          <!-- Sizes -->
          <div class="pokemon__stats">
            <h2>Stats</h2>
            <div class="pokemon-block">Weight: {{ validSize(weight, 'kg') }}</div>
            <div class="pokemon-block">Height: {{ validSize(height, 'm') }}</div>
          </div>
          <!-- Abilities and Modal -->
          <div class="pokemon__abilities abilities ">
            <h2 class="abilities__title">Abilities</h2>
            <div class="abilities__wrapper">
              <div class="abilities__item pokemon-block" v-for="item in abilities" :key="item">
              {{ validName(item.ability.name) }} 
              
              <button @click='loadAbilDescription(item.ability.url)' class="abilities__description">More</button>
              </div>

              <ability-modal 
              v-if="abilityEffect.active"
              :effect="abilityEffect" 
              @close="abilityEffect.active = false">
              </ability-modal>
            </div>
          </div>
          <!-- Types pokemons -->
          <div class="pokemon__types types">
            <h2 class="types__title">Types</h2>
            <div 
            class="types__item pokemon-block" 
            :class="'types__' + item.name"
            v-for="item in pokemonTypes" 
            :key="item"> {{ validName(item.name) }}</div>
          </div>
          <!-- End pokemon__description -->
        </div>

        <div class="pokemon__picture">
          <img :src='pictureURL' alt="" class="pokemon__pic">
        </div>
      </div>
      <div class="pokemon__evolution evolution">
        <h2 class="evolution__title">Evolution forms</h2>
        <div class="evolution__wrapper">
          <div 
          v-for="form in evolutionForms" 
          :key="form" 
          class="evolution__picture">
            <h3 class="evolution__name">{{ validName(form.name) }}</h3>
            <router-link :to="{name: 'Pokemon', params: { pokeName: form.name }}">
              <img :src="form.evolPicURL" class="evolution__img" alt="evolution-form">
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios';

import AbilityModal from './AbilityModal.vue';

export default {
  data(){
    return {
      weight: 10,
      height: 10,
      urlPicFromDataApi: '',
      urlGifFromDataApi: '',
      pictureURL: '',
      gifURL: '',
      abilities: [],
      abilityEffect: {},
      pokemonTypes: [],
      evolutionForms: [],
      evolFormsPic: []
    }
  },

  props: ['pokeName'],

  computed: {
    validName(){
    return (name) => name[0].toUpperCase() + name.slice(1).toLowerCase()
    },
    validSize(){
      return (value, units) => value / 10 + units
    },
  },

  methods: {
    async loadPokemon(pokemoName = this.pokeName){
      let { 
        data: { 
          weight, height, id, abilities, types, 
            sprites: { other, versions } } } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemoName}`)
  
      // Get url picture from data API and transform him
      this.urlPicFromDataApi = other['official-artwork']['front_default'];
      this.pictureURL = this.transformURL(this.urlPicFromDataApi, id);

      // Get url gif from data API and transform him
      this.urlGifFromDataApi = versions['generation-v']['black-white'].animated['front_default'];
      this.gifURL = this.transformURL(this.urlGifFromDataApi, id, '.gif')

      this.weight = weight;
      this.height = height;
      this.abilities = abilities;
      this.pokemonTypes = types.map(item => {
        return { name: item.type.name }
      })
    },

    async loadAbilDescription(url){
      // Get description ability from data api
      let { data: { effect_entries: effect } } = await axios.get(url);
      
      let currentEffect = effect.find((item) => item.language.name === 'en')
      
      this.abilityEffect = { name: currentEffect['short_effect'], active: true }
    },

    async loadEvolutionForms(pokemoName = this.pokeName){
      let { data : { evolution_chain : evolution }} = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemoName}`);
      let response  = await axios.get(evolution.url)
      let chain = response.data.chain;
      // let id = response.data.id;

      // Transform chain to get evolution forms array
      this.getNamesEvolForms(chain);

      this.evolutionForms = this.evolutionForms.map(item => {
        return { 
          name: item.name, 
          idx: this.getIdFromURL(item.url), 
          evolPicURL: this.transformURL(this.urlPicFromDataApi, this.getIdFromURL(item.url)) }
      })
    },
    
    // Support methods
    transformURL(url, id, format = '.png'){
      let validURL = url.split('/').filter(item => !parseInt(item)).join('/');
      return validURL + '/' + id + format
    },

    getIdFromURL(url){
      return url.split('/').find(item => parseInt(item));
    },

    getNamesEvolForms(options){
      if(!Array.isArray(options)) {
        this.evolutionForms.push( options.species )
          if(options['evolves_to'].length) this.getNamesEvolForms(options['evolves_to'])
          return;
      } else {
        let [obj] = options;
        this.getNamesEvolForms(obj)
      }
    }
  },
  
  watch:{
    $route(to){
      if(to.path === `/pokemons/${this.$route.params.pokeName}`) { 
        this.loadPokemon(this.$route.params.pokeName);
        this.evolutionForms = [];
        this.loadEvolutionForms(this.$route.params.pokeName);
        this.abilityEffect.active = false; 
      }
    }
  },

  mounted(){
    this.loadPokemon()
    this.loadEvolutionForms()
  },

  components: { AbilityModal }

}
</script>

<style>

</style>