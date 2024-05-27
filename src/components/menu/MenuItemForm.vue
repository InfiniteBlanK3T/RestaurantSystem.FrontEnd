<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <v-card class="elevation-4 rounded">
          <v-card-title class="text-h5 font-weight-bold mb-4">Add/Edit Menu Item</v-card-title>
          <v-card-text>
            <v-form>
              <v-alert
                density="compact"
                text="Restricted to just 1 restaurant (Relaxing Koala - Branch 4) for demo purposes."
                title="-DEMO VERSION-"
                type="info"
                variant="tonal"
              ></v-alert>
              <v-text-field
                label="Relaxing Koala - Branch 4"
                prepend-icon="mdi-map-marker"
                disabled
                readonly
              ></v-text-field>
              <v-text-field
                v-model="menuItem.name"
                label="Name"
                prepend-icon="mdi-food"
                required
              ></v-text-field>
              <v-textarea
                v-model="menuItem.description"
                label="Description"
                prepend-icon="mdi-text"
                required
              ></v-textarea>
              <v-text-field
                v-model="menuItem.price"
                label="Price"
                type="number"
                prepend-icon="mdi-currency-usd"
                required
              ></v-text-field>
              <v-alert
                density="compact"
                text="Only URLs are allowed for demo purposes."
                title="-DEMO VERSION-"
                type="warning"
                ><a
                  href="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1299&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                >
                  Example Images URL</a
                >
              </v-alert>
              <v-text-field
                v-model="menuItem.image_url"
                label="Image URL"
                prepend-icon="mdi-link"
              ></v-text-field>
              <v-btn color="primary" class="mt-4" @click="saveMenuItem">Save</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </div>
    </div>
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
        image_url: '',
        restaurant: 4
      }
    }
  },
  methods: {
    saveMenuItem() {
      const url = `${this.$apiUrl}menu-items/`
      const menuItem = this.menuItem

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`
        },
        body: JSON.stringify(menuItem)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          return response.json()
        })
        .then((data) => {
          console.log('Menu item saved:', data)
          this.$router.push('/menu')
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error)
        })
    }
  }
}
</script>
