<template>
  <div class="col-xl-3 col-lg-4 col-md-12 col-sm-12 col-xs-12">
    <div class="container-title" v-if="isFound && !isLoading && !isInAccount">
      {{
        isContainer ? `${this.number.toUpperCase()}/${this.trackingResponse.containerSize}` : `${this.number.toUpperCase()}/ETA: ${this.trackingResponse.eta}`
      }}
    </div>
    <div class="container-title" v-if="!isFound && !isLoading">
      {{ number.toUpperCase() }}
    </div>
    <div class="container-title" v-if="isLoading"> {{ number.toUpperCase() }}</div>
    <div class="container-title" v-if="isInAccount && !isLoading && isFound"> {{ number.toUpperCase() }}</div>

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
    isInAccount: Boolean,
  }
}
</script>

<style scoped>
@import "@/assets/style.css";

</style>