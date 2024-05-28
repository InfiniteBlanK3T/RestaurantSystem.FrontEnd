import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Whale
import '@fortawesome/fontawesome-free/css/all.css'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

const vuetify = createVuetify({
  components,
  directives
})

const app = createApp(App)

if (import.meta.env.VITE_APP_ENV === 'production') {
  app.config.globalProperties.$apiUrl = import.meta.env.VITE_APP_API_URL_PROD;
} else {
  app.config.globalProperties.$apiUrl = import.meta.env.VITE_APP_API_URL_DEV;
}

console.log(`Test at main${app.config.globalProperties.$apiUrl}`);

// Register the custom directive globally
app.directive('pulse-on-hover', {
  bind(el, binding, vnode) {
    el.style.transition = 'transform 1s ease'
    el.onmouseover = function () {
      el.style.transform = 'scale(1.1)'
    }
    el.onmouseout = function () {
      el.style.transform = ''
    }
  }
})

app.use(router).use(vuetify).mount('#app')