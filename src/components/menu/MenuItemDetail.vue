<template>
    <div>
      <h1 class="mb-4">Menu Item Details</h1>
      <div class="row">
        <div class="col-md-6">
          <v-img :src="menuItem.imageUrl" height="400px"></v-img>
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
        menuItem: {
          id: 1,
          name: 'Margherita Pizza',
          description: 'Classic tomato sauce, mozzarella, and fresh basil.',
          imageUrl: 'https://via.placeholder.com/150',
          price: 12.99
        }
      }
    },
    methods: {
      addToCart(item) {
        this.$emit('addToCart', item)
      }
    }
  }
</script>