<template>
  <CustomModal :show="show">
    <registration-form @close="closeByButton"/>
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
  },
  methods: {
    closeByButton(e) {
      this.$emit("close", e)
    }
  }
}
</script>

<style scoped>

</style>