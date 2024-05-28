<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-alert
          v-if="!restaurantName"
          text="Please select your restaurant to view the menu items!"
          title="Hi there!"
          type="info"
          variant="tonal"
          class="mb-4"
        ></v-alert>
        <v-select
          :items="restaurants"
          label="Select a restaurant"
          v-model="restaurantName"
          prepend-icon="mdi-search-web"
          variant="outlined"
          class="mb-4"
        ></v-select>
        <v-alert
          v-if="restaurantName === 'Relaxing Koala - Branch 4'"
          density="compact"
          text="Relaxing Koala - Branch 4 is Demo Testing environment - Adding new MenuItem to Restaurant by Admin account. Please DO NOT ORDER from here!"
          title="Warning"
          type="error"
          class="mb-4"
        ></v-alert>
        <v-btn
          @click="onRestaurantNameChange"
          color="primary"
          class="text-capitalize mb-4"
          >Search</v-btn
        >
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="item in paginatedData"
        :key="item.id"
      >
        <v-card class="menu-card">
          <v-img :src="item.image_url" aspect-ratio="1.7" cover></v-img>
          <v-card-title class="text-h6">{{ item.name }}</v-card-title>
          <v-card-text>{{ item.description }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link :to="`/menu/${item.id}`">
              <v-btn color="primary" variant="flat">View Details</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="my-4"></v-divider>

    <paginate
      v-if="restaurantName"
      :page-count="pageCount"
      :click-handler="changePage"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      class="text-center"
    ></paginate>
  </v-container>
</template>

<script>
import Paginate from 'vuejs-paginate-next'

export default {
  name: 'MenuList',
  components: {
    Paginate,
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
        'Relaxing Koala - Branch 4',
      ],
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
    },
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
      this.nextPage = `${this.$apiUrl}menu-items/?restaurant_name=${encodeURIComponent(
        this.restaurantName
      )}`
      this.$nextTick(() => {
        this.fetchMenuItems()
      })
    },
    changePage(page) {
      this.currentPage = page
    },
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
  },
}
</script>

<style scoped>
.menu-card {
  transition: all 0.3s ease;
}

.menu-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>