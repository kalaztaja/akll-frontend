<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 v-for="user in users" :key="user.username">
        <user-card :username="user.username" :team="user.team" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UserCard from "../components/UserCard.vue";

export default {
  name: "UserListView",
  components: { UserCard },
  data() {
    return {
      users: [
        { username: "jiri", team: "jirin kakkoset" },
        { username: "jiri", team: "jirin kakkoset" },
        { username: "jiri", team: "jirin kakkoset" },
        { username: "jiri", team: "jirin kakkoset" },
        { username: "jiri", team: "jirin kakkoset" },
        { username: "jiri", team: "jirin kakkoset" },
        { username: "jiri", team: "jirin kakkoset" }
      ]
    };
  },
  created() {
    this.$store.dispatch("retrieveAllUsers").then(response => {
      this.users = response.data;
    });
    console.log(this.users);
  }
};
</script>

<style></style>
