<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex>
        <v-row align="center">
          <v-col>
            <p id="title" class="text-left display-1">{{ $t('Teams') }}</p>
          </v-col>
          <v-col align="end">
            <v-btn
              to="/seasons/create"
              v-on="() => (this.state.show = true)"
              color="secondary"
            >
              {{ $t('CreateSeason') }}
            </v-btn>
          </v-col>
        </v-row>
        <v-divider id="divider" />

        <v-col>
          <v-row v-for="season in seasons" :key="season._id" no-gutters>
            <season-card :season="season" />
          </v-row>
        </v-col>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SeasonCard from '../components/SeasonCard';

export default {
  name: 'SeasonsView',
  components: {
    SeasonCard
  },
  state: {},
  computed: {
    seasons() {
      return this.$store.state.season.seasons;
    }
  },
  beforeCreate() {
    this.$store.dispatch('retrieveSeasons', { page: 0 });
  }
};
</script>

<style></style>
