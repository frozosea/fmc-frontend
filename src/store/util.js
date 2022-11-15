import TimeConverter from "@/utils/timeConverter";

export default {
    namespaced: true,
    state: () => {
        return {
            timeConverter: new TimeConverter()
        }
    },
    getters: {
        getTime(state) {
            return state.timeConverter
        }
    },
}