<template>
  <long-dotted-line/>
  <div>
    <h2 style="margin: 0;position: absolute;top: 40%;left: 50%;margin-right: -50%;transform: translate(-50%, -50%)">
      404: Страница, которую вы запрашиваете не найдена.</h2>
    <router-link to="/"><div class="col-xl-2 col-lg-15 col-md-4 col-sm-12 col-xs-20" style="margin: 0;position: absolute;top: 50%;left: 50%;margin-right: -50%;transform: translate(-50%, -50%)">
      <button type="submit" class="button-menu" >
        Домой
      </button>
    </div></router-link>
  </div>
</template>

<script>
import LongDottedLine from "@/UI/longDottedLine";

export default {
  name: "NotFound",
  components: {LongDottedLine}
}
</script>

<style scoped>

</style>