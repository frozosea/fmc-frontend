<template>
  <CustomModal v-model:show="show">
    <set-new-password-form @show="show = $event"/>
  </CustomModal>
  <TrackingPage/>
</template>

<script>
import CustomModal from "@/UI/CustomModal";
import SetNewPasswordForm from "@/components/user/setNewPasswordForm";
import TrackingPage from "@/pages/trackingPage";

export default {
  name: "RecoveryUserPage",
  components: {TrackingPage, SetNewPasswordForm, CustomModal},
  data() {
    return {
      show: true
    }
  },
  mounted() {
    const token = this.$route.query.token
    if (!token) this.show = false
  }
}
</script>

<style scoped>

</style>