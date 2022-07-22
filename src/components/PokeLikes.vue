<template>
  <section class="likes">
    <div class="full-wrapper">
      <poke-default v-if="!favorites.length"> Please, like some pokemon! </poke-default>

      <div class="likes__cards" v-else>  
        <div class="likes__card"
        v-for="pokemon in favorites" 
        :key="pokemon.id"> 
        
        <h3 class="likes__title">{{ pokemon.validName }} </h3>
        <img @click="removePokemon(pokemon.id)" class="likes__remove" src="../assets/images/remove.svg" alt="remove">

        <router-link :to="{name: 'Pokemon', params: { pokeName: pokemon.name }}">
        <div class="likes__picture">
          <img :src='pokemon.picture' alt="pokemon">
        </div>
        </router-link>
        
      </div>
    </div>
  </div>
  </section>
</template>

<script>
import PokeDefault from './PokeDefault.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['likes', 'favorites'])
  },

  methods: {
    ...mapActions(['savePokemons', 'renderPokemons', 'removePokemon'])
  },

  watch:{
    $route(to){
      if(to.path == '/my-likes'){
        this.savePokemons();
        this.renderPokemons();
      } 
    }
  },

  mounted(){
    this.savePokemons();
    this.renderPokemons();
  },

  components: { PokeDefault }
}
</script>

<style>

</style>