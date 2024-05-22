<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="elevation-4 rounded-lg">
          <v-card-title class="text-h5 font-weight-bold mb-4">Make a Reservation</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="isFormValid" lazy-validation>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="reservation.date"
                    label="Reservation Date"
                    outlined
                    dense
                    :rules="dateRules"
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
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="reservation.fullName"
                    label="Full Name"
                    outlined
                    dense
                    :rules="nameRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="reservation.phoneNumber"
                    label="Phone Number"
                    outlined
                    dense
                    :rules="phoneRules"
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
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="submitReservation" :disabled="!isFormValid">
              Submit Reservation
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ReservationForm',
  data() {
    return {
      isFormValid: true,
      reservation: {
        date: '',
        time: null,
        fullName: '',
        phoneNumber: '',
        numberOfSeats: 1,
        message: ''
      },
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
        (v) => /^\d{2}-\d{2}-\d{4}$/.test(v) || 'Invalid date format. Use DD-MM-YYYY'
      ]
    }
  },
  methods: {
    submitReservation() {
      if (this.$refs.form.validate()) {
        // Handle form submission logic here
        console.log('Reservation data:', this.reservation)
        // Reset the form after submission
        this.$refs.form.reset()
      }
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
