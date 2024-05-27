<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center mb-6">Checkout</h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-stepper hide-actions v-model="step" :items="items" editable class="elevation-3">
          <template v-slot:item.1>
            <h3>Customer Information</h3>
            <v-form href="customerForm">
              <!-- Customer Information Form Fields -->
              <v-text-field
                v-model="order.full_name"
                label="Full Name"
                prepend-icon="mdi-account"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="order.address"
                label="Address"
                prepend-icon="mdi-map-marker"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="order.city"
                label="City"
                prepend-icon="mdi-city"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="order.state_province"
                label="State/Province"
                prepend-icon="mdi-domain"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="order.zip_postal_code"
                label="Zip/Postal Code"
                prepend-icon="mdi-zip-box"
                outlined
              ></v-text-field>
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="step = 2">Continue</v-btn>
            </v-card-actions>
          </template>

          <template v-slot:item.2>
            <v-card-title>Payment Information</v-card-title>
            <v-form ref="paymentForm">
              <!-- Payment Information Form Fields -->
              <v-text-field
                v-model="card_number"
                label="Card Number"
                prepend-icon="mdi-credit-card"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="card_expiration"
                label="Expiration Date"
                prepend-icon="mdi-calendar"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="card_cvv"
                prepend-icon="mdi-lock"
                label="CVV"
                outlined
              ></v-text-field>
            </v-form>
            <v-card-actions>
              <v-btn color="primary" @click="step = 1">Previous</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="step = 3">Continue</v-btn>
            </v-card-actions>
          </template>

          <template v-slot:item.3>
            <v-card-title>Review and Place Order</v-card-title>
            <!-- Order Summary -->
            <v-list>
              <v-list-item v-for="(cartItem, index) in cartItems" :key="index">
                <v-row>
                  <v-col cols="6">
                    <v-list-item-title
                      >{{ cartItem.name }} x {{ cartItem.quantity }}</v-list-item-title
                    >
                  </v-col>
                  <v-col cols="2">
                    <v-list-item-subtitle
                      >{{ parseFloat(cartItem.price).toFixed(2) }}ea.</v-list-item-subtitle
                    >
                  </v-col>
                  <v-col cols="4" class="text-right">
                    <v-list-item-title
                      >${{
                        (parseFloat(cartItem.price) * cartItem.quantity).toFixed(2)
                      }}</v-list-item-title
                    >
                  </v-col>
                </v-row>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-row class="mt-4">
              <hr />
              <v-col cols="6">
                <h3 class="font-weight-bold">Total:</h3>
              </v-col>
              <v-col cols="6" class="text-right">
                <h3 class="font-weight-bold">${{ total.toFixed(2) }}</h3>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn color="primary" @click="step = 2">Previous</v-btn>
              <v-spacer></v-spacer>
              <v-btn variant="elevated" color="primary" @click="placeOrder">Place Order</v-btn>
            </v-card-actions>
          </template>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn @click="autoFill" class="btn btn-warning" block>Demo Autofill for me!</v-btn>
          </v-card-actions>
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

    <v-overlay :model-value="isLoading" class="align-center justify-center">
      <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
export default {
  name: 'CheckoutView',
  data() {
    return {
      step: 1,
      items: ['Customer Information', 'Payment Information', 'Review & Place Order'],
      orderPlacedDialog: false,
      isLoading: false,
      cartItems: [],
      order: {
        full_name: '',
        address: '',
        city: '',
        state_province: '',
        zip_postal_code: '',
        total_amount: 0,
        order_items: []
      },
      card_number: '',
      card_expiration: '',
      card_cvv: ''
    }
  },
  async created() {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
  },
  computed: {
    total() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    }
  },
  watch: {
    overlay(val) {
      val &&
        setTimeout(() => {
          this.overlay = false
        }, 2000)
    }
  },
  methods: {
    autoFill() {
      this.order.full_name = 'John Doe'
      ;(this.order.address = '123 Main St'),
        (this.order.city = 'Melbourne'),
        (this.order.state_province = 'VIC'),
        (this.order.zip_postal_code = '12345'),
        (this.card_number = '1234 5678 9012 3456'),
        (this.card_expiration = '12/23'),
        (this.card_cvv = '123')
    },
    async placeOrder() {
      // Convert cartItems to order_items format
      this.order.order_items = this.cartItems.map((item) => ({
        menu_item: item.id,
        quantity: item.quantity
      }))

      // Calculate total amount
      this.order.total_amount = this.total

      this.accessToken = localStorage.getItem('access')
      this.isLoading = true
      try {
        const response = await fetch('http://127.0.0.1:8000/api/orders/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.accessToken}`
          },
          body: JSON.stringify(this.order)
        })
        if (response.ok) {
          const data = await response.json()

          localStorage.setItem('order', data.id)
        } else {
          throw new Error('Failed to place order', response.statusText)
        }
      } catch (error) {
        console.error('Failed to place order:', error)
      }

      setTimeout(() => {
        this.cartItems = []
        this.isLoading = false
        this.orderPlacedDialog = true
        localStorage.removeItem('cartItems')
      }, 3000)
    },
    navigateToOrders() {
      this.$router.push('/orders')
      this.orderPlacedDialog = false
    }
  }
}
</script>
