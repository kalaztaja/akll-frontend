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
  name: "NavDrawer",
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
        { title: "Login", icon: "mdi-login", to: "/login", unauth: true },
        { title: "Logout", icon: "mdi-logout", to: "/logout", unauth: false },
        {
          title: "Users",
          icon: "mdi-book-account",
          to: "/users",
          unauth: null
        },
        {
          title: "Players",
          icon: "mdi-account-hard-hat",
          to: "/players",
          unauth: null
        },
        {
          title: "Teams",
          icon: "mdi-account-multiple",
          to: "/teams",
          unauth: null
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
      if (this.loggedIn) {
        return this.navItems.filter(
          item => (item.unauth === false) | (item.unauth === null)
        );
      } else {
        return this.navItems.filter(
          item => (item.unauth === true) | (item.unauth === null)
        );
      }
    }
  },
  methods: {
    onInput(isOpen) {
      this.$emit("opened", isOpen);
    }
  }
};
</script>

<style scoped></style>
