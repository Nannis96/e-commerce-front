<template>
  <div class="flex flex-row flex-wrap items-center gap-4">
    <!-- Media Type Filter -->
    <div class="relative w-auto">
      <Menu as="div" class="relative">
        <MenuButton class="flex items-center justify-start w-auto space-x-2 px-4 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 text-sm">
          <div class="flex items-center space-x-2">
            <TvIcon class="h-5 w-5 text-gray-500" />
            <span class="font-medium text-gray-700">
              {{ selectedType || 'Tipo de Medio' }}
            </span>
          </div>
          <ChevronDownIcon class="h-4 w-4 text-gray-500" />
        </MenuButton>
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems class="absolute left-0 mt-2 w-56 origin-top-left bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div class="py-1">
              <MenuItem v-slot="{ active }">
                <button
                  @click="updateType('')"
                  :class="[active ? 'bg-gray-50' : '', 'block w-full text-left px-4 py-3 text-sm text-gray-700 first:rounded-t-xl last:rounded-b-xl']"
                >
                  Todos los Tipos
                </button>
              </MenuItem>
              <MenuItem v-for="type in mediaTypes" :key="type.value" v-slot="{ active }">
                <button
                  @click="updateType(type.value)"
                  :class="[active ? 'bg-gray-50' : '', 'block w-full text-left px-4 py-3 text-sm text-gray-700']"
                >
                  {{ type.label }}
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>

    <!-- Price Range Filter -->
    <div class="relative w-auto">
      <Menu as="div" class="relative">
        <MenuButton class="flex items-center justify-start w-auto space-x-2 px-4 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 text-sm">
          <div class="flex items-center space-x-2">
            <CurrencyDollarIcon class="h-5 w-5 text-gray-500" />
            <span class="font-medium text-gray-700">
              ${{ priceRange[0] }} - ${{ priceRange[1] }}
            </span>
          </div>
          <ChevronDownIcon class="h-4 w-4 text-gray-500" />
        </MenuButton>
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems class="absolute left-0 mt-2 w-64 origin-top-left bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div class="p-6">
              <label class="block text-sm font-medium text-gray-700 mb-4">Rango de Precio Diario</label>
              <div class="space-y-4">
                <div>
                  <input
                    v-model.number="priceRange[0]"
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    @input="updatePriceRange"
                  />
                </div>
                <div>
                  <input
                    v-model.number="priceRange[1]"
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    @input="updatePriceRange"
                  />
                </div>
                <div class="flex items-center justify-between text-sm text-gray-600">
                  <span>${{ priceRange[0] }}</span>
                  <span>${{ priceRange[1] }}</span>
                </div>
              </div>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>

    <!-- Size Filter -->
    <div class="relative w-auto">
      <Menu as="div" class="relative">
        <MenuButton class="flex items-center justify-start w-auto space-x-2 px-4 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 text-sm">
          <div class="flex items-center space-x-2">
            <Square2StackIcon class="h-5 w-5 text-gray-500" />
            <span class="font-medium text-gray-700">
              {{ selectedSize || 'Tamaño' }}
            </span>
          </div>
          <ChevronDownIcon class="h-4 w-4 text-gray-500" />
        </MenuButton>
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems class="absolute left-0 mt-2 w-48 origin-top-left bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div class="py-1">
              <MenuItem v-slot="{ active }">
                <button
                  @click="updateSize('')"
                  :class="[active ? 'bg-gray-100' : '', 'block w-full text-left px-4 py-2 text-sm text-gray-700']"
                >
                  All Sizes
                </button>
              </MenuItem>
              <MenuItem v-for="size in mediaSizes" :key="size.value" v-slot="{ active }">
                <button
                  @click="updateSize(size.value)"
                  :class="[active ? 'bg-gray-100' : '', 'block w-full text-left px-4 py-2 text-sm text-gray-700']"
                >
                  {{ size.label }}
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>

    <!-- Clear Filters -->
    <button
      v-if="hasActiveFilters"
      @click="clearAllFilters"
      class="flex items-center justify-center w-auto space-x-2 px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
    >
      <XMarkIcon class="h-4 w-4" />
      <span>Limpiar</span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { 
  ChevronDownIcon, 
  TvIcon, 
  CurrencyDollarIcon, 
  Square2StackIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  filters: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update-filters', 'clear-filters'])

const selectedType = ref('')
const selectedSize = ref('')
const priceRange = ref([0, 10000])

const mediaTypes = [
  { value: 'billboard', label: 'Billboard' },
  { value: 'digital-screen', label: 'Digital Screen' },
  { value: 'bus-stop', label: 'Bus Stop' },
  { value: 'metro', label: 'Metro/Subway' },
  { value: 'mall', label: 'Shopping Mall' },
  { value: 'airport', label: 'Airport' },
  { value: 'stadium', label: 'Stadium' }
]

const mediaSizes = [
  { value: 'small', label: 'Small (< 20 sqm)' },
  { value: 'medium', label: 'Medium (20-50 sqm)' },
  { value: 'large', label: 'Large (50-100 sqm)' },
  { value: 'extra-large', label: 'Extra Large (> 100 sqm)' }
]

const hasActiveFilters = computed(() => {
  return selectedType.value || 
         selectedSize.value || 
         priceRange.value[0] > 0 || 
         priceRange.value[1] < 10000
})

// Watch for external filter changes
watch(() => props.filters, (newFilters) => {
  selectedType.value = newFilters.type || ''
  selectedSize.value = newFilters.size || ''
  priceRange.value = newFilters.priceRange || [0, 10000]
}, { immediate: true })

function updateType(type) {
  selectedType.value = type
  emitFilters()
}

function updateSize(size) {
  selectedSize.value = size
  emitFilters()
}

function updatePriceRange() {
  // Ensure min is less than max
  if (priceRange.value[0] > priceRange.value[1]) {
    priceRange.value[0] = priceRange.value[1]
  }
  emitFilters()
}

function emitFilters() {
  emit('update-filters', {
    type: selectedType.value,
    size: selectedSize.value,
    priceRange: [...priceRange.value]
  })
}

function clearAllFilters() {
  selectedType.value = ''
  selectedSize.value = ''
  priceRange.value = [0, 10000]
  emit('clear-filters')
}
</script>

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #ec4899;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #ec4899;
  cursor: pointer;
  border: none;
}
</style>
