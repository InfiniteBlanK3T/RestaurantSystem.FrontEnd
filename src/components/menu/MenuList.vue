<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" v-for="item in menuItems" :key="item.id">
        <v-card>
          <v-img :src="item.imageUrl" aspect-ratio="1.7"></v-img>
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
        menuItems: [
          {
            id: 1,
            name: 'Margherita Pizza',
            description: 'Classic tomato sauce, mozzarella, and fresh basil.',
            imageUrl: 'https://via.placeholder.com/150'
          },
          {
            id: 2,
            name: 'Caesar Salad',
            description: 'Crisp romaine lettuce, croutons, Parmesan, and Caesar dressing.',
            imageUrl: 'https://via.placeholder.com/150'
          },
          {
            id: 3,
            name: 'Spaghetti Bolognese',
            description: 'Spaghetti with meat sauce made with ground beef, tomatoes, and spices.',
            imageUrl: 'https://via.placeholder.com/150'
          },
          {
            id: 4,
            name: 'Chicken Alfredo',
            description: 'Fettuccine pasta with creamy Alfredo sauce and grilled chicken.',
            imageUrl: 'https://via.placeholder.com/150'
          }
          // Add more menu items as needed
        ]
      }
    }
  }
  </script>