import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import apiService from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = computed(() => !!user.value)
  const isLoading = ref(false)

  async function login(credentials) {
    try {
      isLoading.value = true
      const response = await apiService.login(credentials)
      user.value = response.user
      localStorage.setItem('auth_token', response.token)
      return response
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  async function register(userData) {
    try {
      isLoading.value = true
      const response = await apiService.register(userData)
      user.value = response.user
      localStorage.setItem('auth_token', response.token)
      return response
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    try {
      await apiService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      user.value = null
      localStorage.removeItem('auth_token')
    }
  }

  function initializeAuth() {
    const token = localStorage.getItem('auth_token')
    if (token) {
      // Verify token and get user info
      // This would typically make an API call to validate the token
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    initializeAuth
  }
})
