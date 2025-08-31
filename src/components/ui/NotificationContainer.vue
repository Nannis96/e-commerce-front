<template>
  <teleport to="body">
    <div
      v-if="notifications.length > 0"
      class="fixed top-4 right-4 z-50 space-y-4"
    >
      <transition-group
        name="notification"
        tag="div"
        class="space-y-4"
      >
        <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="[
            'max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
            notificationStyles[notification.type]
          ]"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <component
                  :is="notificationIcons[notification.type]"
                  :class="['h-6 w-6', notificationIconColors[notification.type]]"
                />
              </div>
              <div class="ml-3 w-0 flex-1">
                <p class="text-sm font-medium text-gray-900">
                  {{ notification.title }}
                </p>
                <p v-if="notification.message" class="mt-1 text-sm text-gray-500">
                  {{ notification.message }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  @click="removeNotification(notification.id)"
                  class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                >
                  <XMarkIcon class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script setup>
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  XCircleIcon, 
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import { useNotifications } from '@/composables/useNotifications'

const { notifications, removeNotification } = useNotifications()

const notificationStyles = {
  success: 'border-l-4 border-green-400',
  error: 'border-l-4 border-red-400',
  warning: 'border-l-4 border-yellow-400',
  info: 'border-l-4 border-blue-400'
}

const notificationIcons = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon
}

const notificationIconColors = {
  success: 'text-green-400',
  error: 'text-red-400',
  warning: 'text-yellow-400',
  info: 'text-blue-400'
}
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.notification-move {
  transition: transform 0.3s ease;
}
</style>
