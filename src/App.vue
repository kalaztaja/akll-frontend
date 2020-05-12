<template>
  <v-app>
    <v-card class="overflow-hidden" tile flex height="100%" dark>
      <nav-bar />
      <alert-bar />
      <v-content dark>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <router-view />
          </v-layout>
        </v-container>
      </v-content>
    </v-card>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue';
import AlertBar from './components/AlertBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    AlertBar
  }
};
</script>

<style lang="scss" scoped></style>
