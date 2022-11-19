import createPersistedState from "vuex-persistedstate";

const getItem = (state, item) => {
    const fromLocal = localStorage.getItem(item)
    if (fromLocal !== state[item] && fromLocal !== null) {
        console.log(fromLocal, state[item])
        state[item] = fromLocal
        return fromLocal
    } else {
        return state[item]
    }
    // try {
    //     const fromLocal = localStorage.getItem(item)
    //     console.log(fromLocal, fromLocal !== null)
    //     if (fromLocal !== state[item] && fromLocal !== null) {
    //         state[item] = fromLocal
    //         return state[item]
    //     } else {
    //         throw new Error();
    //     }
    // } catch (e) {
    //     console.log(state[item])
    //     return state[item]
    // }
}


export default {
    namespaced: true,
    state: () => {
        return {
            isAuth: false,
            email: "",
            authToken: "",
            refreshToken: "",
            showLoginModal: false
        }
    },
    mutations: {
        setIsAuth(state, value) {
            localStorage.setItem("isAuth", JSON.stringify(value))
            state.isAuth = value;
        },
        setEmail(state, email) {
            localStorage.setItem("email", email)
            state.email = email
        },
        setAuthToken(state, token) {
            localStorage.setItem("authToken", token)
            state.authToken = token
        },
        setRefreshToken(state, token) {
            localStorage.setItem("refreshToken", token)
            state.refreshToken = token
        },
        logout(state) {
            state.isAuth = false
            state.authToken = ""
            state.refreshToken = ""
            state.username = ""
            state.email = ""
            localStorage.removeItem("isAuth")
            localStorage.removeItem("authToken",)
            localStorage.removeItem("refreshToken")
            localStorage.removeItem("email")
        },
        setShowLoginModal(state, value) {
            state.showLoginModal = value
        }
    },
    getters: {
        getIsAuth(state) {
            return getItem(state, "isAuth")
        },
        getEmail(state) {
            return getItem(state, "email")
        },
        getAuthToken(state) {
            return getItem(state, "authToken")
        },
        getRefreshToken(state) {
            return getItem(state, "refreshToken")
        }
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })]

}