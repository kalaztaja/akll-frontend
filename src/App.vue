<template>
  <v-app>
    <v-card
      v-if="envGame === 'csgo'"
      class="overflow-hidden page-card"
      tile
      flex
      height="100%"
      dark
    >
      <nav-bar />
      <alert-bar />
      <v-content dark class="akl-content-container">
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <router-view />
          </v-layout>
        </v-container>
      </v-content>
    </v-card>
    <v-card
      v-else
      class="overflow-hidden page-card"
      tile
      flex
      height="100%"
      light
    >
      <nav-bar v-bind:isCsgo="csgo" />
      <alert-bar />
      <v-content light class="all-content-container">
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <router-view />
          </v-layout>
        </v-container>
      </v-content>
    </v-card>
    <Footer class="footer" v-bind:isCsgo="csgo" />
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue';
import AlertBar from './components/AlertBar.vue';
import Footer from './components/Footer.vue';

import { env } from '../env';

export default {
  name: 'App',
  components: {
    NavBar,
    AlertBar,
    Footer
  },
  computed: {
    envGame() {
      return env.game;
    },
    csgo() {
      return env.game === 'csgo' ? true : false;
    }
  }
};
</script>

<style lang="css" scoped>
.akl-content-container {
  padding-top: 40px !important;
  background-color: #111111;
  min-height: 98vh;
}
.all-content-container {
  padding-top: 40px !important;
  background-color: #c4c4c4;
  min-height: 98vh;
}
.page-card {
  background-color: #111111;
}
</style>
