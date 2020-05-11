<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-row align="center" md>
        <v-col>
          <p id="title" class="text-left; font-weight-medium">Users</p>
        </v-col>
        <v-col align="end" justify-content>
          <v-text-field
            v-model="userSearchWord"
            placeholder="Search user"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-flex xs12 v-for="user in userList" :key="user.username">
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
      users: [],
      userSearchWord: ''
    };
  },
  created() {
    this.$store.dispatch('getAllUsers').then(response => {
      this.users = response;
    });
  },
  computed: {
    userList() {
      if (this.userSearchWord !== '') {
        return this.users.filter(user =>
          user.username
            .toLowerCase()
            .includes(this.userSearchWord.toLowerCase())
        );
      } else {
        return this.users;
      }
    }
  }
};
</script>

<style>
.v-text-field__slot input {
  text-align: right;
}
</style>
