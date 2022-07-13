<template>
  <div class="pokemon">
    <div class="pokemon__wrapper">
      <div class="pokemon__blocks">
        <div class="pokemon__description">
          <div class="pokemon__intro">
            <h1 class="pokemon__title pokemon__block">
               {{ validName(pokeName) }}
           </h1> 
           <div class="pokemon__block pokemon__gif">
            <img :src="gifURL" alt="">
           </div>
          </div>

          <div class="pokemon__stats">
            <h2>Stats</h2>
            <div class="pokemon__block">Weight: {{ validSize(weight, 'kg') }}</div>
            <div class="pokemon__block">Height: {{ validSize(height, 'm') }}</div>
            <div class="pokemon__block">Abilities</div>
          </div>
          
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

export default {
  data(){
    return {
      weight: 10,
      height: 10,
      pictureURL: '',
      gifURL: '',
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
    async loadPokemon(){
      let { 
        data: { 
          weight, height, id, 
            sprites: { other, versions } } } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.pokeName}`)
  
      // Get url picture from data API and transform him
      let urlPicFromData = other['official-artwork']['front_default'];
      this.pictureURL = this.transformURL(urlPicFromData, id);
      
      // Get url gif from data API and transform him
      let urlGifFromData = versions['generation-v']['black-white'].animated['front_default'];
      this.gifURL = this.transformURL(urlGifFromData, id, '.gif')

      this.weight = weight;
      this.height = height;
     
    },

    transformURL(url, id, format = '.png'){
      let validURL = url.split('/').filter(item => !parseInt(item)).join('/');
      return validURL + '/' + id + format
    }
  },

  mounted(){
    this.loadPokemon()
  }

}
</script>

<style>

</style>