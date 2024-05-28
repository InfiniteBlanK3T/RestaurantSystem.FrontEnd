<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold mb-4">Order Management</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="elevation-4 rounded-lg">
          <v-card-title class="text-h6 font-weight-bold">New Orders</v-card-title>
          <v-card-text>
            <div class="text-h4 font-weight-bold mb-2">{{ newOrders.length }}</div>
            <v-btn color="primary" text @click="viewOrders('new')">View Details</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="elevation-4 rounded-lg">
          <v-card-title class="text-h6 font-weight-bold">Processing Orders</v-card-title>
          <v-card-text>
            <div class="text-h4 font-weight-bold mb-2">{{ processingOrders.length }}</div>
            <v-btn color="primary" text @click="viewOrders('processing')">View Details</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="elevation-4 rounded-lg">
          <v-card-title class="text-h6 font-weight-bold">Completed Orders</v-card-title>
          <v-card-text>
            <div class="text-h4 font-weight-bold mb-2">{{ completedOrders.length }}</div>
            <v-btn color="primary" text @click="viewOrders('completed')">View Details</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="elevation-4 rounded-lg">
          <v-card-title class="text-h6 font-weight-bold">Order Details</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="orders"
              :items-per-page="5"
              class="elevation-1"
            >
              <template v-slot:item.orderDate="{ item }">
                <span>{{ formatDate(item.orderDate) }}</span>
              </template>
              <template v-slot:item.total="{ item }">
                <span>${{ item.total.toFixed(2) }}</span>
              </template>
              <template v-slot:item.status="{ item }">
                <v-chip :color="getStatusColor(item.status)" dark small>
                  {{ item.status }}
                </v-chip>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="viewOrderDetails(item)"> mdi-eye </v-icon>
                <v-icon
                  small
                  v-if="item.status === 'new'"
                  @click="updateOrderStatus(item, 'processing')"
                >
                  mdi-checkbox-marked-circle
                </v-icon>
                <v-icon
                  small
                  v-if="item.status === 'processing'"
                  @click="updateOrderStatus(item, 'completed')"
                >
                  mdi-check-circle
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
  name: 'OrderManagement',
  data() {
    return {
      headers: [
        { text: 'Order ID', value: 'id' },
        { text: 'Customer Name', value: 'customerName' },
        { text: 'Order Date', value: 'orderDate' },
        { text: 'Total', value: 'total' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      orders: [
        {
          id: 1,
          customerName: 'John Doe',
          orderDate: '2023-06-01',
          total: 29.99,
          status: 'new',
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
          customerName: 'Jane Smith',
          orderDate: '2023-05-15',
          total: 18.99,
          status: 'processing',
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
        },
        {
          id: 3,
          customerName: 'Michael Johnson',
          orderDate: '2023-05-10',
          total: 42.99,
          status: 'completed',
          items: [
            {
              name: 'Grilled Salmon',
              quantity: 1,
              price: 22.99
            },
            {
              name: 'Roasted Vegetables',
              quantity: 1,
              price: 12.99
            },
            {
              name: 'Chocolate Cake',
              quantity: 1,
              price: 7.99
            }
          ]
        }
      ]
    }
  },
  computed: {
    newOrders() {
      return this.orders.filter((order) => order.status === 'new')
    },
    processingOrders() {
      return this.orders.filter((order) => order.status === 'processing')
    },
    completedOrders() {
      return this.orders.filter((order) => order.status === 'completed')
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return date.toLocaleDateString('en-US', options)
    },
    viewOrders(type) {
      // Implement the logic to view orders of the specified type
      // console.log(`View ${type} orders`)
    },
    viewOrderDetails(order) {
      // Implement the logic to view order details
      // console.log('View order details:', order)
    },
    updateOrderStatus(order, newStatus) {
      // Implement the logic to update the order status
      // console.log('Update order status:', order, newStatus)
    },
    getStatusColor(status) {
      switch (status) {
        case 'new':
          return 'orange'
        case 'processing':
          return 'blue'
        case 'completed':
          return 'green'
        default:
          return 'grey'
      }
    }
  }
}
</script>

<style scoped>
.rounded-lg {
  border-radius: 1rem;
}
</style>
