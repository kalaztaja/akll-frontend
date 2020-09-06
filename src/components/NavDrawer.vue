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
      <v-list-item-content v-if="isCsgo">
        <v-list-item-title class="title">AKL</v-list-item-title>
        <v-list-item-subtitle>{{ $t('AKLTitle') }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-content v-else>
        <v-list-item-title class="title">ALL</v-list-item-title>
        <v-list-item-subtitle>{{ $t('ALLTitle') }}</v-list-item-subtitle>
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
    <template v-slot:append>
      <div>
        <v-btn-toggle v-model="toggle_exclusive" mandatory>
          <v-btn @click="swapLanguage('fi')">
            FI
          </v-btn>
          <v-btn @click="swapLanguage('en')">
            EN
          </v-btn>
        </v-btn-toggle>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavDrawer',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    isCsgo: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      drawerOpen: this.value,
      navItems: [
        {
          title: this.$i18n.t('Login'),
          icon: 'mdi-send',
          to: '/login',
          roles: ['unauthorized']
        },
        {
          title: this.$i18n.t('Logout'),
          icon: 'mdi-logout',
          to: '/logout',
          roles: ['authorized']
        },
        {
          title: this.$i18n.t('Teams'),
          icon: 'mdi-account-multiple',
          to: '/teams',
          roles: ['all']
        },
        {
          title: this.$i18n.t('Register'),
          icon: 'mdi-login',
          to: '/register',
          roles: ['unauthorized']
        },
        {
          title: this.$i18n.t('Seasons'),
          icon: 'mdi-account-multiple',
          to: '/seasons',
          roles: ['admin', 'moderator']
        }
      ],
      toggle_exclusive: undefined
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
    },

    addUserNavItems(mutation) {
      if (mutation.type === 'setTokens') {
        this.addUserProfileItem();
      } else if (mutation.type === 'setFullUserInfo') {
        this.addCurrentTeamItem;
      }
    },

    addUserProfileItem() {
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
    },
    addCurrentTeamItem() {
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
    },
    swapLanguage(targetLanguage) {
      this.$i18n.locale = targetLanguage;
      window.localStorage.setItem('Language', targetLanguage);
    }
  },

  async created() {
    await this.$store.dispatch('getFullUserInfo');
    if (this.$store.getters.loggedIn) {
      this.addUserProfileItem();
      this.addCurrentTeamItem();
    }

    this.$store.subscribe(this.addUserNavItems, { prepend: true });
  }
};
</script>

<style scoped></style>
