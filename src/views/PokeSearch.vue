<template>
  <section class="search">
    <div class="full-wrapper">
      <poke-default v-if="!searchedPokemons.length">Pokemon not found!</poke-default>

      <transition-group v-else name="list" tag="div" class="search__cards" appear>
        <div class="search__card"
        v-for="pokemon in searchedPokemons" 
        :key="pokemon.id"
        :class="{'pokemon-liked': pokemon.liked }"> 
        
          <h3 class="search__title"> {{ pokemon.validName }} </h3>

          <poke-ball :pokemon="pokemon"></poke-ball>

          <router-link :to="{name: 'Pokemon', params: { pokeName: pokemon.name }}">
          <div class="search__picture">
            <img :src='pokemon.picture' alt="pokemon">
          </div>
          </router-link>
          
        </div>
      </transition-group> 
    </div>

    <slot name="scroll"></slot>

  </section>
</template>

<script>
import PokeDefault from '../components/PokeDefault.vue';
import PokeBall from '../components/PokeBall.vue';

import { mapGetters } from 'vuex';


export default {
  computed: {
    ...mapGetters('search', ['searchedPokemons'])
  },

  components: { PokeDefault, PokeBall }
}
</script>

<style>

</style>