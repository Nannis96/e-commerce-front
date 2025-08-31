<template>
  <div class="space-y-6">
    <!-- Date Selection -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-3">
        Select Campaign Dates (minimum 30 days)
      </label>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Start Date</label>
          <input
            v-model="startDate"
            type="date"
            :min="minDate"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
          />
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">End Date</label>
          <input
            v-model="endDate"
            type="date"
            :min="startDate || minDate"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
          />
        </div>
      </div>
      
      <!-- Duration Info -->
      <div v-if="daysBetween > 0" class="mt-3 p-3 rounded-lg" :class="durationClass">
        <div class="flex items-center">
          <component :is="durationIcon" class="h-5 w-5 mr-2" />
          <p class="text-sm">
            {{ durationMessage }}
          </p>
        </div>
      </div>
    </div>

    <!-- Price Calculation -->
    <div v-if="isValidRange" class="bg-gray-50 rounded-lg p-4">
      <h4 class="text-sm font-medium text-gray-900 mb-3">Price Breakdown</h4>
      <div class="space-y-2">
        <div class="flex justify-between text-sm">
          <span>${{ media.dailyPrice }} × {{ daysBetween }} days</span>
          <span>${{ formatNumber(subtotal) }}</span>
        </div>
        <div class="flex justify-between text-sm text-gray-600">
          <span>Platform fee (5%)</span>
          <span>${{ formatNumber(platformFee) }}</span>
        </div>
        <div class="border-t border-gray-200 pt-2 flex justify-between text-base font-medium">
          <span>Total</span>
          <span>${{ formatNumber(total) }}</span>
        </div>
      </div>
    </div>

    <!-- Book Button -->
    <button
      @click="handleBook"
      :disabled="!canBook"
      class="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-colors"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  media: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['book'])

const startDate = ref('')
const endDate = ref('')

const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const daysBetween = computed(() => {
  if (!startDate.value || !endDate.value) return 0
  const start = new Date(startDate.value)
  const end = new Date(endDate.value)
  if (end <= start) return 0
  const diffTime = Math.abs(end - start)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
})

const isValidRange = computed(() => {
  return daysBetween.value >= 30
})

const canBook = computed(() => {
  return startDate.value && endDate.value && isValidRange.value
})

const subtotal = computed(() => {
  return props.media.dailyPrice * daysBetween.value
})

const platformFee = computed(() => {
  return subtotal.value * 0.05
})

const total = computed(() => {
  return subtotal.value + platformFee.value
})

const durationClass = computed(() => {
  if (daysBetween.value < 30) {
    return 'bg-yellow-50 border border-yellow-200'
  }
  return 'bg-green-50 border border-green-200'
})

const durationIcon = computed(() => {
  if (daysBetween.value < 30) {
    return ExclamationTriangleIcon
  }
  return CheckCircleIcon
})

const durationMessage = computed(() => {
  if (daysBetween.value < 30) {
    return `Campaign must be at least 30 days. Current: ${daysBetween.value} days.`
  }
  return `Campaign duration: ${daysBetween.value} days (${Math.floor(daysBetween.value / 7)} weeks)`
})

const buttonText = computed(() => {
  if (!startDate.value || !endDate.value) {
    return 'Select dates to continue'
  }
  if (!isValidRange.value) {
    return 'Minimum 30 days required'
  }
  return `Add to Campaign - $${formatNumber(total.value)}`
})

// Auto-adjust end date if start date changes
watch(startDate, (newStartDate) => {
  if (newStartDate && endDate.value) {
    const start = new Date(newStartDate)
    const end = new Date(endDate.value)
    if (end <= start) {
      // Set end date to 30 days after start date
      const newEndDate = new Date(start)
      newEndDate.setDate(newEndDate.getDate() + 30)
      endDate.value = newEndDate.toISOString().split('T')[0]
    }
  }
})

function formatNumber(num) {
  return num.toLocaleString()
}

function handleBook() {
  if (!canBook.value) return
  
  emit('book', {
    start: startDate.value,
    end: endDate.value
  })
}
</script>
