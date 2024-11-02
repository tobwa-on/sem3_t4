import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import { createVuetify } from 'vuetify';
import 'vuetify/styles';

import './scss/styles.scss'
import "@mdi/font/css/materialdesignicons.css"
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
	components,
	directives,
});

const app = createApp(App).use(router).use(vuetify);

app.use(VueAxios, {axios});

app.mount('#vueapp');
