<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-12">
        <v-card class="elevation-4 rounded">
          <v-card-title class="text-h5 font-weight-bold mb-4">Order History</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="orderHistory"
              :items-per-page="5"
              class="elevation-1"
            >
              <template v-slot:item.orderDate="{ item }">
                <span>{{ formatDate(item.orderDate) }}</span>
                <!-- Corrected here -->
              </template>
              <template v-slot:item.total="{ item }">
                <span>${{ item.total.toFixed(2) }}</span>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="viewOrderDetails(item)"> mdi-eye </v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderHistory',
  data() {
    return {
      headers: [
        { title: 'Order Date', value: 'orderDate' },
        { title: 'Total', value: 'total' },
        { title: 'Actions', value: 'actions', sortable: false }
      ],
      orderHistory: []
    }
  },
  methods: {
    formatDate(dateString) {
      //console.log('Input date string:', dateString)
      const date = new Date(dateString)
      //console.log('Parsed date:', date)
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return date.toLocaleDateString('en-US', options)
    },
    viewOrderDetails(order) {
      console.log('View order details:', order)
    }
  },
  async mounted() {
    try {
      const response = await fetch(`${process.env.VUE_APP_API_URL}orders`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`
        }
      })
      const data = await response.json()
      this.orderHistory = data.results.map((order) => ({
        orderDate: this.formatDate(order.created_at),
        total: parseFloat(order.total_amount)
      }))
    } catch (error) {
      console.error('Error fetching order history:', error)
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
