<template>
  <div class="flex bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
    <!-- Image -->
    <div class="flex-shrink-0 w-48 h-32">
      <img
        :src="media.images?.[0] || '/api/placeholder/300/200'"
        :alt="media.name"
        class="w-full h-full object-cover rounded-l-lg"
      />
    </div>

    <!-- Content -->
    <div class="flex-1 p-4 flex flex-col justify-between">
      <div>
        <div class="flex items-start justify-between">
          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-semibold text-gray-900 truncate">
              {{ media.name }}
            </h3>
            <div class="flex items-center text-sm text-gray-600 mt-1">
              <MapPinIcon class="h-4 w-4 mr-1" />
              {{ media.location }}
            </div>
          </div>
          <div class="flex items-center ml-4">
            <StarIcon class="h-4 w-4 text-yellow-400 fill-current" />
            <span class="text-sm font-medium text-gray-900 ml-1">
              {{ media.rating || '4.8' }}
            </span>
          </div>
        </div>

        <div class="mt-2 flex items-center space-x-4 text-sm text-gray-600">
          <div class="flex items-center">
            <Square2StackIcon class="h-4 w-4 mr-1" />
            {{ media.size }}
          </div>
          <div class="flex items-center">
            <EyeIcon class="h-4 w-4 mr-1" />
            {{ formatNumber(media.dailyViews) }} views/day
          </div>
        </div>
      </div>

      <div class="mt-4 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <span class="text-2xl font-bold text-gray-900">
            ${{ formatNumber(media.dailyPrice) }}
          </span>
          <span class="text-gray-600 text-sm">/ day</span>
        </div>

        <div class="flex space-x-2">
          <button
            @click="$emit('view-details', media)"
            class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            View Details
          </button>
          <button
            @click="$emit('add-to-campaign', media)"
            class="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Add to Campaign
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  MapPinIcon,
  StarIcon,
  Square2StackIcon,
  EyeIcon
} from '@heroicons/vue/24/outline'

defineProps({
  media: {
    type: Object,
    required: true
  }
})

defineEmits(['view-details', 'add-to-campaign'])

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}
</script>
