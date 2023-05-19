import {createApp} from 'vue'
import App from './App.vue'
import components from '@/UI';
import {VueSpinners} from '@saeris/vue-spinners'
import router from "@/router/router";
import store from "@/store";
import VueYandexMetrika from 'vue-yandex-metrika'

const app = createApp(App)


components.forEach(component => {
    app.component(component.name, component)
})

app.use(VueSpinners).use(router).use(store).use(VueYandexMetrika, {
    id: 93636620,
    router: router,
    env: "production",
    debug: false,
    ignoreRoutes: [],
    skipSamePath: true,
    options: {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
    },
}).mount("#app")





