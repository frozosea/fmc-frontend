<template>
  <div :class="className">
    <div class="container-tracking">
      <label class="checkbox style-c">
        <input type="checkbox" @change="changeFunc">
        <div class="checkbox__checkmark"></div>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "customCheckBox",
  props: {
    className: String,
    changeFunc: Function
  }
}
</script>

<style scoped>
@import "@/assets/style.css";
</style>