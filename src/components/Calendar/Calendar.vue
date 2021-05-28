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
            Book
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
              <label style="text-align: center;">Date</label>
              <v-text-field 
                v-model="haircut_day" 
                type="date" 
                @change="validateHaircutDay()"
                prepend-icon="mdi-calendar"
              ></v-text-field>
              <label style="text-align: center;">Haircut Type</label>
              <v-select
                v-model="haircut_type"
                :items="haircutTypes"
                menu-props="auto"
                label="Select"
                hide-details
                single-line
                @change="changePrice()"
                prepend-icon="mdi-content-cut"
              ></v-select>
              <label style="text-align: center;">Haircut Price</label>
              <v-text-field v-model="haircut_price" type="text" label="Price" readonly prepend-inner-icon="mdi-currency-usd"></v-text-field>
              <label style="text-align: center;">Payment Type</label>
              <v-select
                v-model="payment_type"
                :items="paymentTypes"
                menu-props="auto"
                label="Select"
                hide-details
                single-line
                prepend-icon="mdi-cash"
              ></v-select>
              <label style="text-align: center;">Initital Hour</label>
              <v-text-field 
                v-model="startTime" 
                type="time" 
                label="initial hour" 
                @change="validateTime()"
                prepend-inner-icon="mdi-clock"
              ></v-text-field>
              <label style="text-align: center;">End Hour</label>
              <v-text-field v-model="endTime" type="time" label="end hour" readonly prepend-inner-icon="mdi-clock-time-eleven"></v-text-field>
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
                <label style="text-align: center;">Haircut Type</label>
                <v-text-field
                  type="text"
                  readonly
                  v-model="selectedEvent.tipo_de_corte"
                  prepend-inner-icon="mdi-content-cut"
                >
                </v-text-field>
                <label style="text-align: center;">Haircut Price</label>
                <v-text-field
                  type="text"
                  readonly
                  v-model="selectedEvent.preco" 
                  prepend-inner-icon="mdi-currency-usd"
                >
                </v-text-field>
                <label style="text-align: center;">Payment Type</label>
                <v-text-field
                  type="text"
                  readonly
                  v-model="selectedEvent.tipo_pagamento"
                  prepend-inner-icon="mdi-cash"
                >
                </v-text-field>
                <label style="text-align: center;">Initital Hour</label>
                <v-text-field 
                  type="text"
                  readonly
                  v-model="selectedEvent.horario_inicial"
                  prepend-inner-icon="mdi-clock"
                >
                </v-text-field>
                <label style="text-align: center;">End Hour</label>
                <v-text-field 
                  type="text"
                  readonly
                  v-model="selectedEvent.horario_final" 
                  prepend-inner-icon="mdi-clock-time-eleven"
                >
                </v-text-field>
              </form>
              <form  v-else>
                <label style="text-align: center;">Haircut Type</label>
                <v-select
                  v-model="selectedEvent.tipo_de_corte"
                  :items="haircutTypes"
                  menu-props="auto"
                  hide-details
                  single-line
                  @change="changePrice()"
                  prepend-icon="mdi-content-cut"
                ></v-select>
                <label style="text-align: center;">Haircut Price</label>
                <v-text-field 
                  v-model="selectedEvent.preco" 
                  type="text"
                  readonly
                  prepend-inner-icon="mdi-currency-usd"
                ></v-text-field>
                <label style="text-align: center;">Payment Type</label>
                <v-select
                  v-model="selectedEvent.tipo_pagamento"
                  :items="paymentTypes"
                  menu-props="auto"
                  hide-details
                  single-line
                  prepend-icon="mdi-cash"
                ></v-select>
                <label style="text-align: center;">Initital Hour</label>
                <v-text-field 
                  v-model="selectedEvent.horario_inicial" 
                  type="time" 
                  @change="validateTime()"
                  prepend-inner-icon="mdi-clock"
                ></v-text-field>
                <label style="text-align: center;">End Hour</label>
                <v-text-field 
                  v-model="selectedEvent.horario_final" 
                  type="time" 
                  readonly
                  prepend-inner-icon="mdi-clock-time-eleven"
                ></v-text-field>
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
      haircut_type: 'Cabelo',
      haircutTypes: ['Cabelo', 'Barba'],
      payment_type: 'Money',
      paymentTypes: ['Money', 'Card'],
      haircut_type_and_prices: [
        {
          type: 'Cabelo',
          price: '10',
          time: 20
        },
        {
          type: 'Barba',
          price: '15',
          time: 15
        },
      ],
      haircut_price: '10',
      startTime: '00:00',
      endTime: '00:00',
      haircut_day: '',
      haircutDate: '',
      color:'#004080',
      user: {
        email: 'test@test.com'
      }
    }),
    mounted () {
      this.getEvents()
      //this.$refs.calendar.checkChange()
    },
    methods: { 
      async getEvents() {
        let cortes = await db.collection("events").get()
        let events = [];
        cortes.forEach(doc => {
         console.log("data", doc.data()) 
         let appData = doc.data();
         appData.id = doc.id;
         events.push(appData);
        });
        this.events = events;
      },
      async getBarberInformation() {
        let barber_information = await db.collection('barber_info').get()
      },
      async addEvent() {
        if(this.payment_type && this.haircut_type && this.startTime && this.endTime && this.haircut_day) {
          await db.collection('events').add({
            start: this.haircut_day,
            end: this.haircut_day,
            tipo_pagamento: this.payment_type,
            tipo_de_corte: this.haircut_type,
            horario_inicial: this.startTime,
            horario_final: this.endTime,
            color: this.color,
            name: this.haircut_type,
            email: this.user.email,
            //preco: this.price
          });
          this.getEvents()
          this.haircut_day = "";
          this.payment_type = "Money";
          this.haircut_type = "Cabelo";
          this.startTime = '';
          this.endTime = '';
          this.price = '10';
          this.color = '#004080';
        } else {
          alert('Name, Star date and end date are required');
        }
      },
      async updateEvent() {
        await db.collection('events').doc(this.currentlyEditing).update({
            start: this.selectedEvent.start,
            end: this.selectedEvent.end,
            tipo_pagamento: this.selectedEvent.tipo_pagamento,
            tipo_de_corte: this.selectedEvent.tipo_de_corte,
            horario_inicial: this.selectedEvent.horario_inicial,
            horario_final: this.selectedEvent.horario_final,
            name: this.selectedEvent.name
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
      showEvent({ nativeEvent, event }) {
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
      editEvent(event){
        this.currentlyEditing = event.id;
      },
      viewDay({ date }) {
        this.focus = date
        this.type = 'day'
      },
      setToday() {
        this.focus = ''
      },
      prev() {
        this.$refs.calendar.prev()
      },
      next() {
        this.$refs.calendar.next()
      },
      rnd(a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      updateRange({ start, end }) {
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
      changePrice() {
        for (let haircut of this.haircut_type_and_prices) {
          if (haircut.type == this.haircut_type){
            this.haircut_price = haircut.price
          } 
        }
      },
      validateHaircutDay() {
        let haircut_date = this.haircut_day.split('-')

        let year = parseInt(haircut_date[0])
        let month = parseInt(haircut_date[1])
        let day = parseInt(haircut_date[2])
        let date = new Date(year, month, day)

        if (date.getDay() == 2 || date.getDay() == 3) { // Sunday - Monday
          this.haircut_day = ""
          alert('Dia invalido')
        } else {
          this.haircutDate = this.haircut_day;
        }
      },
      validateTime() {
        let time = this.startTime.split(':')
        let openBarberTime = 9
        let closeBarbarTime = 20
        if (parseInt(time[0]) < openBarberTime ||  parseInt(time[0]) > closeBarbarTime) {
          this.startTime = "00:00"
          alert('Hora invalida')
        } else{
          let minutes = 0;
          let hour = parseInt(time[0]);
          for (let haircut of this.haircut_type_and_prices) {
            if (haircut.type == this.haircut_type){
              minutes = parseInt(time[1]) + haircut.time;
              if (minutes >= 60){
                minutes = minutes - 60;
                hour++;
                break
              }
            } 
          }
          let endHaircut = String(hour) + ":" + String(minutes);
          this.endTime = endHaircut
        }
      } 
    }
  }
</script>

<style lang="scss" scoped>

</style>
