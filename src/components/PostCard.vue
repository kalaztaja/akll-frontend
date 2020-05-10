<template>
  <v-card dark :to="redirectURL">
    <v-row justify="center" no-gutters>
      <v-card-title>{{ this.textObject.title }}</v-card-title>
      <v-spacer></v-spacer>
      <v-btn :to="editUrl">Edit </v-btn></v-row
    >
    <v-spacer></v-spacer>
    <v-card-text v-if="FiMode">
      <p class="text" v-if="FiLang">
        {{ this.textObject.fiText }}
      </p>
    </v-card-text>
    <v-card-text v-else>
      <p class="text">
        {{ this.textObject.fiText }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'PostCard',
  props: {
    textObject: {
      type: Object,
      default: null
    },
    FiLang: {
      type: Boolean,
      deafult: true
    }
  },
  computed: {
    FiMode() {
      return this.$store.getters.IsFiLang;
    },
    editUrl() {
      return '/post/edit/' + this.textObject._id;
    },
    redirectURL() {
      return '/post/' + this.textObject._id;
    }
  },
  actions: {
    redirectToDetails() {
      this.$router.push({
        name: 'post-detail-view',
        params: { postId: this.textObject.id }
      });
    }
  }
};
</script>

<style></style>
