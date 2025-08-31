<template>
  <teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 overflow-y-auto"
      @click="handleBackdropClick"
    >
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <!-- Background overlay -->
        <transition
          enter-active-class="ease-out duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        </transition>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="inline-block align-middle h-screen">&#8203;</span>

        <!-- Modal panel -->
        <transition
          enter-active-class="ease-out duration-300"
          enter-from-class="opacity-0 translate-y-4 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-4 scale-95"
        >
          <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle max-w-lg w-full"
            :class="sizeClasses"
          >
            <!-- Header -->
            <div v-if="showHeader" class="bg-white px-4 pt-5 pb-4 p-6 pb-4">
              <div class="flex items-center justify-between">
                <h3 v-if="title" class="text-lg leading-6 font-medium text-gray-900">
                  {{ title }}
                </h3>
                <button
                  v-if="showCloseButton"
                  @click="$emit('close')"
                  class="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <XMarkIcon class="h-6 w-6" />
                </button>
              </div>
            </div>

            <!-- Content -->
            <div class="bg-white px-4 pb-4 p-6">
              <slot></slot>
            </div>

            <!-- Footer -->
            <div v-if="showFooter" class="bg-gray-50 px-4 py-3 px-6 flex flex-row-reverse">
              <slot name="footer">
                <button
                  v-if="confirmText"
                  @click="$emit('confirm')"
                  type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-rose-600 text-base font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 ml-3 w-auto text-sm"
                >
                  {{ confirmText }}
                </button>
                <button
                  v-if="cancelText"
                  @click="$emit('close')"
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 mt-0 ml-3 w-auto text-sm"
                >
                  {{ cancelText }}
                </button>
              </slot>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { computed } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl', '2xl'].includes(value)
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  showFooter: {
    type: Boolean,
    default: false
  },
  showCloseButton: {
    type: Boolean,
    default: true
  },
  confirmText: {
    type: String,
    default: ''
  },
  cancelText: {
    type: String,
    default: ''
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close', 'confirm'])

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    '2xl': 'max-w-6xl'
  }
  return sizes[props.size]
})

function handleBackdropClick(event) {
  if (props.closeOnBackdrop && event.target === event.currentTarget) {
    emit('close')
  }
}
</script>
