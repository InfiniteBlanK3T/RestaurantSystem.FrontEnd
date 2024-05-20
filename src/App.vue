<template>
  <v-app>
    <AppBar
      @toggleDrawer="toggleDrawer"
      :isLoggedIn="isLoggedIn"
      :username="username"
      @logout="logout"
    />
    <NavigationDrawer v-model="isDrawerOpen" :cartItems="cartItems" />
    <v-main>
      <router-view
        :cartItems="cartItems"
        @addToCart="addToCart"
        @updateCartItem="updateCartItem"
        @removeFromCart="removeFromCart"
        @login="handleLogin"
      />
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
    NavigationDrawer
  },
  data() {
    return {
      isDrawerOpen: true,
      isLoggedIn: false,
      cartItems: [],
      username: localStorage.getItem('username') || ''
    }
  },
  created() {
    this.isLoggedIn = this.checkLoginStatus()
  },
  methods: {
    handleLogin(username) {
      this.isLoggedIn = true
      this.username = username
    },
    logout() {
      this.clearLoginStatus()
      this.isLoggedIn = false
      this.username = ''
      this.$router.push('/login')
    },
    checkLoginStatus() {
      const token = localStorage.getItem('access')
      return !!token
    },
    clearLoginStatus() {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      localStorage.removeItem('username')
    },
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen
    },
    addToCart(item) {
      const existingItem = this.cartItems.find((cartItem) => cartItem.id === item.id)
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
