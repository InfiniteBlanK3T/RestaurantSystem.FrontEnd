<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold mb-4">Reservation Overview</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="elevation-4 rounded-lg">
          <v-card-title class="text-h6 font-weight-bold">Today's Reservations</v-card-title>
          <v-card-text>
            <div class="text-h4 font-weight-bold mb-2">{{ todayReservations.length }}</div>
            <v-btn color="primary" text @click="viewReservations('today')">View Details</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="elevation-4 rounded-lg">
          <v-card-title class="text-h6 font-weight-bold">Upcoming Reservations</v-card-title>
          <v-card-text>
            <div class="text-h4 font-weight-bold mb-2">{{ upcomingReservations.length }}</div>
            <v-btn color="primary" text @click="viewReservations('upcoming')">View Details</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="elevation-4 rounded-lg">
          <v-card-title class="text-h6 font-weight-bold">Total Reservations</v-card-title>
          <v-card-text>
            <div class="text-h4 font-weight-bold mb-2">{{ totalReservations }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="elevation-4 rounded-lg">
          <v-card-title class="text-h6 font-weight-bold">Reservation Details</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="reservations"
              :items-per-page="5"
              class="elevation-1"
            >
              <template v-slot:item.reservationDate="{ item }">
                <span>{{ formatDate(item.reservationDate) }}</span>
              </template>
              <template v-slot:item.reservationTime="{ item }">
                <span>{{ item.reservationTime }}</span>
              </template>
              <template v-slot:item.guests="{ item }">
                <span>{{ item.guests }}</span>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editReservation(item)"> mdi-pencil </v-icon>
                <v-icon small @click="cancelReservation(item)"> mdi-delete </v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ReservationOverview',
  data() {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Reservation Date', value: 'reservationDate' },
        { text: 'Reservation Time', value: 'reservationTime' },
        { text: 'Guests', value: 'guests' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      reservations: [
        {
          id: 1,
          name: 'John Doe',
          reservationDate: '2023-06-15',
          reservationTime: '7:00 PM',
          guests: 4
        },
        {
          id: 2,
          name: 'Jane Smith',
          reservationDate: '2023-06-17',
          reservationTime: '8:30 PM',
          guests: 2
        },
        {
          id: 3,
          name: 'Michael Johnson',
          reservationDate: '2023-06-20',
          reservationTime: '6:00 PM',
          guests: 6
        }
        // Add more reservations as needed
      ]
    }
  },
  computed: {
    todayReservations() {
      const today = new Date().toISOString().slice(0, 10)
      return this.reservations.filter((reservation) => reservation.reservationDate === today)
    },
    upcomingReservations() {
      const today = new Date().toISOString().slice(0, 10)
      return this.reservations.filter((reservation) => reservation.reservationDate > today)
    },
    totalReservations() {
      return this.reservations.length
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return date.toLocaleDateString('en-US', options)
    },
    viewReservations(type) {
      // Implement the logic to view reservations of the specified type
      console.log(`View ${type} reservations`)
    },
    editReservation(reservation) {
      // Implement the logic to edit the reservation
      console.log('Edit reservation:', reservation)
    },
    cancelReservation(reservation) {
      // Implement the logic to cancel the reservation
      console.log('Cancel reservation:', reservation)
    }
  }
}
</script>

<style scoped>
.rounded-lg {
  border-radius: 1rem;
}
</style>
