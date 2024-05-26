<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center mb-6">Reservation Overview</h1>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="4" lg="3" class="mb-4">
        <v-card class="rounded-lg elevation-4" outlined>
          <v-card-title class="text-h6 font-weight-bold">Total Reservations</v-card-title>
          <v-card-text class="text-center">
            <h2 class="text-h3 font-weight-bold mb-3">{{ totalReservations }}</h2>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="rounded-lg elevation-4" outlined>
          <v-card-title class="text-h6 font-weight-bold">Reservation Details</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="reservations"
              :items-per-page="5"
              class="elevation-1"
            >
              <template v-slot:item.date="{ item }">
                <span>{{ formatDate(item.date) }}</span>
              </template>
              <template v-slot:item.time="{ item }">
                <span>{{ item.time }}</span>
              </template>
              <template v-slot:item.party_size="{ item }">
                <span>{{ item.party_size }}</span>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn icon small color="primary" @click="startEditing(item)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon small color="error" @click="deleteReservation(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="showEditModal" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Reservation</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="editReservation.user" label="Name" required></v-text-field>
            <v-select
              v-model="editReservation.restaurant"
              :items="restaurants"
              label="Restaurant"
              required
            ></v-select>
            <v-text-field
              v-model="editReservation.date"
              label="Reservation Date"
              required
            ></v-text-field>
            <v-text-field
              v-model="editReservation.time"
              label="Reservation Time"
              required
            ></v-text-field>
            <v-text-field
              v-model="editReservation.party_size"
              label="Guests"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="showEditModal = false">Cancel</v-btn>
          <v-btn color="primary" text @click="updateReservation">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'ReservationOverview',
  data() {
    return {
      headers: [
        { title: 'Name', value: 'user' },
        { title: 'Reservation Date', value: 'date' },
        { title: 'Reservation Time', value: 'time' },
        { title: 'Guests Number', value: 'party_size' },
        { title: 'Actions', value: 'actions', sortable: false }
      ],
      reservations: [],
      showModal: false,
      selectedReservations: [],
      modalTitle: '',
      showEditModal: false,
      editReservation: null,
      valid: true,
      restaurants: [
        'Relaxing Koala - Branch 1',
        'Relaxing Koala - Branch 2',
        'Relaxing Koala - Branch 3'
      ]
    }
  },
  async created() {
    const token = localStorage.getItem('access')

    const response = await fetch('http://127.0.0.1:8000/api/reservations/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json()

    for (let reservation of data.results) {
      const userResponse = await fetch(`http://127.0.0.1:8000/api/users/${reservation.user}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const userData = await userResponse.json()

      this.reservations.push({
        id: reservation.id,
        user: `${userData.first_name} ${userData.last_name}`,
        restaurant: reservation.restaurant,
        date: reservation.date,
        time: reservation.time.substring(0, 5),
        party_size: reservation.party_size
      })
    }
  },
  computed: {
    todayReservations() {
      const today = new Date().toISOString().slice(0, 10)
      return this.reservations.filter((reservation) => reservation.date === today)
    },
    upcomingReservations() {
      const today = new Date().toISOString().slice(0, 10)
      return this.reservations.filter((reservation) => reservation.date > today)
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
      if (type === 'today') {
        this.selectedReservations = this.todayReservations
        this.modalTitle = "Today's Reservations"
      } else if (type === 'upcoming') {
        this.selectedReservations = this.upcomingReservations
        this.modalTitle = 'Upcoming Reservations'
      }
      this.showModal = true
    },
    startEditing(reservation) {
      this.editReservation = Object.assign({}, reservation)
      this.showEditModal = true
    },
    async updateReservation() {
      if (this.$refs.form && this.$refs.form.validate()) {
        const token = localStorage.getItem('access')

        const originalReservation = this.reservations.find((r) => r.id === this.editReservation.id)

        const updatedProperties = {}
        for (const key in this.editReservation) {
          if (this.editReservation[key] !== originalReservation[key]) {
            if (key === 'date' && this.editReservation[key] instanceof Date) {
              updatedProperties[key] = this.editReservation[key].toISOString().slice(0, 10)
            } else {
              updatedProperties[key] = this.editReservation[key]
            }
          }
        }

        const response = await fetch(
          `http://127.0.0.1:8000/api/reservations/${this.editReservation.id}/`,
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProperties)
          }
        )
        if (response.ok) {
          const updatedReservation = await response.json()

          const userResponse = await fetch(
            `http://127.0.0.1:8000/api/users/${updatedReservation.user}/`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          const userDetails = await userResponse.json()

          const index = this.reservations.findIndex((r) => r.id === updatedReservation.id)
          this.reservations.splice(index, 1, {
            ...updatedReservation,
            user: `${userDetails.first_name} ${userDetails.last_name}`,
            date: updatedReservation.date,
            time: updatedReservation.time.substring(0, 5)
          })
          this.showEditModal = false
        } else {
          console.error('Failed to update reservation:', await response.text())
        }
      }
    },
    async deleteReservation(reservation) {
      const token = localStorage.getItem('access')
      const response = await fetch(`http://127.0.0.1:8000/api/reservations/${reservation.id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.ok) {
        const index = this.reservations.findIndex((r) => r.id === reservation.id)
        this.reservations.splice(index, 1)
      } else {
        console.error('Failed to delete reservation:', await response.text())
      }
    },
    closeModal() {
      this.showModal = false
    }
  }
}
</script>

<style scoped>
.rounded-lg {
  border-radius: 1rem;
}
</style>
