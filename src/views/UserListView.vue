<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 v-for="user in users" :key="user.username">
        <user-card
          :username="user.username"
          :team="user.team"
          :userId="user._id"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UserCard from '../components/UserCard.vue';

export default {
  name: 'UserListView',
  components: { UserCard },
  data() {
    return {
      users: []
    };
  },
  created() {
    this.$store
      .dispatch('getAllUsers')
      .then(response => {
        console.log(response.data);
        this.users = response.data;
      })
      .catch(reject => {
        console.error(reject);
      });
  }
};
</script>

<style></style>
