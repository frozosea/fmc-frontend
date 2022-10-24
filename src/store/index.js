import {createStore} from "vuex";

export default createStore({
    state: {
        isAuth: false,
        username: "username",
        email: "",
        authToken: "",
        refreshToken: "",
        telegramUrl: "example.org",
        facebookUrl: "example.org",
        twitterUrl: "example.org",
        supportEmail: "support@findmycargo.ru"
    },
    getters: {
        getIsAuth(state) {
            return state.isAuth
        },
        getUsername(state) {
            return state.username
        }, getEmail(state) {
            return state.email
        },
        getAuthToken(state) {
            return state.authToken
        }, getRefreshToke(state) {
            return state.refreshToken
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
        }
    }
})

