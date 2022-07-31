<template>
  <header class="header">
    <div class="header__wrapper">
      <div class="header__blocks">
        <div class="header__search">
          <input 
          v-model.trim="inputValue" 
          @keyup.enter="searchPokemon(inputValue.toLowerCase())" 
          @keyup.esc="clearInput" 
          @blur="inputValue ? $event.target.focus() : $event.target.blur()"
          type="text" class="header__input" placeholder="Pokemon...">
          
          <button class="header__btn" @click="searchPokemon(inputValue)">Search</button>

          <button class="header__btn" @click="clearInput">Clear</button>
        </div>

        <nav class="header__nav nav" ref="nav">
          <router-link to="/pokemons" class="nav__link nav__list">Pokemons</router-link>
          <router-link to="/my-likes" class="nav__link nav__liked-list">My likes</router-link>
        </nav>

        <div class="header__logo logo" ref="logo">
          <router-link to="/" class="logo__link">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/52.svg" alt="poke-logo" class="logo__pic">
          </router-link>
        </div>

        <div class="header__burger" @click="showBurger">
          <span></span>
        </div>

        <div class="header__close" @click="showBurger" ref="close">
          <span>close</span>
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
    },

    searchPokemon(value){
      if(!value) return;

      this.$router.push({ path: '/search', query: { text: value } });

      this.filterPokemons(value);

      this.clearInput();
    },

    ...mapActions('search', ['filterPokemons']),

    showBurger(){
      this.$refs.nav.classList.toggle('active');
      this.$refs.logo.classList.toggle('active');
      this.$refs.close.classList.toggle('active');
    }
  },
}
</script>

<style>

</style>