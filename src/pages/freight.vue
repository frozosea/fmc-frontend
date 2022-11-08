<template>
  <long-dotted-line/>
  <div class="inProgress">Development in progress...</div>
</template>

<script>
import longDottedLine from "@/UI/longDottedLine";
export default {
  name: "FreightPage",
  components: {longDottedLine}
}
</script>

<style scoped>
.inProgress{
  width: 200px;
  height: 100px;

  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;

  margin: auto;
}
</style>