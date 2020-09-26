<template>
  <v-container fluid>
    <div v-for="match in matches" :key="match._id">
      <match-preview :match="match" />
    </div>
  </v-container>
</template>

<script>
import MatchPreview from '../components/MatchPreview.vue';

export default {
  name: 'TeamMatchesView',
  components: {
    MatchPreview
  },
  data() {
    return {
      matches: []
    };
  },
  mounted() {
    this.$store
      .dispatch('getTeamMatches', this.$route.params.id)
      .then(result => {
        this.matches = result;
      });
  }
};
</script>

<style></style>
