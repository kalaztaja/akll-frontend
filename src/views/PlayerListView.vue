<template>
  <div>
    <li v-for="player in players" :key="player.nickname">
      {{ user.nickname }}
    </li>
  </div>
</template>

<script>
export default {
  name: 'PlayersListView',
  data() {
    return {
      players: []
    };
  },
  created() {
    this.$store.dispatch('startLoading');
    this.$store.dispatch('retrieveAllPlayers').then(response => {
      this.players = response.data;
    });
    this.$store.dispatch('stopLoading');
  }
};
</script>

<style></style>
