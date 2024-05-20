<template>
  <div>
    <h1 class="mb-4">Menu Item Details</h1>
    <div class="row">
      <div class="col-md-6">
        <v-img :src="menuItem.image" height="400px"></v-img>
      </div>
      <div class="col-md-6">
        <h2>{{ menuItem.name }}</h2>
        <p>{{ menuItem.description }}</p>
        <p>Price: ${{ menuItem.price }}</p>
        <v-btn color="primary" @click="addToCart(menuItem)">Add to Cart</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuItemDetail',
  data() {
    return {
      menuItem: {}
    }
  },
  async created() {
    const response = await fetch(`http://127.0.0.1:8000/api/menu-items/${this.$route.params.id}`)
    const data = await response.json()
    this.menuItem = data
  },
  methods: {
    addToCart(item) {
      this.$emit('addToCart', item)
    }
  }
}
</script>
