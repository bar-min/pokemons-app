<template>
   <div class="modal"> 
    <div class="modal__block">
        <p class="modal__text"> {{ effect.name }} </p>
        <button class="modal__btn" @click="$emit('close')">Close</button> 
    </div>
  </div>
</template>

<script>
export default {
  props: ['effect'],
  emits: ['close']
}
</script>

<style>

</style>