import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import apiService from '@/services/api'

export const useMediaStore = defineStore('media', () => {
    const media = ref([])
    const currentMedia = ref(null)
    const isLoading = ref(false)
    const filters = ref({
        location: '',
        type: '',
        priceRange: [0, 10000],
        dateRange: {
            start: null,
            end: null
        }
    })

    const filteredMedia = computed(() => {
        let result = media.value

        if (filters.value.location) {
            result = result.filter(item =>
                item.location.toLowerCase().includes(filters.value.location.toLowerCase())
            )
        }

        if (filters.value.type) {
            result = result.filter(item => item.type === filters.value.type)
        }

        result = result.filter(item =>
            item.dailyPrice >= filters.value.priceRange[0] &&
            item.dailyPrice <= filters.value.priceRange[1]
        )

        return result
    })

    async function fetchMedia(queryFilters = {}) {
        try {
            isLoading.value = true
            const response = await apiService.getMedia(queryFilters)
            media.value = response.data || response
        } catch (error) {
            console.error('Error fetching media:', error)
            throw error
        } finally {
            isLoading.value = false
        }
    }

    async function fetchMediaById(id) {
        try {
            isLoading.value = true
            const response = await apiService.getMediaById(id)
            currentMedia.value = response.data || response
            return currentMedia.value
        } catch (error) {
            console.error('Error fetching media:', error)
            throw error
        } finally {
            isLoading.value = false
        }
    }

    async function createMedia(mediaData) {
        try {
            isLoading.value = true
            const response = await apiService.createMedia(mediaData)
            media.value.push(response.data || response)
            return response
        } catch (error) {
            console.error('Error creating media:', error)
            throw error
        } finally {
            isLoading.value = false
        }
    }

    async function updateMedia(id, mediaData) {
        try {
            isLoading.value = true
            const response = await apiService.updateMedia(id, mediaData)
            const index = media.value.findIndex(item => item.id === id)
            if (index !== -1) {
                media.value[index] = response.data || response
            }
            return response
        } catch (error) {
            console.error('Error updating media:', error)
            throw error
        } finally {
            isLoading.value = false
        }
    }

    async function deleteMedia(id) {
        try {
            isLoading.value = true
            await apiService.deleteMedia(id)
            media.value = media.value.filter(item => item.id !== id)
        } catch (error) {
            console.error('Error deleting media:', error)
            throw error
        } finally {
            isLoading.value = false
        }
    }

    function updateFilters(newFilters) {
        filters.value = { ...filters.value, ...newFilters }
    }

    function clearFilters() {
        filters.value = {
            location: '',
            type: '',
            priceRange: [0, 10000],
            dateRange: {
                start: null,
                end: null
            }
        }
    }

    return {
        media,
        currentMedia,
        isLoading,
        filters,
        filteredMedia,
        fetchMedia,
        fetchMediaById,
        createMedia,
        updateMedia,
        deleteMedia,
        updateFilters,
        clearFilters
    }
})
