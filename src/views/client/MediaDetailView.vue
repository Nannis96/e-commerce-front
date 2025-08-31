<template>
  <div class="min-h-screen bg-white">
    <div class="w-full flex justify-center">
      <div class="max-w-4xl w-full px-8 py-8">
        <LoadingSpinner v-if="isLoading" text="Loading media details..." />
        
        <div v-else-if="media" class="space-y-8">
          <!-- Media Header -->
          <div class="grid grid-cols-2 gap-8">
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

            <!-- Media Info -->
            <div class="space-y-6">
              <div>
                <h1 class="text-3xl font-bold text-gray-900">{{ media.name }}</h1>
                <div class="flex items-center mt-2 text-gray-600">
                  <MapPinIcon class="h-5 w-5 mr-2" />
                  {{ media.location }}
                </div>
              </div>

              <div class="flex items-center space-x-4">
                <div class="flex items-center">
                  <StarIcon class="h-5 w-5 text-yellow-400 fill-current" />
                  <span class="ml-1 text-lg font-medium">{{ media.rating || '4.8' }}</span>
                </div>
                <div class="text-gray-400">•</div>
                <div class="text-gray-600">{{ media.reviewCount || '127' }} reviews</div>
              </div>

              <div class="border-t border-gray-200 pt-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Media Details</h3>
                <dl class="grid grid-cols-2 gap-4">
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
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Daily Price</dt>
                    <dd class="mt-1 text-sm text-gray-900">${{ formatNumber(media.dailyPrice) }}</dd>
                  </div>
                </dl>
              </div>

              <div class="border-t border-gray-200 pt-6">
                <p class="text-gray-700">{{ media.description }}</p>
              </div>
            </div>
          </div>

          <!-- Booking Section -->
          <div class="border-t border-gray-200 pt-8">
            <div class="max-w-lg">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Book this media space</h3>
              <MediaBookingForm
                :media="media"
                @book="handleBooking"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template><script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MapPinIcon, StarIcon } from '@heroicons/vue/24/outline'
import { useMediaStore } from '@/stores/media'
import { useCampaignStore } from '@/stores/campaign'
import { useNotifications } from '@/composables/useNotifications'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import MediaBookingForm from '@/components/client/MediaBookingForm.vue'

const route = useRoute()
const router = useRouter()
const mediaStore = useMediaStore()
const campaignStore = useCampaignStore()
const { success, error } = useNotifications()

const currentImageIndex = ref(0)

const isLoading = computed(() => mediaStore.isLoading)
const media = computed(() => mediaStore.currentMedia)

const mediaTypeLabels = {
  'billboard': 'Billboard',
  'digital-screen': 'Digital Screen',
  'bus-stop': 'Bus Stop',
  'metro': 'Metro/Subway',
  'mall': 'Shopping Mall',
  'airport': 'Airport',
  'stadium': 'Stadium'
}

onMounted(async () => {
  try {
    await mediaStore.fetchMediaById(route.params.id)
  } catch (err) {
    error('Error', 'Failed to load media details')
    router.push('/')
  }
})

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

function handleBooking(dateRange) {
  try {
    campaignStore.addToCart(media.value, dateRange)
    success('Added to Campaign', `${media.value.name} has been added to your campaign`)
    router.push('/campaigns/create')
  } catch (err) {
    error('Error', err.message)
  }
}
</script>
