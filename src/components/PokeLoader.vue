<template>
  <transition name="loader">
    <div class="loader" v-if="loading">
      <img 
      src="../assets/images/pokeball.svg" 
      class="loader__item">
    </div>
  </transition>
</template>

<script>
export default {
  props: ['loading']
}
</script>

<style>

</style>