<template>
  <v-container fluid>
    <v-card block v-if="user" class="main-container">
      <div class="d-flex justify-space-between flex-column flex-sm-row">
        <div>
          <v-card-title class="display-3">
            {{ user.username }}
          </v-card-title>
          <v-card-subtitle class="text-subtitle-1" v-if="user.firstName">
            {{ user.firstName }} {{ user.surname }}
          </v-card-subtitle>
        </div>
        <div v-if="user.steam">
          <a :href="user.steam.profileUrl">
            <img class="avatar" :src="user.steam.avatar" />
          </a>
        </div>
      </div>
      <v-spacer />
      <v-card-text>University: {{ user.university }}</v-card-text>
      <v-card-text>Guild: {{ user.guild }}</v-card-text>
      <v-list>
        <v-subheader>Nykyinen tiimi</v-subheader>
        <v-list-item v-for="team in user.currentTeams" :key="team._id">
          <v-list-item-content>
            <router-link :to="`/teams/${team._id}`">
              {{ team.teamName }}
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-spacer />
      <div class="text-body-1 pa-4" v-if="isOwner">
        <h2 class="mb-4">Tunnuksen hallinta</h2>
        <div class="d-flex mb-4">
          <div class="link-info">
            <span>Sähköposti vahvistettu:</span>
            <v-icon>
              {{ user.emailConfirmed ? 'mdi-check' : 'mdi-alert-circle' }}
            </v-icon>
          </div>
          <div
            class="d-flex"
            style="flex-basis: 50%;"
            v-if="!user.emailConfirmed"
          >
            <v-btn class="link-btn">
              Lähetä vahvistusviesti
            </v-btn>
          </div>
        </div>

        <div class="d-flex mb-4" v-if="game === 'csgo'">
          <div class="link-info">
            <span>Steamtili yhdistetty:</span>
            <v-icon>{{ user.steam ? 'mdi-check' : 'mdi-alert-circle' }}</v-icon>
          </div>
          <div class="d-flex" style="flex-basis: 50%;" v-if="!user.steam">
            <v-btn class="link-btn">
              Linkitä Steam-tili
            </v-btn>
          </div>
        </div>

        <v-btn class="mb-4" block :to="userEditUrl">Muokkaa tietojasi</v-btn>
        <v-btn class="mb-4" block @click="togglePasswordChange">
          Vaihda salasana
          <v-icon dark right>
            {{ showPasswordChange ? 'mdi-menu-up' : 'mdi-menu-down' }}
          </v-icon>
        </v-btn>
        <password-change
          v-if="showPasswordChange"
          :userId="user._id"
          :successCallback="togglePasswordChange"
        />
        <v-btn class="mb-4" block @click="toggleEmailChange">
          Vaihda sähköpostiosoite
          <v-icon dark right>
            {{ showEmailChange ? 'mdi-menu-up' : 'mdi-menu-down' }}
          </v-icon>
        </v-btn>
        <email-change
          v-if="showEmailChange"
          :userId="user._id"
          :successCallback="toggleEmailChange"
        />
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { env } from '../../env';

import PasswordChange from '../components/PasswordChange';
import EmailChange from '../components/EmailChange';

export default {
  name: 'UserProfileView',
  components: {
    PasswordChange,
    EmailChange
  },
  data() {
    return {
      userArray: [],
      user: {},
      showPasswordChange: false,
      showEmailChange: false
    };
  },

  computed: {
    isOwner() {
      return this.$store.getters.userInfo._id === this.$route.params.id;
    },
    game() {
      return env.game;
    },
    userEditUrl() {
      return {
        name: 'user-edit-view',
        params: {
          user: this.user
        }
      };
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
    },

    togglePasswordChange() {
      this.showPasswordChange = !this.showPasswordChange;
    },

    toggleEmailChange() {
      this.showEmailChange = !this.showEmailChange;
    }
  },

  async created() {
    const id = this.$route.params.id;
    this.user = await this.$store.dispatch('getUserInfoById', id);
  }
};
</script>

<style scoped>
.main-container {
  width: 100%;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}
.avatar {
  width: 150px;
  height: 150px;
}
.spacer {
  border-bottom: 1px solid darkgrey;
}
.link-info {
  justify-content: space-between;
  display: flex;
  flex-basis: 50%;
  line-height: 36px;
}
.link-btn {
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
}
</style>
