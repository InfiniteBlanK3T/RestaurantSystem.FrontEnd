<template>
    <div>
      <h1 class="mb-4">Add/Edit Menu Item</h1>
      <v-form>
        <v-text-field v-model="menuItem.name" label="Name" required></v-text-field>
        <v-textarea v-model="menuItem.description" label="Description" required></v-textarea>
        <v-text-field v-model="menuItem.price" label="Price" type="number" required></v-text-field>
        <v-file-input v-model="menuItem.imageUrl" label="Image" show-size counter></v-file-input>
        <v-btn color="primary" class="mt-4">Save</v-btn>
      </v-form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MenuItemForm',
    data() {
      return {
        menuItem: {
          name: '',
          description: '',
          price: null,
          imageUrl: null
        }
      }
    },
    methods: {
      saveMenuItem() {
        console.log('Saving menu item:', this.menuItem)
      }
    }
  }
  </script>