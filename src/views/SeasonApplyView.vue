<template>
  <v-container>
    <p>Tähän vielä jotain kunnon hölinää säännöistä yms.</p>
    <v-form @submit.prevent>
      <v-col cols="12">
        <v-text-field
          v-model="applicationText"
          :rules="[rules.required]"
          label="Application text"
          required
        />
      </v-col>
      <v-select :items="seasonNames" label="Select season" v-model="seasonId" />
      <v-col cols="4" align="end">
        <v-btn
          color="success"
          class="form-button"
          @click="sendApplication()"
          align="end"
        >
          Send Application
        </v-btn>
      </v-col>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'SeasonApplyView',
  data() {
    return {
      applicationText: '',
      seasonId: '',
      rules: {
        required: value => !!value || 'Required.'
      }
    };
  },
  computed: {
    seasons() {
      return this.$store.state.season.seasons;
    },

    seasonNames() {
      return this.$store.state.season.seasons.map(s => ({
        text: `${s.seasonName} ${s.seasonNumber}`,
        value: s._id
      }));
    }
  },

  methods: {
    async sendApplication() {
      this.$store.dispatch('applyForSeason', {
        applicationText: this.applicationText,
        id: this.seasonId
      });
    }
  },
  created() {
    this.$store.dispatch('retrieveSeasons', { page: 0 });
  }
};
</script>

<style scoped></style>
