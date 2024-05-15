<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card class="elevation-4">
            <v-card-title class="text-h5 font-weight-bold mb-4">Reservation List</v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="reservations"
                :items-per-page="5"
                class="elevation-1"
              >
                <template v-slot:item.name="{ item }">
                  <span>{{ item.name }}</span>
                </template>
                <template v-slot:item.email="{ item }">
                  <span>{{ item.email }}</span>
                </template>
                <template v-slot:item.date="{ item }">
                  <span>{{ formatDate(item.date) }}</span>
                </template>
                <template v-slot:item.time="{ item }">
                  <span>{{ item.time }}</span>
                </template>
                <template v-slot:item.guests="{ item }">
                  <span>{{ item.guests }}</span>
                </template>
                <template v-slot:item.notes="{ item }">
                  <span>{{ item.notes }}</span>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon small class="mr-2" @click="editReservation(item)">
                    mdi-pencil
                  </v-icon>
                  <v-icon small @click="deleteReservation(item)">
                    mdi-delete
                  </v-icon>
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
    name: 'ReservationList',
    data() {
      return {
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'Email', value: 'email' },
          { text: 'Date', value: 'date' },
          { text: 'Time', value: 'time' },
          { text: 'Guests', value: 'guests' },
          { text: 'Special Requests', value: 'notes' },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        reservations: [
          {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            date: '2023-06-15',
            time: '7:00 PM',
            guests: 4,
            notes: 'Vegetarian options preferred'
          },
          {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            date: '2023-06-17',
            time: '8:30 PM',
            guests: 2,
            notes: ''
          }
          // Add more reservations as needed
        ]
      }
    },
    methods: {
      formatDate(dateString) {
        const date = new Date(dateString)
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return date.toLocaleDateString('en-US', options)
      },
      editReservation(reservation) {
        // Implement the logic to edit the reservation
        console.log('Edit reservation:', reservation)
      },
      deleteReservation(reservation) {
        // Implement the logic to delete the reservation
        console.log('Delete reservation:', reservation)
      }
    }
  }
  </script>
  
  <style scoped>
  .v-card {
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .v-card-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #333;
  }
  </style>