<template>
  <one-tracking-event :time="event.time"
                      :operationName="event.operationName"
                      :location="event.location"
                      :vessel="event.vessel"
                      :key="event.time" v-for="event in trackingResponse.infoAboutMoving"/>
</template>

<script>
import oneTrackingEvent from "@/components/tracking/oneTrackingEvent";

export default {
  name: "trackingEventsList",
  components: {
    oneTrackingEvent
  },
  props: {
    trackingResponse: Object
  }
}
</script>

<style scoped>

</style>