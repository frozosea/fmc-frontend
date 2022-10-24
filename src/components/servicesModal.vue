<template>
    <div class="container g-0">
      <div class="row g-0">
        <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-12">
          <div class="title-8 input-modal-title">Services</div>
        </div>

        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-12">
          <button class="close borderless_button" @click="hideByButton">×</button>
        </div>

      </div>
    </div>
    <div class="container g-0 password-pad">
      <div class="row g-3">
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12 ">
          <div class="service-block">
            <img src="@/assets/images/container.png" class="service-img img-hover">
            <router-link to="/tracking"><p>Tracking by container number</p></router-link>
          </div>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <div class="service-block">
            <img src="@/assets/images/bill.png" class="service-img img-hover">
            <router-link to="/tracking"><p>Tracking on bill of lading</p></router-link>
          </div>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <div class="service-block">
            <img src="@/assets/images/document.png" class="service-img img-hover">
            <router-link to="/freight"><p>Search the cheapest freight</p></router-link>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: "servicesModal",
  methods: {
    hideByButton() {
      this.$emit(`close`, false)
    }
  },
}
</script>

<style scoped>

</style>