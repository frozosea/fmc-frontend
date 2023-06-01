<template>
  <div class="container g-3">
    <div class="row g-0">
      <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12">
        <div class="logotype">
          <router-link to="/"><img src="@/assets/images/logotype.svg" class="svg-logotype" alt="logo"></router-link>
        </div>
      </div>

      <div class="col-xl-6 col-lg-5 col-md-6 col-sm-12 col-xs-12 d-md-none d-lg-block
                    d-none d-sm-block d-sm-none d-md-block">
        <div class="menu">
          <router-link to="/about" class="menu-link title-3">О компании</router-link>
<!--          <a @click="showServices" class="menu-link title-3">Сервисы</a>-->
          <a @click="showFeedback" class="menu-link title-3" aria-label="Форма обратной связи">Обратная связь</a>
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
            <img src="@/assets/images/avatar.png" class="pad-avatar" alt="avatar"/>
          </router-link>
          <button class="borderless_button"
                  @click="this.$store.commit(`user/logout`); this.$router.push(`/`)"
                  v-if="this.$store.getters[`user/getIsAuth`]">
            <img src="@/assets/images/exit.svg"
                 class="svg-exit img-hover" width="512" height="448" alt="exit">
          </button>
        </div>

        <div class="login" v-if="!this.$store.getters[`user/getIsAuth`]">
          <img src="@/assets/images/exit.svg" class="svg-enter"
               @click="this.$store.commit(`user/logout`); this.$router.push(`/`)"  alt="exit">
          <a @click="showLogin" class="title-3" aria-label="Кнопка авторизации">Авторизация</a>
          <a @click="showRegister" aria-label="Кнопка регистрации">
            <button type="button" class="button-login">Регистрация</button>
          </a>
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
            <li class=""><router-link class="menu-item" to="/about">О компании</router-link></li>
            <li><a class="menu-item" @click="showServices" aria-label="Кнопка сервисов">Сервисы</a></li>
            <li><a class="menu-item" @click="showFeedback" aria-label="Форма обратной связи">Оставить отзыв</a></li>
            <li>
              <router-link class="menu-item" v-if="this.$store.getters[`user/getIsAuth`]" to="/user">Аккаунт</router-link>
            </li>
            <li><a class="menu-item" @click="showLogin" v-if="!this.$store.getters[`user/getIsAuth`]" aria-label="Кнопка авторизации">Авторизация →</a></li>
            <li><a class="menu-item" @click="showRegister"
                   v-if="!this.$store.getters[`user/getIsAuth`]" aria-label="Кнопка регистрации">Регистрация</a></li>
            <li><a class="menu-item" v-if="this.$store.getters[`user/getIsAuth`]"
                   @click="this.$store.commit(`user/logout`); this.$router.push(`/`)" aria-label="Кнопка выхода с аккаунта">Выйти →</a></li>
            <div class="menu-font">© {{ new Date().getFullYear() }} <b>«Find my Cargo»</b>
              <p>Support: <a :href="`mailto:${this.$store.state.info.supportEmail}`" class="title-5" aria-label="Почта технической поддержки">{{ this.$store.state.info.supportEmail }}</a></p></div>
            <div class="menu-font">
              <a :href="this.$store.state.info.telegramUrl" class="avatar-menu" aria-label="Ссылка на телеграм"><img src="@/assets/images/telegram.svg" alt="telegram logo"></a>
              <a :href="this.$store.state.info.facebookUrl" class="avatar-menu" aria-label="Ссылка на фэйсбук"><img src="@/assets/images/facebook.svg" alt="facebook logo"></a>
              <a :href="this.$store.state.info.twitterUrl" class="avatar-menu" aria-label="Ссылка на твитер"><img
                  src="@/assets/images/twitter.svg" alt="twitter logo"></a>
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
  components: {RemindPassword, LoginForm, RegistrationForm, CustomModal, FeedBackModal, ServicesModal},
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
    redirectToAccount() {
      this.$router.push(`/user`)

    }
  },
  computed: mapMutations(["user/logout"]),

}
</script>

<style>
@import "@/assets/style.css";
</style>