<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-select
          :items="restaurants"
          label="Select a restaurant"
          v-model="restaurantName"
        ></v-select>
        <v-btn @click="onRestaurantNameChange">Search</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="4" md="4" lg="3" v-for="item in paginatedData" :key="item.id">
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
    <v-divider></v-divider>
    <paginate
      :page-count="pageCount"
      :click-handler="changePage"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
    ></paginate>
  </v-container>
</template>

<script>
import Paginate from 'vuejs-paginate-next'

export default {
  name: 'MenuList',
  components: {
    Paginate
  },
  data() {
    return {
      menuItems: [],
      nextPage: 'http://127.0.0.1:8000/api/menu-items/',
      restaurantName: '',
      currentPage: 1,
      itemsPerPage: 6,
      restaurants: [
        'Relaxing Koala - Branch 1',
        'Relaxing Koala - Branch 2',
        'Relaxing Koala - Branch 3'
      ]
    }
  },
  computed: {
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.menuItems.slice(start, end)
    },
    pageCount() {
      return Math.ceil(this.menuItems.length / this.itemsPerPage)
    }
  },
  methods: {
    async fetchMenuItems() {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/menu-items/?restaurant_name=${this.restaurantName}`
        )
        const data = await response.json()
        this.menuItems = data.results
        this.nextPage = data.next
      } catch (error) {
        console.error('There was an error:', error)
      }
    },
    onRestaurantNameChange() {
      this.menuItems = []
      this.currentPage = 1
      this.nextPage = `http://127.0.0.1:8000/api/menu-items/?restaurant_name=${encodeURIComponent(this.restaurantName)}`
      this.$nextTick(() => {
        this.fetchMenuItems()
      })
    },
    changePage(page) {
      this.currentPage = page
    }
  },
  async created() {
    if (this.$route.params.id) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/menu-items/${this.$route.params.id}`
        )
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        this.menuItem = data
      } catch (error) {
        console.error('Failed to fetch menu item:', error)
      }
    }
  }
}
</script>
