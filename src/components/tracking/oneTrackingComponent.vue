<template>
  <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12">
    <div class="container-font path-font article">
      <span class=""><strong class="bold">{{ name }}</strong>: {{ variable }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "oneTrackingComponent",
  props:{
    name: String,
    variable: String
  }
}
</script>

<style scoped>

</style>