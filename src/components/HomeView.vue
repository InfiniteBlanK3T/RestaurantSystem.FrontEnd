<template>
  <v-container>
    <div class="home">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1 class="text-center">Welcome to Restaurant App</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-img src="https://example.com/image.jpg" height="400"></v-img>
              <v-card-title>About Us</v-card-title>
              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel
                bibendum consectetur, nisl nisi aliquam eros, eget tincidunt nisl nunc eget lorem.
                Sed auctor, magna a bibendum bibendum, nulla lectus aliquam eros, eget tincidunt
                nisl nunc eget lorem.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>
