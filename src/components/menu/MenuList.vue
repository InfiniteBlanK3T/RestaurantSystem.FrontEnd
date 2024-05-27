<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-alert
          v-if="!restaurantName"
          text="Please selecte your restaurant to view the menu items!"
          title="Hi there!"
          type="info"
          variant="tonal"
        ></v-alert>
        <v-select
          :items="restaurants"
          label="Select a restaurant"
          v-model="restaurantName"
          prepend-icon="mdi-search-web"
        ></v-select>
        <v-alert
          v-if="restaurantName === 'Relaxing Koala - Branch 4'"
          density="compact"
          text="Relaxing Koala - Branch 4 is Demo Testing environment - Adding new MenuItem to Restaurant by Admin account. Please DO NOT ORDER from here!"
          title="Warning"
          type="error"
        ></v-alert>
        <br />
        <v-btn @click="onRestaurantNameChange">Search</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="4" md="4" lg="3" v-for="item in paginatedData" :key="item.id">
        <v-card>
          <v-img :src="item.image_url" aspect-ratio="1.7"></v-img>
          <v-card-title class="headline">{{ item.name }}</v-card-title>
          <v-card-subtitle>{{ item.description }}</v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link :to="`/menu/${item.id}`">
              <v-btn color="primary" v-pulse-on-hover variant="flat">View Details</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <paginate
      v-if="restaurantName"
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
      nextPage: `${this.$apiUrl}menu-items/`,
      restaurantName: '',
      currentPage: 1,
      itemsPerPage: 6,
      restaurants: [
        'Relaxing Koala - Branch 1',
        'Relaxing Koala - Branch 2',
        'Relaxing Koala - Branch 3',
        'Relaxing Koala - Branch 4'
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
          `${this.$apiUrl}menu-items/?restaurant_name=${this.restaurantName}`
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
      this.nextPage = `${this.$apiUrl}menu-items/?restaurant_name=${encodeURIComponent(this.restaurantName)}`
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
          `${this.$apiUrl}menu-items/${this.$route.params.id}`
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
