<template>
  <v-card dark>
    <v-card-title>{{ this.textObject.title }}</v-card-title>
    <v-spacer></v-spacer>
    <v-card-text>
      <p class="text">
        {{ this.textObject.text }}
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
    }
  }
};
</script>

<style></style>
