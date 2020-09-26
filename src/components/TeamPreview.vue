<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>{{ team1.teamName }}</v-card-title>
          <div v-for="member in team1.members" :key="member._id">
            <team-user-card
              :user="member"
              :isCaptain="member._id === team1.captain._id"
            />
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>{{ team2.teamName }}</v-card-title>
          <div class="team2" v-for="member in team2.members" :key="member._id">
            <team-user-card
              :user="member"
              :isCaptain="member._id === team2.captain._id"
              :floatRight="true"
            />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TeamUserCard from '../components/TeamUserCard';
export default {
  name: 'TeamPreview',
  components: { TeamUserCard },
  props: {
    team1Id: {
      type: String,
      required: true
    },
    team2Id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      team1: {},
      team2: {}
    };
  },
  mounted: function() {
    setTimeout(() => {
      const t1 = this.team1Id;
      const t2 = this.team2Id;
      this.$store
        .dispatch('getTeams', {
          team1Id: t1,
          team2Id: t2
        })
        .then(result => {
          this.team1 = result[0];
          this.team2 = result[1];
        });
    }, 1000);
    console.log('t1baby' + this.team1Id);
    console.log(this.team2Id);

    console.log(this.team1);
    console.log(this.team2);
  }
};
</script>

<style scoped>
.team2 {
  width: 100%;
  align-content: right;
  justify-content: right;
}
</style>
