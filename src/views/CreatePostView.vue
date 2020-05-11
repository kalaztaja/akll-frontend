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
      enText: '',
      editMode: false
    };
  },
  methods: {
    submit() {
      if (this.editMode === false) {
        this.$store
          .dispatch('submitPost', {
            title: this.title,
            location: '/',
            fiText: this.fiText,
            enText: this.enText
          })
          .then(() => {
            this.$router.push({ name: 'post-view' });
          })
          .catch(() => {
            //TODO
          });
      } else {
        this.$store
          .dispatch('updatePost', {
            title: this.title,
            location: '/',
            fiText: this.fiText,
            enText: this.enText,
            _id: this.PostId
          })
          .then(() => {
            this.$router.push({ name: 'post-view' });
          });
      }
    }
  },
  created() {
    this.PostId = this.$route.params.id;
    if (this.PostId !== '') {
      this.$store
        .dispatch('getPostId', {
          id: this.PostId
        })
        .then(response => {
          this.title = response.title;
          this.fiText = response.fiText;
          this.enText = response.enText;
          this.editMode = true;
        })
        .catch(() => {
          //TODO
        });
    }
  }
};
</script>

<style></style>
