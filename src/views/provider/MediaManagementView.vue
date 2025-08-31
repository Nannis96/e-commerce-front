<template>
  <div class="w-full flex justify-center">
    <div class="max-w-6xl w-full px-8 py-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Mis Medios Publicitarios</h1>
        <button
          @click="showCreateModal = true"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
        >
          <PlusIcon class="h-5 w-5" />
          <span>Crear Nuevo Medio</span>
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <RectangleStackIcon class="h-8 w-8 text-blue-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Medios</p>
              <p class="text-2xl font-bold text-gray-900">{{ mediaList.length }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon class="h-8 w-8 text-green-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Activos</p>
              <p class="text-2xl font-bold text-gray-900">{{ activeMedia.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 rounded-lg">
              <ClockIcon class="h-8 w-8 text-yellow-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Pendientes</p>
              <p class="text-2xl font-bold text-gray-900">{{ pendingMedia.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 rounded-lg">
              <CurrencyDollarIcon class="h-8 w-8 text-purple-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Ingresos/Día</p>
              <p class="text-2xl font-bold text-gray-900">${{ totalDailyRevenue }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow mb-6">
        <div class="p-6">
          <div class="flex flex-wrap gap-4">
            <div class="flex-1 min-w-[200px]">
              <label class="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Buscar por nombre o ubicación..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
              <select
                v-model="filterType"
                class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Todos</option>
                <option value="billboard">Espectacular</option>
                <option value="digital">Pantalla Digital</option>
                <option value="transit">Transporte</option>
                <option value="street">Mobiliario Urbano</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <select
                v-model="filterStatus"
                class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Todos</option>
                <option value="active">Activo</option>
                <option value="pending">Pendiente</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Media List -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Lista de Medios</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medio
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ubicación
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio/Día
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="media in filteredMedia" :key="media.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                        <RectangleStackIcon class="h-6 w-6 text-gray-500" />
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ media.name }}</div>
                      <div class="text-sm text-gray-500">ID: {{ media.id }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ getTypeLabel(media.type) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ media.location }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${{ media.price_per_day.toLocaleString() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(media.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {{ getStatusLabel(media.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    @click="editMedia(media)"
                    class="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Editar
                  </button>
                  <button
                    @click="deleteMedia(media.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          
          <!-- Empty State -->
          <div v-if="filteredMedia.length === 0" class="text-center py-12">
            <RectangleStackIcon class="mx-auto h-12 w-12 text-gray-400" />
            <h3 class="mt-2 text-sm font-medium text-gray-900">No hay medios</h3>
            <p class="mt-1 text-sm text-gray-500">
              {{ searchQuery || filterType || filterStatus ? 'No se encontraron medios con los filtros aplicados.' : 'Comienza creando tu primer medio publicitario.' }}
            </p>
            <div v-if="!searchQuery && !filterType && !filterStatus" class="mt-6">
              <button
                @click="showCreateModal = true"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <PlusIcon class="h-5 w-5 mr-2" />
                Crear Primer Medio
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Create/Edit Media Modal -->
      <div v-if="showCreateModal" class="fixed inset-0 z-[9999] overflow-y-auto flex items-center justify-center p-4" @click="closeOnBackdrop">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-black bg-opacity-50"></div>
        
        <!-- Modal panel -->
        <div class="relative bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" @click.stop>
          <!-- Header -->
          <div class="bg-white px-6 py-4 border-b border-gray-200 rounded-t-lg">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900">
                {{ editingMedia ? 'Editar Medio' : 'Crear Nuevo Medio' }}
              </h3>
              <button
                @click="closeModal"
                class="rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 p-1"
              >
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Content -->
          <form @submit.prevent="saveMedia" class="px-6 py-4 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
              <input
                v-model="mediaForm.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                placeholder="Ej: Espectacular Reforma 123"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tipo *</label>
              <select
                v-model="mediaForm.type"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              >
                <option value="" class="text-gray-500">Selecciona un tipo</option>
                <option value="billboard" class="text-gray-900">Espectacular</option>
                <option value="digital" class="text-gray-900">Pantalla Digital</option>
                <option value="transit" class="text-gray-900">Transporte</option>
                <option value="street" class="text-gray-900">Mobiliario Urbano</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Ubicación *</label>
              <input
                v-model="mediaForm.location"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                placeholder="Ej: Av. Reforma 123, Col. Centro"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Precio por Día ($) *</label>
              <input
                v-model.number="mediaForm.price_per_day"
                type="number"
                min="0"
                step="0.01"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                placeholder="0.00"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Estado *</label>
              <select
                v-model="mediaForm.status"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              >
                <option value="active" class="text-gray-900">Activo</option>
                <option value="pending" class="text-gray-900">Pendiente</option>
                <option value="inactive" class="text-gray-900">Inactivo</option>
              </select>
            </div>

            <!-- Footer -->
            <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-6">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                :disabled="isLoading"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <svg v-if="isLoading" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ isLoading ? 'Guardando...' : (editingMedia ? 'Actualizar' : 'Crear') }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  PlusIcon, 
  RectangleStackIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  CurrencyDollarIcon 
} from '@heroicons/vue/24/outline'
import { useNotifications } from '@/composables/useNotifications'

const { success, error } = useNotifications()

// Data
const mediaList = ref([])
const showCreateModal = ref(false)
const editingMedia = ref(null)
const isLoading = ref(false)
const searchQuery = ref('')
const filterType = ref('')
const filterStatus = ref('')

// Form data
const mediaForm = ref({
  name: '',
  type: '',
  location: '',
  price_per_day: 0,
  status: 'active'
})

// Computed
const activeMedia = computed(() => 
  mediaList.value.filter(media => media.status === 'active')
)

const pendingMedia = computed(() => 
  mediaList.value.filter(media => media.status === 'pending')
)

const totalDailyRevenue = computed(() => 
  activeMedia.value.reduce((total, media) => total + media.price_per_day, 0).toLocaleString()
)

const filteredMedia = computed(() => {
  let filtered = mediaList.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(media => 
      media.name.toLowerCase().includes(query) || 
      media.location.toLowerCase().includes(query)
    )
  }

  if (filterType.value) {
    filtered = filtered.filter(media => media.type === filterType.value)
  }

  if (filterStatus.value) {
    filtered = filtered.filter(media => media.status === filterStatus.value)
  }

  return filtered
})

// Methods
function getTypeLabel(type) {
  const types = {
    billboard: 'Espectacular',
    digital: 'Pantalla Digital',
    transit: 'Transporte',
    street: 'Mobiliario Urbano'
  }
  return types[type] || type
}

function getStatusLabel(status) {
  const statuses = {
    active: 'Activo',
    pending: 'Pendiente',
    inactive: 'Inactivo'
  }
  return statuses[status] || status
}

function getStatusClass(status) {
  const classes = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    inactive: 'bg-gray-100 text-gray-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

function editMedia(media) {
  editingMedia.value = { ...media }
  mediaForm.value = { ...media }
  showCreateModal.value = true
}

function closeModal() {
  showCreateModal.value = false
  editingMedia.value = null
  mediaForm.value = {
    name: '',
    type: '',
    location: '',
    price_per_day: 0,
    status: 'active'
  }
}

function closeOnBackdrop(event) {
  if (event.target === event.currentTarget) {
    closeModal()
  }
}

async function saveMedia() {
  try {
    isLoading.value = true
    
    if (editingMedia.value) {
      // Update existing media
      const index = mediaList.value.findIndex(m => m.id === editingMedia.value.id)
      if (index !== -1) {
        mediaList.value[index] = { ...mediaForm.value, id: editingMedia.value.id }
      }
      success('Éxito', 'Medio actualizado correctamente')
    } else {
      // Create new media
      const newMedia = {
        ...mediaForm.value,
        id: Date.now(), // Temporary ID
        user_id: 1 // This should come from auth store
      }
      mediaList.value.unshift(newMedia)
      success('Éxito', 'Medio creado correctamente')
    }
    
    closeModal()
  } catch (err) {
    error('Error', err.message || 'Error al guardar el medio')
  } finally {
    isLoading.value = false
  }
}

async function deleteMedia(id) {
  if (confirm('¿Estás seguro de que quieres eliminar este medio?')) {
    try {
      mediaList.value = mediaList.value.filter(media => media.id !== id)
      success('Éxito', 'Medio eliminado correctamente')
    } catch (err) {
      error('Error', 'Error al eliminar el medio')
    }
  }
}

// Load sample data
onMounted(() => {
  // Sample data - In real app, this would come from API
  mediaList.value = [
    {
      id: 1,
      name: 'Espectacular Reforma Norte',
      type: 'billboard',
      location: 'Av. Reforma 1234, Col. Centro',
      price_per_day: 2500,
      status: 'active',
      user_id: 1
    },
    {
      id: 2,
      name: 'Pantalla Digital Plaza',
      type: 'digital',
      location: 'Plaza Comercial, Local 15',
      price_per_day: 1800,
      status: 'active',
      user_id: 1
    },
    {
      id: 3,
      name: 'Parada de Autobús Centro',
      type: 'street',
      location: 'Av. Juárez esq. 16 de Septiembre',
      price_per_day: 800,
      status: 'pending',
      user_id: 1
    }
  ]
})
</script>
