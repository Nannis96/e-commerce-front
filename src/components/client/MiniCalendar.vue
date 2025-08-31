<template>
  <div class="grid grid-cols-7 gap-1 text-sm">
    <!-- Header -->
    <div class="col-span-7 text-center font-medium text-gray-700 mb-2">
      {{ currentMonth }}
    </div>
    
    <!-- Days of week -->
    <div v-for="day in daysOfWeek" :key="day" class="text-center text-xs text-gray-500 py-1">
      {{ day }}
    </div>
    
    <!-- Calendar days -->
    <button
      v-for="day in calendarDays"
      :key="day.date"
      @click="selectDate(day)"
      :disabled="!day.available || day.isBeforeToday"
      :class="[
        'h-8 w-8 rounded text-xs transition-colors',
        {
          'text-gray-300 cursor-not-allowed': !day.available || day.isBeforeToday,
          'text-gray-700 hover:bg-gray-100': day.available && !day.isBeforeToday && !day.isSelected,
          'bg-rose-500 text-white': day.isSelected,
          'bg-gray-100': day.isOtherMonth,
          'border border-rose-300': day.isToday
        }
      ]"
    >
      {{ day.day }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  availability: {
    type: Object,
    default: () => ({ blockedDates: [], priceRules: [] })
  },
  selectedRange: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['date-select'])

const currentDate = ref(new Date())
const selectedStart = ref(null)
const selectedEnd = ref(null)

const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const currentMonth = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  })
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  // Get first day of month and last day of month
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  // Get first day to display (might be from previous month)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  // Get last day to display (might be from next month)
  const endDate = new Date(lastDay)
  endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()))
  
  const days = []
  const current = new Date(startDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  while (current <= endDate) {
    const dateStr = current.toISOString().split('T')[0]
    const isBlocked = props.availability.blockedDates?.includes(dateStr) || false
    const isAvailable = !isBlocked && current >= today
    
    days.push({
      date: dateStr,
      day: current.getDate(),
      available: isAvailable,
      isOtherMonth: current.getMonth() !== month,
      isToday: current.toDateString() === today.toDateString(),
      isBeforeToday: current < today,
      isSelected: selectedStart.value === dateStr || selectedEnd.value === dateStr
    })
    
    current.setDate(current.getDate() + 1)
  }
  
  return days
})

function selectDate(day) {
  if (!day.available || day.isBeforeToday) return
  
  if (!selectedStart.value || (selectedStart.value && selectedEnd.value)) {
    // Start new selection
    selectedStart.value = day.date
    selectedEnd.value = null
  } else if (selectedStart.value && !selectedEnd.value) {
    // Set end date
    const startDate = new Date(selectedStart.value)
    const endDate = new Date(day.date)
    
    if (endDate > startDate) {
      selectedEnd.value = day.date
      
      // Check if range is at least 30 days
      const diffTime = Math.abs(endDate - startDate)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays >= 30) {
        emit('date-select', {
          start: selectedStart.value,
          end: selectedEnd.value
        })
      } else {
        // Reset selection if less than 30 days
        selectedStart.value = day.date
        selectedEnd.value = null
      }
    } else {
      // If end date is before start date, make it the new start date
      selectedStart.value = day.date
      selectedEnd.value = null
    }
  }
}

// Watch for external selection changes
watch(() => props.selectedRange, (newRange) => {
  if (newRange) {
    selectedStart.value = newRange.start
    selectedEnd.value = newRange.end
  } else {
    selectedStart.value = null
    selectedEnd.value = null
  }
}, { immediate: true })
</script>
