<template>
  <div class="modalDialog" @click.stop="hideModal" v-if="show">
    <div class="popup" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: "CustomModal",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideModal() {
      this.$emit("update:show", false)
    }
  }
}
</script>
<style>
@import '@/assets/style.css';
</style>