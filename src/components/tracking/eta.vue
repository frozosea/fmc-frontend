<template>
  <div class="col-xl-5 col-lg-4 col-md-12 col-sm-12 col-xs-12">
    <div class="container-local" v-if="isFound">
      <img src="@/assets/images/location.svg" class="svg-location" v-if="isFound &&!empty">
      {{ $t("tracking.eta.name") }}:
      {{
        this.eta ? this.eta : $t("tracking.eta.notFound")
      }}
      <div v-if="empty"/>

    </div>
    <div class="container-local" style="color: red" v-if="!isFound && !empty">
      {{ $t("tracking.eta.notFound") }}
    </div>
  </div>
</template>

<script>
export default {
  name: "estimatedTimeOfArrival",
  props: {
    isFound: Boolean,
    trackingResponse: Object,
    isContainer: Boolean,
    empty: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    getEtaFromContainerResponse(infoAboutMoving) {
      const eta = []
      for (let item of infoAboutMoving) {
        if (item.operationName === "ETA") {
          eta.push(item.time)
        }
      }
      return eta.pop()
    },
    mountEta(){
      if (!this.empty){
        return this.isContainer ? this.getEtaFromContainerResponse(this.trackingResponse.infoAboutMoving) : this.trackingResponse.etaFinalDelivery
      }
    }
  },
  data() {
    return {
      eta: this.mountEta()
    }
  }
}
</script>

<style scoped>
@import "@/assets/style.css";
</style>
