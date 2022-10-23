<template>
  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
    <input type="text" class="input-css-grey input-modal" id="recipient-name" placeholder="">
  </div>
</template>

<script>
export default {
  name: "CustomInput",
  props: {
    placeholder: {
      Type: String,
      required: true
    },
  },
  data() {
    return
  }
}
</script>

<style>

</style>