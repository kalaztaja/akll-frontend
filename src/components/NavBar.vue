<template>
  <v-container>
    <v-app-bar id="bar" app clipped-right :color="barColor">
      <v-btn depressed to="/" active-class="no-active" :color="barColor">
        <v-icon class="grey--text" color="white">mdi-home</v-icon>
      </v-btn>
      <v-spacer />

      <v-toolbar-title
        v-if="loading === false"
        collapse="true"
        align-center
        color="white"
        class="font-weight-medium"
      >
        <span>AKL</span>
      </v-toolbar-title>
      <v-progress-circular
        v-if="loading === true"
        indeterminate
        color="white"
      />
      <v-spacer />
      <v-btn
        :ripple="false"
        depressed
        @click.native="drawer = !drawer"
        :color="barColor"
      >
        <v-icon class="grey--text" color="white">mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <nav-drawer :value="drawer" app temporary @opened="drawerEvent($event)" />
  </v-container>
</template>

<script>
import NavDrawer from './NavDrawer.vue';

export default {
  name: 'NavBar',
  components: {
    NavDrawer
  },
  data: () => ({
    drawer: false,
    barColor: ''
  }),
  methods: {
    drawerEvent(isOpen) {
      this.drawer = isOpen;
    }
  },
  computed: {
    notificationType() {
      return this.$store.getters.getAlertType;
    },
    loading() {
      return this.$store.getters.getLoading;
    }
  },
  watch: {
    notificationType(newValue) {
      if (newValue === 2) {
        this.barColor = 'red darken-2';
      } else if (newValue === null) {
        this.barColor = '#272727';
      } else if (newValue === 0) {
        this.barColor = 'green darken-1';
      } else if (newValue === 1) {
        this.barColor = 'light-blue darken-1';
      }
    }
  }
};
</script>

<style>
.v-btn--active.no-active::before {
  color: #272727;
}
#bar,
#bar .v-btn {
  -moz-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
}
</style>
