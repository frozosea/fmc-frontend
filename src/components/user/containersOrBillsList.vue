<template>
  <div class="not_found_numbers"
       v-if="!numbers.length && !isLoading">
    Number(s) not
    found!
  </div>
  <div v-if="numbers || numbers.length">
    <container-or-bill-in-user-account v-for="item in numbers"
                                       :key="item.number"
                                       :isOnTrack="item.isOnTrack"
                                       :scheduleTrackingInfo="item.scheduleTrackingObject"
                                       :number="item.number"
                                       :is-container="item.isContainer"
                                       @selectCheckBox="$event ? selectNumber(item.number) : unSelectNumber(item.number)"
                                       @removeFromTracking="this.$emit(`removeFromTracking`,$event)"
                                       @updateScheduleTrackingInfo="updateScheduleTrackingInfo($event,item)"
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
    isLoading: Boolean
  },
  methods: {
    selectNumber(number) {
      this.$emit("addToSelectedNumbers", number)
    },
    unSelectNumber(number) {
      this.$emit("unselectToSelectedNumbers", number)
    },
    async updateScheduleTrackingInfo(e, item) {
      item.scheduleTrackingInfo = e
      item.isOnTrack = true
    }
  }
}
</script>

<style scoped>

</style>