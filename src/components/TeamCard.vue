<template>
  <v-card :to="redirectionURL">
    <v-card-text>
      <div>{{ this.teamTag }}</div>
      <p class="display-1 text--primary">
        {{ this.teamName }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'TeamCard',
  props: {
    teamName: {
      type: String,
      default: ''
    },
    teamTag: {
      type: String,
      default: ''
    },
    teamId: {
      type: String,
      default: null
    }
  },
  computed: {
    redirectionURL() {
      return { path: '/teams/' + this.teamId, props: { id: this.teamId } };
    }
  }
};
</script>

<style></style>
