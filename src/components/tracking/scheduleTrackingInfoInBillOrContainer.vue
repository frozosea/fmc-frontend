<template>
  <div class="container g-0">
    <div class="row g-0">
      <time-and-subject-in-tracking :time="scheduleTrackingInfo.time" :subject="scheduleTrackingInfo.subject"/>
      <emails-in-tracking :emails="scheduleTrackingInfo.emails"/>
      <gear-picture :on-click="onGearPicClick"/>
    </div>
  </div>
</template>

<script>
import timeAndSubjectInTracking from "@/components/tracking/timeAndSubjectInTracking";
import emailsInTracking from "@/components/tracking/emailsInTracking";
import gearPicture from "@/components/tracking/gearPicture";

export default {
  name: "scheduleTrackingInfoInBillOrContainer",
  components: {
    timeAndSubjectInTracking,
    emailsInTracking,
    gearPicture
  },
  props: {
    scheduleTrackingInfo: Object,
  },
  methods: {
    onGearPicClick() {
      this.$emit("showTrackingModal", true)
    }
  },
  mounted() {
    console.log(this.scheduleTrackingInfo.scheduleTrackingInfo)
  }
}
</script>

<style scoped>
@import "@/assets/style.css";
</style>