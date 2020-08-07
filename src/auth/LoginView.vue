<template>
  <v-card outlined>
    <v-form ref="loginModel" v-model="valid" lazy-validation>
      <v-container v-on:keyup.enter="login">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="email"
              maxlength="30"
              label="Email"
              required
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              autocomplete="new-password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              counter
              @click:append="show1 = !show1"
            />
          </v-col>
          <v-spacer />
          <v-col class="d-flex flex-column justify-space-between flex-sm-row">
            <v-btn
              x-large
              class="mb-4"
              inlineblock
              color="success"
              href="/aklapi/integration/steam/login"
            >
              Login with Steam
            </v-btn>
            <v-btn
              x-large
              inlineblock
              :disabled="!valid"
              color="success"
              @click="login"
            >
              Login
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      show1: false,
      valid: true
    };
  },
  methods: {
    login() {
      this.$store.dispatch('startLoading');
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$store.dispatch('setAlertSuccess', 'Logged in!');
          this.$router.push({ name: 'post-view' });
        })
        .catch(() => {
          this.$store.dispatch('setAlertError', 'Incorrect email or password');
        });
      this.$store.dispatch('stopLoading');
    }
  }
};
</script>

<style></style>
