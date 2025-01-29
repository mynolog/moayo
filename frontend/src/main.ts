import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPersistState from 'pinia-plugin-persistedstate';
import App from './App.vue';
import router from './router';
import './assets/index.css';

const pinia = createPinia();
pinia.use(piniaPersistState);

createApp(App).use(pinia).use(router).mount('#app');
