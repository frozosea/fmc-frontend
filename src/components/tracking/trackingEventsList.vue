<template>
  <div class="container g-0 path end-path">
    <div v-for="event in trackingResponse.infoAboutMoving" :key="event.time">
      <one-tracking-event :time="event.time"
                          :operationName="event.operationName" :location="event.location" :vessel="event.vessel"
                          :key="event.time"/>
    </div>
  </div>
</template>

<script>
import oneTrackingEvent from "@/components/tracking/oneTrackingEvent";

export default {
  name: "trackingEventsList",
  components: {
    oneTrackingEvent
  },
  props: {
    trackingResponse: Object}
}
</script>

<style scoped>

</style>