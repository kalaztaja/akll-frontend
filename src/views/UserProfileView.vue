<template>
  <v-container fluid text-xs-center>
    <v-layout row wrap>
      <div v-if="user">
        <v-card>
          <v-spacer />
          <v-card-title class="justify-center display-3">
            {{ user.username }}
          </v-card-title>
          <v-card-subtitle class="text-subtitle-1" v-if="user.firstName">
            {{ user.firstName }} {{ user.surname }}
          </v-card-subtitle>
          <div v-if="user.steam">
            <a :href="user.steam.profileUrl">
              <img :src="user.steam.avatar" />
            </a>
          </div>
          <v-spacer />
          <v-card-text>University: {{ user.university }}</v-card-text>
          <v-card-text>Guild: {{ user.guild }}</v-card-text>
          <v-list>
            <v-subheader>Past teams</v-subheader>
            <v-list-item v-for="i in user.previousTeams" :key="i">
              <v-list-item-content>
                <v-list-item-title v-text="i.text" />
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-spacer />
          <div class="text-body-1" v-if="isOwner">
            <v-card-text v-if="game === 'csgo' && !user.steam">
              Et ole vielä linkittänyt Steam-tiliäsi.
              <v-btn @click="startSteamLinking">
                Link Steam account
              </v-btn>
            </v-card-text>

            <v-card-text v-if="!user.emailConfirmed">
              Et ole vielä vahvistanut sähköpostiasi. Voit lähettää tästä uuden
              vahvistusviestin
              <v-btn @click="resendVerification">Lähetä</v-btn>
            </v-card-text>
          </div>
        </v-card>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import { env } from '../../env';

export default {
  name: 'UserProfileView',
  data() {
    return {
      userArray: [],
      user: {}
    };
  },

  computed: {
    isOwner() {
      return this.$store.getters.userInfo._id === this.$route.params.id;
    },
    game() {
      return env.game;
    }
  },

  methods: {
    async resendVerification() {
      this.$store.dispatch('resendVerificationEmail');
    },

    async startSteamLinking() {
      const data = await this.$store.dispatch('startSteamLinking');
      // somehow the data converts to an array ???
      window.location.href = data[0].url;
    }
  },

  async created() {
    const id = this.$route.params.id;
    this.user = await this.$store.dispatch('getUserInfoById', id);
  }
};
</script>

<style></style>
