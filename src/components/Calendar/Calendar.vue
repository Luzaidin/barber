<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
          flat
        >
          <v-btn
            color="primary"
            class="mr-4"
            @click="dialog = true"
            dark
          >
            New Event
          </v-btn>
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
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
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>

      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-container>
            <v-form @submit.prevent="addEvent">
              <v-select
              v-model="payment_type"
              :items="paymentTypes"
              menu-props="auto"
              label="Select"
              hide-details
              single-line
              ></v-select>
              <v-select
              v-model="haircut_type"
              :items="haircutTypes"
              menu-props="auto"
              label="Select"
              hide-details
              single-line
              ></v-select>
              <v-text-field v-model="name" type="text" label="event name"></v-text-field>
              <v-text-field v-model="startDate" type="date" label="initial date"></v-text-field>
              <v-text-field v-model="endDate" type="date" label="end date"></v-text-field>
              <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog = false">
                Create Event
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
      
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn @click="deleteEvent(selectedEvent.id)" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <form v-if="currentlyEditing !== selectedEvent.id">
                {{selectedEvent.details}}
              </form>
              <form  v-else>
                <textarea-autosize
                v-model="selectedEvent.details"
                type="text"
                style="width:100%"
                :min-height="100"
                placeholder="add note"
                >
                </textarea-autosize>
              </form>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                v-if="currentlyEditing !== selectedEvent.id"
                @click.prevent="editEvent(selectedEvent)"
              >
                Edit
              </v-btn>
              <v-btn
                text
                v-else
                @click.prevent="updateEvent(selectedEvent)"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { db } from '@/main'

  export default {
    name: 'Calendar',
    data: () => ({
      focus: new Date(),
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      dialog: false,
      name: '',
      startDate: '',
      endDate: '',
      currentlyEditing: null,
      haircut_type: 'Barba',
      haircutTypes: ['Cabelo', 'Barba'],
      payment_type: 'Money',
      paymentTypes: ['Money', 'Card']
    }),
    mounted () {
      this.getEvents(),
      this.$refs.calendar.checkChange()
    },
    methods: { 
      async getEvents() {
        let cortes = await db.collection("events").get()
        let events = [];
        cortes.forEach(data => {
         console.log("data", data) 
        });
        this.events = events;
      },
      async addEvent() {
        if(this.name && this.starDate && this.endDate) {
          await db.collection('events').add({
            name: this.name,
            starDate: this.starDate,
            endDate: this.endDate
          });
          this.getEvents()
          this.name = "";
          this.starDate = "";
          this.endDate = "";
        } else {
          alert('Name, Star date and end date are required');
        }
      },
      async updateEvent(ev) {
        await db.collection('events').doc(this.currentlyEditing).update({
          details: ev.details
        });
        
        this.selectedOpen = false;
        this.currentlyEditing = null;
      },
      async deleteEvent(ev){
        await db.collection('events').doc(ev).delete();
        
        this.selectedOpen = false;
        this.getEvents();
      },
      getEventColor(evt) {
        return evt.color
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => {
            this.selectedOpen = true
          }, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      editEvent (event){
        this.currentlyEditing = event.id;
      },
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      updateRange ({ start, end }) {
        const events = []

        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        const days = (max.getTime() - min.getTime()) / 86400000
        const eventCount = this.rnd(days, days + 20)

        for (let i = 0; i < eventCount; i++) {
          const allDay = this.rnd(0, 3) === 0
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          const second = new Date(first.getTime() + secondTimestamp)

          events.push({
            name: this.names[this.rnd(0, this.names.length - 1)],
            start: first,
            end: second,
            color: this.colors[this.rnd(0, this.colors.length - 1)],
            timed: !allDay,
          })
        }

        this.events = events
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
