<template>
  <form class="login-right" @submit.prevent>
    <div class="h2">Login</div>
    <div class="form-group">
      <input
        type="text"
        id="username"
        placeholder="Username"
        v-model="username"
      />
      <label for="username">Username</label>
    </div>
    <div class="form-group">
      <input
        type="password"
        id="Password"
        placeholder="Password"
        v-model="password"
      />
      <label for="Password">Password</label>
    </div>
    <div class="button-area">
      <button class="btn btn-primary pull-right" @click="login()">Login</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("retrieveToken", {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: "front-page" });
        });
    }
  }
};
</script>

<style></style>
