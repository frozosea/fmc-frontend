<template>
  <form class="container g-3 search" @submit.prevent="submitForm">
    <div class="row g-3">

      <div class="col-xl-4 col-lg-6 col-md-4 col-sm-12 col-xs-12">
        <input type="text" class="input-css-grey" id="recipient-name"
               :placeholder="$t(`tracking.trackingForm.inputNumberPlaceholder`)"
               @input="changeNumber">
      </div>

      <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12">
        <select class="select-css-grey" @change="changeTrackingSignature">
          <option value="container">{{ $t(`tracking.trackingForm.containerName`) }}</option>
          <option value="bill number">{{ $t(`tracking.trackingForm.billName`) }}</option>
        </select>
      </div>

      <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12" v-if="isContainer">
        <select class="select-css-grey" @change="changeScac">
          <option value="AUTO" selected>{{ $t(`tracking.trackingForm.autoScacName`) }}</option>
          <option :key="line" :value="line.scac.toUpperCase()" v-for="line in containerScac">{{
              line.fullname
            }}
          </option>
        </select>
      </div>

      <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12" v-if="!isContainer">
        <select class="select-css-grey" @change="changeScac" v-if="!isContainer">
          <option value="AUTO" selected>{{ $t(`tracking.trackingForm.autoScacName`) }}</option>
          <option :key="line" :value="line.scac.toUpperCase()" v-for="line in billScac">{{
              line.fullname
            }}
          </option>
        </select>

        <select class="select-css-grey" @change="changeScac" v-if="isContainer">
          <option value="AUTO" selected>{{ $t(`tracking.trackingForm.autoScacName`) }}</option>
          <option :key="line" :value="line.scac.toUpperCase()" v-for="line in containerScac">{{
              line.fullName
            }}
          </option>
        </select>


      </div>

      <div class="col-xl-2 col-lg-3 col-md-4 col-sm-12 col-xs-12">
        <button type="submit" class="button-menu">
          <img src="@/assets/images/magnifying.svg" class="svg-magnifying pad-search-img" alt="track cargo">
          {{ $t(`tracking.trackingForm.searchButtonText`) }}
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
      isValid: true,
      selectedScac: ""
    }
  },
  props: {
    billScac: Array,
    containerScac: Array,
    defaultTrackingSignature: String
  },
  methods: {
    submitForm() {
      this.$emit(`submitTrack`, this.isContainer, this.number, this.selectedScac)
    },
    changeTrackingSignature(e) {
      this.isContainer = e.target.value === `container`;
      this.$emit('changeTrackingType', this.isContainer);
    },
    changeNumber(ev) {
      this.number = ev.target.value.trim()
      this.$emit(`changeNumber`, this.number)
    },
    changeScac(e) {
      this.selectedScac = e.target.value.trim()
      this.$emit(`changeScac`, this.selectedScac)
    },
  }
}
</script>

<style>
@import "@/assets/style.css";
</style>