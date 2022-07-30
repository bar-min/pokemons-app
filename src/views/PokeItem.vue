<template>
  <div class="pokemon" >
    <poke-loader :loading="loading"></poke-loader> 
    
    <div class="pokemon__wrapper">
      <div class="pokemon__body">
        <div class="pokemon__description" ref="info">
          <div class="pokemon__intro">
            <h1 class="pokemon__name pokemon-block">
               {{ validName(name) }}
           </h1> 
           
           <div class="pokemon__gif">
            <img :src="gifURL" alt="">
           </div>
          </div>

          <div class="pokemon__stats pokemon-blocks">
            <h2>Stats</h2>
            <div class="pokemon-block" v-for="size in sizes" :key="size"> {{ size.title }}: {{ size.unit }} </div>
          </div>

          <div class="pokemon__abilities abilities pokemon-blocks">

            <h2 class="abilities__title">Abilities</h2>

            <div class="abilities__wrapper pokemon-blocks">
              <div class="abilities__item pokemon-block" v-for="ability in abilities" :key="ability">
                <h3 class="abilities__name"> {{ validName(ability.name) }} </h3>
                
                <button @click='loadAbility(ability.url)' class="abilities__description">More</button>
              </div>

              <poke-loader :loading="loadingAbility" style="position: absolute;"></poke-loader> 
              
              <ability-modal 
              v-if="effect.active"
              :effect="effect" 
              @close="effect.active = false">
              </ability-modal>
            </div>
          </div>

          <div class="pokemon__types types pokemon-blocks">
            <h2 class="types__title">Types</h2>
            <div 
            class="types__item pokemon-block" 
            :class="'types__' + item.name"
            v-for="item in types" 
            :key="item"> 
            {{ validName(item.name) }} 
            </div>
          </div>

        </div>

        <div class="pokemon__picture" ref="picture">
          <img :src='pictureURL' alt="" class="pokemon__pic">
        </div>
      </div>
      
      <poke-evolution :evolution="evolutionForms" :validName="validName"></poke-evolution>

    </div>
  </div>
  
</template>

<script>
import PokeLoader from '../components/PokeLoader.vue';
import PokeEvolution from '@/components/PokeEvolution.vue';
import AbilityModal from '../components/AbilityModal.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  props: ['pokeName'],

  computed: {
    validName(){
    return (name) => name[0].toUpperCase() + name.slice(1).toLowerCase()
    },

    ...mapGetters(['loading']),

    ...mapGetters('pokemon', ['name', 'sizes', 'pictureURL', 'gifURL', 'abilities', 'types', 'effect', 'evolutionForms', 'loadingAbility'])
  },

  methods: {
    renderPokemon(name = this.pokeName){
      this.loadPokemon(name);
      this.effect.active = false; 
    },

    ...mapActions('pokemon', ['loadPokemon', 'loadAbility']),
  },

  beforeRouteEnter(to, from, next){
    next(vm => { 
      vm.renderPokemon(to.params.pokeName);

      if(document.documentElement.clientWidth < 950){
      vm.$refs.info.prepend(vm.$refs.picture);
      } 
    })
  },

  beforeRouteUpdate(to){
    this.renderPokemon(to.params.pokeName);
  },

  components: { AbilityModal, PokeLoader, PokeEvolution }
}
</script>

<style>

</style>