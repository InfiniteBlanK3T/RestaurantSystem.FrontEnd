<template>
    <div>
      <h1 class="mb-4">Order Tracker</h1>
      <v-card>
        <v-card-title>Order Status</v-card-title>
        <v-card-text>
          <v-timeline dense>
            <v-timeline-item color="primary" small>
              <div>
                <div class="font-weight-normal">
                  <v-icon color="primary">mdi-check</v-icon>
                  Order Placed
                </div>
                <span>{{ formatDate(orderPlacedAt) }}</span>
              </div>
            </v-timeline-item>
            <v-timeline-item color="primary" small>
              <div>
                <div class="font-weight-normal">
                  <v-icon color="primary">mdi-check</v-icon>
                  Order Confirmed
                </div>
                <span>{{ formatDate(orderConfirmedAt) }}</span>
              </div>
            </v-timeline-item>
            <v-timeline-item color="primary" small>
              <div>
                <div class="font-weight-normal">
                  <v-icon color="primary">mdi-check</v-icon>
                  Order Prepared
                </div>
                <span>{{ formatDate(orderPreparedAt) }}</span>
              </div>
            </v-timeline-item>
            <v-timeline-item color="primary" small>
              <div>
                <div class="font-weight-normal">
                  <v-icon color="primary">mdi-truck-delivery</v-icon>
                  Order Out for Delivery
                </div>
                <span>{{ formatDate(orderOutForDeliveryAt) }}</span>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </div>
  </template>
  
  <script>
  export default {
    name: 'OrderTracker',
    data() {
      return {
        orderPlacedAt: new Date(),
        orderConfirmedAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
        orderPreparedAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
        orderOutForDeliveryAt: new Date(Date.now() + 30 * 60 * 1000) // 30 minutes from now
      }
    },
    methods: {
      formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        }).format(date)
      }
    }
  }
  </script>