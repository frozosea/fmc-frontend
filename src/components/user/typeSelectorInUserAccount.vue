<template>
  <div class="container g-3 actions-pad">
    <div class="row g-0">

      <div class="col-xl-8 col-lg-6 col-md-6 col-sm-12 col-xs-12 number-two">
        <button class="title-1-s pad-search borderless_button" @click="changeType(`actual`)">{{ $t(`user.searchNumber.actualNumbersTitle`) }}</button>
      </div>

      <div class="col-xl-2 col-lg-3 col-md-3 col-sm-12 col-xs-12 order-md-1 order-2">
        <div class="action container flex-test-wrap">
          <button class="title-7 borderless_button flex-test" @click="setAddTrackingVisible">
            <img src="@/assets/images/plus.svg" width="14" alt="plus">
            <span>&nbsp;{{ $t(`tracking.scheduleTracking.addOnTrackForm.scheduleTrackingName`) }}</span>
          </button>
          <button class="title-6 borderless_button flex-test" @click="deleteNumbers">
            <img src="@/assets/images/delete.svg" width="14" class="pad-action">
            <span>&nbsp;{{$t(`tracking.scheduleTracking.addOnTrackForm.removeButtonText`) }}</span>
          </button>
        </div>
      </div>

      <div class="col-xl-2 col-lg-3 col-md-3 col-sm-12 col-xs-12 order-md-2 order-1">
        <div class="select-colum">
          <select class="select-css-small" @change="changeNumberType($event.target.value)">
            <option value="containers">{{ $t(`user.account.containersName`) }}</option>
            <option value="bills">{{ $t(`user.account.billNumbersName`) }}</option>
          </select>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "typeSelectorInUserAccount",
  methods: {
    changeType(type) {
      this.$emit("updateType", type)
    },
    changeNumberType(type) {
      this.$emit("updateNumberType", type)
    },
    deleteNumbers() {
      this.$emit("deleteNumbers")
    },
    setAddTrackingVisible() {
      this.$emit("addOnTrackVisible", true)
    },
  }
}
</script>

<style scoped>

</style>