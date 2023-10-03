<template>
  <v-app>
    <mcity-toolbar
      fullname="fullname"
      username="username"
      presentation-text="Presentation Mode"
      :isUserAdmin="true"
      title="Vuetify 3.0 Dev Environment"
    >
      <template v-slot:buttons >
      </template>
    </mcity-toolbar>
  </v-app>
</template>

<script>
import McityToolbar from './components/McityToolbarVuetify3.0.vue'

export default {
  name: 'App',
  components: {
    McityToolbar,
  },
};
</script>
