<template>
  <div class="col-xl-1 col-lg-1 col-md-12 col-sm-12 col-xs-12">
    <div class="container-tracking" v-if="isFound">
      <button class="borderless_button" @click="handleModal(true)" :disabled="disabled">
        <img src="@/assets/images/binoculars.svg" class="svg-binoculars img-hover" v-if="isOnTrack"/>
        <img src="@/assets/images/binoculars-grey.svg" class="svg-binoculars" v-if="!isOnTrack"/>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: "binacularsPicture",
  methods: {
    handleModal(v) {
      this.$emit(`showModal`, v)
    }
  },
  props: {
    isFound: Boolean,
    isOnTrack: Boolean,
    scheduleTrackingObject: {
      type: Object,
      required: false
    },
    number: String,
    disabled: Boolean
  }
}
</script>

<style scoped>
@import "@/assets/style.css";
</style>