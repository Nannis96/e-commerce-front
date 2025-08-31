<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/counter'

const authStore = useAuthStore()

onMounted(() => {
  // Initialize authentication state from stored token
  authStore.initializeAuth()
})
</script>

<style>
/* Global styles will be handled by Tailwind CSS */
</style>
