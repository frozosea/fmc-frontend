<template>
  <div class="row g-0">
    <one-tracking-component name="Time" :variable="time"/>
    <one-tracking-component name="Operation" :variable="operationName"/>
    <one-tracking-component name="Location" :variable="location"/>
    <one-tracking-component name="Vessel" :variable="vessel"/>
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