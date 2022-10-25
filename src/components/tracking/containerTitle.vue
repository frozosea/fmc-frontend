<template>
  <div class="col-xl-3 col-lg-4 col-md-12 col-sm-12 col-xs-12">
    <div class="container-title" v-if="isFound && !isLoading && !isInAccount">
      {{
        isContainer ? `${this.trackingResponse.number}/${this.trackingResponse.containerSize}` : `${this.trackingResponse.number}/ETA: ${this.trackingResponse.eta}`
      }}
    </div>
    <div class="container-title" v-if="!isFound && !isLoading">
      {{ this.number.toUpperCase() }}
    </div>
    <div class="container-title" v-if="isLoading"> {{ this.number.toUpperCase() }}</div>
    <div class="container-title" v-if="isInAccount"> {{ this.number.toUpperCase() }}</div>

  </div>
</template>

<script>
export default {
  name: "containerTitle",
  props: {
    isFound: Boolean,
    isContainer: Boolean,
    isLoading: Boolean,
    number: String,
    trackingResponse: Object,
    isInAccount: Boolean
  }
}
</script>

<style scoped>
@import "@/assets/style.css";

</style>