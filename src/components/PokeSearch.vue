<template>
  <section class="search">
    <div class="full-wrapper">
      <transition-group name="list" tag="div" class="search__cards" appear>
        <div class="search__card"
        v-for="pokemon in searchedPokemons" 
        :key="pokemon.id"> 
        
          <h3 class="search__title">{{ pokemon.validName }} </h3>
          <img @click="likePokemon(pokemon)" class="search__pokeball" src="../assets/images/pokeball.svg" alt="pokeball">

          <router-link :to="{name: 'Pokemon', params: { pokeName: pokemon.name }}">
          <div class="search__picture">
            <img :src='pokemon.picture' alt="pokemon">
          </div>
          </router-link>
          
        </div>
      </transition-group> 
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['searchedPokemons'])
  },

  methods:{
    ...mapActions(['likePokemon', 'loadAllPokemons'])
  },

  mounted(){
    this.loadAllPokemons();
  }
}
</script>

<style>

</style>