<template>
  <v-card class="d-flex">
    <v-card-text>
      <router-link
        v-if="isCsgo"
        :to="redirectionURL"
        :class="[
          floatRight
            ? ['team-username', 'text--primary', 'float-right']
            : ['team-username', 'text--primary']
        ]"
      >
        {{ user.username }}
      </router-link>
      <router-link
        v-else
        :to="redirectionURL"
        :class="[
          floatRight
            ? ['team-username', 'all-team-member', 'float-right']
            : ['team-username', 'all-team-member']
        ]"
      >
        {{ user.username }}
      </router-link>
      <v-icon v-if="isCaptain" dark right>mdi-crown-outline</v-icon>
    </v-card-text>
    <v-card-actions>
      <v-dialog v-model="dialog" width="500" v-if="isOwner && !isCaptain">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="red" v-bind="attrs" v-on="on">
            {{ $t('Kick') }}
            <v-icon dark right>mdi-cancel</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            {{ $t('AreYouSureYouWantKick') }} {{ user.username }}?
          </v-card-title>

          <v-card-actions>
            <v-spacer />
            <v-btn color="red" text @click="kick()">{{ $t('Yes') }}</v-btn>
            <v-btn color="white" text @click="dialog = false">
              {{ $t('Cancel') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import { env } from '../../env';

export default {
  name: 'TeamUserCard',
  props: {
    user: {
      type: Object,
      default: null
    },
    isOwner: {
      type: Boolean,
      default: false
    },
    isCaptain: {
      type: Boolean,
      default: false
    },
    kickPlayer: {
      type: Function,
      default: () => {}
    },
    floatRight: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      dialog: false
    };
  },

  methods: {
    kick() {
      this.dialog = false;
      this.kickPlayer(this.user._id);
    }
  },

  computed: {
    redirectionURL() {
      return {
        path: `/user/${this.user._id}`,
        props: { id: this.user._id }
      };
    },
    isCsgo() {
      return env.game === 'csgo';
    }
  }
};
</script>

<style>
.team-username {
  font-size: 24px;
}
.all-team-member {
  color: black !important;
}
</style>
