<template>
  <form @submit.prevent="submitForm" ref="form">
    <div class="container g-0">
      <div class="row g-0">
        <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-12">
          <div class="title-8 input-modal-title">Remind password</div>
        </div>

        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-12">
          <div class="close-block">
            <button class="close borderless_button" @click="hideByButton">×</button>
          </div>
        </div>

        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <input type="text" class="input-css-grey input-modal-end" id="recipient-name" placeholder="E-mail"
                 v-model="email">
        </div>
      </div>
    </div>

    <div class="row g-0">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <button type="submit" class="button-menu">Remind password</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "remindPassword",
  data() {
    return {
      email: "",
      showLoading: false
    }
  },
  props: {
    show: Boolean
  },
  methods: {
    submitForm() {
      //TODO submit login form
    },
    handleModal() {
      let panel = this.$refs.form.nextElementSibling;
      this.$refs.button.classList.toggle("act-long");
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    },
    hideByButton() {
      this.$emit(`show`, false)
    }
  }
}
</script>

<style scoped>

</style>