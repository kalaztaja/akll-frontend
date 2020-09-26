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
          ref="startTimeDialog"
          v-model="startTimeDialog"
          :return-value.sync="suggestedStartTime"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="suggestedStartTime"
              label="Suggest the start time"
              prepend-icon="mdi-clock-time-eight-outline"
              readonly
              v-bind="attrs"
              v-on="on"
              class="mx-5"
            />
          </template>
          <v-time-picker
            v-if="startTimeDialog"
            v-model="suggestedStartTime"
            full-width
            format="24h"
          >
            <v-spacer />
            <v-btn text color="primary" @click="startTimeDialog = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.startTimeDialog.save(suggestedStartTime)"
            >
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
        <v-dialog
          ref="endTimeDialog"
          v-model="endTimeDialog"
          :return-value.sync="suggestedEndTime"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="suggestedEndTime"
              label="Suggest the end time"
              prepend-icon="mdi-clock-time-eleven-outline"
              readonly
              v-bind="attrs"
              v-on="on"
              class="mx-5"
            />
          </template>
          <v-time-picker
            v-if="endTimeDialog"
            v-model="suggestedEndTime"
            full-width
            format="24h"
          >
            <v-spacer />
            <v-btn text color="primary" @click="endTimeDialog = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.endTimeDialog.save(suggestedEndTime)"
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
      <event-calendar v-bind:eventArray="events" />
    </v-col>
  </v-row>
</template>

<script>
import EventCalendar from '../components/EventCalendar.vue';

export default {
  name: 'SharedCalendar',
  components: {
    EventCalendar
  },
  props: {
    matchId: {
      type: String,
      default: ''
    },
    matchProp: {
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

    suggestedStartTime: null,
    suggestedEndTime: null,
    startTimeDialog: false,
    endTimeDialog: false,
    suggestedDate: null,
    dateDialog: false,
    match: {}
  }),
  mounted() {
    this.match = this.matchProp;
    this.$store.dispatch('getMatchById', this.matchId).then(result => {
      this.match = result;
      this.mapMatchToTimeslots();
    });
    console.log(this.events);
  },
  methods: {
    proposeTime() {
      if (
        this.suggestedStartTime !== null &&
        this.suggestedDate !== null &&
        this.suggestedEndTime !== null
      ) {
        const startingTimeslot =
          this.suggestedDate + 'T17:' + this.suggestedStartTime + '.172Z';
        const endingTimeslot =
          this.suggestedDate + 'T17:' + this.suggestedEndTime + '.172Z';

        const body = {
          matchId: this.matchId,
          startTime: startingTimeslot,
          endTime: endingTimeslot
        };
        this.$store.dispatch('proposeTimeslot', body).catch(error => {
          console.log(error);
        });
      } else {
        this.$store.dispatch('setAlertError', 'Choose a date and time');
      }
    },
    mapMatchToTimeslots() {
      const eventArray = [];
      this.match.proposedTimeslots.forEach(element => {
        var startValue = element.startTime.substring(0, 10);
        var startTime = element.startTime.substring(14, 19);
        var endValue = element.endTime.substring(0, 10);
        var endTime = element.endTime.substring(14, 19);
        var startTimeSlot = startValue + ' ' + startTime;
        var endTimeSlot = endValue + ' ' + endTime;
        eventArray.push({
          start: startTimeSlot,
          end: endTimeSlot,
          name: element._id
        });
      });
      console.log(
        'here we had an array ' + JSON.stringify(this.match.proposedTimeslots)
      );
      console.log('and here is the result ' + JSON.stringify(eventArray));
      this.events = eventArray;
      console.log(JSON.stringify(this.events));
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
