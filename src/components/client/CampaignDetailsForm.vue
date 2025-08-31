<template>
  <div class="space-y-6">
    <!-- Campaign Name -->
    <div>
      <label for="campaign-name" class="block text-sm font-medium text-gray-700 mb-2">
        Campaign Name *
      </label>
      <input
        id="campaign-name"
        v-model="form.name"
        type="text"
        required
        placeholder="Enter your campaign name"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
        @input="updateForm"
      />
    </div>

    <!-- Description -->
    <div>
      <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
        Campaign Description *
      </label>
      <textarea
        id="description"
        v-model="form.description"
        rows="4"
        required
        placeholder="Describe your campaign goals and message"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
        @input="updateForm"
      ></textarea>
    </div>

    <!-- Target Audience -->
    <div>
      <label for="target-audience" class="block text-sm font-medium text-gray-700 mb-2">
        Target Audience
      </label>
      <input
        id="target-audience"
        v-model="form.targetAudience"
        type="text"
        placeholder="e.g., Adults 25-45, Urban professionals"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
        @input="updateForm"
      />
    </div>

    <!-- Budget -->
    <div>
      <label for="budget" class="block text-sm font-medium text-gray-700 mb-2">
        Total Budget
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span class="text-gray-500 text-sm">$</span>
        </div>
        <input
          id="budget"
          v-model.number="form.budget"
          type="number"
          min="0"
          step="100"
          placeholder="0.00"
          class="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
          @input="updateForm"
        />
      </div>
    </div>

    <!-- Campaign Objectives -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-3">
        Campaign Objectives (select all that apply)
      </label>
      <div class="space-y-2">
        <label
          v-for="objective in objectiveOptions"
          :key="objective.value"
          class="flex items-center"
        >
          <input
            v-model="form.objectives"
            :value="objective.value"
            type="checkbox"
            class="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
            @change="updateForm"
          />
          <span class="ml-2 text-sm text-gray-700">{{ objective.label }}</span>
        </label>
      </div>
    </div>

    <!-- Additional Notes -->
    <div>
      <label for="notes" class="block text-sm font-medium text-gray-700 mb-2">
        Additional Notes
      </label>
      <textarea
        id="notes"
        v-model="form.notes"
        rows="3"
        placeholder="Any additional requirements or notes for providers"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
        @input="updateForm"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'update'])

const form = reactive({
  name: '',
  description: '',
  targetAudience: '',
  budget: null,
  objectives: [],
  notes: '',
  ...props.modelValue
})

const objectiveOptions = [
  { value: 'brand-awareness', label: 'Brand Awareness' },
  { value: 'lead-generation', label: 'Lead Generation' },
  { value: 'sales', label: 'Drive Sales' },
  { value: 'website-traffic', label: 'Increase Website Traffic' },
  { value: 'event-promotion', label: 'Event Promotion' },
  { value: 'product-launch', label: 'Product Launch' },
  { value: 'local-awareness', label: 'Local Business Awareness' }
]

function updateForm() {
  const formData = { ...form }
  emit('update:modelValue', formData)
  emit('update', formData)
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  Object.assign(form, newValue)
}, { deep: true })
</script>
