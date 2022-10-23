import { createApp } from 'vue'
import App from './App.vue'
import components from '@/UI';
import { VueSpinners } from '@saeris/vue-spinners'

const app = createApp(App)

// createApp(App).mount('#app')

components.forEach(component => {
    app.component(component.name, component)
})

app.
    use(VueSpinners).
    mount("#app")