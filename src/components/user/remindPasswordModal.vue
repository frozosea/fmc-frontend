<template>
  <CustomModal :show="show">
    <remind-password @update:show="show = $event"/>
  </CustomModal>
</template>

<script>
import CustomModal from "@/UI/CustomModal";
import RemindPassword from "@/components/user/remindPassword";

export default {
  name: "remindPasswordModal",
  data() {
    return {
      show: true
    }
  },
  components: {RemindPassword, CustomModal}
}
</script>

<style scoped>

</style>