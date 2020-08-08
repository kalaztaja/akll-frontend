<template>
  <v-card :to="redirectionURL">
    <v-card-text>
      <p class="display-1 text--primary">
        {{ this.user.username }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'TeamUserCard',
  props: {
    user: {
      type: Object,
      default: null
    }
  },

  computed: {
    redirectionURL() {
      return {
        path: `/user/${this.user.username}`,
        props: { id: this.user.username }
      };
    }
  }
};
</script>

<style></style>
