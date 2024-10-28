import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import { createVuetify } from 'vuetify';
import 'vuetify/styles';

import './scss/styles.scss'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
	components,
	directives,
});

const rest = axios.create({
	baseURL: '/api',
});

rest.interceptors.request.use(
	function(config) {
		let token = localStorage.getItem("user");
		if(token)
		{
			config.headers["Authorization"] = 'Bearer ' + token;
		}
		return config;
	}
);

const app = createApp(App).use(router).use(vuetify);

app.use(VueAxios, {axios});

// define this.rest for using the properly configured axios instance
app.config.globalProperties.rest = rest;

app.mount('#vueapp');
