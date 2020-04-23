<template>
  <div>
    <li v-for="player in players" :key="player.nickname">
      {{ user.nickname }}
    </li>
  </div>
</template>

<script>
export default {
  name: "PlayersListView",
  data() {
    return {
      players: []
    };
  },
  created() {
    this.$store.dispatch("retrieveAllPlayers").then(response => {
      this.players = response.data;
    });
    console.log(this.players);
  }
};
</script>

<style></style>
