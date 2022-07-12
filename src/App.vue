<template>

  <poke-header></poke-header>
          
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view> 
          
  <poke-footer></poke-footer>
      
</template>

<script>
import PokeHeader from './components/PokeHeader.vue'
import PokeFooter from './components/PokeFooter.vue'



export default {
  name: 'App',
  data(){
    return {}
  },
  components: { PokeHeader, PokeFooter }
}
</script>

<style>

</style>
