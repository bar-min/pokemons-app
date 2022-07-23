<template>
  <transition name="loader">
    <div class="loader" v-if="loading">
      <div class="loader__item"></div>
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