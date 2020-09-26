<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>Suggest a timeslot</v-card-title>
        <v-dialog
          ref="dateDialog"
          v-model="dateDialog"
          :return-value.sync="suggestedDate"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="suggestedDate"
              label="Suggest the date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              class="mx-5"
            />
          </template>
          <v-date-picker v-model="suggestedDate" scrollable>
            <v-spacer />
            <v-btn text color="primary" @click="dateDialog = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.dateDialog.save(suggestedDate)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
        <v-dialog
          ref="timeDialog"
          v-model="timeDialog"
          :return-value.sync="suggestedTime"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="suggestedTime"
              label="Suggest the time"
              prepend-icon="mdi-clock-time-eight-outline"
              readonly
              v-bind="attrs"
              v-on="on"
              class="mx-5"
            />
          </template>
          <v-time-picker
            v-if="timeDialog"
            v-model="suggestedTime"
            full-width
            format="24h"
          >
            <v-spacer />
            <v-btn text color="primary" @click="timeDialog = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.timeDialog.save(suggestedTime)"
            >
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
        <v-container class="my-2">
          <v-btn
            depressed
            right
            color="primary"
            class="submit-button"
            @click="proposeTime()"
          >
            Send suggestion
          </v-btn>
        </v-container>
      </v-card>
      <v-spacer />
      <v-flex xs12 class="mb-3">
        <v-sheet height="800">
          <v-toolbar flat color="white">
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
            >
              Today
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small>mdi-chevron-right</v-icon>
            </v-btn>
            <v-toolbar-title class="black--text">
              Opponent suggestions and other reservations
            </v-toolbar-title>
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
            :ref="'calendar'"
            :title="'Suggestion calendar'"
            :now="today"
            :value="today"
            :events="events"
            :type="type"
            color="primary"
            :weekdays="weekdays"
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
                <v-btn text color="primary" @click="selectedOpen = false">
                  Accept
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-flex>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'SharedCalendar',
  props: {
    matchId: {
      type: String,
      default: ''
    },
    match: {
      type: Object,
      required: true
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
    colors: ['blue', 'deep-purple', 'green', 'grey darken-1'],
    events: [],
    suggestedTime: null,
    timeDialog: false,
    suggestedDate: null,
    dateDialog: false,
    scheduledEvents: []
  }),
  mounted() {
    this.$refs.calendar.checkChange();

    var todayDate = new Date();
    var dd = String(todayDate.getDate()).padStart(2, '0');
    var mm = String(todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = todayDate.getFullYear();

    this.today = yyyy + '-' + mm + '-' + dd;

    this.$store.dispatch('getLockedMatches').then(result => {
      this.scheduledEvents = result;
    });
    this.events = this.scheduledEvents.concat(this.match.proposedTimeslots);
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = 'day';
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = '';
    },
    prev() {
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
    }
  },
  proposeTime() {
    if (this.suggestedTime !== null && this.suggestedDate !== null) {
      const startingTimeslot =
        this.suggestedDate + 'T17:' + this.startTime + '.172Z';
      const endingTimeslot = this.suggestedDate + 'T17:' + '23:59' + '.172Z';

      const body = {
        matchId: this.matchId,
        startTime: startingTimeslot,
        endTime: endingTimeslot
      };
      this.$store.dispatch('proposeTimeslot', body);
    } else {
      this.$store.dispatch('setAlertError', 'Choose a date and time');
    }
  }
};
</script>

<style scoped>
.submit-button {
  right: 0;
}
.priority {
  z-index: 2;
}
</style>
