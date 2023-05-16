<template>
  <div class="container g-0 path">
    <div class="row g-0">
      <one-tracking-component name="Время" :variable="time"/>
      <one-tracking-component name="Операция" :variable="operationName"/>
      <one-tracking-component name="Локация" :variable="location"/>
      <one-tracking-component name="Судно" :variable="vessel"/>
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