<template>
  <div class="container g-0">
    <div class="row g-0">
      <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-12">
        <div class="title-8 input-modal-title">Schedule tracking</div>
      </div>

      <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-12">
        <div class="close-block">
          <button class="close borderless_button" @click="hideByButton">×</button>
        </div>
      </div>

      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <input type="text" class="input-css-grey input-modal" placeholder="E-mail for mailings / separated by commas"
               @input="handleEmails"
               :value="scheduleTrackingObject ? Object.keys(scheduleTrackingObject).length !== 0 ? scheduleTrackingObject.emails.join(`,`) : `` : ``">
        <input type="text" class="input-css-grey input-modal" placeholder="Subject name"
               @input="subject = $event.target.value"
               :value="Object.keys(scheduleTrackingObject).length !== 0 ? scheduleTrackingObject.subject : ``">
        <input type="text" class="input-css-grey input-modal"
               :placeholder="timePlaceholder"
               @input="handleTime"
               :value="Object.keys(scheduleTrackingObject).length !== 0 ? scheduleTrackingObject.time : ``"
        >
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
        <button type="button" class="button-menu" @click="addOnTrack" ref="button" :disabled="!valid">Add on track
        </button>
        <button type="button" class="button-menu-line password-pad" @click="deleteFromTrack">Remove tracking</button>
      </div>
    </div>
  </div>
</template>

<script>
// import CustomModal from "@/UI/CustomModal";
// import CustomInput from "@/UI/CustomInput";

export default {
  name: "addOnTrackForm",
  data() {
    return {
      valid: true,
      subject: this.scheduleTrackingObject ? this.scheduleTrackingObject.subject : "",
      emails: this.scheduleTrackingObject ? this.scheduleTrackingObject.emails : [],
      time: this.scheduleTrackingObject ? this.scheduleTrackingObject.time : "",
      error: "",
      showError: false,
      timeZone: "",
      timePlaceholder: "Time in format 01:44"
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
    // submit: Function,
  },
  methods: {
    addOnTrack() {
      //TODO submit add on tracking form
      // this.submit()
      this.$emit(`submitForm`, {numbers: this.numberList, time: this.time, emails: this.emails, subject: this.subject})
      this.$emit(`show`, false)
    },
    hideByButton() {
      this.$emit(`show`, false)
    },
    changeList(number) {
      this.$emit("changeNumbers", number)
    },
    handleEmails(ev) {
      //TODO email validator
      const value = ev.target.value
      let emails = value.replace(/\s/g, '').split(",");
      // const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (this.scheduleTrackingObject) {
        this.emails = emails
      } else {
        this.emails += emails
      }
      // for (let i = 0; i < emails.length; i++) {
      //   if (emails[i] == "" || !regex.test(emails[i])) {
      //     this.valid = false;
      //     this.error = "please enter valid email(s)!"
      //     this.showError = true
      //     this.disableButton()
      //   } else {
      //     this.valid = true;
      //     this.error = ""
      //     this.showError = false
      //     this.enableButton()
      //     this.emails.push(emails[i])
      //   }
      // }
      // const re = /^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,}(\s*,?\s*)*)+$ /
      // if (!re.test(emails)) {
      //   this.disableButton()
      // }
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
      // if (!/\d{1,2}:\d{1,2}/g.test(time)) {
      //   this.disableButton()
      //   this.error = "please, enter valid time in format `hh:mm` "
      //   this.valid = false
      //   this.showError = true
      // }else{
      //   this.error = ""
      //   this.valid = true
      //   this.showError = false
      //   this.time = time
      //   this.enableButton()
      // }
    },
    deleteFromTrack() {
      this.$emit(`deleteFromTrack`, this.numberList)
      this.$emit(`show`, false)
      //TODO create delete from tracking func
    },
    //TODO fix numbers with css
  },
  async mounted() {
    if (this.numberList.length === 0) {
      this.disableButton()
      this.error = "add container or bill numbers!"
      this.showError = true
    }
    const api = this.$store.state.api
    const raw = await api.scheduleTrackingApi.getTimeZone()
    this.timeZone = raw.timeZone
    this.timePlaceholder += `, timezone is ${this.timeZone}`
  }
}
</script>

<style scoped>

</style>