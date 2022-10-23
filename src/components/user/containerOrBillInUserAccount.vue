<template>
  <div class="container g-3">
    <div class="row g-0">

      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <button :class="isOnTrack ? `accordion` : `accordion back-accordion`" @click="onClick" ref="button">
          <div class="container g-3">
            <div class="row g-0">
              <container-picture :is-on-track="isOnTrack" :is-container="isContainer"/>
              <container-title
                  :is-container="isContainer"
                  :number="number"
                  :is-in-account="true"
              />
              <binaculars-picture/>

              <CustomCheckBox class-name="col-xl-1 col-lg-1 col-md-12 col-sm-12 col-xs-12"
                              :change-func="selectCheckBox"/>

            </div>
          </div>
        </button>

        <div :class="isOnTrack ? `panel` : `panel back-accordion`">
          <schedule-tracking-info-in-bill-or-container :scheduleTrackingInfo="scheduleTrackingInfo"
                                                       @showTrackingModal="addTrackingVisible=$event"/>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import ContainerPicture from "@/components/tracking/containerPicture";
import ContainerTitle from "@/components/tracking/containerTitle";
import BinacularsPicture from "@/components/tracking/binacularsPicture";
import CustomCheckBox from "@/UI/customCheckBox";
import scheduleTrackingInfoInBillOrContainer from "@/components/tracking/scheduleTrackingInfoInBillOrContainer";
// import TrackingEventsList from "@/components/tracking/trackingEventsList";
// import SpinnerLoader from "@/UI/loading";

export default {
  name: "containerOrBillInUserAccount",
  components: {
    // TrackingEventsList,
    CustomCheckBox,
    BinacularsPicture,
    // SpinnerLoader,
    ContainerTitle, ContainerPicture, scheduleTrackingInfoInBillOrContainer
  },
  props: {
    isOnTrack: Boolean,
    scheduleTrackingInfo: Object,
    number: String,
    isContainer: Boolean
    // selectCheckBox: Function
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

<style scoped>

</style>