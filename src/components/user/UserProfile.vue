<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card class="elevation-4">
          <v-card-title class="text-h5 font-weight-bold mb-4">User Profile</v-card-title>
          <v-card-text>
            <v-alert
              density="compact"
              text="This feature not supports yet - Just DEMO DATA**"
              title="-DEMO VERSION-"
              type="warning"
            ></v-alert>
            <br />
            <v-row>
              <v-col cols="12" md="6">
                <v-avatar size="150" color="primary" class="mb-4">
                  <span class="white--text display-3">{{ initials }}</span>
                </v-avatar>
                <v-file-input
                  v-model="profilePicture"
                  label="Upload Profile Picture"
                  outlined
                  dense
                  prepend-icon="mdi-camera"
                  show-size
                  accept="image/*"
                ></v-file-input>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="userProfile.name"
                  label="Name"
                  outlined
                  dense
                  prepend-icon="mdi-account"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="userProfile.email"
                  label="Email"
                  outlined
                  dense
                  prepend-icon="mdi-email"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="userProfile.phone"
                  label="Phone"
                  outlined
                  dense
                  prepend-icon="mdi-phone"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="userProfile.address"
                  label="Address"
                  outlined
                  dense
                  prepend-icon="mdi-map-marker"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="updateProfile" block variant="flat"
              >Update Profile</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'UserProfile',
  data() {
    return {
      userProfile: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 890',
        address: '123 Main Street, Anytown USA'
      },
      profilePicture: null
    }
  },
  computed: {
    initials() {
      const names = this.userProfile.name.split(' ')
      return `${names[0][0]}${names[1] ? names[1][0] : ''}`
    }
  },
  methods: {
    updateProfile() {
      alert('Profile updated successfully! - DEMO VERSION - No API Call')
    }
  }
}
</script>

<style scoped>
.v-card {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.v-card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
}

.v-text-field {
  margin-bottom: 1rem;
}
</style>
