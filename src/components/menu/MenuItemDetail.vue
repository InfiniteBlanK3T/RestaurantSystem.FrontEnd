<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold mb-6 text-center">Menu Item Details</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-img
          :src="menuItem.image_url"
          height="400"
          cover
          class="rounded-lg"
        ></v-img>
      </v-col>
      <v-col cols="12" md="6">
        <h2 class="text-h5 font-weight-bold mb-4">{{ menuItem.name }}</h2>
        <p class="mb-4">{{ menuItem.description }}</p>
        <p class="text-h6 mb-6">Price: ${{ menuItem.price }}</p>
        <div class="d-flex justify-space-between">
          <v-btn
            v-if="!isLoggedIn"
            color="secondary"
            to="/login"
            class="text-capitalize"
          >Please sign up or login to Add to Cart!</v-btn>
          <v-btn
            v-if="isLoggedIn && userRole === 'staff'"
            color="warning"
            class="text-capitalize"
            readonly
          >You must be a customer to place an Order</v-btn>
          <v-btn
            v-else
            color="primary"
            @click="addToCart(menuItem)"
            class="text-capitalize mr-4"
          >Add to Cart</v-btn>     
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'MenuItemDetail',
  data() {
    return {
      menuItem: {},
      userRole: localStorage.getItem('username') || '',
    }
  },
  async created() {
    const response = await fetch(
      `${this.$apiUrl}menu-items/${this.$route.params.id}`
    )
    const data = await response.json()
    this.menuItem = data
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('access')
    },
  },
  methods: {
    addToCart(item) {
      this.$emit('addToCart', item)

    },
  },
}
</script>

<style scoped>
.v-btn {
  text-transform: capitalize;
}

@media (max-width: 767px) {
  .d-flex {
    flex-direction: column;
    align-items: flex-start;
  }

  .mr-4 {
    margin-right: 0 !important;
    margin-bottom: 1rem;
  }
}
</style>