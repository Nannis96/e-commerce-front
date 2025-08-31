import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/counter'

// Layouts
import AppLayout from '@/layouts/AppLayout.vue'

// Client Views
import HomeView from '@/views/client/HomeView.vue'
import MediaDetailView from '@/views/client/MediaDetailView.vue'
import CampaignsView from '@/views/client/CampaignsView.vue'

// Provider Views
import ProviderDashboard from '@/views/provider/ProviderDashboard.vue'
import MediaManagementView from '@/views/provider/MediaManagementView.vue'

// Admin Views
import AdminDashboard from '@/views/admin/AdminDashboard.vue'

// Auth Views
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        // Public routes
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: '/media/:id',
          name: 'media-detail',
          component: MediaDetailView,
          props: true
        },
        {
          path: '/login',
          name: 'login',
          component: LoginView,
          meta: { requiresGuest: true }
        },
        {
          path: '/register',
          name: 'register',
          component: RegisterView,
          meta: { requiresGuest: true }
        },

        // Client routes
        {
          path: '/campaigns',
          name: 'campaigns',
          component: CampaignsView,
          // meta: { requiresAuth: true, role: 'client' }
        },

        // Provider routes
        {
          path: '/provider',
          name: 'provider-dashboard',
          component: ProviderDashboard,
          // meta: { requiresAuth: true, role: 'provider' }
        },
        {
          path: '/provider/media',
          name: 'provider-media',
          component: MediaManagementView,
          // meta: { requiresAuth: true, role: 'provider' }
        },

        // Admin routes
        {
          path: '/admin',
          name: 'admin-dashboard',
          component: AdminDashboard,
          // meta: { requiresAuth: true, role: 'admin' }
        },
      ]
    }
  ]
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  // Check if route requires guest (not authenticated)
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next({ name: 'home' })
    return
  }

  // Check role-based access
  if (to.meta.role && authStore.user?.role !== to.meta.role) {
    next({ name: 'home' })
    return
  }

  next()
})

export default router
