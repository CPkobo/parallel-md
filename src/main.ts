import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { createPinia } from 'pinia'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';



const pinia = createPinia()

createApp(App)
    .use(ArcoVue)
    .use(pinia)
    .mount('#app')
