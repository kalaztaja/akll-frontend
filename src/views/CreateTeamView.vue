<template>
  <v-card>
    <v-form class="Register-team" @submit.prevent>
      <v-container>
        <div display-2>Register your team</div>
        <v-text-field
          v-model="teamName"
          :rules="[rules.required]"
          label="Team name"
          required
        />
        <v-text-field
          v-model="abbreviation"
          :rules="[rules.required, rules.max]"
          label="Tag"
          counter="11"
          required
        />
        <v-text-field
          v-model="introductionText"
          :rules="[rules.required]"
          label="Introduction"
          required
        />
        <v-select v-model="rank" :items="ranks" label="Rank" />
        <button class="form-button" @click="registerTeam()">Register</button>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { CS_RANKS } from '../util/constants';

export default {
  name: 'TeamRegisterView',
  data() {
    return {
      teamName: '',
      abbreviation: '',
      introductionText: '',
      rank: '',
      rules: {
        required: value => !!value || 'Required.',
        max: v => (v && v.length <= 11) || 'Too long'
      },
      ranks: CS_RANKS
    };
  },
  methods: {
    registerTeam() {
      this.$store
        .dispatch('createTeam', {
          teamName: this.teamName,
          abbreviation: this.abbreviation,
          introductionText: this.introductionText,
          rank: this.rank
        })
        .then(() => {
          this.$router.push({ name: 'post-view' });
        });
    }
  }
};
</script>

<style></style>
