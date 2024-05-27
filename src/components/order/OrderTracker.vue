<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <v-card class="mt-5">
          <v-card-title class="headline"> Order Status </v-card-title>
          <v-alert
            density="compact"
            text="Just a mock process of order status. No real-time data."
            title="-DEMO VERSION-"
            type="warning"
          ></v-alert>
          <v-card-text>
            <div class="order-status">
              <div class="status-item" :class="{ completed: status >= 1 }">
                <div class="status-icon">
                  <v-progress-circular
                    v-if="status === 1"
                    indeterminate
                    color="primary"
                    :size="24"
                    :width="4"
                  ></v-progress-circular>
                  <v-icon v-else>mdi-check</v-icon>
                </div>
                <div class="status-label">Order Placed</div>
              </div>
              <div class="status-item" :class="{ completed: status >= 2 }">
                <div class="status-icon">
                  <v-progress-circular
                    v-if="status === 2"
                    indeterminate
                    color="primary"
                    :size="24"
                    :width="4"
                  ></v-progress-circular>
                  <v-icon v-else>mdi-check</v-icon>
                </div>
                <div class="status-label">Order Confirmed</div>
              </div>
              <div class="status-item" :class="{ completed: status >= 3 }">
                <div class="status-icon">
                  <v-progress-circular
                    v-if="status === 3"
                    indeterminate
                    color="primary"
                    :size="24"
                    :width="4"
                  ></v-progress-circular>
                  <v-icon v-else>mdi-check</v-icon>
                </div>
                <div class="status-label">Order Prepared</div>
              </div>
              <div class="status-item" :class="{ completed: status >= 4 }">
                <div class="status-icon">
                  <v-progress-circular
                    v-if="status === 4"
                    indeterminate
                    color="primary"
                    :size="24"
                    :width="4"
                  ></v-progress-circular>
                  <v-icon v-else>mdi-check</v-icon>
                </div>
                <div class="status-label">Order Out for Delivery</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
        <v-dialog v-model="showFeedbackDialog" max-width="500px">
          <v-card>
            <v-card-title class="headline"> Provide Feedback </v-card-title>
            <v-card-text>
              <div class="text-center">
                <v-rating
                  v-model="rating"
                  :item-labels="['Bad', '', '', '', 'Excellence!']"
                  item-label-position="bottom"
                  hover
                  size="64"
                ></v-rating>
              </div>
              <v-textarea
                v-model="description"
                label="Comments"
                outlined
                rows="3"
                class="mt-4"
              ></v-textarea>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="submitFeedback">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: 0,
      showFeedbackDialog: false,
      rating: 3,
      description: ''
    }
  },
  mounted() {
    this.startStatusAnimation()
  },
  methods: {
    startStatusAnimation() {
      const totalStatuses = 5
      let currentStatus = 1

      const animateStatus = () => {
        this.status = currentStatus
        currentStatus++

        if (currentStatus <= totalStatuses) {
          setTimeout(animateStatus, 3000)
        } else {
          this.showFeedbackDialog = true
        }
      }

      animateStatus()
    },
    async submitFeedback() {
      const accessToken = localStorage.getItem('access')

      const feedback = {
        order: this.orderId,
        rating: this.rating,
        comment: this.description
      }

      await fetch(`${this.$apiUrl}feedbacks/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(feedback)
      })

      // Reset the feedback dialog
      this.rating = 0
      this.description = ''
      this.showFeedbackDialog = false
      this.$router.push('/menu').then(() => window.location.reload())
    }
  }
}
</script>

<style scoped>
.order-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.status-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.status-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
  margin-bottom: 10px;
}

.status-item.completed .status-icon {
  background-color: #4caf50;
  color: white;
}

.status-label {
  font-size: 14px;
  text-align: center;
}
</style>
