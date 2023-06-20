<template>
  <form @submit.prevent="submitForm">
    <div class="container g-0">
      <div class="row g-0">
        <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-12">
          <div class="title-8 input-modal-title">{{ $t(`user.changePassword.form.title`) }}</div>
        </div>

        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-12">
          <div class="close-block">
            <button class="close borderless_button" @click="hideByButton">×</button>
          </div>
        </div>
        <SpinnerLoader
            :active="showLoading"
            class="spinner_in_center_of_modal"
        />
        <div v-if="!showLoading">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <input type="password" class="input-css-grey input-modal" :placeholder="$t(`user.register.form.placeholder.password`)"
                   @input="handlePasswordInput">
            <input type="password" class="input-css-grey input-modal-end" :placeholder="$t(`user.register.form.placeholder.passwordAgain`)"
                   @input="handleRepeatedPasswordInput">
          </div>

          <div class="row g-0">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div style="color: red; margin-left: auto; margin-top: auto" v-if="showError">{{ errorMessage }}</div>
              <button type="submit" class="button-menu" :disabled="!valid" ref="button">{{ $t(`user.changePassword.form.buttonText`) }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import SpinnerLoader from "@/UI/loading"

export default {
  name: "setNewPasswordForm",
  components: {SpinnerLoader},
  data() {
    return {
      email: "",
      username: "",
      password: "",
      repeatedPassword: "",
      valid: true,
      showError: false,
      errorMessage: "",
      showLoading: false
    }
  },
  methods: {
    handlePasswordInput(e) {
      this.password = e.target.value
      if (this.password !== this.repeatedPassword) {
        this.valid = false
        this.showError = true
        this.disableButton()
        this.errorMessage = this.$t(`errors.passwordsNotEqual`)
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
        this.errorMessage = this.$t(`errors.passwordsNotEqual`)
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
    async submitForm() {
      this.showLoading = true
      const api = this.$store.state.api.authApi
      try {
        const token = this.$route.query.token
        if (!token) throw new Error()
        await api.recoveryPassword(token, this.password)
        this.showLoading = false
        this.showError = false
        this.$emit(`show`, false)
        this.$notification.info(this.$t(`user.changePassword.form.successMessage`))
      } catch (e) {
        this.error = this.$t(`errors.base`)
        this.showError = true
        this.showLoading = false
      }
    }

  }
}
</script>

<style scoped>

</style>