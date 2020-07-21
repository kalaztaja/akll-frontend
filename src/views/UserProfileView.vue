<template>
  <v-container fluid text-xs-center>
    <v-layout row wrap>
      <v-flex>
        <div v-if="this.user.username !== undefined">
          <v-card>
            <v-spacer></v-spacer>
            <v-card-title class="justify-center display-3">
              {{ this.user.username }}
            </v-card-title>
            <v-spacer></v-spacer>
            <v-card-text class="display-1">
              University: {{ this.user.university }}
            </v-card-text>
            <v-card-text class="display-1">
              Guild: {{ this.user.guild }}
            </v-card-text>
            <v-list v-if="this.user.previousTeams.length !== 0">
              <v-subheader>Past teams</v-subheader>
              <v-list-item v-for="i in this.user.previousTeams" :key="i">
                <v-list-item-content>
                  <v-list-item-title v-text="i.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
          <v-spacer></v-spacer>
          <v-form v-if="this.user.email !== undefined">
            <v-card class="pa-2" outlined tile></v-card>
          </v-form>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'UserProfileView',
  data() {
    return {
      username: '',
      userArray: [],
      user: {}
    };
  },
  created() {
    this.username = this.$route.params.username;
    this.$store.dispatch('getUserInfo', this.username).then(response => {
      this.user = response;
    });
  }
};
</script>

<style></style>
