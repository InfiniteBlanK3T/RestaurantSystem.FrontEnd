<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="elevation-4">
          <v-card-title class="text-h5 font-weight-bold mb-4">Register</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="isFormValid" lazy-validation>
              <v-text-field
                v-model="registerForm.name"
                label="Full Name"
                outlined
                dense
                :rules="nameRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="registerForm.email"
                label="Email"
                outlined
                dense
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="registerForm.password"
                label="Password"
                outlined
                dense
                :rules="passwordRules"
                required
                type="password"
              ></v-text-field>
              <v-text-field
                v-model="registerForm.confirmPassword"
                label="Confirm Password"
                outlined
                dense
                :rules="confirmPasswordRules"
                required
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="register" :disabled="!isFormValid">Register</v-btn>
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
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
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
        (v) => v === this.registerForm.password || 'Passwords do not match'
      ]
    }
  },
  methods: {
    register() {
      if (this.$refs.form.validate()) {
        // Implement the logic to register the user
        console.log('Register form data:', this.registerForm)
        // Reset the form after successful registration
        this.$refs.form.reset()
      }
    }
  }
}
</script>
