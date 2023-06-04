<template>
  <div class="footer" style="margin-top: auto">
    <div class="row g-0">
      <div class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-xs-12 d-md-none d-lg-block
                    d-none d-sm-block d-sm-none d-md-block">
        <router-link to="/" aria-label="отследить контейнер или коносамент"><img src="@/assets/images/logo-footer.svg" class="svg-logotype-footer" alt="findmycargo container tracking service logo"></router-link>
      </div>
      <div class="col-xl-4 col-lg-8 col-md-6 col-sm-12 col-xs-12">
        <div class="footer-copyright">
          © {{ new Date().getFullYear() }} «<b>Find my Cargo</b>», <a :href="`mailto:${this.$store.state.info.supportEmail}`"
                                                                      class="title-4">{{
            this.$store.state.info.supportEmail
          }}</a>
        </div>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 d-md-none d-xl-block
                    d-none d-sm-block d-sm-none d-md-block footer-menu">
        <router-link to="/privacy" class="title-4">Обработка персональных данных</router-link>
        <router-link to="/agreement" class="title-4">Пользовательское соглашение</router-link>
      </div>
      <div class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-xs-12 footer-socials">
        <a href="https://t.me/findmycargo"><img src="@/assets/images/telegram.svg" alt="container bill number tracking telegram" class="img-hover svg-social"></a>
        <a href="https://www.facebook.com/profile.php?id=100093158229495&mibextid=LQQJ4d"><img src="@/assets/images/facebook.svg" alt="container bill number tracking facebook" class="pad-socials svg-social img-hover"></a>
        <a href="/about"><img src="@/assets/images/twitter.svg" class="pad-socials svg-social img-hover" alt="container bill number tracking twitter"></a>
      </div>
    </div>
  </div>
  <CustomModal v-model:show="isShowServices">
    <services-modal @show="isShowServices = $event"/>
  </CustomModal>
  <CustomModal v-model:show="isShowFeedBack">
    <feed-back-modal @show="isShowFeedBack=$event"/>
  </CustomModal>
</template>

<script>
import CustomModal from "@/UI/CustomModal";
import feedBackModal from "@/components/user/feedBackModal";
import servicesModal from "@/components/servicesModal";

export default {
  name: "FmcFooter",
  components: {CustomModal, feedBackModal, servicesModal},
  data() {
    return {
      isShowServices: false,
      isShowFeedBack: false,
    }
  },
  methods: {
    showServices() {
      this.isShowServices = !this.isShowServices
    },
    showFeedback() {
      this.isShowFeedBack = !this.isShowFeedBack
    },
  }
}
</script>

<style>
@import "@/assets/style.css";

.my-footer {
  bottom: 0;
  width: 100%;
  height: 2.5rem;
}

.page-footer {
  padding: 1rem;
  text-align: center;
  background-color: #f9f7f7;
}

.footer.fixed-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}

</style>