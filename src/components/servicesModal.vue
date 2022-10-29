<template>
  <div class="container g-0">
    <div class="row g-0">
      <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-12">
        <div class="title-8 input-modal-title">Services</div>
      </div>

      <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-12">
        <div class="close-block">
          <button class="close borderless_button" @click="hideByButton">×</button>
        </div>
      </div>

    </div>
  </div>

  <div class="container g-0 password-pad">
    <div class="row g-3">
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12" style="cursor: pointer;" @click="redirectToTracking">
        <div class="service-block">
          <img src="@/assets/images/container.png" class="service-img img-hover">
          <router-link to="/tracking"><p>Tracking by container number</p></router-link>
        </div>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12" style="cursor: pointer;" @click="redirectToTracking">
          <div class="service-block">
            <img src="@/assets/images/bill.png" class="service-img img-hover">
            <router-link to="/tracking"><p>Tracking by bill number</p></router-link>
          </div>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12" style="cursor: pointer;" @click="redirectToTracking">
        <div class="service-block">
          <img src="@/assets/images/document.png" class="service-img img-hover">
          <router-link to="/freight"><p>Search the cheapest freight</p></router-link>
        </div>
      </div>
    </div>
  </div>
  <div class="container g-0">
    <div class="row g-3">

      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 service-text">
        FindMyCargo can help you with automize logistics routine processes.
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: "servicesModal",
  methods: {
    hideByButton() {
      this.$emit(`show`, false)
    },
    disableButton() {
      this.$refs.button.classList.replace("button-menu", "disabled-button")
    },
    enableButton() {
      this.$refs.button.classList.replace("disabled-button", "button-menu")
    },
    redirectToTracking() {
      this.$router.push(`/tracking`)
      this.$emit(`show`, false)
    }
  },
}
</script>

<style scoped>

</style>