import Vue from 'vue'
import Vuetify, {
    VApp, // required
    VNavigationDrawer,
    VFooter,
    VToolbar
} from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import es from 'vuetify/es5/locale/es'
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  theme: {
    primary: '#3A1C71',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  options: {
    customProperties: true
  },
  iconfont: 'mdi',
  lang: {
    locales: { es },
    current: 'es'
  },
  components: {
      VApp,
      VNavigationDrawer,
      VFooter,
      VToolbar
  },
  directives: {
    Ripple
  }
})
