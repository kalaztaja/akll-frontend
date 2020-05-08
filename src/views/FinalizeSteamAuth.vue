<template>
  <div>
    Login status: {{ status }}
    Tähän vielä loput tietojen päivitykset
    <v-form>
      <v-text-field
        block
        v-model="username"
        type="text"
        name="username"
        label="Username"
        required
      />
      <v-text-field
        block
        v-model="firstName"
        type="text"
        name="firstName"
        label="First name"
        required
      />
      <v-text-field
        block
        v-model="surname"
        type="text"
        name="surname"
        label="Last name"
        required
      />
      <v-text-field
        block
        v-model="password"
        type="password"
        name="password1"
        label="Password"
        required
      />
      <v-text-field
        block
        v-model="password2"
        type="password"
        name="password2"
        label="Confirm password"
        required
      />
      <v-text-field
        block
        v-model="email"
        :type="number"
        name="email"
        label="Email"
      />
      <v-text-field block v-model="age" type="number" name="age" label="Age" />
      <v-text-field
        block
        v-model="guild"
        :type="text"
        name="guild"
        label="Guild"
      />
      <v-text-field
        block
        v-model="university"
        :type="text"
        name="university"
        label="University"
      />
      <v-btn x-large block color="success" @click="register">Register</v-btn>
    </v-form>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';

export default {
  name: 'FinalizeSteamAuth',
  data() {
    return {
      username: '',
      firstName: '',
      surname: '',
      password: '',
      email: '',
      age: 0,
      guild: '',
      university: '',
      status: ''
    };
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);

    const status = urlParams.get('status');
    const accessToken = urlParams.get('accessToken');
    const refreshToken = urlParams.get('refreshToken');

    window.history.replaceState({}, document.title, '/akl/finalizeauth');

    if (urlParams.get('status') === 'OK' && accessToken) {
      const tokenData = jwt_decode(accessToken);
      if (!tokenData.roles.includes('unregistered')) {
        window.history.pushState({}, '', '/akl');
        return;
      }
      this.$store.commit('setTokens', {
        status,
        accessToken,
        refreshToken
      });
    } else {
      window.history.pushState({}, '', '/akl');
    }
  },
  methods: {
    register() {
      this.$store.dispatch('registerWithSteam', {
        username: this.username,
        firstName: this.firstName,
        surname: this.surname,
        age: this.age,
        guild: this.guild,
        password: this.password,
        university: this.university,
        email: this.email
      });
    }
  }
};
</script>

<style></style>
