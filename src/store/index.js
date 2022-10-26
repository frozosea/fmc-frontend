import {createStore} from "vuex";
import Api, {AuthApi, ScheduleTrackingApi, TrackingApi, UserApi} from "@/api";

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
        supportEmail: "support@findmycargo.ru",
        authApi: new AuthApi(),
        trackingApi: new TrackingApi(),
        scheduleTrackingApi: new ScheduleTrackingApi(),
        userApi: new UserApi(),
        api: new Api(this.authApi, this.trackingApi, this.scheduleTrackingApi, this.userApi)
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

