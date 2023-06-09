<template>
  <div class="container g-0 path">
    <div class="row g-0">
      <one-tracking-component :name="$t(`tracking.containerOrBillInfo.trackingEvent.time`)" :variable="time"/>
      <one-tracking-component :name="$t(`tracking.containerOrBillInfo.trackingEvent.operationName`)" :variable="operationName"/>
      <one-tracking-component :name="$t(`tracking.containerOrBillInfo.trackingEvent.location`)" :variable="location"/>
      <one-tracking-component :name="$t(`tracking.containerOrBillInfo.trackingEvent.vessel`)" :variable="vessel"/>
    </div>
  </div>

</template>

<script>
import OneTrackingComponent from "@/components/tracking/oneTrackingComponent";

export default {
  name: "OneTrackingEvent",
  components: {OneTrackingComponent},
  props: {
    time: String,
    operationName: String,
    location: String,
    vessel: String
  }
}
</script>

<style scoped>
@import "@/assets/style.css";

</style>