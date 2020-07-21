<template>
  <v-card :to="redirectionURL">
    <v-card-text>
      <div>{{ this.team }}</div>
      <p class="display-1 text--primary">
        {{ this.username }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    username: {
      type: String,
      default: 'NoName'
    },
    team: {
      type: String,
      default: ''
    },
    userId: {
      type: String,
      default: null
    }
  },
  computed: {
    redirectionURL() {
      return { path: '/user/' + this.username, props: { id: this.username } };
    }
  }
};
</script>

<style></style>
