<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" v-for="item in menuItems" :key="item.id">
        <v-card>
          <v-img :src="item.image" aspect-ratio="1.7"></v-img>
          <v-card-title class="headline">{{ item.name }}</v-card-title>
          <v-card-subtitle>{{ item.description }}</v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link :to="`/menu/${item.id}`">
              <v-btn color="primary" text>View Details</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'MenuList',
  data() {
    return {
      menuItems: [],
      nextPage: 'http://127.0.0.1:8000/api/menu-items/',
      restaurantName: '',
      pageSize: 6,
      pageNumber: 1
    }
  },
  method: {
    async fetchMenuItems() {
      while (this.nextPage) {
        try {
          const response = await fetch(
            `${this.nextPage}?restaurant_name=${encodeURIComponent(this.restaurantName)}&page_size=${this.pageSize}&page=${this.pageNumber}`
          )
          const data = await response.json()
          this.menuItems = [...this.menuItems, ...data.results]
          this.nextPage = data.next
          this.pageNumber += 1
        } catch (error) {
          console.error('There was an error:', error)
          this.nextPage = null
        }
      }
    },
    onRestaurantNameChange(newName) {
      this.restaurantName = newName
      this.menuItems = []
      this.pageNumber = 1
      this.fetchMenuItems()
    }
  },
  async created() {
    while (this.nextPage) {
      try {
        const response = await fetch(this.nextPage)
        const data = await response.json()
        this.menuItems = [...this.menuItems, ...data.results]
        this.nextPage = data.next
      } catch (error) {
        console.error('There was an error:', error)
        this.nextPage = null
      }
    }
  }
}
</script>
