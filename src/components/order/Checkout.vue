<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center mb-6">Checkout</h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-stepper
          hide-actions
          v-model="step" 
          :items="items"
          editable 
          class="elevation-3">
          <template v-slot:item.1>
            <h3>Customer Information</h3>
            <v-form>
              <!-- Shipping Information Form Fields -->
              <v-text-field label="Full Name" outlined></v-text-field>
              <v-text-field label="Address" outlined></v-text-field>
              <v-text-field label="City" outlined></v-text-field>
              <v-text-field label="State/Province" outlined></v-text-field>
              <v-text-field label="Zip/Postal Code" outlined></v-text-field>
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="step = 2">Continue</v-btn>
            </v-card-actions>
          </template>

          <template v-slot:item.2>
            <v-card-title>Payment Information</v-card-title>
              <v-form>
                <!-- Payment Information Form Fields -->
                <v-text-field label="Card Number" outlined></v-text-field>
                <v-text-field label="Expiration Date" outlined></v-text-field>
                <v-text-field label="CVV" outlined></v-text-field>
              </v-form>
              <v-card-actions>
                <v-btn color="primary" @click="step = 1">Previous</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="step = 3">Continue</v-btn>
              </v-card-actions>
          </template>
          
          <template 
            v-slot:item.3>
            <v-card-title>Review and Place Order</v-card-title>
              <!-- Order Summary -->
              <v-list>
                <v-list-item v-for="(item, index) in cartItems" :key="index">
                  <v-row>
                    <v-col cols="6">
                      <v-list-item-title>{{ item.name }} x {{ item.quantity }}</v-list-item-title>
                    </v-col>
                    <v-col cols="2">
                      <v-list-item-subtitle>{{ item.price }}ea.</v-list-item-subtitle>
                    </v-col>
                    <v-col cols="4" class="text-right">
                      <v-list-item-title>${{ item.price.toFixed(2) * item.quantity }}</v-list-item-title>
                    </v-col>
                  </v-row>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
              <v-row class="mt-4">
                <hr/>
                <v-col cols="6">
                  <h3 class="font-weight-bold">Total:</h3>
                </v-col>
                <v-col cols="6" class="text-right">
                  <h3 class="font-weight-bold">${{ total }}</h3>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-btn color="primary" @click="step = 2">Previous</v-btn>
                <v-spacer></v-spacer>
                <v-btn variant="elevated" color="primary" @click="placeOrder">Place Order</v-btn>
              </v-card-actions>
          </template>
        </v-stepper>
      </v-col>
    </v-row>

    <v-dialog v-model="orderPlacedDialog" max-width="300">
      <v-card>
        <v-card-title class="headline">Order Placed</v-card-title>
        <v-card-text>
          <v-icon color="success" size="64">mdi-check-circle</v-icon>
          <p class="mt-4">Your order has been placed successfully!</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="navigateToOrders">View Orders</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-overlay 
      :model-value="isLoading"
      class="align-center justify-center">
      <v-progress-circular
        indeterminate
        size="64"
        color="primary"
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
export default {
  name: 'Checkout',
  props: {
    cartItems: {
        type: Array,
        required: true
    }
  },
  data() {
    return {
      step: 1,
      items: [
        'Customer Information',
        'Payment Information',
        'Review & Place Order'
      ],
      orderPlacedDialog: false,
      isLoading: false
    }
  },
  computed: {
    total() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    }
  },
  watch: {
    overlay (val) {
      val && setTimeout(() => {
        this.overlay = false
      }, 2000)
    },
  },
  methods: {
    placeOrder() {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        this.orderPlacedDialog = true
      }, 3000)
    },
    navigateToOrders() {
      this.$router.push('/orders')
      this.orderPlacedDialog = false
    }
  }
}
</script>