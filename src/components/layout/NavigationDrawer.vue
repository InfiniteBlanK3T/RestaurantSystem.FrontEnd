<template>
  <v-navigation-drawer app permanent width="150" color="light-blue lighten-5">
    <v-list dense nav>
      <router-link to="/" class="nav-link">
        <v-list-item link>
          <v-icon class="mr-2 nav-icon">bi-house-door</v-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/menu" class="nav-link">
        <v-list-item link>
          <v-icon class="mr-2 nav-icon">bi-list</v-icon>
          <v-list-item-title>Menu</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/cart" class="nav-link">
        <v-list-item link>
          <v-badge
            color="red"
            overlap
            bordered
            :value="cartItemCount"
            :content="cartItemCount"
            class="cart-badge"
          >
            <v-icon class="mr-2 nav-icon">bi-cart</v-icon>
          </v-badge>
          <v-list-item-title>Cart</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link v-if="cartItems.length > 0" to="/checkout" class="nav-link">
        <v-list-item link>
          <v-icon class="mr-2 nav-icon">bi-card-list</v-icon>
          <v-list-item-title>Checkout</v-list-item-title>
        </v-list-item>
      </router-link>
      <!-- User Dashboard -->
      <router-link v-if="userRole === 'customer'" link to="/reservations/create" class="nav-link">
        <v-list-item link>
          <v-icon class="mr-2 nav-icon">bi-calendar</v-icon>
          <v-list-item-title>Book a reservations!</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/profile" v-if="isLoggedIn" class="nav-link">
        <v-list-item link>
          <v-icon class="mr-2 nav-icon">bi-person</v-icon>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
      </router-link>
      <router-link v-if="userRole === 'customer'" link to="/orders/history" class="nav-link">
        <v-list-item link>
          <v-icon class="mr-2 nav-icon">bi-list-ul</v-icon>
          <v-list-item-title>Order History</v-list-item-title>
        </v-list-item>
      </router-link>
      <!-- Admin Dashboard -->
      <router-link v-if="userRole === 'staff'" link to="/dashboard/reservations" class="nav-link">
        <v-list-item link>
          <v-icon class="mr-2 nav-icon">bi-calendar</v-icon>
          <v-list-item-title>Reservations</v-list-item-title>
        </v-list-item>
      </router-link>
      <router-link v-if="userRole === 'staff'" to="/menu/create" class="nav-link">
        <v-list-item link>
          <v-icon class="mr-2 nav-icon">bi-plus-circle</v-icon>
          <v-list-item-title>Add Menu Item</v-list-item-title>
        </v-list-item>
      </router-link>
      <router-link v-if="userRole === 'staff'" to="/dashboard/analytics" class="nav-link">
        <v-list-item link>
          <v-icon class="mr-2 nav-icon">bi-graph-up</v-icon>
          <v-list-item-title>Analytics</v-list-item-title>
        </v-list-item>
      </router-link>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavigationDrawer',
  props: {
    cartItems: {
      type: Array,
      required: true
    },
    userRole: {
      type: String,
      required: true
    },
    isLoggedIn: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    cartItemCount() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0)
    }
  }
}
</script>

<style scoped>
.nav-link {
  text-decoration: none;
  color: inherit;
  left: 0;
  right: 0;

  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-icon {
  font-size: 1.2rem;
}

.cart-badge {
  position: relative;
  top: 8px;
  z-index: 1;
}
</style>
