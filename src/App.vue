<template>
  <v-app>
    <AppBar
      @toggleDrawer="toggleDrawer"
      :isLoggedIn="isLoggedIn"
      :username="username"
      @logout="logout"
    />
    <NavigationDrawer
      v-model="isDrawerOpen"
      :cartItems="cartItems"
      :userRole="userRole"
      :isLoggedIn="isLoggedIn"
    />
    <v-main>
      <router-view
        :cartItems="cartItems"
        @addToCart="addToCart"
        @updateCartItem="updateCartItem"
        @removeFromCart="removeFromCart"
        @login="handleLogin"
      />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import AppBar from './components/layout/Appbar.vue'
import NavigationDrawer from './components/layout/NavigationDrawer.vue'
import AppFooter from './components/layout/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppBar,
    NavigationDrawer,
    AppFooter
  },
  data() {
    return {
      isDrawerOpen: true,
      isLoggedIn: false,
      cartItems: [],
      username: localStorage.getItem('username') || '',
      userRole: ''
    }
  },
  async created() {
    this.isLoggedIn = this.checkLoginStatus()
    if (this.isLoggedIn) {
      try {
        const response = await fetch(`${this.$apiUrl}users/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access')}`
          }
        })
        const data = await response.json()
        this.userRole = data.results[0].role
        // Debugging Console
        // console.log('User role in APP:', data.results[0].role)
      } catch (error) {
        console.error('Error fetching user role:', error)
      }
    }
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
      this.$router.push('/').then(() => window.location.reload())
    },
    checkLoginStatus() {
      const token = localStorage.getItem('access')
      return !!token
    },
    clearLoginStatus() {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      localStorage.removeItem('username')
      localStorage.removeItem('cartItems')
    },
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen
    },
    addToCart(item) {
      let cartItems = localStorage.getItem('cartItems')

      cartItems = cartItems ? JSON.parse(cartItems) : []

      const existingItem = cartItems.find((cartItems) => cartItems.id === item.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        cartItems.push({ ...item, quantity: 1 })
      }

      localStorage.setItem('cartItems', JSON.stringify(cartItems))

      this.cartItems = cartItems
    },
    updateCartItem(newCartItems) {
      this.cartItems = [...newCartItems]
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
    },
    removeFromCart(newCartItems) {
      this.cartItems = [...newCartItems]
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
    }
  }
}
</script>
