<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="mb-4 text-center">Shopping Cart</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="4" v-for="(item, index) in cartItems" :key="index">
          <v-card>
            <v-img :src="item.imageUrl" aspect-ratio="1.7"></v-img>
            <v-card-title class="headline">{{ item.name }}</v-card-title>
            <v-card-subtitle>{{ item.description }}</v-card-subtitle>
            <v-card-text>
              <v-row align="center">
                <v-col cols="12" class="text-center">
                    <v-btn small color="primary" @click.stop="decrementQuantity(index)" :disabled="item.quantity <= 1">-</v-btn>
                    <span class="mx-4" style="font-size: 1.5em;">{{ item.quantity }}</span>
                    <v-btn small color="primary" @click.stop="incrementQuantity(index)">+</v-btn>
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
        <v-col cols="12" class="text-center" justify="center" align="center" v-if="cartItems.length === 0">
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
    name: 'Cart',
    props: {
        cartItems: {
            type: Array,
            required: true
        }
    },
    methods: {
        incrementQuantity(index) {
            this.cartItems[index].quantity++
        },
        decrementQuantity(index) {
            if (this.cartItems[index].quantity > 1) {
            this.cartItems[index].quantity--
            }
        },
        removeFromCart(index) {
            this.cartItems.splice(index, 1)
        },
        checkout() {
            this.$router.push('/checkout')
        },
    }
  }
  </script>