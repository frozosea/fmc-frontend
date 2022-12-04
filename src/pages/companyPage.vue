<template>
  <long-dotted-line/>
  <div></div>
</template>

<script>
import LongDottedLine from "@/UI/longDottedLine";
export default {
  //TODO company page
  name: "companyPage",
  components: {LongDottedLine},
  async mounted() {
    if (this.$store.getters[`user/getIsAuth`]) {
      await this.$store.commit(`refreshToken`)
    }
  }
}
</script>

<style scoped>

</style>