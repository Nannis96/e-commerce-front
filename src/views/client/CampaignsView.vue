<template>
  <div class="w-full flex justify-center">
    <div class="max-w-6xl w-full px-8 py-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Mis Campañas</h1>
        <button
          @click="showCreateModal = true"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
        >
          <PlusIcon class="h-5 w-5" />
          <span>Crear Nueva Campaña</span>
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
              <p class="text-sm font-medium text-gray-600">Total Campañas</p>
              <p class="text-2xl font-bold text-gray-900">{{ campaignsList.length }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon class="h-8 w-8 text-green-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Activas</p>
              <p class="text-2xl font-bold text-gray-900">{{ activeCampaigns.length }}</p>
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
              <p class="text-2xl font-bold text-gray-900">{{ pendingCampaigns.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 rounded-lg">
              <CurrencyDollarIcon class="h-8 w-8 text-purple-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Invertido</p>
              <p class="text-2xl font-bold text-gray-900">${{ totalInvestment }}</p>
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
                placeholder="Buscar por nombre de campaña..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <select
                v-model="filterStatus"
                class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Todos</option>
                <option value="draft">Borrador</option>
                <option value="active">Activa</option>
                <option value="completed">Completada</option>
                <option value="cancelled">Cancelada</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Moneda</label>
              <select
                v-model="filterCurrency"
                class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Todas</option>
                <option value="USD">USD</option>
                <option value="MXN">MXN</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Campaigns List -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Lista de Campañas</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaña
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fechas
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medios
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
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
              <tr v-for="campaign in filteredCampaigns" :key="campaign.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <RectangleStackIcon class="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">Campaña #{{ campaign.id }}</div>
                      <div class="text-sm text-gray-500">{{ campaign.media_items?.length || 0 }} medios</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>{{ formatDate(campaign.start_date) }}</div>
                  <div class="text-gray-500">{{ formatDate(campaign.end_date) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div class="flex flex-col space-y-1">
                    <div v-for="item in campaign.media_items?.slice(0, 2)" :key="item.id" class="text-xs bg-gray-100 px-2 py-1 rounded">
                      {{ getMediaName(item.media_id) }}
                    </div>
                    <div v-if="campaign.media_items?.length > 2" class="text-xs text-gray-500">
                      +{{ campaign.media_items.length - 2 }} más
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div class="font-medium">${{ campaign.total?.toLocaleString() }}</div>
                  <div class="text-gray-500">{{ campaign.currency }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(campaign.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {{ getStatusLabel(campaign.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    @click="viewCampaignDetails(campaign)"
                    class="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Ver
                  </button>
                  <button
                    @click="editCampaign(campaign)"
                    class="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Editar
                  </button>
                  <button
                    @click="deleteCampaign(campaign.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          
          <!-- Empty State -->
          <div v-if="filteredCampaigns.length === 0" class="text-center py-12">
            <RectangleStackIcon class="mx-auto h-12 w-12 text-gray-400" />
            <h3 class="mt-2 text-sm font-medium text-gray-900">No hay campañas</h3>
            <p class="mt-1 text-sm text-gray-500">
              {{ searchQuery || filterStatus || filterCurrency ? 'No se encontraron campañas con los filtros aplicados.' : 'Comienza creando tu primera campaña publicitaria.' }}
            </p>
            <div v-if="!searchQuery && !filterStatus && !filterCurrency" class="mt-6">
              <button
                @click="showCreateModal = true"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <PlusIcon class="h-5 w-5 mr-2" />
                Crear Primera Campaña
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Create/Edit Campaign Modal -->
      <div v-if="showCreateModal" class="fixed inset-0 z-[9999] overflow-y-auto flex items-center justify-center p-4" @click="closeOnBackdrop">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-black bg-opacity-50"></div>
        
        <!-- Modal panel -->
        <div class="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
          <!-- Header -->
          <div class="bg-white px-6 py-4 border-b border-gray-200 rounded-t-lg">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900">
                {{ editingCampaign ? 'Editar Campaña' : 'Crear Nueva Campaña' }}
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
          <form @submit.prevent="saveCampaign" class="px-6 py-4">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Left Column: Campaign Info -->
              <div class="space-y-4">
                <h4 class="text-md font-medium text-gray-900 border-b pb-2">Información de la Campaña</h4>
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Fecha Inicio *</label>
                    <input
                      v-model="campaignForm.start_date"
                      type="date"
                      required
                      :min="minDate"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Fecha Final *</label>
                    <input
                      v-model="campaignForm.end_date"
                      type="date"
                      required
                      :min="campaignForm.start_date || minDate"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Total</label>
                    <input
                      :value="calculateTotal()"
                      type="text"
                      readonly
                      class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                      placeholder="Se calcula automáticamente"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Moneda *</label>
                    <select
                      v-model="campaignForm.currency"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    >
                      <option value="USD" class="text-gray-900">USD - Dólar Americano</option>
                      <option value="MXN" class="text-gray-900">MXN - Peso Mexicano</option>
                      <option value="EUR" class="text-gray-900">EUR - Euro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Estado *</label>
                  <select
                    v-model="campaignForm.status"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  >
                    <option value="draft" class="text-gray-900">Borrador</option>
                    <option value="active" class="text-gray-900">Activa</option>
                    <option value="completed" class="text-gray-900">Completada</option>
                    <option value="cancelled" class="text-gray-900">Cancelada</option>
                  </select>
                </div>
              </div>

              <!-- Right Column: Media Selection -->
              <div class="space-y-4">
                <div class="flex justify-between items-center border-b pb-2">
                  <h4 class="text-md font-medium text-gray-900">Seleccionar Medios</h4>
                  <button
                    type="button"
                    @click="showMediaSelector = true"
                    class="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Agregar Medio
                  </button>
                </div>

                <!-- Selected Media Items -->
                <div class="space-y-3 max-h-80 overflow-y-auto">
                  <div v-if="campaignForm.media_items.length === 0" class="text-center py-8 text-gray-500">
                    <RectangleStackIcon class="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p class="text-sm">No hay medios seleccionados</p>
                    <p class="text-xs">Haz clic en "Agregar Medio" para comenzar</p>
                  </div>
                  
                  <div v-for="(item, index) in campaignForm.media_items" :key="index" class="border rounded-lg p-3 bg-gray-50">
                    <div class="flex justify-between items-start">
                      <div class="flex-1">
                        <h5 class="font-medium text-gray-900">{{ getMediaName(item.media_id) }}</h5>
                        <p class="text-sm text-gray-600">{{ getMediaLocation(item.media_id) }}</p>
                        <div class="mt-2 grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span class="font-medium">Precio/día:</span> ${{ item.price_per_day }}
                          </div>
                          <div>
                            <span class="font-medium">Días:</span> {{ item.range || 0 }}
                          </div>
                          <div>
                            <span class="font-medium">Subtotal:</span> ${{ item.subtotal }}
                          </div>
                          <div>
                            <span class="font-medium">Estado:</span> 
                            <span :class="getProviderStatusClass(item.provider_status)">
                              {{ getProviderStatusLabel(item.provider_status) }}
                            </span>
                          </div>
                        </div>
                        <div v-if="item.description" class="mt-2">
                          <span class="text-xs font-medium text-gray-700">Descripción:</span>
                          <p class="text-xs text-gray-600">{{ item.description }}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        @click="removeMediaItem(index)"
                        class="ml-2 text-red-600 hover:text-red-800"
                      >
                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
                :disabled="isLoading || campaignForm.media_items.length === 0"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <svg v-if="isLoading" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ isLoading ? 'Guardando...' : (editingCampaign ? 'Actualizar' : 'Crear') }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Media Selector Modal -->
      <div v-if="showMediaSelector" class="fixed inset-0 z-[10000] overflow-y-auto flex items-center justify-center p-4" @click="closeMediaSelector">
        <div class="fixed inset-0 bg-black bg-opacity-50"></div>
        <div class="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" @click.stop>
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Seleccionar Medio</h3>
          </div>
          <div class="px-6 py-4 space-y-4">
            <div v-for="media in availableMedia" :key="media.id" class="border rounded-lg p-4 hover:bg-gray-50">
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900">{{ media.name }}</h4>
                  <p class="text-sm text-gray-600">{{ media.location }}</p>
                  <p class="text-sm text-gray-600">${{ media.price_per_day }}/día</p>
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                    {{ getTypeLabel(media.type) }}
                  </span>
                </div>
                <button
                  @click="addMediaToSelection(media)"
                  class="ml-4 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  Seleccionar
                </button>
              </div>
            </div>
          </div>
          <div class="px-6 py-4 border-t border-gray-200">
            <button
              @click="closeMediaSelector"
              class="w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200"
            >
              Cerrar
            </button>
          </div>
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
const campaignsList = ref([])
const availableMedia = ref([])
const showCreateModal = ref(false)
const showMediaSelector = ref(false)
const editingCampaign = ref(null)
const isLoading = ref(false)
const searchQuery = ref('')
const filterStatus = ref('')
const filterCurrency = ref('')

// Form data
const campaignForm = ref({
  start_date: '',
  end_date: '',
  total: 0,
  currency: 'USD',
  status: 'draft',
  media_items: []
})

// Computed
const activeCampaigns = computed(() => 
  campaignsList.value.filter(campaign => campaign.status === 'active')
)

const pendingCampaigns = computed(() => 
  campaignsList.value.filter(campaign => campaign.status === 'draft')
)

const totalInvestment = computed(() => 
  campaignsList.value.reduce((total, campaign) => total + (campaign.total || 0), 0).toLocaleString()
)

const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const filteredCampaigns = computed(() => {
  let filtered = campaignsList.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(campaign => 
      campaign.id.toString().includes(query)
    )
  }

  if (filterCurrency.value) {
    filtered = filtered.filter(campaign => campaign.currency === filterCurrency.value)
  }

  if (filterStatus.value) {
    filtered = filtered.filter(campaign => campaign.status === filterStatus.value)
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
    active: 'Activa',
    draft: 'Borrador',
    completed: 'Completada',
    cancelled: 'Cancelada'
  }
  return statuses[status] || status
}

function getStatusClass(status) {
  const classes = {
    active: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

function getProviderStatusLabel(status) {
  const statuses = {
    pending: 'Pendiente',
    approved: 'Aprobado',
    rejected: 'Rechazado'
  }
  return statuses[status] || status
}

function getProviderStatusClass(status) {
  const classes = {
    pending: 'text-yellow-600',
    approved: 'text-green-600',
    rejected: 'text-red-600'
  }
  return classes[status] || 'text-gray-600'
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function getMediaName(mediaId) {
  const media = availableMedia.value.find(m => m.id === mediaId)
  return media ? media.name : `Medio #${mediaId}`
}

function getMediaLocation(mediaId) {
  const media = availableMedia.value.find(m => m.id === mediaId)
  return media ? media.location : 'Ubicación no disponible'
}

function calculateDays() {
  if (!campaignForm.value.start_date || !campaignForm.value.end_date) return 0
  const start = new Date(campaignForm.value.start_date)
  const end = new Date(campaignForm.value.end_date)
  const diffTime = Math.abs(end - start)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
}

function calculateTotal() {
  return campaignForm.value.media_items.reduce((total, item) => total + (item.subtotal || 0), 0).toLocaleString()
}

function addMediaToSelection(media) {
  const days = calculateDays()
  const subtotal = media.price_per_day * days
  
  const mediaItem = {
    media_id: media.id,
    price_per_day: media.price_per_day,
    range: days,
    subtotal: subtotal,
    provider_status: 'pending',
    description: '',
    campaign_id: null // Will be set when campaign is saved
  }
  
  campaignForm.value.media_items.push(mediaItem)
  showMediaSelector.value = false
  
  // Recalculate totals for all items
  campaignForm.value.media_items.forEach(item => {
    item.range = days
    item.subtotal = item.price_per_day * days
  })
}

function removeMediaItem(index) {
  campaignForm.value.media_items.splice(index, 1)
}

function viewCampaignDetails(campaign) {
  // This could open a detailed view modal
  alert(`Ver detalles de campaña #${campaign.id}`)
}

function editCampaign(campaign) {
  editingCampaign.value = { ...campaign }
  campaignForm.value = { 
    ...campaign,
    media_items: campaign.media_items || []
  }
  showCreateModal.value = true
}

function closeModal() {
  showCreateModal.value = false
  editingCampaign.value = null
  campaignForm.value = {
    start_date: '',
    end_date: '',
    total: 0,
    currency: 'USD',
    status: 'draft',
    media_items: []
  }
}

function closeMediaSelector() {
  showMediaSelector.value = false
}

function closeOnBackdrop(event) {
  if (event.target === event.currentTarget) {
    closeModal()
  }
}

async function saveCampaign() {
  try {
    isLoading.value = true
    
    // Calculate final total
    const total = campaignForm.value.media_items.reduce((sum, item) => sum + (item.subtotal || 0), 0)
    
    const campaignData = {
      ...campaignForm.value,
      total: total
    }
    
    if (editingCampaign.value) {
      // Update existing campaign
      const index = campaignsList.value.findIndex(c => c.id === editingCampaign.value.id)
      if (index !== -1) {
        campaignsList.value[index] = { ...campaignData, id: editingCampaign.value.id }
      }
      success('Éxito', 'Campaña actualizada correctamente')
    } else {
      // Create new campaign
      const newCampaign = {
        ...campaignData,
        id: Date.now(), // Temporary ID
        user_id: 1 // This should come from auth store
      }
      
      // Set campaign_id for all media items
      newCampaign.media_items = newCampaign.media_items.map(item => ({
        ...item,
        campaign_id: newCampaign.id
      }))
      
      campaignsList.value.unshift(newCampaign)
      success('Éxito', 'Campaña creada correctamente')
    }
    
    closeModal()
  } catch (err) {
    error('Error', err.message || 'Error al guardar la campaña')
  } finally {
    isLoading.value = false
  }
}

async function deleteCampaign(id) {
  if (confirm('¿Estás seguro de que quieres eliminar esta campaña?')) {
    try {
      campaignsList.value = campaignsList.value.filter(campaign => campaign.id !== id)
      success('Éxito', 'Campaña eliminada correctamente')
    } catch (err) {
      error('Error', 'Error al eliminar la campaña')
    }
  }
}

// Load sample data
onMounted(() => {
  // Sample available media - In real app, this would come from API
  availableMedia.value = [
    {
      id: 1,
      name: 'Espectacular Reforma Norte',
      type: 'billboard',
      location: 'Av. Reforma 1234, Col. Centro',
      price_per_day: 2500,
      status: 'active'
    },
    {
      id: 2,
      name: 'Pantalla Digital Plaza',
      type: 'digital',
      location: 'Plaza Comercial, Local 15',
      price_per_day: 1800,
      status: 'active'
    },
    {
      id: 3,
      name: 'Parada de Autobús Centro',
      type: 'street',
      location: 'Av. Juárez esq. 16 de Septiembre',
      price_per_day: 800,
      status: 'active'
    }
  ]

  // Sample campaigns data - In real app, this would come from API
  campaignsList.value = [
    {
      id: 1,
      start_date: '2025-06-01',
      end_date: '2025-08-31',
      total: 230000,
      currency: 'USD',
      status: 'active',
      user_id: 1,
      media_items: [
        {
          media_id: 1,
          price_per_day: 2500,
          range: 92,
          subtotal: 230000,
          provider_status: 'approved',
          description: 'Campaña de verano principal',
          campaign_id: 1
        }
      ]
    },
    {
      id: 2,
      start_date: '2025-09-15',
      end_date: '2025-10-15',
      total: 54000,
      currency: 'USD',
      status: 'draft',
      user_id: 1,
      media_items: [
        {
          media_id: 2,
          price_per_day: 1800,
          range: 30,
          subtotal: 54000,
          provider_status: 'pending',
          description: 'Lanzamiento de producto',
          campaign_id: 2
        }
      ]
    }
  ]
})
</script>
