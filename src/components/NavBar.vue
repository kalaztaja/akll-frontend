<template>
  <v-container>
    <v-app-bar dark app clipped-right>
      <v-btn depressed to="/" active-class="no-active">
        <v-icon class="grey--text">mdi-home</v-icon>
      </v-btn>
      <v-spacer></v-spacer>

      <v-toolbar-title class="grey--text" collapse="true" align-center>
        <span>AKL</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn :ripple="false" depressed @click.native="drawer = !drawer">
        <v-icon class="grey--text">mdi-menu</v-icon>
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
    drawer: false
  }),
  methods: {
    drawerEvent(isOpen) {
      this.drawer = isOpen;
    }
  }
};
</script>

<style>
.v-btn--active.no-active::before {
  color: #272727;
}
</style>
