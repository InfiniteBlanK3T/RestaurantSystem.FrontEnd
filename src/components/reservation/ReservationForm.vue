<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="elevation-4">
          <v-card-title class="text-h5 font-weight-bold mb-4">Make a Reservation</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="isFormValid" lazy-validation>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="reservation.name"
                    label="Full Name"
                    outlined
                    dense
                    :rules="nameRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="reservation.email"
                    label="Email"
                    outlined
                    dense
                    :rules="emailRules"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-menu
                    ref="dateMenu"
                    v-model="dateMenuOpen"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ props }">
                      <v-text-field
                        v-model="reservation.date"
                        label="Reservation Date"
                        outlined
                        dense
                        readonly
                        :rules="dateRules"
                        required
                        @blur="dateMenuOpen = false"
                        v-bind="props"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="reservation.date"
                      @input="dateMenuOpen = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" md="6">
                  <v-menu
                    ref="timeMenu"
                    v-model="timeMenuOpen"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ props }">
                      <v-text-field
                        v-model="reservation.time"
                        label="Reservation Time"
                        outlined
                        dense
                        readonly
                        @blur="timeMenuOpen = false"
                        v-bind="props"
                        :rules="timeRules"
                        required
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-model="reservation.time"
                      @update:model-value="$refs.timeMenu.save(reservation.time)"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model.number="reservation.guests"
                    label="Number of Guests"
                    outlined
                    dense
                    type="number"
                    :rules="guestsRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-textarea
                    v-model="reservation.notes"
                    label="Special Requests (Optional)"
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
            <v-btn color="primary" @click="submitReservation" :disabled="!isFormValid"
              >Submit Reservation</v-btn
            >
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
      dateMenuOpen: false,
      timeMenuOpen: false,
      reservation: {
        name: '',
        email: '',
        date: null,
        time: null,
        guests: 1,
        notes: ''
      },
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => /^[a-zA-Z\s]+$/.test(v) || 'Name must contain only letters and spaces'
      ],
      emailRules: [
        (v) => !!v || 'Email is required',
        (v) => /.+@.+\..+/.test(v) || 'Email must be valid'
      ],
      dateRules: [
        (v) => !!v || 'Date is required',
        (v) => new Date(v) >= new Date() || 'Date must be today or in the future'
      ],
      timeRules: [
        (v) => !!v || 'Reservation time is required',
        (v) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v) || 'Invalid time format'
      ],
      guestsRules: [
        (v) => !!v || 'Number of guests is required',
        (v) => v > 0 || 'Number of guests must be greater than 0'
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
</style>
