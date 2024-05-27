<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-card elevation="4" rounded="lg">
              <v-card-title class="text-h5 font-weight-bold">Login</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-alert
                    density="compact"
                    text="Only ONE Staff/Admin Account is available for login. Customers can login using the demo accounts."
                    title="-DEMO VERSION-"
                    type="warning"
                    border="top"
                  ></v-alert>
                  <v-text-field
                    v-model="username"
                    label="Username"
                    prepend-inner-icon="mdi-account"
                    outlined
                    dense
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    label="Password"
                    prepend-inner-icon="mdi-lock"
                    outlined
                    dense
                    type="password"
                    required
                  ></v-text-field>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-btn color="primary" block rounded type="submit" class="my-1">Login</v-btn>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-btn color="primary" router to="/register" block rounded class="my-1"
                        >Register</v-btn
                      >
                    </v-col>
                  </v-row>
                  <v-divider class="my-4"></v-divider>
                  <div class="demo-login-container">
                    <v-card-title class="text-h6 font-weight-bold mt-1 mb-1 demo-login-title"
                      >Demo Login</v-card-title
                    >
                    <v-btn
                      @click="loginAsStaff"
                      color="warning"
                      block
                      rounded
                      class="mb-2 demo-login-btn"
                      >Prefill Staff Login</v-btn
                    >
                    <div class="demo-login-row">
                      <v-col cols="12" md="6">
                        <v-select
                          :items="customers"
                          item-text="title"
                          item-value="value"
                          v-model="selectedCustomer"
                          label="Login as Customer"
                          outlined
                          dense
                          @change="loginAsCustomer"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-btn
                          @click="loginAsCustomer"
                          color="warning"
                          block
                          rounded
                          class="demo-login-btn"
                          >Prefill Customer Login</v-btn
                        >
                      </v-col>
                    </div>
                  </div>
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
      selectedCustomer: null,
      customers: [
        {
          title: 'Bob Adams',
          value: { username: 'bob.adams', password: 'bob.adams@testing' }
        },
        {
          title: 'Alice Brown',
          value: { username: 'alice.brown', password: 'alice.brown01@testing' }
        },
        {
          title: 'Charlie Davis',
          value: { username: 'charlie.davis', password: '01@testing' }
        },
        {
          title: 'David Evans',
          value: { username: 'david.evans', password: '01@testing' }
        },
        {
          title: 'Eve Green',
          value: { username: 'eve.green', password: '01@testing' }
        },
        {
          title: 'Frank Harris',
          value: { username: 'frank.harris', password: '01@testing' }
        },
        {
          title: 'Grace Ives',
          value: { username: 'grace.ives', password: '01@testing' }
        }
      ]
    }
  },
  methods: {
    loginAsCustomer() {
      if (this.selectedCustomer) {
        this.username = this.selectedCustomer.username
        this.password = this.selectedCustomer.password
      }
    },
    loginAsStaff() {
      this.username = 'staff'
      this.password = 'staff01@testing'
    },
    login() {
      const credentials = {
        username: this.username,
        password: this.password
      }

      // Get the CSRF token from the cookie
      const csrfToken = this.getCookie('csrftoken')

      fetch(`${process.env.VUE_APP_API_URL}login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken
        },
        body: JSON.stringify(credentials)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          return response.json()
        })
        .then((data) => {
          if (data.success) {
            localStorage.setItem('access', data.access)
            localStorage.setItem('refresh', data.refresh)
            localStorage.setItem('username', this.username)
            this.isLoggedIn = true
            this.$emit('login', this.username)

            this.$router.push('/').then(() => window.location.reload())
          } else {
            console.error(data.error)
            alert('Login failed. Incorrect username or password. Please try again.')
          }
        })
        .catch((error) => {
          console.error('Login error:', error)
          alert('An error occurred while logging in. Please try again.')
        })
    },
    getCookie(name) {
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) return parts.pop().split(';').shift()
    }
  }
}
</script>
<style scoped>
.demo-login-container {
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
}

.demo-login-title {
  color: #333;
}

.demo-login-btn {
  text-transform: none;
}

.demo-login-row {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}

.demo-login-row > * {
  padding: 8px;
}
</style>
