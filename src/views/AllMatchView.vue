<template>
  <v-container fluid>
    <h2 class="my-2">Upcoming matches</h2>
    <event-calendar
      class="calendar-class"
      v-bind:eventArray="events"
      :activeCalendar="false"
    />
    <h2 class="my-8">List of matches</h2>
    <div v-for="match in matches" :key="match._id">
      <match-preview :match="match" :link="false" />
    </div>
  </v-container>
</template>

<script>
import MatchPreview from '../components/MatchPreview.vue';
import EventCalendar from '../components/EventCalendar.vue';
import moment from 'moment';
export default {
  name: 'AllMatchView',
  components: { MatchPreview, EventCalendar },
  data() {
    return {
      matches: [],
      colors: [
        'deep-purple darken-2',
        'indigo darken-4',
        'teal darken-3',
        'green darken-4',
        'amber darken-4',
        'blue-grey darken-4',
        'grey darken-4'
      ],
      events: []
    };
  },
  mounted() {
    this.$store
      .dispatch('getConfirmedMatches')
      .then(result => {
        this.matches = result.matches;
        this.mapToEvents(this.matches);
      })
      .catch(error => {
        this.$store.dispatch('setAlertError', error.response.data.message);
      });
  },
  methods: {
    mapToEvents(matches) {
      const eventArray = [];
      matches.forEach(element => {
        var start = moment(element.acceptedTimeslot.startTime).format(
          'YYYY-MM-DD HH:mm'
        );
        var end = moment(element.acceptedTimeslot.endTime).format(
          'YYYY-MM-DD HH:mm'
        );
        const colorNumber = Math.floor(Math.random() * 7);
        eventArray.push({
          start: start,
          end: end,
          name: element.teamOne.name + ' versus ' + element.teamTwo.name,
          color: this.colors[colorNumber],
          _id: element._id,
          matchId: this.matchId
        });
      });
      this.events = eventArray;
    }
  }
};
</script>

<style scoped>
.calendar-class {
  padding-bottom: 70px;
}
</style>
