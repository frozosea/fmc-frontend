<template>
  <div class="col-xl-5 col-lg-4 col-md-12 col-sm-12 col-xs-12">
    <div class="container-local" v-if="isFound">
      <img src="@/assets/images/location.svg" class="svg-location"> Latest move:
      {{
        this.trackingResponse.infoAboutMoving[this.trackingResponse.infoAboutMoving.length - 1].location.toUpperCase()
      }}
    </div>
    <div class="container-local" style="color: red" v-if="!isFound">
      Data not found
    </div>
  </div>
</template>

<script>
export default {
  name: "trackingLatestMove",
  props: {
    isFound: Boolean,
    trackingResponse: Object
  }
}
</script>

<style scoped>
 @import "@/assets/style.css";
</style>