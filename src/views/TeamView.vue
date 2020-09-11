<template>
  <v-card class="team-container">
    <v-container v-if="loaded">
      <h1>{{ team.teamName }} ({{ team.abbreviation }})</h1>
      <p>{{ team.introductionText }}</p>

      <h3>Members</h3>
      <div class="mb-4" v-for="member in team.members" :key="member._id">
        <team-user-card
          :user="member"
          :isOwner="isOwner"
          :isCaptain="member._id === team.captain._id"
          :kickPlayer="kickPlayer"
        />
      </div>
      <v-row class="toolbar mb-4 mx-0">
        <v-btn
          v-if="this.$store.getters.loggedIn && !isInAnyTeam"
          @click="openApplicationForm()"
        >
          {{ $t('ApplyForTeam') }}
        </v-btn>
        <confirm-dialog
          :buttonText="$t('LeaveTeam')"
          :dialogText="$t('LeaveThisTeam')"
          :callback="leaveTeam"
          v-if="isInThisTeam"
        />
        <v-btn :to="editUrl" v-if="isOwner">Edit teaminfo</v-btn>
        <v-btn
          v-if="isOwner"
          @click="openSeasonApplicationForm()"
          :disabled="team.members.length < 5"
          :to="applyUrl"
        >
          {{ $t('ApplyForSeason') }}
        </v-btn>
      </v-row>
      <v-form v-if="showApplicationForm" @submit.prevent>
        <v-col cols="12">
          <v-text-field
            v-model="applicationText"
            :rules="[rules.required]"
            :label="$t('ApplicationText')"
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
            {{ $t('SendApplication') }}
          </v-btn>
        </v-col>
      </v-form>
      <div v-if="isOwner">
        <v-btn block @click="toggleApplications()">
          {{ $t('Applications') }} ({{ team.applications.length }})
          <v-icon dark right>
            {{ showApplications ? 'mdi-menu-up' : 'mdi-menu-down' }}
          </v-icon>
        </v-btn>
        <v-list two-line v-if="showApplications">
          <v-list-item v-for="appli in team.applications" :key="appli._id">
            <v-list-item-content>
              <v-list-item-title>
                <router-link
                  :to="`/user/${appli.user._id}`"
                  style="isCsgo ? '' : 'all-teamname'"
                >
                  {{ appli.user.username }}
                </router-link>
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
              {{ $t('Accept') }}
              <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
            </v-btn>
            <v-btn color="red" @click="handleApplication(appli, false)">
              {{ $t('Deny') }}
              <v-icon dark right>mdi-cancel</v-icon>
            </v-btn>
          </v-list-item>
        </v-list>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import TeamUserCard from '../components/TeamUserCard';
import ConfirmDialog from '../components/ConfirmDialog';
import { env } from '../../env';

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
        required: value => !!value || this.$i18n.t('Required')
      }
    };
  },
  methods: {
    openApplicationForm() {
      this.showApplicationForm = true;
    },

    async toggleApplications() {
      this.showApplications = !this.showApplications;
    },

    async sendApplication() {
      try {
        await this.$store.dispatch('sendApplication', {
          applicationText: this.applicationText
        });
        this.showApplicationForm = false;
        this.$store.dispatch(
          'setAlertSuccess',
          this.$i18n.t('ApplicationSetSuccesfully')
        );
      } catch (err) {
        this.$store.dispatch('setAlertError', err.response.data.message);
      }
    },

    async handleApplication(appli, accepted) {
      await this.$store.dispatch('handleApplication', {
        userId: appli.user._id,
        accepted
      });
      // const i = this.applicationUsers.findIndex(u => u.id === appli.user);
      // this.applicationUsers.splice(i, 1);
      // lazy way to show updated data.
      await this.$store.dispatch('retrieveTeam', this.$route.params.id);
    },

    async leaveTeam() {
      await this.$store.dispatch('leaveTeam');
    },

    async kickPlayer(id) {
      await this.$store.dispatch('kickPlayer', id);
      // lazy way to show updated data.
      await this.$store.dispatch('retrieveTeam', this.$route.params.id);
    }
  },
  computed: {
    team() {
      return this.$store.state.team.currentTeam;
    },

    isOwner() {
      if (!this.$store.state.team.currentTeam.captain) return false;
      return (
        this.$store.getters.userInfo._id ===
        this.$store.state.team.currentTeam.captain._id
      );
    },
    isInThisTeam() {
      if (!Object.keys(this.$store.state.team.currentTeam).length) return false;
      return this.$store.state.team.currentTeam.members.find(
        mem => mem._id === this.$store.getters.userInfo._id
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
    },

    editUrl() {
      return {
        name: 'team-create-view',
        params: { team: this.team }
      };
    },
    loaded() {
      // bubblegumfix to prevent teamscreen flashing wrong team for a second
      return this.$store.state.team.currentTeam.id === this.$route.params.id;
    },
    isCsgo() {
      return env.game === 'csgo';
    }
  },
  async beforeCreate() {
    await this.$store.dispatch('retrieveTeam', this.$route.params.id);
    // await this.$store.dispatch('getAllTeamMembers');
  }
};
</script>

<style scoped>
.team-container {
  width: 100%;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.toolbar .v-btn {
  margin-left: 16px;
  margin-bottom: 16px;
}
.team-container h1 {
  margin-bottom: 10px;
  font-size: 40px;
}
.team-container h3 {
  font-size: 28px;
  margin-bottom: 10px;
}
.all-teamname {
  color: black !important;
}
</style>
