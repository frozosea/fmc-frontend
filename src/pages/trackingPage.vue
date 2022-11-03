<template>
  <long-dotted-line/>
  <TrackingForm
      :isContainer="isContainer"
      @changeTrackingType="isContainer = $event"
      @submitTrack="trackByNumber"
      @changeNumber="number = $event"
      @changeScac="scac = $event"
      :scac="this.$store.state.api.trackingApi.getAllLines()"
  />
  <short-dotted-line/>
  <div class="container g-3 actions-pad">
    <div class="row g-0">
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 number">
        {{ isContainer ? `Track by container` : `Track by bill number` }}
      </div>
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div class="action">
          <img src="@/assets/images/plus.svg" width="14">
          <button class="title-7 borderless_button" @click="setAddTrackingVisible">&nbsp;Add tracking</button>
          <img src="@/assets/images/delete.svg" width="14" class="pad-action">
          <button class="title-6 borderless_button" @click="deleteNumbersFromList">&nbsp;Remove</button>
        </div>
      </div>
    </div>

  </div>
  <CustomModal v-model:show="addTrackingVisible">
    <add-on-track-form
        :number-list="[this.number]"
        :schedule-tracking-object="scheduleTrackingInfo"
        @submitForm="addOnTrack"
        @changeNumbers="deleteNumberFromListAddOnTrackList($event)"
        @show="addTrackingVisible = $event"
        @deleteFromTrack="deleteFromTracking($event)"
    />
  </CustomModal>

  <SpinnerLoader
      :active="isLoading"
  />

  <div v-if="!isLoading && !hasContainers" class="not_found_numbers">Number(s) not found!</div>
  <base-container-or-bill-number :is-found="isFound"
                                 :tracking-response="trackingResult"
                                 :isContainer="isContainer"
                                 :is-on-track="isOnTrack"
                                 @selectCheckBox="changeNumToSelectedList(number,$event)"
                                 @showModal="addTrackingVisible = $event"
                                 :is-loading="isLoading"
                                 v-if="hasContainers"
                                 :schedule-tracking-info="scheduleTrackingInfo"
                                 :number="trackingResult.number"
  />
</template>

<script>
import TrackingForm from "@/components/tracking/trackingForm";
import LongDottedLine from "@/UI/longDottedLine";
import ShortDottedLine from "@/UI/shortDottedLine";
import SpinnerLoader from "@/UI/loading";
import BaseContainerOrBillNumber from "@/components/tracking/baseContainerOrBillNumber";
import AddOnTrackForm from "@/components/tracking/addOnTrackForm";
import CustomModal from "@/UI/CustomModal";

export default {
  name: "trackingPage",
  components: {
    CustomModal,
    AddOnTrackForm, BaseContainerOrBillNumber, ShortDottedLine, LongDottedLine, TrackingForm, SpinnerLoader
  },
  data() {
    return {
      isContainer: true,
      isLoading: false,
      isFound: false,
      hasContainers: false,
      number: "",
      isOnTrack: false,
      trackingResult: null,
      addTrackingVisible: false,
      numbers: [],
      scheduleTrackingInfo: {},
      scac: ""
    }
  },
  computed: {},
  methods: {
    trackByNumber() {
      this.isLoading = true
      console.log(this.isContainer)
      // console.log(this.isLoading)
      const api = this.$store.state.api
      try {
        if (this.isContainer) {
          this.isLoading = true
          setTimeout(() => {
            const result = api.trackingApi.trackContainer(this.number.toUpperCase(), this.scac)
            this.number = result.number
            this.trackingResult = result
            this.isFound = true
            this.hasContainers = true
            this.isLoading = false
          }, 1000)
        } else {
          this.isLoading = true
          setTimeout(() => {
            const result = api.trackingApi.trackByBillNumber(this.number, this.scac)
            this.number = result.number
            this.trackingResult = result
            this.isFound = true
            this.hasContainers = true
            this.isLoading = false
          }, 1000)
        }
      } catch (e) {
        this.isFound = false
      }
      try {
        if (this.$store.state.user.isAuth) {
          const scheduleTrackingResult = api.scheduleTrackingApi.getInfoAboutTracking(this.number)
          this.scheduleTrackingInfo = scheduleTrackingResult
          this.isOnTrack = true
        } else {
          throw new Error();
        }
      } catch (e) {
        this.isOnTrack = false
      }
    },
    changeNumToSelectedList(number, value) {
      const index = this.numbers.indexOf(number)
      if (value) {
        if (index === -1) {
          this.numbers.push(number)
        }
      } else {
        this.numbers.splice(index, 1)
      }
    },
    setAddTrackingVisible() {
      this.addTrackingVisible = !this.addTrackingVisible;
    },
    deleteNumberFromListAddOnTrackList(num) {
      const index = this.numbers.indexOf(num)
      if (index > -1) {
        this.numbers.splice(index, 1)
      }
    },
    deleteNumbersFromList(num) {
      const index = this.numbers.indexOf(num)
      if (index > -1) {
        this.numbers.splice(index, 1)
      }
      this.isFound = false;
      this.hasContainers = false
    },
    deleteFromTracking() {
      this.isOnTrack = false
      this.scheduleTrackingInfo = null
      this.addTrackingVisible = false
    },
    addOnTrack() {
      const api = this.$store.api.state.api
      try {
        if (this.isContainer) {
          api.scheduleTrackingApi.addContainersOnTracking([this.number])
        } else {
          api.scheduleTrackingApi.addBillsOnTrack([this.number])
        }
        this.isOnTrack = true
        this.scheduleTrackingInfo = api.scheduleTrackingApi.getInfoAboutTracking(this.number)
      } catch (e) {
        this.isOnTrack = false
        this.scheduleTrackingInfo = {}
      }
      //TODO add on track in tracking page modal
    }
  }
}
</script>

<style>
@import "@/assets/style.css";


</style>