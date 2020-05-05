<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 v-for="post in posts" :key="post.id">
        <post-card :textObject="post" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PostCard from '../components/PostCard.vue';
import axios from 'axios';

export default {
  name: 'TextView',
  components: { PostCard },
  data() {
    return {
      posts: []
    };
  },
  created() {
    axios
      .get('/text/all')
      .then(response => {
        this.posts = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style></style>
