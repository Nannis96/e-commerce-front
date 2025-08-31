<template>
  <div class="border border-gray-200 rounded-lg p-4">
    <div class="flex items-start space-x-4">
      <!-- Image -->
      <div class="flex-shrink-0 w-24 h-24">
        <img
          :src="item.images?.[0] || '/api/placeholder/200/200'"
          :alt="item.name"
          class="w-full h-full object-cover rounded-lg"
        />
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <h3 class="text-lg font-medium text-gray-900 truncate">{{ item.name }}</h3>
        <p class="text-sm text-gray-600 mt-1">{{ item.location }}</p>
        
        <!-- Date Range -->
        <div class="mt-3 space-y-2">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Start Date</label>
              <input
                :value="item.dateRange.start"
                @input="updateDate('start', $event.target.value)"
                type="date"
                :min="minDate"
                class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-rose-500 focus:border-rose-500"
              />
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">End Date</label>
              <input
                :value="item.dateRange.end"
                @input="updateDate('end', $event.target.value)"
                type="date"
                :min="item.dateRange.start || minDate"
                class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-rose-500 focus:border-rose-500"
              />
            </div>
          </div>
          
          <!-- Duration Display -->
          <div class="text-xs text-gray-600">
            Duration: {{ daysBetween }} days ({{ Math.floor(daysBetween / 7) }} weeks)
          </div>
        </div>

        <!-- Price -->
        <div class="mt-3 flex items-center justify-between">
          <div class="text-sm text-gray-600">
            ${{ item.dailyPrice }} × {{ daysBetween }} days
          </div>
          <div class="text-lg font-semibold text-gray-900">
            ${{ formatNumber(itemTotal) }}
          </div>
        </div>
      </div>

      <!-- Remove Button -->
      <button
        @click="$emit('remove', item.id)"
        class="p-1 text-gray-400 hover:text-red-500 transition-colors"
      >
        <XMarkIcon class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['remove', 'update-dates'])

const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const daysBetween = computed(() => {
  if (!props.item.dateRange.start || !props.item.dateRange.end) return 0
  const start = new Date(props.item.dateRange.start)
  const end = new Date(props.item.dateRange.end)
  const diffTime = Math.abs(end - start)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
})

const itemTotal = computed(() => {
  return props.item.dailyPrice * daysBetween.value
})

function updateDate(type, value) {
  const newDateRange = { ...props.item.dateRange }
  newDateRange[type] = value
  
  // Validate minimum duration
  if (newDateRange.start && newDateRange.end) {
    const start = new Date(newDateRange.start)
    const end = new Date(newDateRange.end)
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    
    if (days >= 30) {
      emit('update-dates', props.item.id, newDateRange)
    }
  }
}

function formatNumber(num) {
  return num.toLocaleString()
}
</script>
