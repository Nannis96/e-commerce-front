<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white w-full">
    <!-- Hero Section -->
    <div class="relative bg-white w-full min-h-[80vh] flex items-center justify-center">
      <div class="container max-w-6xl mx-auto px-8 py-24">
        <div class="text-center w-full">
          <h1 class="text-7xl font-light text-gray-900 mb-8 tracking-tight leading-tight mx-auto">
            Encuentra el 
            <span class="font-semibold text-slate-800 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent block">
              espacio publicitario
            </span>
            <span class="block">perfecto</span>
          </h1>
          <div class="flex justify-center w-full">
            <p class="text-xl text-center text-gray-600 mb-12 leading-relaxed max-w-4xl">
              Conectamos marcas con espacios publicitarios únicos. Descubre espectaculares, pantallas digitales y más en las mejores ubicaciones de la ciudad.
            </p>
          </div>
          
          <!-- Search Bar Container -->
          <div class="w-full flex justify-center">
            <MediaSearchBar @search="handleSearch" />
          </div>
        </div>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="border-b border-gray-200 bg-white/90 backdrop-blur-sm sticky top-20 z-40 shadow-sm w-full">
      <div class="w-full px-8 py-6 flex justify-center">
        <div class="max-w-6xl w-full">
          <MediaFilters
            :filters="filters"
            @update-filters="updateFilters"
            @clear-filters="clearFilters"
          />
        </div>
      </div>
    </div>

    <!-- Results Section -->
    <div class="w-full px-8 py-12 flex justify-center">
      <div class="max-w-6xl w-full">
        <!-- Results Header -->
        <div class="flex flex-row items-center justify-between mb-12">
          <div class="mb-0">
            <h2 class="text-4xl font-light text-gray-900 mb-2">
              <span class="font-semibold">{{ filteredMedia.length }}</span> espacios disponibles
            </h2>
            <p class="text-gray-600 text-lg">
              Disponibles para las fechas de tu campaña
            </p>
          </div>
          
          <!-- View Toggle -->
          <div class="flex items-center space-x-1 bg-gray-100 rounded-xl p-1 shadow-sm">
            <button
              @click="viewMode = 'grid'"
              :class="[
                'flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                viewMode === 'grid' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              ]"
            >
              <Squares2X2Icon class="h-4 w-4 mr-2" />
              <span>Grid</span>
            </button>
            <button
              @click="viewMode = 'list'"
              :class="[
                'flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                viewMode === 'list' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              ]"
            >
              <ListBulletIcon class="h-4 w-4 mr-2" />
              <span>List</span>
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="flex justify-center py-20">
          <LoadingSpinner text="Cargando espacios publicitarios..." />
        </div>

        <!-- Media Grid/List -->
        <div v-else-if="filteredMedia.length > 0">
          <div
            v-if="viewMode === 'grid'"
            class="grid grid-cols-4 gap-8"
          >
            <MediaCard
              v-for="media in filteredMedia"
              :key="media.id"
              :media="media"
              @view-details="viewMediaDetails"
              @add-to-campaign="addToCampaign"
            />
          </div>

          <div v-else class="space-y-6">
            <MediaListItem
              v-for="media in filteredMedia"
              :key="media.id"
              :media="media"
              @view-details="viewMediaDetails"
              @add-to-campaign="addToCampaign"
            />
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20">
          <div class="max-w-md mx-auto px-4">
            <NoResultsIcon class="h-32 w-32 text-gray-200 mx-auto mb-6" />
            <h3 class="text-2xl font-light text-gray-900 mb-4">No encontramos espacios</h3>
            <p class="text-gray-600 mb-8 leading-relaxed text-base">
              Intenta ajustar tus filtros o criterios de búsqueda para ver más opciones disponibles.
            </p>
            <button
              @click="clearFilters"
              class="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-full font-medium transition-all duration-200 shadow-sm hover:shadow-md text-base"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Media Detail Modal -->
    <MediaDetailModal
      :is-open="isDetailModalOpen"
      :media="selectedMedia"
      @close="closeDetailModal"
      @add-to-campaign="addToCampaign"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Squares2X2Icon, ListBulletIcon } from '@heroicons/vue/24/outline'
import { useMediaStore } from '@/stores/media'
import { useCampaignStore } from '@/stores/campaign'
import { useNotifications } from '@/composables/useNotifications'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import MediaSearchBar from '@/components/client/MediaSearchBar.vue'
import MediaFilters from '@/components/client/MediaFilters.vue'
import MediaCard from '@/components/client/MediaCard.vue'
import MediaListItem from '@/components/client/MediaListItem.vue'
import MediaDetailModal from '@/components/client/MediaDetailModal.vue'
import NoResultsIcon from '@/components/icons/NoResultsIcon.vue'

const router = useRouter()
const mediaStore = useMediaStore()
const campaignStore = useCampaignStore()
const { success, error } = useNotifications()

const viewMode = ref('grid')
const selectedMedia = ref(null)
const isDetailModalOpen = ref(false)

const isLoading = computed(() => mediaStore.isLoading)
const filteredMedia = computed(() => mediaStore.filteredMedia)
const filters = computed(() => mediaStore.filters)

onMounted(async () => {
  try {
    await mediaStore.fetchMedia()
  } catch (err) {
    error('Error', 'Failed to load media spaces')
  }
})

function handleSearch(searchParams) {
  mediaStore.updateFilters(searchParams)
  mediaStore.fetchMedia(searchParams)
}

function updateFilters(newFilters) {
  mediaStore.updateFilters(newFilters)
}

function clearFilters() {
  mediaStore.clearFilters()
}

function viewMediaDetails(media) {
  selectedMedia.value = media
  isDetailModalOpen.value = true
}

function closeDetailModal() {
  isDetailModalOpen.value = false
  selectedMedia.value = null
}

function addToCampaign(media, dateRange) {
  try {
    campaignStore.addToCart(media, dateRange)
    success('Added to Campaign', `${media.name} has been added to your campaign`)
    
    // Close modal if open
    if (isDetailModalOpen.value) {
      closeDetailModal()
    }
  } catch (err) {
    error('Error', err.message)
  }
}
</script>
