<template>
  <main class="intro">
    <div class="intro__wrapper">
      <div class="intro__cards">
        <div class="intro__card"
        v-for="pokemon in pokemons" 
        :key="pokemon"
        > {{ pokemon }}
        </div>
     </div>
    </div>
     
  </main>
</template>

<script>
export default {
  data(){
    return {
      pokemons: ['Pikachu', 'Bulbasaur', 'Raichu', 'Charmander', 'Meow', 'Slowepook', 'Charizard', 'Lava', 'Meow', 'Slowepook', 'Charizard', 'Lava']
    }
  }
}
</script>

<style>

</style>