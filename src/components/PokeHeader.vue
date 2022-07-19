<template>
  <header class="header">
    <div class="header__wrapper">
      <div class="header__blocks">
        <div class="header__search">
          <input 
          v-model="inputValue" 
          @keyup.enter="searchPokemon(inputValue)" 
          @keyup.esc="clearInput" 
          ref="searchInput"
          @blur="inputValue ? $event.target.focus() : $event.target.blur()"
          type="text" class="header__input" placeholder="Search">

          <button class="header__clear-btn" @click="searchPokemon(inputValue)">Search</button>

          <button class="header__clear-btn" @click="clearInput">Clear</button>
        </div>

        <nav class="header__nav nav">
          <router-link to="/pokemons" class="nav__link nav__list">Pokemons</router-link>
          <router-link to="/my-likes" class="nav__link nav__liked-list">My likes</router-link>
        </nav>

        <div class="header__logo logo">
          <router-link to="/" class="logo__link">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/52.svg" alt="poke-logo" class="logo__pic">
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data(){
    return {
      inputValue: '',
    }
  },
  methods: {
    clearInput(){
      this.inputValue = '';
      this.searchPokemon();
    },

    ...mapActions(['searchPokemon'])
  },
}
</script>

<style>

</style>