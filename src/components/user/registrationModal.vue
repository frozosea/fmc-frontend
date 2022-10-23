<template>
  <CustomModal :show="show">
    <registration-form />
  </CustomModal>
</template>

<script>
import CustomModal from "@/UI/CustomModal";
import registrationForm from "@/components/user/registrationForm";

export default {
  name: "registrationModal",
  components: {CustomModal, registrationForm},
  props: {
    show: Boolean
  }
}
</script>

<style scoped>

</style>