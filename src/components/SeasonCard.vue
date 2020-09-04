<template>
  <v-card class="flex mb-4" :to="redirectionURL">
    <v-card-title>
      {{ season.seasonName }} {{ season.seasonNumber }}
    </v-card-title>
    <v-card-text>{{ season.game }}</v-card-text>
    <v-btn>
      <router-link :to="editURL">jotain</router-link>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  name: 'SeasonCard',
  props: {
    season: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    redirectionURL() {
      return {
        path: '/seasons/' + this.season._id,
        props: { id: this.season._id }
      };
    },
    editURL() {
      return {
        name: 'season-create-view',
        params: { seasonId: this.season._id }
      };
    }
  }
};
</script>

<style></style>
