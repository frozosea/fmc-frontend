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
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12" style="cursor: pointer;" @click="redirectToContainerTracking">
        <div class="service-block">
          <img src="@/assets/images/container.png" class="service-img img-hover">
          <p>Отследить по номеру контейнера</p>
        </div>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12" style="cursor: pointer;" @click="redirectToBillTracking">
          <div class="service-block">
            <img src="@/assets/images/bill.png" class="service-img img-hover">
            <p>Отследить по номеру коносамента</p>
          </div>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12" style="cursor: pointer;">
        <div class="service-block">
          <img src="@/assets/images/document.png" class="service-img">
          <p>Поиск фрахта</p>
        </div>
      </div>
    </div>
  </div>
  <div class="container g-0">
    <div class="row g-3">

      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 service-text">
        FindMyCargo помогает автоматизировать рутинные процессы в морской логистике.
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
    redirectToContainerTracking() {
      this.$router.push(`/tracking?isContainer=true`)
      this.$emit(`show`, false)
    },
    redirectToBillTracking() {
      this.$router.push(`/tracking?isContainer=false`)
      this.$emit(`show`, false)
    },
    redirectToFreight(){
      this.$router.push(`/freight`)
      this.$emit(`show`, false)
    }
  },
}
</script>

<style scoped>

</style>