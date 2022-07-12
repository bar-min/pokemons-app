<template>
  <main class="intro">
    <div class="intro__wrapper">
      <div class="intro__cards">
        <div class="intro__card"
        v-for="(pokemon, index) in pokemons" 
        :key="pokemon"
        > 
        <h3 class="intro__title">{{ pokemon.name[0].toUpperCase() + pokemon.name.slice(1) }} </h3>

        <div class="intro__picture">
          <img :src='imgUrl + (index + 1) +".png"' alt="pokemon">
        </div>

        <button class="intro__details">Details</button>
      </div>
     </div>

      <div class="intro__show-more">
        <button class="intro__show-btn" @click="$emit('next-req', 9, 9)">Show more</button>
      </div>

    </div>
     
  </main>
</template>

<script>
export default {
  data(){
    return {}
  },
  props: ['pokemons', 'img-url'],
  emits: ['next-req']
}
</script>

<style>

</style>