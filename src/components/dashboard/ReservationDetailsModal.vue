<template>
  <v-dialog v-model="showModal" max-width="800">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ modalTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="selectedReservations"
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
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeModal">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ReservationDetailsModal',
  props: {
    selectedReservations: {
      type: Array,
      required: true
    },
    modalTitle: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showModal: true,
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Reservation Date', value: 'reservationDate' },
        { text: 'Reservation Time', value: 'reservationTime' },
        { text: 'Guests', value: 'guests' }
      ]
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return date.toLocaleDateString('en-US', options)
    },
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>
