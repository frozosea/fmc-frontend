<template>
  <div v-if="numbers.length">
    <container-or-bill-in-user-account v-for="item in numbers" :key="item.number"
                                       :isOnTrack="item.isOnTrack"
                                       :scheduleTrackingInfo="item.scheduleTrackingInfo"
                                       :number="item.number"
                                       @selectCheckBox="$event ? selectNumber(item.number) : unSelectNumber(item.number)"
    />
  </div>

</template>

<script>
import ContainerOrBillInUserAccount from "@/components/user/containerOrBillInUserAccount";

export default {
  name: "containersOrBillsList",
  components: {ContainerOrBillInUserAccount},
  data() {
    return {
      selectedNumbers: []
    }
  },
  props: {
    numbers: Array,
  },
  methods: {
    selectNumber(number) {
      console.log(number)
      this.$emit("addToSelectedNumbers", number)
    },
    unSelectNumber(number) {
      console.log(number)
      this.$emit("unselectToSelectedNumbers", number)
    }
  }
}
</script>

<style scoped>

</style>