<template>
  <div class="col-xl-1 col-lg-1 col-md-12 col-sm-12 col-xs-12">
    <div class="container-tracking" v-if="isFound">
      <a href=""><img src="@/assets/images/binoculars.svg" class="svg-binoculars img-hover"></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "binacularsPicture",
  props:{
    isFound: Boolean
  }
}
</script>

<style scoped>
@import "@/assets/style.css";
</style>