import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPersistState from 'pinia-plugin-persistedstate';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { VueQueryPlugin } from '@tanstack/vue-query';
import queryClient from './plugins/vue-query';
import App from './App.vue';
import router from './router';
import './assets/index.css';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersistState);

app.component('font-awesome-icon', FontAwesomeIcon);

app
  .use(VueQueryPlugin, {
    queryClient,
  })
  .use(pinia)
  .use(router)
  .mount('#app');
