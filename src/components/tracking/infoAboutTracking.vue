<template>
  <div class="container g-0">
    <div class="row g-0">

      <div class="col-xl-2 col-lg-3 col-md-12 col-sm-12 col-xs-12">
        <div class="container-font">
          <span class="bold">Тема:</span> {{ infoAboutTracking.subject }}<p>
          <span class="bold">Время:</span>{{ infoAboutTracking.time }}
        </p></div>
      </div>

      <div class="col-xl-9 col-lg-8 col-md-12 col-sm-12 col-xs-12">
        <div class="container-font">
          <span class="bold">E-mail:</span>
          {{ unpackEmails() }}
        </div>
      </div>

      <div class="col-xl-1 col-lg-1 col-md-12 col-sm-12 col-xs-12">
        <div class="container-action">
          <span><img src="@/assets/images/settings.svg" class="svg-settings img-hover"></span>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  name: "infoAboutTracking",
  props: {
    infoAboutTracking:{time: String, subject: String, emails: Array}
  },
  methods: {
    unpackEmails() {
      return this.infoAboutTracking.emails.join(",")
    }
  }
}
</script>

<style scoped>
@import "@/assets/style.css";
</style>