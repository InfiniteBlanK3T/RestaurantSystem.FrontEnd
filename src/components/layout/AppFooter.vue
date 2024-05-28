<template>
  <v-footer color="primary" class="white--text" padless>
    <v-container>
      <v-row justify="center" class="py-4">
        <v-col cols="12" sm="6" md="4" class="text-center mb-4 mb-md-0">
          <h4 class="font-weight-bold mb-2">Restaurant Information System</h4>
          <p>&copy; {{ new Date().getFullYear() }} Demo Company Name</p>
        </v-col>
        <v-col cols="12" sm="6" md="4" class="text-center mb-4 mb-md-0">
          <h4 class="font-weight-bold mb-3">Connect with Us</h4>
          <div class="d-flex justify-center">
            <v-btn
              disabled
              v-for="link in socialLinks"
              :key="link.name"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              icon
              color="white"
              class="mx-2"
            >
              <v-icon>{{ link.icon }}</v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="4" class="text-center">
          <h4 class="font-weight-bold mb-3">More Links</h4>
          <div>
            <v-btn
              href="https://www.linkedin.com/in/thomas-vo-ba4aa3289/"              
              target="_blank"
              text
              color="white"
              class="mr-2"
            >
              LinkedIn
            </v-btn>
            <v-btn
              href="https://github.com/InfiniteBlanK3T"
              target="_blank"
              text
              color="white"
            >
              GitHub
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row justify="center" class="py-2">
        <v-col cols="12" class="text-center">
          <p class="mb-0">Made by BlanK3T - THOMAS</p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      socialLinks: [
        { name: 'Facebook', icon: 'mdi-facebook', url: '#' },
        { name: 'Twitter', icon: 'mdi-twitter', url: '#' },
        { name: 'Instagram', icon: 'mdi-instagram', url: '#' }
      ]
    }
  }
}
</script>

<style scoped>
.v-footer {
  background-color: #333;
}

.v-btn--icon {
  height: 36px;
  width: 36px;
}
</style>
