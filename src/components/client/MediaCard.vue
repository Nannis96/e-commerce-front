<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
    <!-- Image Gallery -->
    <div class="relative h-64 overflow-hidden">
      <img
        :src="media.images?.[0] || '/api/placeholder/400/300'"
        :alt="media.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div class="absolute top-4 left-4">
        <span
          :class="[
            'px-3 py-1.5 text-xs font-medium rounded-full backdrop-blur-sm',
            media.featured 
              ? 'bg-slate-900/90 text-white' 
              : 'bg-white/90 text-gray-700 border border-gray-200'
          ]"
        >
          {{ media.featured ? 'Destacado' : getMediaTypeLabel(media.type) }}
        </span>
      </div>
      <div class="absolute top-4 right-4">
        <button
          @click="toggleWishlist"
          class="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:scale-110"
        >
          <HeartIcon
            :class="[
              'h-5 w-5',
              isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'
            ]"
          />
        </button>
      </div>
      
      <!-- Image Counter -->
      <div v-if="media.images?.length > 1" class="absolute bottom-4 right-4">
        <span class="bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 text-xs rounded-full font-medium">
          1 / {{ media.images.length }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Header -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1 min-w-0">
          <h3 class="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
            {{ media.name }}
          </h3>
          <div class="flex items-center text-sm text-gray-500">
            <MapPinIcon class="h-4 w-4 mr-1.5 text-gray-400 flex-shrink-0" />
            <span class="truncate">{{ media.location }}</span>
          </div>
        </div>
        <div class="flex items-center ml-4 bg-yellow-50 px-2.5 py-1 rounded-full flex-shrink-0">
          <StarIcon class="h-4 w-4 text-yellow-500 fill-current" />
          <span class="text-sm font-semibold text-gray-900 ml-1">
            {{ media.rating || '4.8' }}
          </span>
        </div>
      </div>

      <!-- Details -->
      <div class="space-y-3 mb-6">
        <div class="flex items-center text-sm text-gray-600">
          <Square2StackIcon class="h-4 w-4 mr-3 text-gray-400 flex-shrink-0" />
          <span class="font-medium">{{ media.size }}</span>
          <span class="mx-2 text-gray-300">•</span>
          <span class="truncate">{{ media.dimensions }}</span>
        </div>
        <div class="flex items-center text-sm text-gray-600">
          <EyeIcon class="h-4 w-4 mr-3 text-gray-400 flex-shrink-0" />
          <span class="font-medium">{{ formatNumber(media.dailyViews) }}</span>
          <span class="ml-1">visualizaciones diarias</span>
        </div>
      </div>

      <!-- Availability Calendar -->
      <div class="mb-6">
        <MiniCalendar
          :availability="media.availability"
          :daily-price="media.dailyPrice"
          @date-select="handleDateSelect"
        />
      </div>

      <!-- Price -->
      <div class="bg-gray-50 rounded-xl p-4 mb-6">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-3xl font-bold text-gray-900">
              ${{ formatNumber(media.dailyPrice) }}
            </span>
            <span class="text-gray-600 text-sm ml-2">/ día</span>
          </div>
          <div class="text-right">
            <div class="text-sm text-gray-500">Est. mensual</div>
            <div class="text-xl font-bold text-gray-900">
              ${{ formatNumber(media.dailyPrice * 30) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-row gap-3">
        <button
          @click="$emit('view-details', media)"
          class="flex-1 bg-white text-gray-900 border border-gray-300 px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-base"
        >
          Ver Detalles
        </button>
        <button
          @click="handleAddToCampaign"
          :disabled="!selectedDateRange"
          class="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-300 disabled:to-gray-300 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl disabled:shadow-none text-base"
        >
          Agregar a Campaña
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  HeartIcon,
  MapPinIcon,
  StarIcon,
  Square2StackIcon,
  EyeIcon
} from '@heroicons/vue/24/outline'
import MiniCalendar from './MiniCalendar.vue'

const props = defineProps({
  media: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['view-details', 'add-to-campaign'])

const isWishlisted = ref(false)
const selectedDateRange = ref(null)

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
  // Handle undefined, null, or non-numeric values
  if (num === undefined || num === null || isNaN(num)) {
    return '0'
  }
  
  const numValue = Number(num)
  
  if (numValue >= 1000000) {
    return (numValue / 1000000).toFixed(1) + 'M'
  } else if (numValue >= 1000) {
    return (numValue / 1000).toFixed(1) + 'K'
  }
  return numValue.toString()
}

function toggleWishlist() {
  isWishlisted.value = !isWishlisted.value
  // TODO: API call to update wishlist
}

function handleDateSelect(dateRange) {
  selectedDateRange.value = dateRange
}

function handleAddToCampaign() {
  if (selectedDateRange.value) {
    emit('add-to-campaign', props.media, selectedDateRange.value)
  }
}
</script>
