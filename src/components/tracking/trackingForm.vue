<template>
  <form class="container g-3 search" @submit.prevent="submitForm">
    <div class="row g-3">

      <div class="col-xl-4 col-lg-6 col-md-4 col-sm-12 col-xs-12">
        <input type="text" class="input-css-grey" id="recipient-name" placeholder="Enter Bill number"
               @input="handleInput">
      </div>

      <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12">
        <select class="select-css-grey" @change="changeTrackingSignature">
          <option value="container">Container</option>
          <option value="bill number">Bill number</option>
        </select>
      </div>

      <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12">
        <select class="select-css-grey">
          <option v-bind:key="line" value="line.toUpperCase()" v-for="line in scac">{{ line }}</option>
        </select>
      </div>

      <div class="col-xl-2 col-lg-3 col-md-4 col-sm-12 col-xs-12">
        <button type="submit" class="button-menu">
          <img src="@/assets/images/magnifying.svg" class="svg-magnifying pad-search-img"> Search
        </button>
      </div>

    </div>
  </form>
</template>

<script>

export default {
  name: "trackingForm",
  components: {},
  data() {
    return {
      isContainer: true,
      number: "",
      isValid: true
    }
  },
  props: {
    scac: Array,
  },
  methods: {
    submitForm() {
      //TODO tracking form request sender
    },
    handleInput(e) {
      const value = e.target.value
      this.number = value.trim();
      console.log(this.number)
    },
    changeTrackingSignature(e){
      this.isContainer = e.target.value === `container`;
      this.$emit('changeTrackingType', this.isContainer);
    }
  }
}
</script>

<style>
@import "@/assets/style.css";
</style>