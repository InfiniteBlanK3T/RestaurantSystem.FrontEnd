<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="elevation-4 rounded-lg">
          <v-card-title class="text-h5 font-weight-bold mb-4">Make a Reservation</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="isFormValid" lazy-validation>
              <v-alert
                density="compact"
                text="No restrictive input validation. Please handle with care! :)"
                title="-DEMO VERSION-"
                type="warning"
              ></v-alert>
              <v-col cols="12">
                <p v-if="!restaurantName" class="p-3 mb-2 bg-info text-white">
                  Please select your Restaurant!
                </p>
                <v-select
                  :items="restaurants"
                  label="Select a restaurant"
                  v-model="restaurantName"
                  prepend-icon="mdi-store"
                ></v-select>
              </v-col>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="reservation.date"
                    label="Reservation Date"
                    outlined
                    dense
                    :rules="dateRules"
                    prepend-icon="mdi-calendar"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="reservation.time"
                    label="Reservation Time"
                    outlined
                    dense
                    type="time"
                    :rules="timeRules"
                    prepend-icon="mdi-clock-time-four-outline"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model.number="reservation.numberOfSeats"
                    label="Number of Seats"
                    outlined
                    dense
                    type="number"
                    :rules="seatsRules"
                    prepend-icon="mdi-chair-rolling"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="reservation.message"
                    label="Optional Message"
                    outlined
                    dense
                    rows="2"
                    prepend-icon="mdi-message-text"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="submitReservation"
              variant="flat"
              block
              :disabled="!isFormValid"
            >
              Submit Reservation
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="reservationConfirmedDialog" max-width="400">
      <v-card>
        <v-card-title>Reservation Submitted</v-card-title>
        <v-card-text>
          <v-icon color="success" size="64">mdi-check-circle</v-icon>
          <p>Thank you! Your reservation has been submitted successfully.</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="backToMenu" block variant="flat">Back to Home</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'ReservationForm',
  data() {
    return {
      isLoading: false,
      reservationConfirmedDialog: false,
      isFormValid: true,
      reservation: {
        date: '',
        time: null,
        numberOfSeats: 1,
        message: ''
      },
      restaurants: [
        'Relaxing Koala - Branch 1',
        'Relaxing Koala - Branch 2',
        'Relaxing Koala - Branch 3'
      ],
      restaurantName: '',
      nameRules: [
        (v) => !!v || 'Full name is required',
        (v) => /^[a-zA-Z\s]+$/.test(v) || 'Name must contain only letters and spaces'
      ],
      phoneRules: [
        (v) => !!v || 'Phone number is required',
        (v) => /^\d+$/.test(v) || 'Phone number must contain only digits'
      ],
      timeRules: [(v) => !!v || 'Time is required'],
      seatsRules: [
        (v) => !!v || 'Number of seats is required',
        (v) => v > 0 || 'Number of seats must be greater than 0'
      ],
      dateRules: [
        (v) => !!v || 'Date is required',
        (v) => /^\d{4}-\d{2}-\d{2}$/.test(v) || 'Invalid date format. Use YYYY-MM-DD'
      ]
    }
  },
  methods: {
    async submitReservation() {
      if (this.$refs.form.validate()) {
        const restaurantMapping = {
          'Relaxing Koala - Branch 1': 1,
          'Relaxing Koala - Branch 2': 2,
          'Relaxing Koala - Branch 3': 3
        }

        const data = {
          restaurant: restaurantMapping[this.restaurantName],
          date: this.reservation.date,
          time: this.reservation.time,
          party_size: this.reservation.numberOfSeats
        }

        this.isLoading = true
        try {
          const response = await fetch('http://127.0.0.1:8000/api/reservations/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access')}`
            },
            body: JSON.stringify(data)
          })

          if (!response.ok) {
            console.error('Error:', response.statusText)
          } else {
            setTimeout(() => {
              this.isLoading = false
              this.reservationConfirmedDialog = true
            }, 2000)
          }
        } catch (error) {
          console.error('Error:', error)
        }
      }
    },
    backToMenu() {
      this.$router.push('/')
      this.reservationConfirmedDialog = false
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

.v-text-field,
.v-textarea {
  margin-bottom: 1rem;
}

@media (max-width: 600px) {
  .v-card {
    padding: 16px;
  }

  .v-card-title {
    font-size: 1.2rem;
  }
}
</style>
