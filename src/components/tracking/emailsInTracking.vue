<template>
  <div class="col-xl-9 col-lg-8 col-md-12 col-sm-12 col-xs-12">
    <div class="container-font">
      <span class="bold">E-mail:</span>
      {{ separateEmailsByComma() }}
    </div>
  </div>
</template>

<script>
export default {
  name: "emailsInTracking",
  props: {
    emails: Array,
    isOnTrack: Boolean
  },
  methods: {
    separateEmailsByComma() {
      try {
        return this.emails.join(", ")
      } catch (e) {
        return ""
      }
    }
  }
}
</script>

<style scoped>

</style>