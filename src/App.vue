<template>
  <v-app>
    <AppBar @toggleDrawer="toggleDrawer" :isLoggedIn="isLoggedIn" @logout="logout" />
    <NavigationDrawer v-model="isDrawerOpen" :cartItems="cartItems"/>
    <v-main>
      <router-view :cartItems="cartItems" @addToCart="addToCart" @updateCartItem="updateCartItem" @removeFromCart="removeFromCart" />
    </v-main>
  </v-app>
</template>

<script>
  import AppBar from './components/layout/Appbar.vue'
  import NavigationDrawer from './components/layout/NavigationDrawer.vue'

  export default {
    name: 'App',
    components: {
      AppBar,
      NavigationDrawer,
    },
    data() {
      return {
        isDrawerOpen: true,
        isLoggedIn: false,
        cartItems: []
      }
    },
    created() {
      this.isLoggedIn = this.checkLoginStatus()
    },
    methods: {
      logout() {
        this.clearLoginStatus()
        this.isLoggedIn = false
        this.$router.push('/')
      },
      checkLoginStatus() {
        const token = localStorage.getItem('token')
        return !!token
      },
      clearLoginStatus() {
        localStorage.removeItem('token')
      },
      toggleDrawer() {
        this.isDrawerOpen = !this.isDrawerOpen
      },
      addToCart(item) {
      const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id)
        if (existingItem) {
          existingItem.quantity++
        } else {
          this.cartItems.push({ ...item, quantity: 1 })
        }
      },
      updateCartItem(index, quantity) {
        this.cartItems[index].quantity = quantity
      },
      removeFromCart(index) {
        this.cartItems.splice(index, 1)
      }
    }
  }
</script>