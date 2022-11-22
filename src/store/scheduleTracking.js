export default {
    namespaced: true,
    state: () => {
        return {
            showModal: false,
            submitError: "",
            showSubmitError: false
        }
    },
    mutations: {
        setShowModal(state, value) {
            state.showModal = value
        },
        setSubmitError(state, error) {
            state.submitError = error
        },
        setShowSubmitError(state, value) {
            state.showSubmitError = value
        }
    },
    getters: {
        getShowModal(state) {
            return state.showModal
        },
        getSubmitError(state) {
            return state.submitError

        },
        getShowSubmitError(state) {
            return state.showSubmitError

        }

    }
}