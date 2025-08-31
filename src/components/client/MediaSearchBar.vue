<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-4xl px-8">
      <div class="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 backdrop-blur-sm">
        <div class="grid grid-cols-4 gap-4">
      <!-- Location -->
      <div class="relative col-span-1">
        <label class="block text-sm font-semibold text-gray-700 mb-2">Ubicación</label>
        <div class="relative">
          <MapPinIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            v-model="searchForm.location"
            type="text"
            placeholder="¿Dónde quieres anunciar?"
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base transition-all duration-200 hover:border-gray-400"
          />
        </div>
      </div>

      <!-- Start Date -->
      <div class="relative">
        <label class="block text-sm font-semibold text-gray-700 mb-2">Fecha Inicio</label>
        <div class="relative">
          <CalendarIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            v-model="searchForm.startDate"
            type="date"
            :min="minDate"
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base transition-all duration-200 hover:border-gray-400"
          />
        </div>
      </div>

      <!-- End Date -->
      <div class="relative">
        <label class="block text-sm font-semibold text-gray-700 mb-2">Fecha Final</label>
        <div class="relative">
          <CalendarIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            v-model="searchForm.endDate"
            type="date"
            :min="searchForm.startDate || minDate"
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base transition-all duration-200 hover:border-gray-400"
          />
        </div>
      </div>

      <!-- Search Button -->
      <div class="flex items-end col-span-1">
        <button
          @click="handleSearch"
          :disabled="!isValidSearch"
          class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 text-base shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:shadow-none"
        >
          <MagnifyingGlassIcon class="h-5 w-5" />
          <span>Buscar</span>
        </button>
      </div>
    </div>
      </div>

      <!-- Duration Warning -->
      <div v-if="showDurationWarning" class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div class="flex items-center">
          <ExclamationTriangleIcon class="h-5 w-5 text-yellow-400 mr-2" />
          <p class="text-sm text-yellow-800">
            Campaign duration must be at least 30 days. Current selection: {{ daysBetween }} days.
          </p>
        </div>
      </div>

      <!-- Duration Info -->
      <div v-else-if="daysBetween > 0" class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div class="flex items-center">
          <CheckCircleIcon class="h-5 w-5 text-green-400 mr-2" />
          <p class="text-sm text-green-800">
            Campaign duration: {{ daysBetween }} days ({{ Math.floor(daysBetween / 7) }} weeks)
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { 
  MapPinIcon, 
  CalendarIcon, 
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'

const emit = defineEmits(['search'])

const searchForm = ref({
  location: '',
  startDate: '',
  endDate: ''
})

const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const daysBetween = computed(() => {
  if (!searchForm.value.startDate || !searchForm.value.endDate) return 0
  const start = new Date(searchForm.value.startDate)
  const end = new Date(searchForm.value.endDate)
  if (end <= start) return 0
  const diffTime = Math.abs(end - start)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
})

const isValidDuration = computed(() => {
  return daysBetween.value >= 30
})

const showDurationWarning = computed(() => {
  return daysBetween.value > 0 && daysBetween.value < 30
})

const isValidSearch = computed(() => {
  return searchForm.value.location.trim() && 
         searchForm.value.startDate && 
         searchForm.value.endDate && 
         isValidDuration.value
})

// Auto-adjust end date if start date changes and duration becomes invalid
watch(() => searchForm.value.startDate, (newStartDate) => {
  if (newStartDate && searchForm.value.endDate) {
    const start = new Date(newStartDate)
    const end = new Date(searchForm.value.endDate)
    if (end <= start) {
      // Set end date to 30 days after start date
      const newEndDate = new Date(start)
      newEndDate.setDate(newEndDate.getDate() + 30)
      searchForm.value.endDate = newEndDate.toISOString().split('T')[0]
    }
  }
})

function handleSearch() {
  if (!isValidSearch.value) return

  emit('search', {
    location: searchForm.value.location,
    dateRange: {
      start: searchForm.value.startDate,
      end: searchForm.value.endDate
    }
  })
}
</script>
