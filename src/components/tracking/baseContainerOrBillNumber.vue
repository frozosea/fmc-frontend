<template>
  <div class="container g-3" v-if="!isLoading">
    <div class="row g-0">

      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <button :class="isOnTrack ? `accordion` : `accordion back-accordion`" @click="onClick" ref="button"
                :disabled="isLoading" :id="this.n">
          <div class="container g-3">
            <div class="row g-0">
              <container-picture :is-on-track="isOnTrack" :is-container="isContainer"/>

              <container-title :is-found="isFound"
                               :is-container="isContainer"
                               :tracking-response="trackingResponse"
                               :number="number"
                               :is-loading="isLoading"
              />

              <estimated-time-of-arrival :is-found="isFound" :tracking-response="trackingResponse" v-if="!isLoading"
                   :is-container="isContainer"/>

              <binaculars-picture :is-found="isFound"
                                  v-if="!isLoading"
                                  :number="n"
                                  :schedule-tracking-object="scheduleTrackingInfo"
                                  @showModal="showModal"
                                  :disabled="!this.$store.getters[`user/getIsAuth`]"
                                  :show-grey="!this.$store.getters[`user/getIsAuth`]"

              />

              <CustomCheckBox class-name="col-xl-1 col-lg-1 col-md-12 col-sm-12 col-xs-12"
                              :change-func="selectCheckBox" v-if="!isLoading"/>

            </div>
          </div>
        </button>

        <div :class="isOnTrack ? `panel` : `panel back-accordion`">
          <schedule-tracking-info-in-bill-or-container :scheduleTrackingInfo="scheduleTrackingInfo"
                                                       v-if="isOnTrack"/>
          <div class="container g-0">
            <div class="row g-0">

              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="container-font">
                  <span class="bold grey-color">{{ $t("tracking.containerOrBillInfo.cargoInfoName") }}</span>
                  <span class="grey-color"><p></p>
                                     </span></div>
              </div>

            </div>
          </div>
          <tracking-events-list :tracking-response="trackingResponse"
                                v-if="isFound && trackingResponse.infoAboutMoving.length"/>

        </div>
      </div>

    </div>

  </div>

</template>

<script>


import ContainerPicture from "@/components/tracking/containerPicture";
import ContainerTitle from "@/components/tracking/containerTitle";
import estimatedTimeOfArrival from "@/components/tracking/eta";
import BinacularsPicture from "@/components/tracking/binacularsPicture";
import CustomCheckBox from "@/UI/customCheckBox";
import scheduleTrackingInfoInBillOrContainer from "@/components/tracking/scheduleTrackingInfoInBillOrContainer";
import TrackingEventsList from "@/components/tracking/trackingEventsList";


export default {
  name: "baseContainerOrBillNumber",
  components: {
    TrackingEventsList,
    CustomCheckBox,
    BinacularsPicture,
    estimatedTimeOfArrival,
    ContainerTitle,
    ContainerPicture,
    scheduleTrackingInfoInBillOrContainer
  },
  mounted() {
    this.n = this.number
  },
  data() {
    return {
      isSelectCheckBox: false,
      isFound: true,
      n: ""
    }
  },
  props: {
    isLoading: Boolean,
    trackingResponse: Object,
    number: String,
    isContainer: Boolean,
    isOnTrack: Boolean,
    scheduleTrackingInfo: {
      type: Object,
      required: false
    },
  },
  methods: {
    selectCheckBox() {
      this.isSelectCheckBox = !this.isSelectCheckBox
      this.$emit('selectCheckBox', this.isSelectCheckBox)
    },
    onClick() {
      let panel = this.$refs.button.nextElementSibling;
      this.$refs.button.classList.toggle("act-long");
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    },
    showModal(e) {
      this.$emit(`showModal`, e)
    }
  }
}
</script>

<style>
@import "@/assets/style.css";
</style>