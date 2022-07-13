<template>
  <main class="intro">
    <div class="full-wrapper">
      <div class="intro__cards">
        
        <div class="intro__card"
        v-for="pokemon in pokemons" 
        :key="pokemon"
        > 

        <h3 class="intro__title">{{ validName(pokemon.name) }}</h3>

        <router-link :to="{name: 'Pokemon', params: { pokeName: pokemon.name }}">

        <div class="intro__picture">
          <img :src='validURL(imgURL, pokemon.id)' alt="pokemon">
        </div>

        </router-link>

        <!-- <button class="intro__details">Details</button> -->
      </div>
     </div>

      <div class="intro__show-more">
        <button class="intro__show-btn" @click="nextRequest()">Show more</button>
      </div>

    </div>
     
  </main>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      imgURL: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/",
      pokemons: [],
      pokemonsPerPage: 8,
      pokemonsFrom: 0,
    }
  },

  computed: {
    validName(){
      return (name) => name[0].toUpperCase() + name.slice(1).toLowerCase()
    },
    validURL(){
      return (url, id, format = '.png') => url + id + format
    }, 
  },

  methods:{
      async loadPokemons(){
        let { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${this.pokemonsPerPage}&&offset=${this.pokemonsFrom}`);
      
        let modifiedArray = this.transformArray(data.results);

        this.pokemons = this.pokemons.concat(modifiedArray);
      },

      nextRequest(){
        this.pokemonsFrom += 8;
        
        this.loadPokemons();   
      },

      transformArray(arr){
        // get id from url
          return arr.map((item) => {
          let validId = item.url.split('/').find((item) => parseInt(item))
          return { name: item.name, id: validId}
        })
        
      }
    },

  mounted(){
    this.loadPokemons();
  },
}
</script>

<style>

</style>