<template>
  <v-container>
    <p>
      From here you can send an application to a season! You can only apply
      once!
    </p>
    <v-form @submit.prevent>
      <v-col cols="12">
        <v-text-field
          v-model="applicationText"
          :rules="[rules.required]"
          :label="$t('ApplicationText')"
          required
        />
      </v-col>
      <v-select
        :items="seasonNames"
        :label="$t('SelectSeason')"
        v-model="seasonId"
      />
      <v-col cols="4" align="end">
        <v-btn
          color="success"
          class="form-button"
          @click="sendApplication()"
          align="end"
        >
          {{ $t('SendApplication') }}
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
        required: value => !!value || this.$i18n.t('Required')
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
      try {
        await this.$store.dispatch('applyForSeason', {
          applicationText: this.applicationText,
          id: this.seasonId
        });
        this.$store.dispatch(
          'setAlertSuccess',
          'Application sent succesfully!'
        );
      } catch (err) {
        this.$store.dispatch('setAlertError', err.response.data.message);
      }
    }
  },
  created() {
    this.$store.dispatch('retrieveSeasons', { page: 0 });
  }
};
</script>

<style scoped></style>
