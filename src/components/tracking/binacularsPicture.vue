<template>
  <div class="col-xl-1 col-lg-1 col-md-12 col-sm-12 col-xs-12">
    <div class="container-tracking" v-if="isFound">
      <button class="borderless_button" @click="handleModal">
        <img src="@/assets/images/binoculars.svg" class="svg-binoculars img-hover"></button>
    </div>
  </div>
<!--  <CustomModal v-model:show="showAddOnTrackModal">-->
<!--    <add-on-track-form :scheduleTrackingObject="scheduleTrackingObject" :numberList="[number]"-->
<!--                       :show="showAddOnTrackModal"-->
<!--                       @close="showAddOnTrackModal = $event"-->
<!--                       :submit="submitAddOnTrackChange"-->
<!--    />-->
<!--  </CustomModal>-->
</template>

<script>
// import CustomModal from "@/UI/CustomModal";
// import AddOnTrackForm from "@/components/tracking/addOnTrackForm";

export default {
  name: "binacularsPicture",
  data() {
    return {
      showAddOnTrackModal: false,
    }
  },
  methods: {
    // submitAddOnTrackChange(){
    //   //TODO submitAddOnTrackChange
    // },
    handleModal(){
      this.$emit(`showModal`, !this.showAddOnTrackModal)
      // this.showAddOnTrackModal = !this.showAddOnTrackModal
    }
  },
  mounted() {
    //TODO create get info about tracking with
  },
  props: {
    isFound: Boolean,
    isOnTrack: Boolean,
    scheduleTrackingObject: {
      type: Object,
      required: false
    },
    number: String
  }
}
</script>

<style scoped>
@import "@/assets/style.css";
</style>