<template>
  <v-navigation-drawer
    app
    permanent
    width="150"
    color="primary"
    dark
    class=" elevation-4"
  >
    <v-list nav dense>
      <router-link to="/" class="nav-link">
        <v-list-item link>

            <v-icon>mdi-home</v-icon>

          <v-list-item-title class="d-none d-md-block">Home</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/menu" class="nav-link">
        <v-list-item link>

            <v-icon>mdi-menu</v-icon>

          <v-list-item-title class="d-none d-md-block">Menu</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/cart" v-if="userRole === 'customer'" class="nav-link">
        <v-list-item link>

            <v-badge
              color="error"
              overlap
              bordered
              :value="cartItemCount"
              :content="cartItemCount"
              class="cart-badge"
            >
              <v-icon>mdi-cart</v-icon>
            </v-badge>

          <v-list-item-title class="d-none d-md-block">Cart</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link v-if="cartItems.length > 0" to="/checkout" class="nav-link">
        <v-list-item link>

            <v-icon>mdi-credit-card</v-icon>

          <v-list-item-title class="d-none d-md-block">Checkout</v-list-item-title>
        </v-list-item>
      </router-link>

      <v-divider></v-divider>

      <!-- User Dashboard -->
      <router-link
        v-if="userRole === 'customer'"
        link
        to="/reservations/create"
        class="nav-link"
      >
        <v-list-item link>

            <v-icon>mdi-calendar</v-icon>

          <v-list-item-title class="d-none d-md-block">Book a reservation!</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/profile" v-if="isLoggedIn" class="nav-link">
        <v-list-item link>

            <v-icon>mdi-account</v-icon>

          <v-list-item-title class="d-none d-md-block">Profile</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link
        v-if="userRole === 'customer'"
        link
        to="/orders/history"
        class="nav-link"
      >
        <v-list-item link>

            <v-icon>mdi-history</v-icon>

          <v-list-item-title class="d-none d-md-block">Order History</v-list-item-title>
        </v-list-item>
      </router-link>

      <v-divider></v-divider>

      <!-- Admin Dashboard -->
      <router-link
        v-if="userRole === 'staff'"
        link
        to="/dashboard/reservations"
        class="nav-link"
      >
        <v-list-item link>

            <v-icon>mdi-calendar-multiple</v-icon>

          <v-list-item-title class="d-none d-md-block">Reservations Data</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link v-if="userRole === 'staff'" to="/menu/create" class="nav-link">
        <v-list-item link>

            <v-icon>mdi-plus-circle</v-icon>

          <v-list-item-title class="d-none d-md-block">Add Menu Item</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link
        v-if="userRole === 'staff'"
        to="/dashboard/analytics"
        class="nav-link"
      >
        <v-list-item link>
            <v-icon>mdi-chart-line</v-icon>
          <v-list-item-title class="d-none d-md-block">Analytics</v-list-item-title>
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
      required: true,
    },
    userRole: {
      type: String,
      required: true,
    },
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    cartItemCount() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0)
    },
  },
}
</script>

<style scoped>
.nav-link {
  text-decoration: none;
  color: inherit;
}

.cart-badge {
  position: relative;
  top: 8px;
  right: 1px;
}

@media (max-width: 767px) {
  .v-navigation-drawer {
    width: 65px !important;
  }
  .d-none {
    display: none !important;
  }
}
</style>