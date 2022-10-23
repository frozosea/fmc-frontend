<template>
  <container-or-bill-in-user-account v-for="item in numbers" :key="item.number"
                                     :isOnTrack="item.isOnTrack"
                                     :scheduleTrackingInfo="item.scheduleTrackingInfo"
                                     :number="item.number"
                                     @selectCheckBox="$event ? selectNumber(item.number) : unSelectNumber(item.number)"
  />
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
      this.$emit("addToSelectedNumbers", number)
    },
    unSelectNumber(number){
      this.$emit("unselectToSelectedNumbers", number)
    }
  }
}
</script>

<style scoped>

</style>