<template>
  <main class="intro">
    <poke-loader :loading="loading"></poke-loader> 
    
    <div class="full-wrapper">
      <transition-group tag="div" class="intro__cards" name="list">  
        <div class="intro__card"
        v-for="pokemon in pokemons" 
        :key="pokemon.id"
        :class="{'pokemon-liked': pokemon.liked }"> 
        
        <h3 class="intro__title">{{ pokemon.validName }} </h3>

        <poke-ball :pokemon="pokemon"></poke-ball>

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
import PokeLoader from '../components/PokeLoader.vue';
import PokeBall from '../components/PokeBall.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['pokemons', 'loading'])
  },

  methods:{    
    ...mapActions(['loadPokemons', 'nextRequest'])
  },

  mounted(){
    this.loadPokemons();
  },

  components: { PokeLoader, PokeBall }
}
</script>

<style>

</style>