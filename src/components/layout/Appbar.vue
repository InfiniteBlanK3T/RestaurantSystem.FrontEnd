<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click.stop="$emit('toggleDrawer')"></v-app-bar-nav-icon>
    <v-toolbar-title>Restaurant Information System</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text router to="/login" v-if="!isLoggedIn">
      Login
      <v-icon>mdi-login</v-icon>
    </v-btn>
    <v-btn text @click="logout" v-else>
      Logout
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    logout() {
      this.isLoggedIn = false
      this.$router.push('/login')
      this.$emit('logout')
    }
  }
}
</script>
