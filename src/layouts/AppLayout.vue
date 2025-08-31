<template>
  <div class="min-h-screen bg-gray-50 w-full flex flex-col">
    <!-- Navigation -->
    <NavBar />

    <!-- Main Content -->
    <main class="w-full flex-1 flex justify-center">
      <div class="w-full max-w-7xl mx-auto">
        <router-view />
      </div>
    </main>

    <!-- Notifications -->
    <NotificationContainer />
  </div>
</template>

<script setup>
import NavBar from '@/components/ui/NavBar.vue'
import NotificationContainer from '@/components/ui/NotificationContainer.vue'
</script>
