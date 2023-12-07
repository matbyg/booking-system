import './assets/main.css'
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
app.use(PrimeVue, {
  locale: {
    dayNamesMin: ['Sö', 'Må', 'Ti', 'On', 'To', 'Fr', 'Lö'],
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Maj',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Okt',
      'Nov',
      'Dec'
    ],
    monthNames: [
      'Januari',
      'Februari',
      'Mars',
      'April',
      'Maj',
      'Juni',
      'Juli',
      'Augusti',
      'September',
      'Oktober',
      'November',
      'December'
    ]
  }
})
app.component('PrimeButton', Button)
app.component('PrimeCalendar', Calendar)

app.mount('#app')
