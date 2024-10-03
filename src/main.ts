import './assets/main.css'
import '@cubing/icons'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { library as iconLibrary } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faAward, faStopwatch, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

const app = createApp(App)

const pinia = createPinia()

iconLibrary.add(faGithub, faAward, faThumbsDown, faStopwatch)

app.component('font-awesome-icon', FontAwesomeIcon)

window.addEventListener('beforeunload', () => {
  const state = pinia.state.value
  localStorage.setItem('currentGame', JSON.stringify(state.game))
  localStorage.setItem('cookieConsent', JSON.stringify(state.cookieConsent))
})

app.use(pinia)

app.mount('#app')
