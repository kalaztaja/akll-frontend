<template>
  <v-card>
    <v-form class="Register-team" @submit.prevent>
      <v-container>
        <v-row align="center">
          <v-col cols="12">
            <p class="display-1 text-center">{{ $t('RegisterTeam') }}</p>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="teamName"
              :rules="[rules.required]"
              :label="$t('TeamName')"
              required
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="abbreviation"
              :rules="[rules.required, rules.max]"
              :label="$t('Tag')"
              counter="11"
              required
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="introductionText"
              :rules="[rules.required]"
              :label="$t('Introduction')"
              required
            />
          </v-col>
          <v-col cols="6">
            <v-select v-model="rank" :items="ranks" :label="$t('Rank')" />
          </v-col>
          <v-col cols="6" align="end">
            <v-btn
              color="success"
              class="form-button"
              @click="registerOrEditTeam()"
              align="end"
            >
              Send
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { CS_RANKS, LOL_RANKS } from '../util/constants';
import { env } from '../../env';

export default {
  name: 'TeamRegisterView',
  data() {
    return {
      editmode: false,
      teamName: '',
      abbreviation: '',
      introductionText: '',
      rank: '',
      rules: {
        required: value => !!value || this.$i18n.t('Required'),
        max: v => (v && v.length <= 11) || this.$i18n.t('TooLong')
      }
    };
  },
  methods: {
    async registerOrEditTeam() {
      const data = {
        teamName: this.teamName,
        abbreviation: this.abbreviation,
        introductionText: this.introductionText,
        game: env.game,
        rank: this.rank
      };
      if (this.editmode) {
        await this.$store.dispatch('editTeam', data);
        this.$store.dispatch(
          'setAlertSuccess',
          this.$i18n.t('InformationUpdated')
        );
        this.$router.replace('/teams');
      } else {
        await this.$store.dispatch('createTeam', data);
        this.$store.dispatch('setAlertSuccess', this.$i18n.t('TeamCreated'));
        this.$router.replace('/teams');
      }
    },

    setTeam() {
      const {
        teamName,
        abbreviation,
        introductionText,
        rank
      } = this.$route.params.team;

      this.teamName = teamName;
      this.abbreviation = abbreviation;
      this.introductionText = introductionText;
      this.rank = rank;
      this.editmode = true;
    }
  },
  created() {
    if (this.$route.params.team) {
      this.setTeam();
    }
  },
  computed: {
    ranks() {
      if (env.game === 'csgo') {
        return CS_RANKS;
      } else {
        return LOL_RANKS;
      }
    }
  }
};
</script>

<style></style>
