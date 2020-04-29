<template>
  <v-card outlined>
    <v-form ref="loginModel" v-model="valid" lazy-validation>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="email"
              maxlength="30"
              label="Email"
              required
            ></v-text-field>
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
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
            <v-btn
              x-large
              block
              :disabled="!valid"
              color="success"
              @click="login"
              >Login</v-btn
            >
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
      this.$store
        .dispatch('retrieveToken', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: 'post-view' });
        });
    }
  }
};
</script>

<style></style>
