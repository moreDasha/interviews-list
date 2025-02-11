import './assets/main.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { initializeApp } from 'firebase/app';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Menubar from 'primevue/menubar';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import App from './App.vue';
import router from './router';

const firebaseConfig = {
  apiKey: 'AIzaSyDbnrwjfT0T5PrbCg2PLvjfKo1_f0fvFqs',
  authDomain: 'interviews-list-99911.firebaseapp.com',
  projectId: 'interviews-list-99911',
  storageBucket: 'interviews-list-99911.firebasestorage.app',
  messagingSenderId: '1042524787486',
  appId: '1:1042524787486:web:4cc58eb75509f76ec52f0f'
};
initializeApp(firebaseConfig);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});

app.component('app-menubar', Menubar);
app.component('app-input-wrap', InputGroup);
app.component('app-input-icon', InputGroupAddon);
app.component('app-input-text', InputText);
app.component('app-button', Button);

app.mount('#app');
