<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="elevation-4">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'OrderHistory',
  data() {
    return {
      headers: [
        { text: 'Order Date', value: 'orderDate' },
        { text: 'Total', value: 'total' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      orderHistory: [
        {
          id: 1,
          orderDate: '2023-06-01',
          total: 29.99,
          items: [
            {
              name: 'Margherita Pizza',
              quantity: 1,
              price: 12.99
            },
            {
              name: 'Caesar Salad',
              quantity: 2,
              price: 8.5
            }
          ]
        },
        {
          id: 2,
          orderDate: '2023-05-15',
          total: 18.99,
          items: [
            {
              name: 'Spaghetti Bolognese',
              quantity: 1,
              price: 14.99
            },
            {
              name: 'Garlic Bread',
              quantity: 1,
              price: 4.0
            }
          ]
        }
      ]
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return date.toLocaleDateString('en-US', options)
    },
    viewOrderDetails(order) {
      // Implement the logic to view order details
      console.log('View order details:', order)
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
