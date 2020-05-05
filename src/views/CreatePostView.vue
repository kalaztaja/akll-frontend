<template>
  <v-content>
    <v-container>
      <v-form fluid
        ><v-text-field v-model="title" label="Title" full-width></v-text-field>
        <v-spacer></v-spacer>
        <v-textarea
          v-model="fiText"
          label="Finnish post"
          outlined
          counter
          full-width
          height
        ></v-textarea>
        <v-spacer></v-spacer>
        <v-textarea
          v-model="enText"
          label="English post"
          outlined
          counter
          full-width
          height
        ></v-textarea
      ></v-form>
      <v-btn color="success" :right="right" @click="submit">Submit</v-btn>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'CreatePost',
  data() {
    return {
      title: '',
      fiText: '',
      enText: ''
    };
  },
  methods: {
    submit() {
      this.$store.dispatch('submitPost', {
        title: this.title,
        location: '/',
        fiText: this.text,
        enText: this.text
      });
    }
  }
};
</script>

<style></style>
