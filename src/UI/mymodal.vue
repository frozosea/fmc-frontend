<template>
  <div v-if="show" class="modalDialog">
    <div class="popup">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "myModal",
  props:{
    show: {
      type: Boolean,
      required: true,
      default: false
    }
  }
}
</script>

<style scoped>
@import "@/assets/style.css";
</style>