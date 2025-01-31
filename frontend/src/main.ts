import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPersistState from 'pinia-plugin-persistedstate';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import './assets/index.css';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersistState);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(pinia).use(router).mount('#app');
