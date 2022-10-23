<template>
  <long-dotted-line/>
  <TrackingForm
      :isContainer="isContainer"
      @changeTrackingType="isContainer = $event"
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
        :numberList="numbers" @changeNumbers="deleteNumberFromListAddOnTrackList($event)"
        @close="addTrackingVisible=false"/>
  </CustomModal>
  <SpinnerLoader
      active="isLoading"
      text=""
      v-if="isLoading"
  />

  <div v-if="!isLoading && !hasContainers" class="not_found_numbers">Number(s) not found!</div>
  <base-container-or-bill-number is-found="true" tracking-response="trackingResult" isContainer="true"
                                 is-on-track="false"
                                 @selectCheckBox="changeNumToSelectedList(trackingResult.number,$event)"
                                 :is-loading="isLoading" v-if="hasContainers"/>
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
    AddOnTrackForm, BaseContainerOrBillNumber, ShortDottedLine, LongDottedLine, TrackingForm,SpinnerLoader
  },
  data() {
    return {
      isContainer: true,
      isLoading: false,
      isFound: true,
      hasContainers: true,
      trackingResult: {
        "number": "string",
        "containerSize": "string",
        "infoAboutMoving": [
          {
            "location": "string",
            "operation_name": "string",
            "time": 0,
            "vessel": "string"
          }
        ],
        "scac": "string"
      },
      addTrackingVisible: false,
      numbers: [`MRKU6782621`, `MRKU6782612`, `MRKU6782613`, `MRKU6782614`, `MRKU6782615`, `MRKU6782616`, `MRKU6782617`, `MRKU6782618`]
    }
  },
  methods: {
    trackByNumber() {

    },
    changeNumToSelectedList(number, value) {
      console.log(number, value)
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
    }
  }
}
</script>

<style>
@import "@/assets/style.css";


</style>