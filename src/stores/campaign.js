import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import apiService from '@/services/api'

export const useCampaignStore = defineStore('campaign', () => {
    const campaigns = ref([])
    const currentCampaign = ref(null)
    const cart = ref([])
    const isLoading = ref(false)

    const cartTotal = computed(() => {
        return cart.value.reduce((total, item) => {
            const days = item.dateRange ?
                Math.ceil((new Date(item.dateRange.end) - new Date(item.dateRange.start)) / (1000 * 60 * 60 * 24)) : 0
            return total + (item.dailyPrice * days)
        }, 0)
    })

    const cartItemsCount = computed(() => cart.value.length)

    async function fetchCampaigns() {
        try {
            isLoading.value = true
            const response = await apiService.getCampaigns()
            campaigns.value = response.data || response
        } catch (error) {
            console.error('Error fetching campaigns:', error)
            throw error
        } finally {
            isLoading.value = false
        }
    }

    async function createCampaign(campaignData) {
        try {
            isLoading.value = true
            const response = await apiService.createCampaign(campaignData)
            campaigns.value.push(response.data || response)
            // Clear cart after successful campaign creation
            cart.value = []
            return response
        } catch (error) {
            console.error('Error creating campaign:', error)
            throw error
        } finally {
            isLoading.value = false
        }
    }

    async function updateCampaignStatus(id, status) {
        try {
            isLoading.value = true
            const response = await apiService.updateCampaignStatus(id, status)
            const index = campaigns.value.findIndex(campaign => campaign.id === id)
            if (index !== -1) {
                campaigns.value[index] = { ...campaigns.value[index], status }
            }
            return response
        } catch (error) {
            console.error('Error updating campaign status:', error)
            throw error
        } finally {
            isLoading.value = false
        }
    }

    function addToCart(media, dateRange) {
        // Validate minimum 30 days
        const days = Math.ceil((new Date(dateRange.end) - new Date(dateRange.start)) / (1000 * 60 * 60 * 24))
        if (days < 30) {
            throw new Error('Campaign duration must be at least 30 days')
        }

        const existingItem = cart.value.find(item => item.id === media.id)
        if (existingItem) {
            existingItem.dateRange = dateRange
        } else {
            cart.value.push({
                ...media,
                dateRange,
                addedAt: new Date().toISOString()
            })
        }
    }

    function removeFromCart(mediaId) {
        cart.value = cart.value.filter(item => item.id !== mediaId)
    }

    function updateCartItemDates(mediaId, dateRange) {
        const item = cart.value.find(item => item.id === mediaId)
        if (item) {
            item.dateRange = dateRange
        }
    }

    function clearCart() {
        cart.value = []
    }

    function getCampaignsByStatus(status) {
        return campaigns.value.filter(campaign => campaign.status === status)
    }

    return {
        campaigns,
        currentCampaign,
        cart,
        isLoading,
        cartTotal,
        cartItemsCount,
        fetchCampaigns,
        createCampaign,
        updateCampaignStatus,
        addToCart,
        removeFromCart,
        updateCartItemDates,
        clearCart,
        getCampaignsByStatus
    }
})
