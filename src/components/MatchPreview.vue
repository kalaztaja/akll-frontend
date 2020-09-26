<template>
  <v-card :to="'/teams/' + teamId + '/matches/' + match_id">
    <v-container fluid>
      <v-row>
        <v-card-title>{{ match.challongeRound }}</v-card-title>
        <v-spacer />

        <v-card-title>{{ match.challongeRound }}</v-card-title>
      </v-row>
      <v-row>
        <v-card-text>{{ match.teamOne.name }}</v-card-text>
        <v-card-text>{{ match.teamTwo.name }}</v-card-text>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'MatchPreview',
  props: {
    match: {
      type: Object,
      required: true
    },
    teamId: {
      type: String,
      required: true
    }
  }
};
</script>

<style></style>
