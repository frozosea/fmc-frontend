<template>
  <CustomModal v-model:show="addTrackingVisible">
    <AddOnTrackForm :schedule-tracking-object="scheduleTrackingInfo"
                    @show="addTrackingVisible = $event"
                    @close="addTrackingVisible = false"
                    :number-list="[number]"
                    @deleteFromTrack="deleteFromTracking($event)"
                    @submitForm="updateScheduleTrackingInfo($event)"
                    :is-container="isContainer"
    />
  </CustomModal>
  <div class="container g-3">
    <div class="row g-0">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" :ref="`b_${this.number}`">
        <button :class="isOnTrack ? `accordion` : `accordion back-accordion`" @click="onClick" ref="button"
                :id="number"
        >
          <div class="container g-3">
            <div class="row g-0">
              <container-picture :is-on-track="isOnTrack" :is-container="isContainer"/>
              <container-title
                  :is-container="isContainer"
                  :number="number"
                  :is-in-account="true"
              />
              <tracking-latest-move :empty="true"/>
              <binaculars-picture :schedule-tracking-object="scheduleTrackingInfo"
                                  :is-on-track="isOnTrack"
                                  :number="number"
                                  :is-found="true"
                                  @showModal="addTrackingVisible = $event"
                                  :disabled="false"/>

              <CustomCheckBox class-name="col-xl-1 col-lg-1 col-md-12 col-sm-12 col-xs-12"
                              :change-func="selectCheckBox"/>

            </div>
          </div>
        </button>

        <div :class="isOnTrack ? `panel` : `panel back-accordion`">
          <schedule-tracking-info-in-bill-or-container v-if="isOnTrack"
                                                       :scheduleTrackingInfo="scheduleTrackingInfo"
                                                       @showTrackingModal="addTrackingVisible = $event"
                                                       :is-on-track="isOnTrack"
          />
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
import trackingLatestMove from "@/components/tracking/trackingLatestMove";
import CustomModal from "@/UI/CustomModal";
import AddOnTrackForm from "@/components/tracking/addOnTrackForm";

export default {
  name: "containerOrBillInUserAccount",
  components: {
    AddOnTrackForm,
    CustomModal,
    // TrackingEventsList,
    CustomCheckBox,
    BinacularsPicture,
    trackingLatestMove,
    // SpinnerLoader,
    ContainerTitle, ContainerPicture, scheduleTrackingInfoInBillOrContainer
  },
  props: {
    isOnTrack: Boolean,
    scheduleTrackingInfo: Object,
    number: String,
    isContainer: Boolean,
    // selectCheckBox: Function
  },
  data() {
    return {
      addTrackingVisible: false
    }
  },
  methods: {
    selectCheckBox() {
      this.isSelectCheckBox = !this.isSelectCheckBox
      this.$emit('selectCheckBox', this.isSelectCheckBox)
    },
    onClick() {
      if (this.isOnTrack) {
        let panel = this.$refs[`b_${this.number}`].firstChild.nextElementSibling;
        this.$refs[`b_${this.number}`].firstChild.classList.toggle("act-long");
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      }
    },
    deleteFromTracking() {
      this.$emit(`removeFromTracking`, this.number)
    },
    updateScheduleTrackingInfo(e) {
      this.$emit(`updateScheduleTrackingInfo`, e)
    }
  },
  mounted() {
    console.log(this.isContainer)
  }
}
</script>

<style scoped>

</style>