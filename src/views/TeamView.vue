<template>
  <v-container>
    <h1>{{ team.teamName }}</h1>
    <h3>{{ team.abbreviation }}</h3>
    <p>{{ team.introductionText }}</p>

    <confirm-dialog
      buttonText="Leave team"
      dialogText="leave this team"
      :callback="leaveTeam"
      v-if="isInThisTeam"
    />
    <h3>Members</h3>
    <div v-for="member in members" :key="member._id">
      <team-user-card :user="member" :isOwner="isOwner" />
    </div>
    <v-btn
      v-if="this.$store.getters.loggedIn && !isInAnyTeam"
      @click="openApplicationForm()"
    >
      Apply for team
    </v-btn>
    <v-btn
      v-if="isOwner"
      @click="openSeasonApplicationForm()"
      :disabled="team.members.length < 5"
      :to="applyUrl"
    >
      Apply for season
    </v-btn>
    <v-form v-if="showApplicationForm" @submit.prevent>
      <v-col cols="12">
        <v-text-field
          v-model="applicationText"
          :rules="[rules.required]"
          label="Application text"
          required
        />
      </v-col>
      <v-col cols="4" align="end">
        <v-btn
          color="success"
          class="form-button"
          @click="sendApplication()"
          align="end"
        >
          Send Application
        </v-btn>
      </v-col>
    </v-form>
    <div v-if="isOwner">
      <v-btn block @click="toggleApplications()">
        Applications ({{ team.applications.length }})
        <v-icon dark right>
          {{ showApplications ? 'mdi-menu-up' : 'mdi-menu-down' }}
        </v-icon>
      </v-btn>
      <v-list
        two-line
        v-if="
          showApplications &&
            applicationUsers.length === team.applications.length
        "
      >
        <v-list-item v-for="(appli, i) in team.applications" :key="appli._id">
          <v-list-item-content>
            <v-list-item-title>
              {{ applicationUsers[i].username }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ appli.applicationText }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-btn
            color="green"
            class="mr-4"
            @click="handleApplication(appli, true)"
          >
            Accept
            <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
          </v-btn>
          <v-btn color="red" @click="handleApplication(appli, false)">
            Deny
            <v-icon dark right>mdi-cancel</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </div>
  </v-container>
</template>

<script>
import TeamUserCard from '../components/TeamUserCard';
import ConfirmDialog from '../components/ConfirmDialog';

export default {
  name: 'TeamView',
  components: { TeamUserCard, ConfirmDialog },
  data() {
    return {
      showApplicationForm: false,
      showApplications: false,
      applicationText: '',
      applicationUsers: [],
      rules: {
        required: value => !!value || 'Required.'
      }
    };
  },
  methods: {
    openApplicationForm() {
      this.showApplicationForm = true;
    },

    async toggleApplications() {
      if (this.applicationUsers.length !== this.team.applications.length) {
        this.applicationUsers = await this.$store.dispatch(
          'getApplicationUsers'
        );
      }
      this.showApplications = !this.showApplications;
    },

    async sendApplication() {
      await this.$store.dispatch('sendApplication', {
        applicationText: this.applicationText
      });
    },

    async handleApplication(appli, accepted) {
      await this.$store.dispatch('handleApplication', {
        userId: appli.user,
        accepted
      });
      const i = this.applicationUsers.findIndex(u => u.id === appli.user);
      this.applicationUsers.splice(i, 1);
    },

    async leaveTeam() {
      await this.$store.dispatch('leaveTeam');
    }
  },
  computed: {
    team() {
      return this.$store.state.team.currentTeam;
    },

    members() {
      return this.$store.state.team.currentTeamUsers;
    },

    isOwner() {
      return (
        this.$store.getters.userInfo._id ===
        this.$store.state.team.currentTeam.captain
      );
    },
    isInThisTeam() {
      return this.$store.state.team.currentTeam.members.includes(
        this.$store.getters.userInfo._id
      );
    },

    isInAnyTeam() {
      if (this.$store.getters.loggedIn && this.$store.state.auth.fullUserInfo) {
        return this.$store.state.auth.fullUserInfo.currentTeams.length > 0;
      }
      return false;
    },

    applyUrl() {
      return { path: '/seasons/apply' };
    }
  },
  async beforeCreate() {
    await this.$store.dispatch('retrieveTeam', this.$route.params.id);
    await this.$store.dispatch('getAllTeamMembers');
  }
};
</script>

<style></style>
