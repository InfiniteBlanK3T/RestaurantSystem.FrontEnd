<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click.stop="$emit('toggleDrawer')"></v-app-bar-nav-icon>
    <img sizes="8" src="./icons8-whale-94.png" alt="Logo" />
    <v-toolbar-title>Restaurant Information System</v-toolbar-title>

    <v-spacer></v-spacer>
    <span v-if="isLoggedIn">Welcome, {{ username }}!</span>
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
    },
    username: {
      type: String,
      default: ''
    }
  },
  methods: {
    logout() {
      this.$router.push('/login')
      this.$emit('logout')
    }
  }
}
</script>
