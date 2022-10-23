<template>
  <div class="container g-3">
    <div class="row g-0">

      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <button :class="isOnTrack ? `accordion` : `accordion back-accordion`" @click="onClick" ref="button"
                :disabled="isLoading">
          <div class="container g-3">
            <div class="row g-0">
              <container-picture :is-on-track="isOnTrack"/>

              <container-title :is-found="isFound"
                               :is-container="isContainer"
                               :tracking-response="trackingResponse"
                               :number="number"
                               :is-loading="isLoading"
              />
              <SpinnerLoader
                  active="isLoading"
                  text=""
                  v-if="isLoading"
              />
              <tracking-latest-move :is-found="isFound" :tracking-response="trackingResponse" v-if="!isLoading"/>

              <binaculars-picture :is-found="isFound" v-if="!isLoading"/>

              <CustomCheckBox class-name="col-xl-1 col-lg-1 col-md-12 col-sm-12 col-xs-12"
                              :change-func="selectCheckBox" v-if="!isLoading"/>

            </div>
          </div>
        </button>

        <div :class="isOnTrack ? `panel` : `panel back-accordion`" v-if="isFound">

          <schedule-tracking-info-in-bill-or-container :scheduleTrackingInfo="scheduleTrackingInfo"/>
          <tracking-events-list :tracking-response="trackingResponse" v-if="isFound"/>

        </div>
      </div>

    </div>

  </div>

</template>

<script>


import ContainerPicture from "@/components/tracking/containerPicture";
import ContainerTitle from "@/components/tracking/containerTitle";
import TrackingLatestMove from "@/components/tracking/trackingLatestMove";
import BinacularsPicture from "@/components/tracking/binacularsPicture";
import CustomCheckBox from "@/UI/customCheckBox";
import scheduleTrackingInfoInBillOrContainer from "@/components/tracking/scheduleTrackingInfoInBillOrContainer";
import TrackingEventsList from "@/components/tracking/trackingEventsList";

import SpinnerLoader from "@/UI/loading";


export default {
  name: "baseContainerOrBillNumber",
  components: {
    TrackingEventsList,
    CustomCheckBox,
    BinacularsPicture,
    TrackingLatestMove,
    SpinnerLoader,
    ContainerTitle, ContainerPicture, scheduleTrackingInfoInBillOrContainer
  },
  data() {
    return {
      number: "MRKU6788432",
      trackingResponse: {
        number: "MRKU6788432",
        containerSize: "20HQ",
        infoAboutMoving: [{
          "time": "2022-20-20",
          "operationName": "test opeartion",
          "location": "nakhodka",
          "vessel": ""
        },
          {
            "time": "2022-20-20",
            "operationName": "test opeartion",
            "location": "nakhodka",
            "vessel": ""
          },
          {
            "time": "2022-20-20",
            "operationName": "test opeartion",
            "location": "nakhodka",
            "vessel": ""
          }]
      },
      isSelectCheckBox: false,
      isFound: true,
      scheduleTrackingInfo: {
        time: "15:00",
        emails: [`3dteapot@gmail.com`, `subvenire@mail.com`, `logistic@ya.ru`],
        subject: "боксы вмтп"
      },
      isContainer: true,
      isOnTrack: true,
    }
  },
  props: {
    isLoading: Boolean,
    // trackingResponse: Object,
    // number: String,
    // isContainer: Boolean,
    // isOnTrack: Boolean,
    // scheduleTrackingInfo: {
    //   type: Object,
    //   required: false
    // },
    // isFound: Boolean
    billScac: {
      type: Array,
      required: false
    },
    containerScac: {
      type: Array,
      required: false
    }
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
    }
  }
}
</script>

<style>
@import "@/assets/style.css";
</style>