import {createApp} from 'vue'
import App from './App.vue'
import components from '@/UI';
import {VueSpinners} from '@saeris/vue-spinners'
import router from "@/router/router";
import store from "@/store";
import VueYandexMetrika from 'vue-yandex-metrika'
import i18n from './i18n'
// import ToastPlugin from 'vue-toast-notification';
// import 'vue-toast-notification/dist/theme-bootstrap.css';
import NotificationPlugin from "@/plugins/notification";
import "@/plugins/notification/themes/styles.css"
const app = createApp(App).use(i18n)


components.forEach(component => {
    app.component(component.name, component)
})

app.use(VueSpinners).use(router).use(store).use(VueYandexMetrika, {
    id: 93636620,
    router: router,
    env: "production",
    debug: true,
    ignoreRoutes: [],
    skipSamePath: true,
    options: {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
    },
}).use(NotificationPlugin).mount("#app")





