<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold mb-4">Sales Analytics</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-card v-hover-highlight class="elevation-4 rounded-lg">
          <v-card-title class="text-h6 font-weight-bold">Total Revenue</v-card-title>
          <v-card-text>
            <div class="text-h4 font-weight-bold mb-2">${{ totalRevenue.toFixed(2) }}</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card v-hover-highlight class="elevation-4 rounded-lg">
          <v-card-title class="text-h6 font-weight-bold">Orders Placed</v-card-title>
          <v-card-text>
            <div class="text-h4 font-weight-bold mb-2">{{ ordersPlaced }}</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card v-hover-highlight class="elevation-4 rounded-lg">
          <v-card-title class="text-h6 font-weight-bold">Average Order Value</v-card-title>
          <v-card-text>
            <div class="text-h4 font-weight-bold mb-2">${{ averageOrderValue.toFixed(2) }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="7">
        <v-card v-hover-highlight class="elevation-4 rounded-lg">
          <v-card-title class="text-h6 font-weight-bold">Popular Menu Items</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="popularMenuItemsHeaders"
              :items="popularMenuItems"
              :items-per-page="5"
              class="elevation-1"
            >
              <template v-slot:item.menu_item__name="{ item }">
                <span>{{ item.menu_item__name }}</span>
              </template>
              <template v-slot:item.menu_item__price="{ item }">
                <span>${{ item.menu_item__price.toFixed(2) }}</span>
              </template>
              <template v-slot:item.count="{ item }">
                <span>{{ item.count }}</span>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="5">
        <v-card v-hover-highlight class="elevation-4 rounded-lg">
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
  directives: {
    'hover-highlight': {
      bind(el, binding, vnode) {
        el.style.transition = 'background-color 0.5s ease'
        el.onmouseover = function () {
          el.style.backgroundColor = binding.value || '#f5f5f5'
        }
        el.onmouseout = function () {
          el.style.backgroundColor = ''
        }
      }
    }
  },
  data() {
    return {
      totalRevenue: 0,
      ordersPlaced: 0,
      averageOrderValue: 0,
      popularMenuItemsHeaders: [
        { title: 'Menu Item', value: 'menu_item__name' },
        { title: 'Price', value: 'menu_item__price' },
        { title: 'Quantity Sold', value: 'count' }
      ],
      popularMenuItems: [],
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
  },
  created() {
    fetch('http://127.0.0.1:8000/api/sales-analytics/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        this.totalRevenue = data.total_revenue
        this.ordersPlaced = data.orders_placed
        this.averageOrderValue = data.average_order_value
        this.popularMenuItems = data.popular_menu_items
      })
  }
}
</script>

<style scoped>
.rounded-lg {
  border-radius: 1rem;
}
</style>
