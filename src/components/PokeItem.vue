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
      pictureURL: '',
      gifURL: '',
      abilities: [],
      abilityEffect: {},
      pokemonTypes: []
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
      let urlPicFromData = other['official-artwork']['front_default'];
      this.pictureURL = this.transformURL(urlPicFromData, id);
      
      // Get url gif from data API and transform him
      let urlGifFromData = versions['generation-v']['black-white'].animated['front_default'];
      this.gifURL = this.transformURL(urlGifFromData, id, '.gif')

      this.weight = weight;
      this.height = height;
      this.abilities = abilities;
      this.pokemonTypes = types.map(item => {
        return { name: item.type.name }
      })
    },

    transformURL(url, id, format = '.png'){
      let validURL = url.split('/').filter(item => !parseInt(item)).join('/');
      return validURL + '/' + id + format
    },

    async loadAbilDescription(url){
      // Get description ability from data api
      let { data: { effect_entries: effect } } = await axios.get(url);
      
      let currentEffect = effect.find((item) => item.language.name === 'en')
      
      this.abilityEffect = { name: currentEffect['short_effect'], active: true }
    }
  },
  
  watch:{
    $route(to){
      if(to.path === `/pokemons/${this.$route.params.pokeName}`) { 
        this.loadPokemon(this.$route.params.pokeName)
        this.abilityEffect.active = false; 
      }
    }
  },

  mounted(){
    this.loadPokemon()
  },

  components: { AbilityModal }

}
</script>

<style>

</style>