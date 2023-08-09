<template>
  <FmcHeader/>
  <router-view/>
  <FmcFooter/>
</template>

<script>
import FmcHeader from "@/components/header"
import FmcFooter from "@/components/footer"

export default {
  name: 'App',
  components: {
    FmcHeader,
    FmcFooter
  },
  metaInfo: {
    title: 'FindMyCargo слежение за контейнерами и коносаментами',
    htmlAttrs: {
      lang: 'ru',
      amp: true
    }
  },
  async mounted() {
    if (this.$store.getters[`user/getAuthToken`] === "undefined" || !this.$store.getters[`user/getRefreshToken`]) {
      this.$forceUpdate();
      this.$store.commit(`user/logout`)
    }
    if (this.$store.getters[`user/getIsAuth`]) {
      await this.$store.commit(`refreshToken`)
    }
  }
}
</script>

<style>
@import "@/assets/style.css";
</style>
