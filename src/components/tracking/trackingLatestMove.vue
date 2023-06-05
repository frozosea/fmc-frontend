<template>
  <div class="col-xl-5 col-lg-4 col-md-12 col-sm-12 col-xs-12">
    <div class="container-local" v-if="isFound">
      <img src="@/assets/images/location.svg" class="svg-location" v-if="isFound &&!empty"> Последняя локация:
      {{
        this.$store.getters["utils/getTime"].convertToTimestamp(this.trackingResponse.infoAboutMoving[this.trackingResponse.infoAboutMoving.length - 1].time)>Date.now()?
        text + ` (Ориентировочно)`: text
      }}
      <div v-if="empty"/>
    </div>
    <div class="container-local" style="color: red" v-if="!isFound && !empty">
      Data not found
    </div>
  </div>
</template>

<script>
export default {
  name: "trackingLatestMove",
  props: {
    isFound: Boolean,
    trackingResponse: Object,
    empty: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      text: this.trackingResponse
          ? this.trackingResponse.infoAboutMoving[this.trackingResponse.infoAboutMoving.length - 1].location.toUpperCase()
          : ``
    }
  },
  mounted() {
    this.$store.getters["utils/getTime"].convertToTimestamp()
    this.text = this.trackingResponse
        ? this.trackingResponse.infoAboutMoving[this.trackingResponse.infoAboutMoving.length - 1].location.toUpperCase()
        : ``
    console.log(this.trackingResponse.infoAboutMoving[this.trackingResponse.infoAboutMoving.length - 1].time)
    console.log(this.$store.getters["utils/getTime"].convertToTimestamp(this.trackingResponse.infoAboutMoving[this.trackingResponse.infoAboutMoving.length - 1].time),Date.now())
    // if  (this.trackingResponse.infoAboutMoving[this.trackingResponse.infoAboutMoving.length - 1].time > Date.now()){
    //   this.text += ` (Ориентировочно)`
    // }
  }
}
</script>

<style scoped>
@import "@/assets/style.css";
</style>