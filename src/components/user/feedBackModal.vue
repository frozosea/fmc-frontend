<template>
  <div class="container g-0">
    <div class="row g-0">
      <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-12">
        <div class="title-8 input-modal-title">Feedback</div>
      </div>

      <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-12">
        <div class="close-block">
          <button class="close borderless_button" @click="hideByButton">×</button>
        </div>
      </div>

      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <input type="text" class="input-css-grey input-modal" id="recipient-name" placeholder="E-mail"
               @input="inputEmail"/>
        <textarea id="msg" class="text-area" placeholder="Ask your question" v-model="feedback"/>
      </div>
    </div>
  </div>
  <div class="container g-0">
    <div class="row g-0">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <button type="button" class="button-menu area-pad" @click="submit" ref="button">Send message</button>
        <div style="color: red" v-if="showError">{{ error }}</div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "feedBackModal",
  data() {
    return {
      email: "",
      feedback: "",
      error: "",
      showError: false
    }
  },
  methods: {
    submit() {
      const api = this.$store.state.api
      try {
        api.userApi.feedback(this.email, this.feedback)
      } catch (e) {
        this.error = "something went wrong, try again later :("
      }
      this.$emit(`show`, false)

    },
    hideByButton() {
      this.$emit(`show`, false)
    },
    disableButton() {
      this.valid = false
      this.$refs.button.classList.replace("button-menu", "disabled-button")
    },
    enableButton() {
      this.valid = true
      this.$refs.button.classList.replace("disabled-button", "button-menu")
    },
    inputEmail(event) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const email = event.target.value
      if (!re.test(email)) {
        this.disableButton()
        this.showError = true
        this.error = "please input valid email!"
      } else {
        this.enableButton()
        this.showError = false
        this.error = ""
        this.email = email
      }
    }
  },
  props: {
    show: Boolean
  }
}
</script>

<style scoped>

</style>