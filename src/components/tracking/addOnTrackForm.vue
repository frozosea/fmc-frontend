<template>
  <form @submit.prevent="submitForm">
    <div class="container g-0">
      <div class="row g-0">
        <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-12">
          <div class="title-8 input-modal-title">Add tracking</div>
        </div>

        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-12">
          <div class="close-block">
            <button class="close borderless_button" @click="hideByButton">×</button>
          </div>
        </div>

        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <input type="text" class="input-css-grey input-modal" placeholder="E-mail for mailings / separated by commas"
                 @input="handleEmails" value="">
          <input type="text" class="input-css-grey input-modal" placeholder="Subject name"
                 @input="subject = $event.target.value">
          <input type="text" class="input-css-grey input-modal" placeholder="Time (in format 01:44)"
                 @input="handleTime">
        </div>
      </div>
      <div class="market-minus col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <span class="marker" v-for="item in numberList" :key="item" @click="changeList(item)">{{
              item
            }}&nbsp; ×</span>&nbsp;
      </div>
      <!--      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">-->
      <!--        <div class="market-minus">-->
      <!--          <span class="marker" v-for="item in numberList" :key="item" @click="changeList(item)">{{-->
      <!--              item-->
      <!--            }}&nbsp; ×</span>&nbsp;-->
      <!--        </div>-->
      <!--      </div>-->

    </div>
    <div class="container g-0 area-pad-two">
      <div class="row g-0">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <button type="submit" class="button-menu" @click="submitForm" ref="button" :disabled="!valid">Add tracking
          </button>
          <button type="button" class="button-menu-line password-pad" @click="deleteFromTrack">Remove tracking</button>
          <div style="color: red" v-if="showError"> {{ error }}</div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
// import CustomModal from "@/UI/CustomModal";
// import CustomInput from "@/UI/CustomInput";

export default {
  name: "addOnTrackForm",
  data() {
    return {
      valid: false,
      subject: "",
      emails: [],
      time: "",
      error: "",
      showError: false
    }
  },
  props: {
    numberList: Array,
    show: Boolean,
    scheduleTrackingObject:{
      type: Object,
      required: false
    },
    submit: Function
  },
  methods: {
    submitForm() {
      //TODO submit add on tracking form
      this.submit()
      this.$emit(`close`, false)
    },
    hideByButton() {
      this.$emit(`show:update`, false)
    },
    changeList(number) {
      this.$emit("changeNumbers", number)
    },
    handleEmails() {
      //TODO email validator

      // const emails = ev.target.value
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
      if (!/\d{1,2}:\d{1,2}/g.test(time)) {
        this.disableButton()
        return
      }
      this.enableButton()
    },
    deleteFromTrack() {
      //TODO create delete from tracking func
    }
    //TODO fix numbers with css
  }
}
</script>

<style scoped>

</style>