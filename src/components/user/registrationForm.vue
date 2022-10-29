<template>
  <form @submit.prevent="submitForm">
    <div class="container g-0">
      <div class="row g-0">
        <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-12">
          <div class="title-8 input-modal-title">Registration</div>
        </div>

        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-12">
          <div class="close-block">
            <button class="close borderless_button" @click="hideByButton">×</button>
          </div>
        </div>

        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <input type="text" class="input-css-grey input-modal" placeholder="Your E-mail" @input="handleEmail">
          <input type="text" class="input-css-grey input-modal" placeholder="Create username"
                 @input="username = $event.target.value">
          <input type="text" class="input-css-grey input-modal" placeholder="Create password"
                 @input="handlePasswordInput">
          <input type="text" class="input-css-grey input-modal-end" placeholder="Password again"
                 @input="handleRepeatedPasswordInput">
        </div>
      </div>
    </div>
    <div class="row g-0">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div style="color: red; margin-left: auto; margin-top: auto" v-if="showError">{{ errorMessage }}</div>
        <button type="submit" class="button-menu" :disabled="!valid" ref="button">Register</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "registrationForm",
  data() {
    return {
      email: "",
      username: "",
      password: "",
      repeatedPassword: "",
      valid: true,
      showError: false,
      errorMessage: "",
    }
  },
  methods: {
    handleEmail(e) {
      const email = e.target.value;
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!re.test(email)) {
        this.valid = false
        this.showError = true
        this.disableButton()
        this.errorMessage = "please input correct email!"
      } else {
        this.valid = true
        this.showError = false
        this.errorMessage = ""
        this.enableButton()
      }

    },
    handlePasswordInput(e) {
      this.password = e.target.value
      if (this.password !== this.repeatedPassword) {
        this.valid = false
        this.showError = true
        this.disableButton()
        this.errorMessage = "passwords should be equal!"
      } else {
        this.valid = true
        this.showError = false
        this.errorMessage = ""
        this.enableButton()
      }
    },
    handleRepeatedPasswordInput(e) {
      this.repeatedPassword = e.target.value
      if (this.password !== this.repeatedPassword) {
        this.valid = false
        this.showError = true
        this.disableButton()
        this.errorMessage = "passwords should be equal!"
      } else {
        this.valid = true
        this.showError = false
        this.errorMessage = ""
        this.enableButton()
      }
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
    submitForm() {
      const api = this.$store.state.api.authApi
      try {
        this.showLoading = true
        api.register(this.email, this.username, this.password)
        this.showLoading = false
        this.showError = false
        this.$emit(`show`, false)
      } catch (e) {
        this.error = "user with this username or email already exist!"
        this.showError = true
        this.showLoading = false
      }
    }
  }
}
</script>

<style scoped>

</style>