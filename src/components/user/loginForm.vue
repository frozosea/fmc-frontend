<template>
  <form @submit.prevent="submitForm" ref="form">
    <div class="container g-0">
      <div class="row g-0">
        <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-12">
          <div class="title-8 input-modal-title">Log in</div>
        </div>

        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-12">
          <div class="close-block">
            <button class="close borderless_button" @click="hideByButton">×</button>
          </div>
        </div>

        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <input type="email" class="input-css-grey input-modal" placeholder="E-mail"
                 @input="email = $event.target.value">
          <input type="password" class="input-css-grey input-modal-end" placeholder="*************"
                 @input="password = $event.target.value">
        </div>
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <button type="submit" class="button-menu" :disabled="showLoading" ref="button">log in</button>
          <button type="button" class="button-menu-line password-pad" @click="setShowRemindForm"
                  :disabled="showLoading">Remind password
          </button>
          <div v-if="showError" style="color: red"> {{ error }}</div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>

export default {
  name: "loginForm",
  data() {
    return {
      email: "",
      password: "",
      showLoading: false,
      error: "",
      showError: false
    }
  },
  methods: {
    submitForm() {
      const api = this.$store.state.api.authApi
      try {
        this.showLoading = true
        const data = api.login(this.email, this.password)
        window.localStorage.setItem(`authToken`, data.token)
        window.localStorage.setItem(`refreshToken`, data.refreshToken)
        // window.localStorage.setItem(`isAuth`, true)
        this.$store.commit(`setAuthToken`, data.token)
        this.$store.commit(`setRefreshToken`, data.refreshToken)
        this.showLoading = false
        this.showError = false
        this.$store.commit(`user/setIsAuth`, true)
        this.$emit(`show`, false)
      } catch (e) {
        // console.log(e)
        this.error = "user was not found!"
        this.showError = true
        this.showLoading = false
        this.$store.commit(`user/setIsAuth`, false)
      }
      // this.$store.state.isAuth = true
      // this.$emit(`close`, false)
      //TODO submit login form
    },
    handleModal() {
      let panel = this.$refs.form.nextElementSibling;
      this.$refs.button.classList.toggle("act-long");
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    },
    hideByButton() {
      this.$emit(`show`, false)
    },
    hide() {
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
    setShowRemindForm() {
      //TODO create show remind password modal method,
      this.$emit("showRemindPassword", true)
    }
  }
}
</script>

<style scoped>

</style>