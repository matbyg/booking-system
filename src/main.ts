import 'primevue/resources/themes/md-light-indigo/theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

/** PRIME VUE */
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

/** PRIME VUE */
app.use(PrimeVue)
app.component('PrimeButton', Button)
app.component('PrimeCalendar', Calendar)

app.mount('#app')
