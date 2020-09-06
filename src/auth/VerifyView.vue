<template>
  <v-card class="main-container">
    <v-container>
      <div v-if="!success">
        <h2 class="text-center display-1 mb-4">{{ $t('VerifyHeader') }}</h2>
        <div>{{ $t('VerifyText1') }}</div>
        <div v-if="game === 'csgo' && !isSteamLinked">
          {{ $t('VerifyTextAKL1') }}
          <router-link :to="userPage">{{ $t('VerifyTextAKL2') }}</router-link>
        </div>
        <v-spacer />
        <v-btn class="mt-6" to="/">{{ $t('FrontPage') }}</v-btn>
      </div>
      <div v-if="!error">
        <h2>{{ $t('VerifyTextError1') }}</h2>
        <div>{{ $t('VerifyTextError2') }}</div>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import { env } from '../../env';
export default {
  name: 'RegisterView',
  data() {
    return {
      success: false,
      error: false
    };
  },

  computed: {
    game() {
      return env.game;
    },

    userPage() {
      return `/user/${this.$store.getters.userInfo._id}`;
    },

    isSteamLinked() {
      return this.$store.getters.isSteamLinked;
    }
  },

  methods: {
    async linkSteam(e) {
      e.preventDefault();
      this.$store.dispatch('startSteamLinking');
    }
  },
  async created() {
    const urlParams = new URLSearchParams(window.location.search);

    const token = urlParams.get('token');
    if (token) {
      try {
        await this.$store.dispatch('verifyEmail', token);
        this.success = true;
      } catch (err) {
        this.success = false;
        this.error = true;
      }
    }
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
</style>
