<template>
  <main class="intro">
    <poke-loader v-if="loading"></poke-loader>
    <div class="full-wrapper">
      <div class="intro__cards">  
        <div class="intro__card"
        v-for="pokemon in pokemons" 
        :key="pokemon.id"> 
        
        <h3 class="intro__title">{{ pokemon.validName }} </h3>
        <img class="intro__pokeball" src="../assets/images/pokeball.svg" alt="pokeball">

        <router-link :to="{name: 'Pokemon', params: { pokeName: pokemon.name }}">
        <div class="intro__picture">
          <img :src='pokemon.picture' alt="pokemon">
        </div>
        </router-link>
        
      </div>
     </div>

      <div class="intro__show-more">
        <button class="intro__show-btn" @click="nextRequest">Show more</button>
      </div>
    </div>
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
    ...mapActions(['loadPokemons', 'nextRequest'])
    },
  
  mounted(){
    this.loadPokemons();
  },

  components: { PokeLoader }
}
</script>

<style>

</style>