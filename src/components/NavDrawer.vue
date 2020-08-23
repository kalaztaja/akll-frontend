<template>
  <v-navigation-drawer
    v-bind:value="drawerOpen"
    @input="onInput"
    absolute
    temporary
    right
    app
    color="dark"
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">AKL</v-list-item-title>
        <v-list-item-subtitle>Akateeminen kynäriliiga</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider />
    <v-list dense nav>
      <v-list-item
        v-for="item in filteredNavItems"
        :key="item.title"
        link
        :to="item.to"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavDrawer',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      drawerOpen: this.value,
      navItems: [
        {
          title: 'Login',
          icon: 'mdi-send',
          to: '/login',
          roles: ['unauthorized']
        },
        {
          title: 'Logout',
          icon: 'mdi-logout',
          to: '/logout',
          roles: ['authorized']
        },
        {
          title: 'Teams',
          icon: 'mdi-account-multiple',
          to: '/teams',
          roles: ['all']
        },
        {
          title: 'Register',
          icon: 'mdi-login',
          to: '/register',
          roles: ['unauthorized']
        },
        {
          title: 'Seasons',
          icon: 'mdi-account-multiple',
          to: '/seasons',
          roles: ['admin', 'moderator']
        }
      ]
    };
  },
  watch: {
    value(newValue) {
      this.drawerOpen = newValue;
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },

    filteredNavItems() {
      return this.navItems.filter(item => {
        if (this.loggedIn) {
          const { roles } = this.$store.getters.userInfo;
          return item.roles.some(
            role =>
              roles.includes(role) || role === 'all' || role === 'authorized'
          );
        }
        return item.roles.some(
          role => role === 'all' || role === 'unauthorized'
        );
      });
    }
  },
  methods: {
    onInput(isOpen) {
      this.$emit('opened', isOpen);
    }
  },

  async created() {
    await this.$store.dispatch('getFullUserInfo');
    if (this.loggedIn) {
      this.navItems.push({
        title: 'My profile',
        icon: 'mdi-account',
        to: {
          name: 'user-profile-view',
          params: {
            id: this.$store.getters.userInfo._id
          }
        },
        roles: ['authorized']
      });
    }
    if (this.$store.state.auth.fullUserInfo.currentTeams.length) {
      this.navItems.push({
        title: 'My team',
        icon: 'mdi-account',
        to: {
          name: 'team-view',
          params: {
            id: this.$store.state.auth.fullUserInfo.currentTeams[0]._id
          }
        },
        roles: ['authorized']
      });
    }
  }
};
</script>

<style scoped></style>
