<template>
  <Modal
    :is-open="isOpen"
    size="2xl"
    :title="media?.name"
    @close="$emit('close')"
  >
    <div v-if="media" class="space-y-6">
      <!-- Image Gallery -->
      <div class="space-y-4">
        <div class="aspect-w-16 aspect-h-10 rounded-lg overflow-hidden">
          <img
            :src="media.images?.[currentImageIndex] || '/api/placeholder/800/600'"
            :alt="media.name"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="grid grid-cols-4 gap-2">
          <button
            v-for="(image, index) in media.images?.slice(0, 4)"
            :key="index"
            @click="currentImageIndex = index"
            :class="[
              'aspect-w-1 aspect-h-1 rounded-lg overflow-hidden',
              currentImageIndex === index ? 'ring-2 ring-rose-500' : ''
            ]"
          >
            <img :src="image" :alt="`${media.name} ${index + 1}`" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <!-- Details -->
      <div class="border-t border-gray-200 pt-6">
        <dl class="grid grid-cols-2 gap-4">
          <div>
            <dt class="text-sm font-medium text-gray-500">Location</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ media.location }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Type</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ getMediaTypeLabel(media.type) }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Size</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ media.dimensions }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Daily Views</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ formatNumber(media.dailyViews) }}</dd>
          </div>
        </dl>
        
        <div class="mt-4">
          <dt class="text-sm font-medium text-gray-500">Description</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ media.description }}</dd>
        </div>
      </div>

      <!-- Booking Form -->
      <div class="border-t border-gray-200 pt-6">
        <h4 class="text-lg font-medium text-gray-900 mb-4">Book this space</h4>
        <MediaBookingForm
          :media="media"
          @book="handleBook"
        />
      </div>
    </div>

    <template #footer>
      <button
        @click="$emit('close')"
        class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
      >
        Close
      </button>
    </template>
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import Modal from '@/components/ui/Modal.vue'
import MediaBookingForm from './MediaBookingForm.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  media: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'add-to-campaign'])

const currentImageIndex = ref(0)

const mediaTypeLabels = {
  'billboard': 'Billboard',
  'digital-screen': 'Digital Screen',
  'bus-stop': 'Bus Stop',
  'metro': 'Metro/Subway',
  'mall': 'Shopping Mall',
  'airport': 'Airport',
  'stadium': 'Stadium'
}

function getMediaTypeLabel(type) {
  return mediaTypeLabels[type] || type
}

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

function handleBook(dateRange) {
  emit('add-to-campaign', props.media, dateRange)
}
</script>
