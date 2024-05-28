<template>
  <v-container>
    <div class="home">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1 class="text-center display-3 mb-8">Welcome to Relaxing Koala</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="8" offset-md="2">
            <v-card elevation="4" rounded="lg">
              <v-img
                src="https://img.freepik.com/free-photo/photorealistic-wooden-house-interior-with-timber-decor-furnishings\_23-2151263549.jpg?t=st=1716180166~exp=1716183766~hmac=1d0cf1f59fe787f44540046638c1ad5067785bf8e52be037a37bb7d069fbe794&w=996"
                height="400"
                cover
                class="rounded-top"
              ></v-img>
              <v-card-title class="text-h5 font-weight-bold">About This Web App Project</v-card-title>
              <v-card-subtitle class="text font-weigh-italic"> Started date: 18th May 2024</v-card-subtitle>
              <v-card-text class="text-body-1">
                This Restaurant Information System was built as a Demo Project -  Full Stack. <br/>
                With Django as Backend and Vue.JS as Frontend and SQLite as a Database. Shipping with Docker container and CI/ CD. <br/>
                The website is a simple restaurant system where you can add, edit, delete, and view menu items. 
                Some of the features are limited for Demo Purposes however I will implement more later on. <br/>
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
  name: 'HomeView',
}
</script>

<style scoped>
.home {
  background-color: #f5f5f5;
  padding: 40px 0;
}
</style>