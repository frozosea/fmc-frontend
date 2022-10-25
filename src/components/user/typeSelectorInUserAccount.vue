<template>
  <div class="container g-3 actions-pad">
    <div class="row g-0">

      <div class="col-xl-8 col-lg-6 col-md-6 col-sm-12 col-xs-12 number-two">
        <button class="title-1-s pad-search borderless_button" @click="changeType(`actual`)">Actual</button>
        <button class="title-1-s pad-search borderless_button" @click="changeType(`archive`)">Archive</button>
      </div>

      <div class="col-xl-2 col-lg-3 col-md-3 col-sm-12 col-xs-12 order-md-1 order-2">
        <div class="action">
          <img src="@/assets/images/plus.svg" width="14">
          <button class="title-7 borderless_button" @click="setAddTrackingVisible">&nbsp;Add tracking</button>
          <img src="@/assets/images/delete.svg" width="14" class="pad-action">
          <button class="title-6 borderless_button" @click="deleteNumbers">&nbsp;Remove</button>
        </div>
      </div>

      <div class="col-xl-2 col-lg-3 col-md-3 col-sm-12 col-xs-12 order-md-2 order-1">
        <div class="select-colum">
          <select class="select-css-small" @change="changeNumberType($event.target.value)">
            <option value="containers">Containers</option>
            <option value="bills">Bill Numbers</option>
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
    setAddTrackingVisible(){
      this.$emit("addOnTrackVisible", true)
    }
  }
}
</script>

<style scoped>

</style>