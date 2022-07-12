<template>

      <poke-header @search="filterPokemons"></poke-header>

      <poke-list :pokemons="pokemons" :img-url="imgURL" @next-req="nextRequest"></poke-list>
      
      <poke-footer></poke-footer>
      
</template>

<script>
import axios from 'axios';

import PokeList from './components/PokeList.vue'
import PokeHeader from './components/PokeHeader.vue'
import PokeFooter from './components/PokeFooter.vue'



export default {
  name: 'App',
  data(){
    return {
      imgURL: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/",
      pokemons: [],
      // pokemonsCopyArray: [],
      pokemonsPerPage: 9,
      pokemonsFrom: 0,
    
    }
  },  

  methods:{
    async loadPokemons(){
      let { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${this.pokemonsPerPage}&&offset=${this.pokemonsFrom}`);
      console.log(data.results)
      this.pokemons = this.pokemons.concat(data.results);
      // this.pokemonsCopyArray = this.pokemons.concat(data.results);
    },
    nextRequest(from, count){
      this.pokemonsFrom += from;
      this.pokemonsPerPage += count;
      this.loadPokemons();
    },
    // filterPokemons(value){
    //   this.pokemons = this.pokemons.filter(item => item.name.startsWith(value))
    //   if(!value) this.pokemons = this.pokemonsCopyArray;
    // }
  },

  mounted(){
    this.loadPokemons();
  },

  components: { PokeHeader, PokeList, PokeFooter }
}
</script>

<style>

</style>
