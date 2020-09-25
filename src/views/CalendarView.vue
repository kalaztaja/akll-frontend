<template>
  <v-flex>
    <TeamPreview />
    <SharedCalendar />
  </v-flex>
</template>

<script>
import SharedCalendar from '../components/SharedCalendar.vue';
import TeamPreview from '../components/TeamPreview.vue';

export default {
  name: 'CalendarView',
  components: {
    SharedCalendar,
    TeamPreview
  },
  props: {
    matchId: {
      type: String,
      default: ''
    }
  }
};
</script>

<style></style>
