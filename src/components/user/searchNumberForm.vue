<template>
  <div class="container g-3 search">
    <div class="row g-3">
      <form @submit.prevent="submitForm">
        <div class="col-xl-10 col-lg-9 col-md-8 col-sm-12 col-xs-12">
          <input type="text" class="input-css-grey" id="recipient-name" placeholder="Enter your number">
        </div>

        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-12 col-xs-12">
          <button type="submit" class="button-menu">
            <img src="@/assets/images/magnifying.svg" class="svg-magnifying pad-search-img"> Search</button>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
export default {
  name: "searchNumberForm",
  methods:{
    submitForm(){
      //TODO submit s
    }
  },
  props:{
    containers: Array
  }
}
</script>

<style scoped>

</style>