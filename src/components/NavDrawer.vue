<template>
  <v-navigation-drawer
    v-bind:value="drawerOpen"
    @input="onInput"
    absolute
    temporary
    right
    style="position:fixed; top:0; right:0; overflow-y:scroll;"
    color="dark"
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">AKL</v-list-item-title>
        <v-list-item-subtitle>Akateeminen kynäriliiga</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
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
          title: 'Users',
          icon: 'mdi-book-account',
          to: '/users',
          roles: ['all']
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
  }
};
</script>

<style scoped></style>
