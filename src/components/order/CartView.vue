<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="mb-4 text-center">Shopping Cart</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center" justify="center" align="center">
        <div class="text-danger fw-bold" v-if="multipleRestaurants">
          Detecting from 2 different restaurant. Order Online Only!
        </div>
        <div v-if="!multipleRestaurants && cartItems.length > 0">
          <span>
            <v-icon>mdi-store</v-icon>{{ restaurant.name }} - Address: {{ restaurant.address }}
          </span>
          <br />
          <span>
            <v-icon>mdi-phone</v-icon>
            Number: <a href="#">{{ restaurant.phone_number }}</a>
          </span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="4" v-for="(item, index) in cartItems" :key="item.id">
        <v-card>
          <v-img :src="item.image_url" aspect-ratio="1.7"></v-img>
          <v-card-title class="headline">{{ item.name }}</v-card-title>
          <v-card-subtitle>{{ item.description }}</v-card-subtitle>
          <v-card-text>
            <v-row align="center">
              <v-col cols="12" class="text-center">
                <v-btn
                  small
                  color="primary"
                  @click.stop="decrementQuantity(index)"
                  :disabled="item.quantity <= 1"
                  >-</v-btn
                >
                <span class="mx-4" style="font-size: 1.5em">{{ item.quantity }}</span>
                <v-btn small color="primary" @click.stop="incrementQuantity(index)">+</v-btn>
                <v-divider></v-divider>
                <v-btn icon color="error" @click.stop="removeFromCart(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        class="text-center"
        justify="center"
        align="center"
        v-if="cartItems.length === 0"
      >
        <h3>Your cart is empty</h3>
        <v-btn color="primary" @click="$router.push('/menu')">Return to Menu</v-btn>
      </v-col>
      <v-col cols="12" class="text-center" justify="center" align="center" v-else>
        <v-btn color="primary" @click="checkout">Checkout</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CartView',
  data() {
    return {
      cartItems: [],
      restaurant: { name: '', address: '', phone: '' },
      multipleRestaurants: false
    }
  },
  async created() {
    // Cart Functional
    const storedCartItems = localStorage.getItem('cartItems')
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems)
    }

    // Log the value of cartItems
    //console.log('cartItems:', this.cartItems)

    // Restaurant Functional
    const restaurantIds = [...new Set(this.cartItems.map((item) => item.restaurant))]

    // Log the value of restaurantIds
    //console.log('restaurantIds:', restaurantIds)

    if (restaurantIds.length > 1) {
      this.multipleRestaurants = true
    } else if (restaurantIds.length > 0 && this.cartItems.length > 0) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/restaurants/${restaurantIds[0]}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        this.restaurant = data
      } catch (error) {
        console.error('Failed to fetch restaurant data:', error)
        this.restaurant = { name: 'Unknown', address: 'Unknown', phone: 'Unknown' }
      }
    }
  },
  methods: {
    incrementQuantity(index) {
      this.cartItems = this.cartItems.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
      this.$emit('updateCartItem', this.cartItems)
    },
    decrementQuantity(index) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems = this.cartItems.map((item, i) =>
          i === index ? { ...item, quantity: item.quantity - 1 } : item
        )
        this.$emit('updateCartItem', this.cartItems)
      }
    },
    removeFromCart(index) {
      this.cartItems = this.cartItems.filter((item, i) => i !== index)
      this.$emit('removeFromCart', this.cartItems)
    },
    checkout() {
      this.$router.push('/checkout')
    }
  }
}
</script>
