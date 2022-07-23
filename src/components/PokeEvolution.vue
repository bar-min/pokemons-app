<template>
  <div class="pokemon__evolution evolution">
    <h2 class="evolution__title">Evolution forms</h2>
    <div class="evolution__wrapper">
      <div 
      v-for="form in evolution"
      :key="form" 
      class="evolution__picture"
      :class="$route.params.pokeName === form.name ? 'evolution__active' : ''">

        <h3 class="evolution__name">{{ validName(form.name) }}</h3>

        <router-link :to="{name: 'Pokemon', params: { pokeName: form.name }}">
        <img :src="form.picture" class="evolution__img" alt="evolution-form">
        </router-link>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['evolution', 'validName']
}
</script>

<style>

</style>