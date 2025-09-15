import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#667eea',
          secondary: '#764ba2',
          accent: '#f093fb',
          error: '#f44336',
          warning: '#ff9800',
          info: '#2196f3',
          success: '#4caf50',
          background: '#f5f7fa',
          surface: '#ffffff',
          'on-primary': '#ffffff',
          'on-secondary': '#ffffff',
          'on-surface': '#212121',
          'on-background': '#212121'
        }
      },
      dark: {
        colors: {
          primary: '#667eea',
          secondary: '#764ba2',
          accent: '#f093fb',
          error: '#f44336',
          warning: '#ff9800',
          info: '#2196f3',
          success: '#4caf50',
          background: '#121212',
          surface: '#1e1e1e',
          'on-primary': '#ffffff',
          'on-secondary': '#ffffff',
          'on-surface': '#ffffff',
          'on-background': '#ffffff'
        }
      }
    }
  },
  defaults: {
    VBtn: {
      style: 'text-transform: none; font-weight: 600;',
      rounded: 'lg'
    },
    VCard: {
      rounded: 'lg'
    },
    VTextField: {
      rounded: 'lg'
    },
    VSelect: {
      rounded: 'lg'
    },
    VTextarea: {
      rounded: 'lg'
    },
    VDialog: {
      transition: 'dialog-transition'
    }
  }
})
