import {createStore} from "vuex";
// import VuexPersistence from 'vuex-persist'
// import createPersistedState from "vuex-persistedstate";
import createPersistedState from 'vuex-persistedstate'
import Api, {AuthApi, ScheduleTrackingApi, TrackingApi, UserApi} from "@/api";

// const vuexLocal = new VuexPersistence({
//     storage: window.localStorage
// })


const user = createStore({
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
    // getters: {
    //     getIsAuth(state) {
    //         console.log(state.isAuth)
    //         return state.isAuth
    //     },
    //     getUsername(state) {
    //         return state.username
    //     },
    //     getEmail(state) {
    //         return state.email
    //     },
    //     getAuthToken(state) {
    //         return state.authToken
    //     },
    //     getRefreshToke(state) {
    //         return state.refreshToken
    //     },
    // },
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
            this.username = ""
            this.email = ""
        },
        setShowLoginModal(value) {
            this.showLoginModal = value
        }
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })]

})

const baseProjectInfoStore = createStore({
    namespaced: true,
    state: {
        telegramUrl: "example.org",
        facebookUrl: "example.org",
        twitterUrl: "example.org",
        supportEmail: "support@findmycargo.ru",
    },
    // getters: {
    //     getTelegramUrl(state) {
    //         return state.telegramUrl
    //     },
    //     getFacebookUrl(state) {
    //         return state.facebookUrl
    //     },
    //     getTwitterUrl(state) {
    //         return state.twitterUrl
    //     },
    //     getSupportEmail(state) {
    //         return state.supportEmail
    //     },
    // }
})

export const apiStore = createStore({
    namespaced: true,
    state: {
        authApi: new AuthApi(),
        trackingApi: new TrackingApi(),
        scheduleTrackingApi: new ScheduleTrackingApi(),
        userApi: new UserApi(),
        api: new Api(new AuthApi(), new TrackingApi(), new ScheduleTrackingApi(), new UserApi())
    },
    // getters:{
    //     getApi(state) {
    //         return state.api
    //     },
    //     getAuthApi(state) {
    //         return state.authApi
    //     },
    //     getTrackingApi(state) {
    //         return state.trackingApi
    //     },
    //     getScheduleTrackingApi(state) {
    //         return state.scheduleTrackingApi
    //     },
    //     getUserApi(state) {
    //         return state.userApi
    //     },
    // }
})


export default createStore({
    modules: {
        user: user,
        base: baseProjectInfoStore,
        api: apiStore
    },
    // state: () => {
    //     return {
    //         telegramUrl: "example.org",
    //         facebookUrl: "example.org",
    //         twitterUrl: "example.org",
    //         supportEmail: "support@findmycargo.ru",
    //         authApi: new AuthApi(),
    //         trackingApi: new TrackingApi(),
    //         scheduleTrackingApi: new ScheduleTrackingApi(),
    //         userApi: new UserApi(),
    //         showLoginModal: false,
    //         api: new Api(new AuthApi(), new TrackingApi(), new ScheduleTrackingApi(), new UserApi())
    //     }
    // },
    // getters: {
    //     getIsAuth(state) {
    //         return state.isAuth
    //     },
    //     getUsername(state) {
    //         return state.username
    //     },
    //     getEmail(state) {
    //         return state.email
    //     },
    //     getAuthToken(state) {
    //         return state.authToken
    //     },
    //     getRefreshToke(state) {
    //         return state.refreshToken
    //     },
    //     getApi(state) {
    //         return state.api
    //     },
    //     getAuthApi(state) {
    //         return state.authApi
    //     },
    //     getTrackingApi(state) {
    //         return state.trackingApi
    //     },
    //     getScheduleTrackingApi(state) {
    //         return state.scheduleTrackingApi
    //     },
    //     getUserApi(state) {
    //         return state.userApi
    //     },
    //     getShowLoginModal(state) {
    //         return state.showLoginModal
    //     }
    //
    // },
    // mutations: {
    //     setIsAuth(state, value) {
    //         state.isAuth = value;
    //     },
    //     setUsername(state, username) {
    //         state.username = username
    //     },
    //     setEmail(state, email) {
    //         state.email = email
    //     },
    //     setAuthToken(state, token) {
    //         state.authToken = token
    //     },
    //     setRefreshToken(state, token) {
    //         state.refreshToken = token
    //     },
    //     logout(state) {
    //         state.isAuth = false
    //         state.authToken = ""
    //         state.refreshToken = ""
    //         this.username = ""
    //         this.email = ""
    //     },
    //     setShowLoginModal(value) {
    //         this.showLoginModal = value
    //     }
    // },
    // plugins: [createPersistedState()],

})

