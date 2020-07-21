<template>
  <v-card>
    <v-form class="Register-team" @submit.prevent>
      <v-container>
        <v-row align="center">
          <v-col cols="12">
            <p class="display-1 text-center">Register your team</p>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="teamName"
              :rules="[rules.required]"
              label="Team name"
              required
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="abbreviation"
              :rules="[rules.required, rules.max]"
              label="Tag"
              counter="11"
              required
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="introductionText"
              :rules="[rules.required]"
              label="Introduction"
              required
            />
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="rank"
              :items="ranks"
              label="Rank"
              :disabled="lockcs"
            />
          </v-col>
          <v-col cols="5">
            <v-radio-group v-model="lockcs" row label="Team's game">
              <v-radio label="LoL" v-bind:value="true"></v-radio>
              <v-radio label="CS:GO" v-bind:value="false"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="6" align="end">
            <v-btn
              color="success"
              class="form-button"
              @click="registerTeam()"
              align="end"
            >
              Register
            </v-btn>
          </v-col>
        </v-row>
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
      ranks: CS_RANKS,
      lockcs: false
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
