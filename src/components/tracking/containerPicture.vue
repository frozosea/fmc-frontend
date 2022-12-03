<template>
  <div class="col-xl-1 col-lg-1 col-md-12 col-sm-12 col-xs-12">
    <div class="container-icon">
      <img v-if="isContainer && isOnTrack" src="@/assets/images/container.png" class="img-hover">
      <img v-if="isContainer && !isOnTrack" src="@/assets/images/container-grey.png" class="img-hover">
      <img v-if="!isContainer && isOnTrack" src="@/assets/images/bill.png" class="img-hover">
      <img v-if="!isContainer && !isOnTrack" src="@/assets/images/bill-grey.png" class="img-hover">
    </div>
  </div>
</template>

<script>
export default {
  name: "containerPicture",
  props: {
    isOnTrack: Boolean,
    isContainer: Boolean
  }
}
</script>

<style scoped>
@import "@/assets/style.css";
</style>