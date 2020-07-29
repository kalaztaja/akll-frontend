<template>
  <v-card>
    <v-container v-if="success">
      <h2>Tunnus on aktivoitu</h2>
      <div>Voit nyt käyttää tunnustasi.</div>
      <div>
        AKL:ää varten sinun pitää linkittää steamtilisi. Voit tehdä sen
        <a @click="linkSteam">tästä.</a>
      </div>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'RegisterView',
  data() {
    return {
      success: false,
      error: false
    };
  },

  methods: {
    async verifyEmail() {
      this.$store.dispatch('startLoading');
      try {
        await this.$store.dispatch('verifyEmail', {
          token: this.token
        });
        this.success = true;
      } catch (error) {
        this.success = false;
        this.error = true;
      }

      this.$store.dispatch('stopLoading');
    },

    async linkSteam(e) {
      e.preventDefault();
      this.$store.dispatch('startSteamLinking');
    }
  },
  async created() {
    const urlParams = new URLSearchParams(window.location.search);

    const token = urlParams.get('token');
    if (token) {
      await this.$store.dispatch('verifyEmail', token);
    }
  }
};
</script>

<style scoped></style>
