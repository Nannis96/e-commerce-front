<template>
  <nav class="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm w-full">
    <div class="w-full px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 lg:h-20 w-full">
        <div class="flex items-center">
          <!-- Logo -->
          <router-link to="/" class="flex-shrink-0 flex items-center">
            <span class="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">MediaSpace</span>
          </router-link>

          <!-- Main Navigation -->
          <div class="hidden lg:ml-12 lg:flex lg:space-x-8">
            <router-link
              to="/"
              class="text-gray-700 hover:text-slate-900 px-4 py-2 text-sm font-medium transition-all duration-200 relative group rounded-lg hover:bg-gray-50"
              active-class="text-slate-900 bg-gray-50"
            >
              Descubrir
              <span class="absolute bottom-1 left-4 right-4 h-0.5 bg-slate-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </router-link>
            <router-link
              v-if="isAuthenticated && user?.role === 'provider'"
              to="/provider"
              class="text-gray-700 hover:text-slate-900 px-4 py-2 text-sm font-medium transition-all duration-200 relative group rounded-lg hover:bg-gray-50"
              active-class="text-slate-900 bg-gray-50"
            >
              Publicar
              <span class="absolute bottom-1 left-4 right-4 h-0.5 bg-slate-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </router-link>
            <router-link
              v-if="isAuthenticated && user?.role === 'admin'"
              to="/admin"
              class="text-gray-700 hover:text-slate-900 px-4 py-2 text-sm font-medium transition-all duration-200 relative group rounded-lg hover:bg-gray-50"
              active-class="text-slate-900 bg-gray-50"
            >
              Administrar
              <span class="absolute bottom-1 left-4 right-4 h-0.5 bg-slate-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </router-link>
          </div>
        </div>

        <div class="flex items-center justify-end space-x-6 flex-1">
          <!-- Campaign Cart -->
          <router-link
            v-if="isAuthenticated && user?.role === 'client'"
            to="/campaigns/create"
            class="relative p-2 text-gray-600 hover:text-slate-900 transition-colors duration-200"
          >
            <ShoppingCartIcon class="h-5 w-5" />
            <span
              v-if="cartItemsCount > 0"
              class="absolute -top-1 -right-1 h-5 w-5 bg-slate-900 text-white text-xs rounded-full flex items-center justify-center font-medium"
            >
              {{ cartItemsCount }}
            </span>
          </router-link>

          <!-- User Menu -->
          <div v-if="isAuthenticated" class="relative">
            <Menu as="div" class="relative">
              <MenuButton class="flex items-center space-x-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 p-1">
                <img
                  class="h-9 w-9 rounded-full ring-2 ring-gray-100"
                  :src="user?.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user?.name || 'User') + '&background=1e293b&color=fff'"
                  :alt="user?.name"
                />
                <span class="hidden lg:block text-sm font-medium text-gray-700">{{ user?.name }}</span>
                <ChevronDownIcon class="h-4 w-4 text-gray-500" />
              </MenuButton>
              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems class="absolute right-0 mt-3 w-56 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-gray-100">
                  <div class="py-2">
                    <MenuItem v-slot="{ active }">
                      <router-link
                        to="/profile"
                        :class="[active ? 'bg-gray-50' : '', 'flex items-center px-4 py-3 text-sm text-gray-700 transition-colors']"
                      >
                        <svg class="h-4 w-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Perfil
                      </router-link>
                    </MenuItem>
                    <MenuItem v-if="user?.role === 'client'" v-slot="{ active }">
                      <router-link
                        to="/campaigns"
                        :class="[active ? 'bg-gray-50' : '', 'flex items-center px-4 py-3 text-sm text-gray-700 transition-colors']"
                      >
                        <svg class="h-4 w-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        Mis Campañas
                      </router-link>
                    </MenuItem>
                    <MenuItem v-if="user?.role === 'provider'" v-slot="{ active }">
                      <router-link
                        to="/provider/dashboard"
                        :class="[active ? 'bg-gray-50' : '', 'flex items-center px-4 py-3 text-sm text-gray-700 transition-colors']"
                      >
                        <svg class="h-4 w-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Dashboard
                      </router-link>
                    </MenuItem>
                    <div class="border-t border-gray-100 my-2"></div>
                    <MenuItem v-slot="{ active }">
                      <button
                        @click="handleLogout"
                        :class="[active ? 'bg-gray-50' : '', 'flex items-center w-full text-left px-4 py-3 text-sm text-gray-700 transition-colors']"
                      >
                        <svg class="h-4 w-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Cerrar sesión
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>

          <!-- Auth Buttons -->
          <div v-else class="flex items-center gap-3">
            <router-link
              to="/login"
              class="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-gray-600 transition-all duration-200 hover:text-gray-900 focus:outline-none"
            >
              <span class="relative z-10">Iniciar sesión</span>
              <div class="absolute inset-x-0 bottom-0 h-0.5 bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
            </router-link>
            
            <div class="w-px h-6 bg-gray-300"></div>
            
            <!-- <router-link
              to="/register"
              class="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg transition-all duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 shadow-sm hover:shadow-md"
            >
              <span class="relative z-10">Registrarse</span>
              <div class="absolute inset-0 bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </router-link> -->
          </div>
        </div>
      </div>

    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ShoppingCartIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/stores/counter'
import { useCampaignStore } from '@/stores/campaign'
import { useNotifications } from '@/composables/useNotifications'

const router = useRouter()
const authStore = useAuthStore()
const campaignStore = useCampaignStore()
const { success } = useNotifications()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)
const cartItemsCount = computed(() => campaignStore.cartItemsCount)

async function handleLogout() {
  try {
    await authStore.logout()
    success('Success', 'You have been logged out successfully')
    router.push('/')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>
