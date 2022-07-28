<template>
   <div class="pokeball" @click="likePokemon(pokemon)" v-if="!pokemon.liked"></div>
   <div class="pokeball pokeball_active" @click="removePokemon({ pokemon, render: false })" v-else></div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: ['pokemon'],

  methods: {
    ...mapActions(['likePokemon', 'removePokemon'])
  }
}
</script>

<style>

</style>