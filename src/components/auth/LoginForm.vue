<template>
    <v-app>
      <v-app-bar app>
        <v-spacer></v-spacer>
        <v-btn v-if="isLoggedIn" @click="logout">
          <router-link to="/login" replace>Logout<v-icon>mdi-logout</v-icon></router-link>
        </v-btn>
      </v-app-bar>
      <v-main>
        <v-container>
          <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
              <v-card>
                <v-card-title>Login</v-card-title>
                <v-card-text>
                  <v-form @submit.prevent="login">
                    <v-text-field v-model="username" label="Username" type="username" required></v-text-field>
                    <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
                    <v-btn type="submit" color="primary" block>Login</v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
</template>
  
<script>
  export default {
    name: 'LoginForm',
    data() {
      return {
        username: '',
        password: '',
        isLoggedIn: false,
      };
    },
    methods: {
      login() {

        const credentials = {
          username: this.username,
          password: this.password,
        };
  
        // Get the CSRF token from the cookie
        const csrfToken = this.getCookie('csrftoken');
  
        fetch('http://localhost:8000/api/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          body: JSON.stringify(credentials),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              this.isLoggedIn = true;
              this.$router.push('/');
            } else {
              console.error(data.error);
            }
          })
          .catch((error) => {
            console.error('Login error:', error);
          });
      },
      logout() {
        this.isLoggedIn = false;
        this.$router.push('/login');
      },
      getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      },
    },
  };
</script>