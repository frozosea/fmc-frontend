<template>
  <long-dotted-line/>
  <TrackingForm
      :isContainer="isContainer"
      @submitTrack="trackByNumber"
      @changeNumber="number = $event"
      @changeScac="scac = $event"
      :container-scac="containerScac"
      :bill-scac="billScac"
      :defaultTrackingSignature="`bill`"
  />
  <short-dotted-line/>
  <div class="container g-3 actions-pad">
    <div class="row g-0">
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 number">
        {{ $t(`tracking.containerOrBillInfo.trackingPageBodyTitle`) }}
      </div>
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div class="action">
          <img src="@/assets/images/plus.svg" width="14" alt="add cargo to schedule tracking">
          <button class="title-7 borderless_button" @click="setAddTrackingVisible"
                  :disabled="!this.$store.getters[`user/getIsAuth`]">
            &nbsp;{{ $t(`tracking.scheduleTracking.addOnTrackForm.scheduleTrackingName`) }}
          </button>
          <img src="@/assets/images/delete.svg" width="14" class="pad-action" alt="remove cargo to schedule tracking">
          <button class="title-6 borderless_button" @click="deleteNumbersFromList" :disabled="!isFound">
            &nbsp;{{ $t(`tracking.scheduleTracking.addOnTrackForm.removeButtonText`) }}
          </button>
        </div>
      </div>
    </div>

  </div>
  <CustomModal v-model:show="addTrackingVisible">
    <add-on-track-form
        :number-list="this.number !== `` ? [this.number] : []"
        :schedule-tracking-object="scheduleTrackingInfo"
        :is-container="isContainer"
        @changeNumbers="deleteNumberFromListAddOnTrackList($event)"
        @show="addTrackingVisible = $event"
        @deleteFromTrack="deleteFromTracking($event)"
        @submitForm="addOnTrack"
    />
  </CustomModal>
  <div class="spinner" v-if="isLoading">
    <SpinnerLoader
        :active="isLoading"
        class="spinner"
    />
  </div>
  <div v-if="!isLoading && !hasContainers" class="not_found_numbers">{{ $t(`errors.numbersNotFound`) }}</div>
  <base-container-or-bill-number :is-found="isFound"
                                 :tracking-response="trackingResult"
                                 :isContainer="isContainer"
                                 :is-on-track="isOnTrack"
                                 @selectCheckBox="changeNumToSelectedList(trackNumber,$event)"
                                 @showModal="addTrackingVisible = $event"
                                 :is-loading="isLoading"
                                 v-if="hasContainers"
                                 :schedule-tracking-info="scheduleTrackingInfo"
                                 :number="trackNumber"
                                 id="result"
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
      trackNumber: "",
      hasContainers: false,
      number: "",
      isOnTrack: false,
      trackingResult: null,
      addTrackingVisible: false,
      numbers: [],
      scheduleTrackingInfo: {},
      scac: "AUTO",
      containerScac: [],
      billScac: []
    }
  },
  async mounted() {
    if (this.$store.getters[`user/getIsAuth`]) {
      await this.$store.commit(`refreshToken`)
    }
    this.containerScac = await this.$store.state.api.trackingApi.getContainerLines()
    this.billScac = await this.$store.state.api.trackingApi.getBillLines()
  },
  computed: {},
  methods: {
    async trackByNumber(isContainer, num, scac) {
      this.isContainer = isContainer
      this.number = num
      this.trackNumber = this.number
      this.scac = scac
      this.isLoading = true
      const api = this.$store.state.api
      try {
        if (this.isContainer) {
          this.isLoading = true
          let result = {}
          for (let i = 0; i < 3; i++) {
            try {
              result = await api.trackingApi.trackContainer(this.number.toUpperCase(), this.scac === "" ? "AUTO" : this.scac)
            } catch (e) {
              continue
            }
          }
          for (let item of result.infoAboutMoving) {
            item.time = this.$store.getters["utils/getTime"].humanizeTime(item.time)
          }
          this.number = result.container
          this.trackingResult = result
          this.isFound = true
          this.hasContainers = true
          this.isLoading = false

        } else {
          this.isLoading = true
          let result = {}
          for (let i = 0; i < 3; i++) {
            try {
              result = await api.trackingApi.trackByBillNumber(this.trackNumber.toUpperCase(), this.scac === "" ? "AUTO" : this.scac)
            } catch (e) {
              continue
            }
          }
          for (let item of result.infoAboutMoving) {
            item.time = this.$store.getters["utils/getTime"].humanizeTime(item.time)
          }
          if (!result.etaFinalDelivery) {
            result.etaFinalDelivery = null
          } else {
            result.etaFinalDelivery = this.$store.getters["utils/getTime"].humanizeTime(result.etaFinalDelivery)
          }
          this.trackNumber = result.billNo
          this.trackingResult = result
          this.isFound = true
          this.hasContainers = true
          this.isLoading = false
        }
      } catch (e) {
        this.isFound = false
        this.isLoading = false
        this.hasContainers = false
      }
      try {
        if (this.$store.getters["user/getIsAuth"]) {
          const scheduleTrackingResult = await api.scheduleTrackingApi.getInfoAboutTracking(this.number, this.$store.getters[`user/getAuthToken`])
          this.scheduleTrackingInfo = scheduleTrackingResult.scheduleTrackingInfo
          this.isOnTrack = true
          console.log(this.scheduleTrackingInfo, this.isOnTrack)
        } else {
          console.log("not is auth")
          throw new Error();
        }
      } catch (e) {
        console.log(e)
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
      this.$notification.info(this.$t(`tracking.scheduleTracking.removeFromTracking.successMessage`))
    },
    deleteNumbersFromList(num) {
      if (this.$store.getters[`user/getIsAuth`] && this.isFound && this.hasContainers) {
        const index = this.numbers.indexOf(num)
        if (index > -1) {
          this.numbers.splice(index, 1)
        }
        this.isFound = false;
        this.hasContainers = false
        this.$notification.info(this.$t(`tracking.scheduleTracking.removeFromTracking.successMessage`))
      }
    },
    async deleteFromTracking() {
      this.isOnTrack = false
      this.scheduleTrackingInfo = null
      this.addTrackingVisible = false
      const api = this.$store.state.api
      const token = this.$store.getters["user/getAuthToken"]
      this.isContainer
          ? await api.scheduleTrackingApi.deleteContainerFromTracking([this.number], token)
          : await api.scheduleTrackingApi.deleteBillNosFromTracking([this.number], token)

      document.getElementById("result").click()
    },
    async addOnTrack(e) {
      if (this.isContainer) {
        try {
          let panel = document.getElementById("result").nextElementSibling;
          document.getElementById("result").classList.remove("act-long");
          panel.style.maxHeight = null;
        } catch (e) {
          //
        }
        try {
          this.isOnTrack = true
          this.scheduleTrackingInfo = e
        } catch (e) {
          this.isOnTrack = false
          this.scheduleTrackingInfo = {}
        }

      } else {
        try {
          let panel = document.getElementById("result").nextElementSibling;
          document.getElementById("result").classList.remove("act-long");
          panel.style.maxHeight = null;
        } catch (e) {
          //
        }
        try {
          this.isOnTrack = true
          this.scheduleTrackingInfo = e
        } catch (e) {
          this.isOnTrack = false
          this.scheduleTrackingInfo = {}
        }
      }
    }
  }
}
</script>

<style>
@import "@/assets/style.css";

</style>