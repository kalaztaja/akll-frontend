<template>
  <v-app>
    <v-card class="overflow-hidden page-card" tile flex height="100%" dark>
      <nav-bar />
      <alert-bar />
      <v-content dark class="content-container">
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <router-view />
          </v-layout>
        </v-container>
      </v-content>
    </v-card>
    <Footer class="footer" />
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue';
import AlertBar from './components/AlertBar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    AlertBar,
    Footer
  }
};
</script>

<style lang="css" scoped>
.content-container {
  padding-top: 40px !important;
  background-color: #111111;
  min-height: 98vh;
}
.page-card {
  background-color: #111111;
}
</style>
