<template
  ><v-card
    ><v-card-text>
      <div>{{ this.team }}</div>
      <p class="display-1 text--primary">
        {{ this.username }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    username: {
      type: String,
      default: "NoName"
    },
    team: {
      type: String,
      default: "Not in a team"
    },
    userId: {
      type: Number,
      default: null
    }
  }
};
</script>

<style></style>
