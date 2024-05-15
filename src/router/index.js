import { createRouter, createWebHistory } from 'vue-router'

// Home component
import HomeView from '../components/HomeView.vue'

// Layout components
// import AppBar from '../components/layout/Appbar.vue'
// import NavigationDrawer from '../components/layout/NavigationDrawer.vue'

// Auth components
import LoginForm from '../components/auth/LoginForm.vue'
//import RegisterForm from '../components/auth/RegisterForm.vue'

// Menu components
import MenuList from '../components/menu/MenuList.vue'
import MenuItemDetail from '../components/menu/MenuItemDetail.vue'
import MenuItemForm from '../components/menu/MenuItemForm.vue'

// Order components
import Cart from '../components/order/Cart.vue'
import Checkout from '../components/order/Checkout.vue'
import OrderTracker from '../components/order/OrderTracker.vue'

// Reservation components
import ReservationForm from '../components/reservation/ReservationForm.vue'
import ReservationList from '../components/reservation/ReservationList.vue'

// // User components
// import UserProfile from '../components/user/UserProfile.vue'
// import OrderHistory from '../components/user/OrderHistory.vue'

// // Dashboard components
// import ReservationOverview from '../components/dashboard/ReservationOverview.vue'
// import OrderManagement from '../components/dashboard/OrderManagement.vue'
// import SalesAnalytics from '../components/dashboard/SalesAnalytics.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginForm },
  //{ path: '/register', component: RegisterForm },
  { path: '/menu', component: MenuList },
  { path: '/menu/:id', component: MenuItemDetail },
  { path: '/menu/create', component: MenuItemForm },
  { path: '/menu/:id/edit', component: MenuItemForm },
  { path: '/cart', component: Cart },
  { path: '/checkout', component: Checkout },
  { path: '/orders', component: OrderTracker },
  { path: '/reservations/create', component: ReservationForm },
  { path: '/reservations', component: ReservationList },
  //   { path: '/profile', component: UserProfile },
  //   { path: '/orders/history', component: OrderHistory },
  //   { path: '/dashboard/reservations', component: ReservationOverview },
  //   { path: '/dashboard/orders', component: OrderManagement },
  //   { path: '/dashboard/analytics', component: SalesAnalytics },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
