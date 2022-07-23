<template>
  <transition>
  <div class="scroll-top" v-show="showArrow" @click="scrollTop"></div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['showArrow'])
  },

  methods: {
    scrollTop(){
      window.scrollTo({
      top: 0,
      behavior: 'smooth'
      });
    },
  }
}
</script>

<style>

</style>