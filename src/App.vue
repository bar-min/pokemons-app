<template>

  <poke-header></poke-header>
          
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"> 
          <template v-slot:scroll>
            <poke-scroll></poke-scroll>  
          </template>
        </component>
      </keep-alive>
    </router-view> 
          
  <poke-footer></poke-footer>
      
</template>

<script>
import PokeHeader from './components/PokeHeader.vue'
import PokeFooter from './components/PokeFooter.vue'
import PokeScroll from './components/PokeScroll.vue'

import { mapActions } from 'vuex'

export default {
  name: 'App',

  methods: {
    ...mapActions(['setScroll'])
  },

  mounted(){
    this.setScroll();
  },

  components: { PokeHeader, PokeFooter, PokeScroll }
}
</script>

<style>

</style>
