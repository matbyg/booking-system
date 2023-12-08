import 'primevue/resources/themes/md-light-indigo/theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

/** PRIME VUE */
import PrimeVue from 'primevue/config'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Dialog from 'primevue/dialog'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

/** PRIME VUE */
app.use(PrimeVue)
app.component('PrimeInput', InputText)
app.component('PrimeButton', Button)
app.component('PrimeCalendar', Calendar)
app.component('PrimeDialog', Dialog)

app.mount('#app')
