<template>
  <v-app>
    <v-card class="overflow-hidden" tile flex height="100%">
      <nav-bar />
      <v-content>
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

export default {
  name: 'App',
  components: {
    NavBar
  }
};
</script>

<style lang="scss" scoped></style>
