<template>
  <div class="container g-0">
    <div class="row g-0">
      <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-12">
        <div class="title-8 input-modal-title">{{
            $t("tracking.scheduleTracking.addOnTrackForm.scheduleTrackingName")
          }}
        </div>
      </div>

      <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-12">
        <div class="close-block">
          <button class="close borderless_button" @click="hideByButton">×</button>
        </div>
      </div>

      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div>
          <input type="text" class="input-css-grey input-modal"
                 :placeholder="$t(`tracking.scheduleTracking.addOnTrackForm.emailsPlaceholder`)"
                 @input="handleEmails"
                 :value="emails.join(`,`)"
          >
          <input type="text" class="input-css-grey input-modal"
                 :placeholder="$t(`tracking.scheduleTracking.addOnTrackForm.emailSubject`)"
                 @input="subject = $event.target.value"
                 :value="subject"
          >
          <input type="text" class="input-css-grey input-modal"
                 :placeholder="timePlaceholder"
                 @input="handleTime"
                 :value="time"
                 @keydown.enter="addOnTrack"
          >
        </div>
      </div>
    </div>

    <div class="market-minus col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div class="marker" v-for="item in numberList" :key="item" @click="changeList(item)">{{
          item
        }}&nbsp; × &nbsp;
      </div>
    </div>

  </div>
  <div class="container g-0 area-pad-two">
    <div class="row g-0">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div style="color: red" v-if="showError"> {{ error }}</div>
        <button type="button" class="button-menu" @click="addOnTrack" ref="button" :disabled="!valid">{{
            $t(`tracking.scheduleTracking.addOnTrackForm.addOnTrackingName`)
          }}
        </button>
        <button type="button" class="button-menu-line password-pad" @click="deleteFromTrack">{{
            $t(`tracking.scheduleTracking.addOnTrackForm.removeFromTracking`)
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "addOnTrackForm",
  data() {
    return {
      valid: true,
      subject: "",
      emails: [],
      time: "",
      error: "",
      showError: false,
      timeZone: "",
      timePlaceholder: this.$t(`tracking.scheduleTracking.addOnTrackForm.timePlaceholder.first`)
    }
  },
  props: {
    numberList: Array,
    show: Boolean,
    scheduleTrackingObject: {
      type: Object,
      required: false
    },
    number: {
      type: String,
      required: false
    },
    isContainer: Boolean,
    isUpdate: {
      type: Boolean,
      required: false
    }
    // submit: Function,
  },
  methods: {
    async addOnTrack() {
      // this.submit()
      const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;

      for (let email of this.emails) {
        if (!emailRegex.test(email)) {
          this.valid = false
          this.error = this.$t(`tracking.scheduleTracking.addOnTrackForm.incorrectEmailError`)
          this.showError = true
          this.disableButton()
        } else {
          this.error = ""
          this.showError = false
          this.enableButton()
        }
      }
      const api = this.$store.state.api
      const request = {
        "emailMessageSubject": this.subject ? this.subject : " ",
        "emails": this.emails,
        "numbers": this.numberList,
        "time": this.time
      }
      this.isContainer ? await api.userApi.addContainers(this.numberList, this.$store.getters[`user/getAuthToken`]) : await api.userApi.addBills(this.numberList, this.$store.getters[`user/getAuthToken`])
      try {
        const token = this.$store.getters[`user/getAuthToken`]
        if (!this.scheduleTrackingObject || !this.scheduleTrackingObject.time || !this.scheduleTrackingObject.emails || !this.scheduleTrackingObject.emails) {
          this.isContainer ? await api.scheduleTrackingApi.addContainersOnTracking(request, token) : await api.scheduleTrackingApi.addBillsOnTrack(request, token)
        } else {
          this.isContainer ? await api.scheduleTrackingApi.updateContainers(request, token) : await api.scheduleTrackingApi.updateBills(request, token)
        }
        this.$emit(`submitForm`, {
          numbers: this.numberList,
          time: this.time,
          emails: this.emails,
          subject: this.subject
        })
        this.$notification.info(this.$t(`tracking.scheduleTracking.addOnTrackForm.successMessage`))
        this.$emit(`show`, false)
      } catch (e) {
        this.showError = true
        this.error = String(e)
      }
    },
    hideByButton() {
      this.$emit(`show`, false)
    },
    changeList(number) {
      this.$emit("changeNumbers", number)
    },
    handleEmails(ev) {
      const value = ev.target.value
      let emails = value.replace(/\s/g, '').split(",");
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      for (const email of emails) {
        if (!regex.test(email)) {
          this.disableButton()
          this.error = this.$t(`tracking.scheduleTracking.addOnTrackForm.incorrectEmailError`)
          this.valid = false
          this.showError = true
        } else {
          this.enableButton()
          this.error = ""
          this.valid = true
          this.showError = false
        }
      }
      this.emails = emails
    },
    disableButton() {
      this.valid = false
      this.$refs.button.classList.replace("button-menu", "disabled-button")
    },
    enableButton() {
      this.valid = true
      this.$refs.button.classList.replace("disabled-button", "button-menu")
    },

    handleTime(ev) {
      const time = ev.target.value;
      this.time = time
      if (!/\d{1,2}:\d{1,2}/g.test(time)) {
        this.disableButton()
        this.error = this.$t(`tracking.scheduleTracking.addOnTrackForm.incorrectTimeFormatError`)
        this.valid = false
        this.showError = true
      } else {
        this.error = ""
        this.valid = true
        this.showError = false
        this.time = time
        this.enableButton()
      }
    },
    deleteFromTrack() {
      if (this.$store.getters[`user/getIsAuth`]) {
        this.$notification.info(this.$t(`tracking.scheduleTracking.removeFromTracking.successMessage`))
        this.$emit(`deleteFromTrack`, this.numberList)
        this.$emit(`show`, false)
      }else{
        this.$notification.error(this.$t(`error.unableAccess`))
      }
    },
  },
  async mounted() {
    await this.$store.commit(`refreshToken`)
    const api = this.$store.state.api
    const raw = await api.scheduleTrackingApi.getTimeZone()
    this.timeZone = raw.timeZone
    this.timePlaceholder += `${this.$t(`tracking.scheduleTracking.addOnTrackForm.timePlaceholder.second`)} ${this.timeZone}`
    if (!this.numberList.length) {
      this.disableButton()
      this.error = this.$t(`tracking.scheduleTracking.addOnTrackForm.noNumbersError`)
      this.showError = true
      return
    }
    try {
      if (Object.keys(this.scheduleTrackingObject).length !== 0) {
        this.emails = this.scheduleTrackingObject.emails
        this.time = this.scheduleTrackingObject.time
        this.subject = this.scheduleTrackingObject.subject
      } else {
        this.error = ""
        this.showError = true
        this.disableButton()
      }
    } catch (e) {
      this.error = this.$t(`tracking.scheduleTracking.addOnTrackForm.baseError`)
      this.showError = true
      this.disableButton()
    }
  }
}
</script>

<style scoped>

</style>