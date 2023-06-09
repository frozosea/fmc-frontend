<template>
  <div class="container g-3 search">
    <div class="row g-3">
      <div class="col-xl-10 col-lg-9 col-md-8 col-sm-12 col-xs-12">
        <input type="text" class="input-css-grey" id="recipient-name" :placeholder="$t(`user.searchNumber.form.numberInputPlaceholder`)"
               @input="inputSearchQuery" v-model="searchQuery">
      </div>

      <div class="col-xl-2 col-lg-3 col-md-4 col-sm-12 col-xs-12">
        <button type="button" class="button-menu" @click="clickOnSearchButton">
          <img src="@/assets/images/magnifying.svg" class="svg-magnifying pad-search-img"> {{ $t(`user.searchNumber.form.buttonText`) }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchNumberForm",
  data() {
    return {
      searchQuery: ""
    }
  },
  methods: {
    clickOnSearchButton() {
      this.$emit("search", this.searchQuery)
    },
    inputSearchQuery() {
      this.$emit("inputSearchQuery", this.searchQuery)
    }
  },
  props: {
    containers: Array
  }
}
</script>

<style scoped>

</style>