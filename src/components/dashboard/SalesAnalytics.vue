<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold mb-4">Sales Analytics</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="elevation-4 rounded-lg">
          <v-card-title class="text-h6 font-weight-bold">Total Revenue</v-card-title>
          <v-card-text>
            <div class="text-h4 font-weight-bold mb-2">${{ totalRevenue.toFixed(2) }}</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="elevation-4 rounded-lg">
          <v-card-title class="text-h6 font-weight-bold">Orders Placed</v-card-title>
          <v-card-text>
            <div class="text-h4 font-weight-bold mb-2">{{ ordersPlaced }}</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="elevation-4 rounded-lg">
          <v-card-title class="text-h6 font-weight-bold">Average Order Value</v-card-title>
          <v-card-text>
            <div class="text-h4 font-weight-bold mb-2">${{ averageOrderValue.toFixed(2) }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="elevation-4 rounded-lg">
          <v-card-title class="text-h6 font-weight-bold">Popular Menu Items</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="popularMenuItemsHeaders"
              :items="popularMenuItems"
              :items-per-page="5"
              class="elevation-1"
            >
              <template v-slot:item.quantity="{ item }">
                <span>{{ item.quantity }}</span>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="elevation-4 rounded-lg">
          <v-card-title class="text-h6 font-weight-bold">Sales by Month</v-card-title>
          <v-card-text>
            <line-chart :data="chartData" :options="salesByMonthOptions" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Line as LineChart } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, LineElement, LinearScale, CategoryScale, PointElement)

export default {
  name: 'SalesAnalytics',
  components: {
    LineChart
  },
  data() {
    return {
      totalRevenue: 5678.99,
      ordersPlaced: 245,
      averageOrderValue: 23.18,
      popularMenuItemsHeaders: [
        { text: 'Menu Item', value: 'name' },
        { text: 'Quantity Sold', value: 'quantity' }
      ],
      popularMenuItems: [
        { name: 'Margherita Pizza', quantity: 125 },
        { name: 'Caesar Salad', quantity: 98 },
        { name: 'Spaghetti Bolognese', quantity: 82 },
        { name: 'Grilled Salmon', quantity: 71 },
        { name: 'Chocolate Cake', quantity: 63 }
      ],
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Sales',
            data: [1250, 975, 1125, 1375, 1550, 1275],
            backgroundColor: '#4CAF50',
            borderColor: '#4CAF50',
            fill: false
          }
        ]
      },
      salesByMonthOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'category'
          },
          y: {
            beginAtZero: true
          }
        }
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
