<template>
  <long-dotted-line/>
  <div class="inProgress">В процессе разработки...</div>
</template>

<script>
import longDottedLine from "@/UI/longDottedLine";

export default {
  name: "FreightPage",
  components: {longDottedLine},
  async mounted() {
    if (this.$store.getters[`user/getIsAuth`]) {
      await this.$store.commit(`refreshToken`)
    }
  }
}
</script>

<style scoped>
.inProgress {
  width: 200px;
  height: 100px;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  margin: auto;
}
</style>