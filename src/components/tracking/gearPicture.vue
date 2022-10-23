<template>
  <div class="col-xl-1 col-lg-1 col-md-12 col-sm-12 col-xs-12">
    <div class="container-action">
      <button class="borderless_button" @click="onClick"><img src="@/assets/images/settings.svg" class="svg-settings img-hover"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "gearPicture",
  props:{
    onClick: Function
  }
}
</script>

<style scoped>

</style>