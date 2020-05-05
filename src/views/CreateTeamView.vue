<template>
  <form class="Register-team" @submit.prevent>
    <div class="h2">Register your team</div>
    <label for="firstName">Team name</label>
    <input
      type="text"
      id="team_name"
      placeholder="Team name"
      v-model="team_name"
    />
    <label for="firstName">Team tag</label>
    <input type="text" id="team_tag" placeholder="XYZ" v-model="tag" />
    <button class="form-button" @click="registerTeam()">Register</button>
  </form>
</template>

<script>
export default {
  name: 'TeamRegisterView',
  data() {
    return {
      team_name: '',
      tag: ''
    };
  },
  methods: {
    registerTeam() {
      this.$store
        .dispatch('registerTeam', {
          team_name: this.team_name,
          tag: this.tag
        })
        .then(() => {
          this.$router.push({ name: 'post-view' });
        });
    }
  }
};
</script>

<style></style>
