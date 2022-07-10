<template>

      <poke-header></poke-header>
      
      <poke-list></poke-list>
      
      <poke-footer></poke-footer>
      
</template>

<script>
import PokeList from './components/PokeList.vue'
import PokeHeader from './components/PokeHeader.vue'
import PokeFooter from './components/PokeFooter.vue'


export default {
  name: 'App',
  data(){
    return {}
  }, 

  methods: {},

  components: { PokeHeader, PokeList, PokeFooter }
}
</script>

<style>

</style>
