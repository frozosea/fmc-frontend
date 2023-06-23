export default {
    namespaced: true,
    state: {
        telegramUrl: "https://t.me/findmycargo",
        facebookUrl: "https://findmycargo.ru",
        twitterUrl: "https://findmycargo.ru",
        supportEmail: "support@findmycargo.ru",
    },
    getters: {
        getTelegramUrl(state) {
            return state.telegramUrl
        },
        getFacebookUrl(state) {
            return state.facebookUrl
        },
        getTwitterUrl(state) {
            return state.twitterUrl
        },
        getSupportEmail(state) {
            return state.supportEmail
        }
    }
}