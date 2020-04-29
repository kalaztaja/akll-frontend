<template>
  <v-container fluid text-xs-center>
    <v-layout row wrap>
      <v-flex>
        <v-card>
          <v-card-title class="justify-center" display-1
            >Welcome, {{ this.user.guild }}</v-card-title
          >
        </v-card>
        <v-spacer></v-spacer>
        <v-form>
          <v-card class="pa-2" outlined tile> </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'UserProfileView',
  data() {
    return {
      user: Object,
      userId: String
    };
  },
  created() {
    this.userId = this.$route.params.id;
    console.log(this.userId);
    console.log('userobject' + this.user);
    console.log(typeof this.userId);
    this.$store.dispatch('getUserInfo', this.userId).then(response => {
      this.user = response.data;
      console.log('updated object' + this.user);
    });
  }
};
</script>

<style></style>
