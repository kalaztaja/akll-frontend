<template>
  <v-card>
    <v-container>
      <div v-if="success">
        <h2>Tunnus on aktivoitu</h2>
        <div>Voit nyt käyttää tunnustasi ja luoda tiimin.</div>
        <div v-if="game === 'csgo'">
          AKL:ää varten sinun pitää linkittää steamtilisi. Voit tehdä sen
          <router-link :to="userPage">Omasta profiilistasi.</router-link>
        </div>
      </div>
      <div v-if="error">
        <h2>Jokin meni mönkään.</h2>
        <div>Yritä uudestaan hetken päästä</div>
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
      return `/user/${this.$store.getters.userInfo._id}`
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

<style scoped></style>
