import { createRouter, createWebHistory } from 'vue-router'
import UserLayout from '../views/UserLayout.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AdminLayout from '../views/admin/AdminLayout.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import ProgramsAdmin from '../views/admin/ProgramsAdmin.vue'
import GalleryAdmin from '../views/admin/GalleryAdmin.vue'
import ReviewsAdmin from '../views/admin/ReviewsAdmin.vue'
import ApplicationsAdmin from '../views/admin/ApplicationsAdmin.vue'
import StudentsAdmin from '../views/admin/StudentsAdmin.vue'
import UsersAdmin from '../views/admin/UsersAdmin.vue'
import UserCabinet from '../views/admin/UserCabinet.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: UserLayout,
      children: [
        { path: '', name: 'home', component: HomeView },
        // інші публічні сторінки можна додати тут
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresGuest: true }
    },
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        { path: '', name: 'admin-dashboard', component: Dashboard },
        { path: 'programs', name: 'admin-programs', component: ProgramsAdmin },
        { path: 'gallery', name: 'admin-gallery', component: GalleryAdmin },
        { path: 'reviews', name: 'admin-reviews', component: ReviewsAdmin },
        { path: 'applications', name: 'admin-applications', component: ApplicationsAdmin },
        { path: 'students', name: 'admin-students', component: StudentsAdmin },
        { path: 'users', name: 'admin-users', component: UsersAdmin },
        { path: 'profile', name: 'admin-profile', component: UserCabinet }
      ]
    }
  ]
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (to.meta.requiresAdmin && !user.isAdmin) {
    next('/')
  } else if (to.meta.requiresGuest && token) {
    next('/')
  } else {
    next()
  }
})

export default router 