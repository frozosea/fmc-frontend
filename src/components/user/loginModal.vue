<template>
  <CustomModal :show="show">
    <login-form :show="show"/>
  </CustomModal>
</template>

<script>
import CustomModal from "@/UI/CustomModal";
import loginForm from "@/components/user/loginForm";

export default {
  name: "loginModal",
  data() {
    return {
      show: true
    }
  },
  components: {CustomModal, loginForm}
}
</script>

<style scoped>

</style>