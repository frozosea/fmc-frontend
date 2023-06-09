<template>
  <div class="col-xl-2 col-lg-3 col-md-12 col-sm-12 col-xs-12">
    <div class="container-font">
      <span class="bold">{{ $t(`tracking.containerOrBillInfo.scheduleTracking.subject`) }}</span> {{ this.subject }}<p>
      <span class="bold">{{ $t(`tracking.containerOrBillInfo.scheduleTracking.time`) }}</span> {{ this.time }}
    </p></div>
  </div>
</template>

<script>
export default {
  name: "TimeAndSubjectInTracking",
  props: {
    subject: String,
    time: String
  }
}
</script>

<style scoped>

</style>