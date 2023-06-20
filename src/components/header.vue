<template>
  <header style="margin-top: 0;margin-bottom: 15px;background: #f9f7f7;">
  </header>
  <div class="container g-3" style="margin-bottom: 0;padding-bottom: 0;">
    <div class="row g-0">
      <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12">
        <div class="logotype">
          <router-link to="/"><img src="@/assets/images/logotype.svg" class="svg-logotype" alt="logo"></router-link>
        </div>
      </div>

      <div class="col-xl-6 col-lg-5 col-md-6 col-sm-12 col-xs-12 d-md-none d-lg-block
                    d-none d-sm-block d-sm-none d-md-block">
        <div class="menu">
          <router-link to="/about" class="menu-link title-3">{{ $t(`header.infoAboutCompanyName`) }}</router-link>
          <span @click="showFeedback" class="menu-link title-3">{{ $t(`header.feedbackName`) }}</span>
        </div>
      </div>

      <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12 d-md-none d-lg-block
                    d-none d-sm-block d-sm-none d-md-block">

        <div class="avatar" v-if="this.$store.getters[`user/getIsAuth`]">
          <router-link class="title-2" to="/user">{{
              this.$store.getters[`user/getEmail`]
            }}
          </router-link>
          <router-link to="/user">
            <img src="@/assets/images/avatar.png" class="pad-avatar" alt="avatar">
          </router-link>
          <button class="borderless_button"
                  @click="logout"
                  v-if="this.$store.getters[`user/getIsAuth`]">
            <img src="@/assets/images/exit.svg"
                 class="svg-exit img-hover" alt="exit logo">
          </button>
        </div>

        <div class="login" v-if="!this.$store.getters[`user/getIsAuth`]">
          <img src="@/assets/images/exit.svg" class="svg-enter" alt="exit logo"
               @click=logout>
          <span @click="showLogin" class="title-3 borderless_button">{{$t(`user.login.form.title`)}}</span>
          <span @click="showRegister">
            <button type="button" class="button-login">{{$t(`user.register.form.title`)}}</button>
          </span>
        </div>
      </div>
      <div class="d-lg-none">
        <div class="position-menu">
          <input id="menu-toggle" type="checkbox">
          <label class="menu-btn" for="menu-toggle">
            <span></span>
          </label>
          <ul class="menubox">
            <router-link to="/">
              <div class="logo-menu-pad"><img src="@/assets/images/logo-mobile.svg" alt="logo"></div>
            </router-link>
            <li class="menu-padding">
            </li>
            <li class=""><router-link class="menu-item" to="/about">{{$t(`header.infoAboutCompanyName`)}}</router-link></li>
            <li><span class="menu-item" @click="showServices">{{$t(`header.servicesName`)}}</span></li>
            <li><span class="menu-item" @click="showFeedback">{{$t(`header.feedbackName`)}}</span></li>
            <li>
              <router-link class="menu-item" v-if="this.$store.getters[`user/getIsAuth`]" to="/user">{{$t(`header.accountName`)}}</router-link>
            </li>
            <li><span class="menu-item" @click="showLogin" v-if="!this.$store.getters[`user/getIsAuth`]">{{$t(`user.login.form.title`)}} →</span></li>
            <li><span class="menu-item" @click="showRegister"
                   v-if="!this.$store.getters[`user/getIsAuth`]">{{ $t('header.registration') }}</span></li>
            <li><span class="menu-item" v-if="this.$store.getters[`user/getIsAuth`]"
                   @click="logout">{{$t(`header.exitName`)}} →</span></li>
            <div class="menu-font">© {{ new Date().getFullYear() }} <b>{{ $t('header.findMyCargo') }}</b>
              <p>{{ $t('header.support') }}<a :href="`mailto:${this.$store.state.info.supportEmail}`" class="title-5">{{ this.$store.state.info.supportEmail }}</a></p></div>
            <div class="menu-font">
              <a :href="this.$store.state.info.telegramUrl" class="avatar-menu"><img src="@/assets/images/telegram.svg"></a>
              <a :href="this.$store.state.info.facebookUrl" class="avatar-menu"><img src="@/assets/images/facebook.svg"></a>
              <a :href="this.$store.state.info.twitterUrl" class="avatar-menu"><img
                  src="@/assets/images/twitter.svg"></a>
            </div>
          </ul>
        </div>
      </div>
      <CustomModal v-model:show="isShowRegister">
        <registration-form
            @show="isShowRegister = $event"
        />
      </CustomModal>

      <CustomModal v-model:show="isShowLogin">
        <login-form @show="isShowLogin = $event"
                    @showRemindPassword="isShowRemindPassword = $event; isShowLogin=false"
        />
      </CustomModal>
      <CustomModal v-model:show="isShowServices">
        <services-modal @show="isShowServices = $event"/>
      </CustomModal>
      <CustomModal v-model:show="isShowFeedBack">
        <feed-back-modal @show="isShowFeedBack = $event"/>
      </CustomModal>
      <CustomModal v-model:show="isShowRemindPassword">
        <remind-password
            @showRemindPassword="isShowRemindPassword = $event"
            @show="isShowLogin = $event; isShowRemindPassword = $event"/>
      </CustomModal>
    </div>
  </div>
</template>

<script>
import ServicesModal from "@/components/servicesModal";
import FeedBackModal from "@/components/user/feedBackModal";
import CustomModal from "@/UI/CustomModal";
import RegistrationForm from "@/components/user/registrationForm";
import LoginForm from "@/components/user/loginForm";
import {mapMutations} from "vuex";
import RemindPassword from "@/components/user/remindPassword";

export default {
  name: "FmcHeader",
  components: { RemindPassword, LoginForm, RegistrationForm, CustomModal, FeedBackModal, ServicesModal},
  data() {
    return {
      isShowServices: false,
      isShowFeedBack: false,
      isShowLogin: false,
      isShowRegister: false,
      isShowRemindPassword: false
    }
  },
  methods: {
    showServices() {
      this.isShowServices = !this.isShowServices
    },
    showFeedback() {
      this.isShowFeedBack = !this.isShowFeedBack
    },
    showLogin() {
      this.isShowLogin = !this.isShowLogin
    },
    showRegister() {
      this.isShowRegister = !this.isShowRegister
    },
    logout(){
      this.$notification.info(this.$t(`user.exit.successMessage`))
      this.$store.commit(`user/logout`)
      this.$router.push(`/`)
    }
  },
  computed: mapMutations(["user/logout"]),

}
</script>

<style>
@import "@/assets/style.css";
</style>