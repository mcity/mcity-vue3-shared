/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#00274C',
          secondary: '#FFC400',
          pop: '#575294',
          accent: '#989c97',
          error: '#9A3324',
          arbblue: '#0174BB',
          canhamblue: '#587abc',
          lsaorange: '#cc6600',
          hillbrown: '#7a121c',
          rackhamgreen: '#83b2a8'
        },
      },
    },
  },
})
