<template>
  <main class="intro">
    <transition name="loader">
      <poke-loader v-if="loading"></poke-loader> 
    </transition>
    
    <div class="full-wrapper">
      <transition-group tag="div" class="intro__cards" name="list">  
        <div class="intro__card"
        v-for="pokemon in pokemons" 
        :key="pokemon.id"> 
        
        <h3 class="intro__title">{{ pokemon.validName }} </h3>
        <img @click="likePokemon(pokemon)" class="intro__pokeball" src="../assets/images/pokeball.svg" alt="pokeball">

        <router-link :to="{name: 'Pokemon', params: { pokeName: pokemon.name }}">
        <div class="intro__picture">
          <img :src='pokemon.picture' alt="pokemon">
        </div>
        </router-link>
        
        </div>
     </transition-group>

      <div class="intro__show-more">
        <button class="intro__show-btn" @click="nextRequest">Show more</button>
      </div>
    </div>

    <slot name="scroll"></slot>
    
  </main>

</template>

<script>
import PokeLoader from './PokeLoader.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['pokemons', 'loading'])
  },

  methods:{    
    ...mapActions(['loadPokemons', 'nextRequest', 'likePokemon', 'loadAllPokemons'])
  },

  mounted(){
    this.loadPokemons();
    this.loadAllPokemons();
  },

  components: { PokeLoader }
}
</script>

<style>

</style>