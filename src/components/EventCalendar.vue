<template>
  <v-sheet height="800">
    <v-toolbar flat color="white">
      <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
        Today
      </v-btn>
      <v-btn fab text small color="grey darken-2" @click="prev">
        <v-icon small>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn fab text small color="grey darken-2" @click="next">
        <v-icon small>mdi-chevron-right</v-icon>
      </v-btn>
      <v-spacer />

      <v-menu bottom right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
            <span>{{ typeToLabel[type] }}</span>
            <v-icon right>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="type = 'day'">
            <v-list-item-title>Day</v-list-item-title>
          </v-list-item>
          <v-list-item @click="type = 'week'">
            <v-list-item-title>Week</v-list-item-title>
          </v-list-item>
          <v-list-item @click="type = 'month'">
            <v-list-item-title>Month</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-calendar
      ref="calendar"
      :title="'Suggestion calendar'"
      :now="today"
      :value="today"
      v-bind:events="eventArray"
      :type="type"
      color="primary"
      :weekdays="weekdays"
      v-model="today"
      @click:event="showEvent"
      @click:more="viewDay"
      @click:date="viewDay"
    />
    <v-menu
      v-model="selectedOpen"
      :close-on-content-click="false"
      :activator="selectedElement"
      offset-x
    >
      <v-card color="grey lighten-4" min-width="350px" flat>
        <v-toolbar :color="selectedEvent.color" dark>
          <v-toolbar-title v-html="selectedEvent.name" />
          <v-spacer />
        </v-toolbar>
        <v-card-text>
          <span v-html="selectedEvent.details" />
        </v-card-text>
        <v-card-actions>
          <v-btn text color="secondary" @click="selectedOpen = false">
            Cancel
          </v-btn>
          <v-spacer />
          <v-btn
            v-if="activeCalendar"
            text
            color="primary"
            @click="acceptTimeslot(selectedEvent)"
          >
            Accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-sheet>
</template>

<script>
export default {
  name: 'EventCalendar',
  props: {
    eventArray: {
      type: Array,
      default: () => {}
    },
    activeCalendar: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    today: '2020-10-01',
    type: 'month',
    weekdays: [1, 2, 3, 4, 5, 6, 0],
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day'
    },
    typeOptions: [
      { text: 'Day', value: 'day' },
      { text: 'Week', value: 'week' },
      { text: 'Month', value: 'month' }
    ],
    events: [],
    scheduledEvents: []
  }),
  mounted() {
    this.$refs.calendar.checkChange();

    var todayDate = new Date();
    var dd = String(todayDate.getDate()).padStart(2, '0');
    var mm = String(todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = todayDate.getFullYear();

    this.today = yyyy + '-' + mm + '-' + dd;
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = 'day';
    },
    setToday() {
      var todayDate = new Date();
      var dd = String(todayDate.getDate()).padStart(2, '0');
      var mm = String(todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = todayDate.getFullYear();

      this.today = yyyy + '-' + mm + '-' + dd;
      this.focus = '';
    },
    prev() {
      console.log(this.$refs.calendar);
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    acceptTimeslot(event) {
      if (event.color === 'orange') {
        console.log('event ' + JSON.stringify(event));
        this.$store
          .dispatch('acceptTimeslot', {
            matchId: event.matchId,
            _id: event._id
          })
          .then(result => {
            this.$store.dispatch('setAlertSuccess', result);
          })
          .catch(error => {
            this.$store.dispatch('setAlertError', error.response.data.message);
          });
      } else {
        this.$store.dispatch(
          'setAlertError',
          'You cannot accept your own proposals'
        );
      }
      this.selectedOpen = false;
    }
  }
};
</script>

<style />
