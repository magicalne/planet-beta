import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
// Puting import here can fix circular import in `npm run dev`.
import Relays from './nostr/Relays.ts'
Relays.init()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
