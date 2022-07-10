<template>
  <main class="intro">
     <div class="intro__cards">
        <div class="intro__card"
        v-for="pokemon in pokemons" 
        :key="pokemon"
        > {{ pokemon.name }}
        </div>
    </div>
  </main>
</template>

<script>
export default {
  data(){
    return {
      pokemons: [1, 2, 3]
    }
  }
}
</script>

<style>

</style>