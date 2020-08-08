<template>
  <v-card class="d-flex">
    <v-card-text>
      <router-link :to="redirectionURL" class="display-1 text--primary">
        {{ user.username }}
      </router-link>
    </v-card-text>
    <v-card-actions>
      <v-dialog v-model="dialog" width="500" v-if="isOwner">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="red" v-bind="attrs" v-on="on">
            Kick
            <v-icon dark right>mdi-cancel</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            Are you sure you want to kick {{ user.username }}?
          </v-card-title>

          <v-card-actions>
            <v-spacer />
            <v-btn color="red" text @click="kickPlayer()">
              Yes
            </v-btn>
            <v-btn color="white" text @click="dialog = false">
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
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
    }
  },

  data() {
    return {
      dialog: false
    };
  },

  methods: {
    kickPlayer() {
      this.dialog = false;
      console.log('halo', this.user.id);
      this.$store.dispatch('kickPlayer', this.user.id);
    }
  },

  computed: {
    redirectionURL() {
      return {
        path: `/user/${this.user.username}`,
        props: { id: this.user.username }
      };
    }
  }
};
</script>

<style></style>
