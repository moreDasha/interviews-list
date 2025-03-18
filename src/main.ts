import './styles/main.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { initializeApp } from 'firebase/app';

import PrimeVue from 'primevue/config';
import { PrimePreset } from './styles/PrimePreset';
import Menubar from 'primevue/menubar';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import { ProgressSpinner } from 'primevue';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column  from 'primevue/column';

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
    preset: PrimePreset
  }
});
app.use(ToastService);

app.component('app-menubar', Menubar);
app.component('app-input-wrap', InputGroup);
app.component('app-input-icon', InputGroupAddon);
app.component('app-input-text', InputText);
app.component('app-button', Button);
app.component('app-toast-service', Toast);
app.component('app-progress', ProgressSpinner);
app.component('app-card', Card);
app.component('app-table', DataTable);
app.component('app-column', Column);

app.mount('#app');
