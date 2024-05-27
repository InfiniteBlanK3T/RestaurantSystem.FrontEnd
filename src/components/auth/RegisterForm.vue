<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="elevation-4">
          <v-card-title class="text-h5 font-weight-bold mb-4">Register</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="isFormValid" lazy-validation>
              <v-alert
                density="compact"
                text="User can only register as a customer. Staff registration is not allowed."
                title="-DEMO VERSION-"
                type="warning"
              ></v-alert>
              <v-text-field
                v-model="registerForm.username"
                label="User Name"
                outlined
                dense
                :rules="usernameRules"
                prepend-icon="mdi-account"
                required
              ></v-text-field>
              <v-text-field
                v-model="registerForm.firstName"
                label="First Name"
                outlined
                dense
                :rules="nameRules"
                prepend-icon=""
                required
              ></v-text-field>
              <v-text-field
                v-model="registerForm.lastName"
                label="Last Name"
                outlined
                dense
                :rules="nameRules"
                prepend-icon=""
                required
              ></v-text-field>

              <v-text-field
                v-model="registerForm.email"
                label="Email"
                outlined
                dense
                :rules="emailRules"
                prepend-icon="mdi-email"
                required
              ></v-text-field>
              <v-text-field
                v-model="registerForm.password1"
                label="Password"
                outlined
                dense
                :rules="passwordRules"
                prepend-icon="mdi-lock"
                required
                type="password"
              ></v-text-field>
              <v-text-field
                v-model="registerForm.password2"
                label="Confirm Password"
                outlined
                dense
                :rules="confirmPasswordRules"
                prepend-icon="mdi-lock"
                required
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="register" variant="flat" block :disabled="!isFormValid"
              >Register</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      isFormValid: true,
      registerForm: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password1: '',
        password2: ''
      },
      usernameRules: [
        (v) => !!v || 'Username is required',
        (v) => /^[a-zA-Z\s]+$/.test(v) || 'Userame must contain only letters and spaces'
      ],
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => /^[a-zA-Z\s]+$/.test(v) || 'Name must contain only letters and spaces'
      ],
      emailRules: [
        (v) => !!v || 'Email is required',
        (v) => /.+@.+\..+/.test(v) || 'Email must be valid'
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => v.length >= 8 || 'Password must be at least 8 characters long'
      ],
      confirmPasswordRules: [
        (v) => !!v || 'Confirm password is required',
        (v) => v === this.registerForm.password1 || 'Passwords do not match'
      ]
    }
  },
  methods: {
    register() {
      if (this.$refs.form.validate()) {
        const data = {
          username: this.registerForm.username,
          email: this.registerForm.email,
          password1: this.registerForm.password1,
          password2: this.registerForm.password2,
          first_name: this.registerForm.firstName,
          last_name: this.registerForm.lastName
        }
        fetch(`${this.$apiUrl}register/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
            }
            return response.json()
          })
          .then(() => {
            alert('Register Successful. Redirecting to Login Page.')
            this.$refs.form.reset()
            setTimeout(() => {
              this.$router.push('/login')
            }, 1000)
          })
          .catch((error) => {
            console.error('Error:', error)
            alert('Register Failed. Please try again.')
          })
      }
    }
  }
}
</script>
