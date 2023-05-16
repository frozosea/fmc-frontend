<template>
  <form @submit.prevent="submitForm" ref="form">
    <div class="container g-0">
      <div class="row g-0">
        <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-12">
          <div class="title-8 input-modal-title">Вход</div>
        </div>

        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-12">
          <div class="close-block">
            <button class="close borderless_button" @click="hideByButton">×</button>
          </div>
        </div>
        <div v-if="showLoading">
          <SpinnerLoader
              :active="showLoading"
              class="spinner_in_center_of_modal"
          />
        </div>
        <div v-if="!showLoading">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <input type="email" class="input-css-grey input-modal" placeholder="E-mail"
                   @input="email = $event.target.value">
            <input type="пароль" class="input-css-grey input-modal-end" placeholder="*************"
                   @input="password = $event.target.value">
          </div>
          <div class="container g-0">
            <div class="row g-0">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div v-if="showError" style="color: red"> {{ error }}</div>
                <button type="submit" class="button-menu" :disabled="showLoading" ref="button">Войти</button>
                <button type="button" class="button-menu-line password-pad" @click="setShowRemindForm"
                        :disabled="showLoading">Напомнить пароль
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </form>
</template>

<script>
import SpinnerLoader from "@/UI/loading";

export default {
  name: "loginForm",
  components: {SpinnerLoader},
  data() {
    return {
      email: "",
      password: "",
      showLoading: false,
      error: "",
      showError: false,
    }
  },
  methods: {
    async submitForm() {
      const api = this.$store.state.api.authApi
      try {
        this.showLoading = true
        const data = await api.login(this.email, this.password)
        this.$store.commit(`user/setAuthToken`, data.tokens)
        this.$store.commit(`user/setRefreshToken`, data.refreshToken)
        this.$store.commit(`user/setEmail`, this.email)
        this.showLoading = false
        this.showError = false
        this.$store.commit(`user/setIsAuth`, true)
        this.$emit(`show`, false)
      } catch (e) {
        this.showLoading = false
        this.error = "user was not found!"
        this.showError = true
        this.showLoading = false
        this.$store.commit(`user/setIsAuth`, false)
        this.$store.commit(`user/setAuthToken`, "")
        this.$store.commit(`user/setRefreshToken`, "")
        this.$store.commit(`user/setEmail`, "")
      }
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
      this.$emit("showRemindPassword", true)
    }
  }
}
</script>

<style scoped>
@import "@/assets/style.css";
</style>