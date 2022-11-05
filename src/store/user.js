import createPersistedState from "vuex-persistedstate";


export default {
    namespaced: true,
    state: () => {
        return {
            isAuth: false,
            username: "username",
            email: "",
            authToken: "",
            refreshToken: "",
            showLoginModal: false
        }
    },
    mutations: {
        setIsAuth(state, value) {
            state.isAuth = value;
        },
        setUsername(state, username) {
            state.username = username
        },
        setEmail(state, email) {
            state.email = email
        },
        setAuthToken(state, token) {
            state.authToken = token
        },
        setRefreshToken(state, token) {
            state.refreshToken = token
        },
        logout(state) {
            state.isAuth = false
            state.authToken = ""
            state.refreshToken = ""
            state.username = ""
            state.email = ""
        },
        setShowLoginModal(state,value) {
            state.showLoginModal = value
        }
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })]

}