import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin, defaultConfig  } from '@formkit/vue'
import {  useToast  } from 'vue-toast-notification'
import config from '../formkit.config'
import VueTailwindDatepicker from "vue-tailwind-datepicker";

import App from './App.vue'
import router from './router'

import "vue-toast-notification/dist/theme-sugar.css"

const $toast = useToast({
    duration: 5000,
    position: 'top-right'
})

// toast.open({
//     message: 'Probando Toast',
//     type: 'success'
// })

const app = createApp(App)
app.provide('toast', $toast)

app.use(plugin, defaultConfig(config))
app.use(VueTailwindDatepicker)
app.use(createPinia())
app.use(router)

app.mount('#app')
