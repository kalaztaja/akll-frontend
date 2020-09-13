<template>
  <v-container grid-list-md class="main-container">
    <v-layout row wrap>
      <v-flex>
        <v-row align="center">
          <v-col>
            <p id="title" class="text-left display-1">{{ $t('Teams') }}</p>
          </v-col>
          <v-col align="end">
            <div v-if="!canCreateOrJoinTeam">{{ createTeamTooltip }}</div>
            <v-btn
              to="/teams/create"
              color="secondary"
              :disabled="!canCreateOrJoinTeam"
            >
              {{ $t('CreateTeam') }}
            </v-btn>
          </v-col>
        </v-row>
        <v-divider id="divider" />

        <v-col>
          <v-col v-for="team in teams" :key="team.teamName" no-gutters>
            <team-card
              :teamName="team.teamName"
              :teamTag="team.abbreviation"
              :teamId="team._id"
              :style="isCsgo ? '' : 'all-team'"
            />
          </v-col>
        </v-col>
        <v-btn v-if="page > 0" class="float-left" @click="prevPage">
          <v-icon>mdi-arrow-left</v-icon>
          {{ $t('PreviousPage') }}
        </v-btn>
        <v-btn v-if="canGoRight" class="float-right" @click="nextPage">
          {{ $t('NextPage') }}
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TeamCard from '../components/TeamCard.vue';
import { canCreateOrJoinTeam, createTeamTooltip } from '../util/utils';
import { env } from '../../env';

const PAGE_SIZE = 20;

export default {
  name: 'TeamListView',
  components: {
    TeamCard
  },
  data() {
    return {
      show: false,
      page: 0
    };
  },
  methods: {
    nextPage() {
      this.page += 1;
      if (this.$store.state.team.teams.length % PAGE_SIZE === 0) {
        this.$store.dispatch('retrieveTeams', {
          page: this.page,
          game: env.game
        });
      }
    },

    prevPage() {
      this.page -= 1;
    }
  },
  computed: {
    isCsgo() {
      return env.game === 'csgo';
    },
    teams() {
      return this.$store.state.team.teams.slice(
        this.page * PAGE_SIZE,
        (this.page + 1) * PAGE_SIZE
      );
    },
    canCreateOrJoinTeam() {
      return canCreateOrJoinTeam();
    },
    createTeamTooltip() {
      return createTeamTooltip();
    },
    canGoRight() {
      return (
        (this.page + 1) * PAGE_SIZE - this.$store.state.team.teams.length <= 0
      );
    }
  },
  created() {
    if (
      this.$store.state.team.teams.length === 0 ||
      this.$store.state.team.teams.length % PAGE_SIZE === 0
    ) {
      this.$store.dispatch('retrieveTeams', { page: 0, game: env.game });
    }
  }
};
</script>

<style scoped>
#title {
  font-size: 1.2em;
  margin-bottom: 0px;
  vertical-align: middle;
}
#divider {
  margin-bottom: 10px;
  margin-top: 10px;
}
.main-container {
  width: 100%;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}
.all-team {
  color: black !important;
}
</style>
