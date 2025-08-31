// Mock API service with hardcoded data for testing
class ApiService {
    constructor() {
        this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
        this.delayMs = 500 // Simulate network delay
        this.initializeMockData()
    }

    // Initialize mock data
    initializeMockData() {
        this.mockMedia = [
            {
                id: 1,
                name: 'Espectacular Premium Centro Histórico',
                title: 'Espectacular Premium Centro Histórico',
                description: 'Ubicación privilegiada en el corazón de la ciudad con alta visibilidad',
                type: 'billboard',
                location: 'Centro Histórico, CDMX',
                coordinates: { lat: 19.4326, lng: -99.1332 },
                images: [
                    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
                    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'
                ],
                dailyPrice: 1500,
                dailyViews: 50000,
                rating: 4.8,
                reviewCount: 24,
                size: '6x3 metros',
                dimensions: '6m x 3m',
                providerId: 1,
                providerName: 'MediaMax Solutions',
                availability: {
                    blockedDates: ['2025-09-15', '2025-09-20', '2025-10-05'],
                    priceRules: [
                        { startDate: '2025-12-01', endDate: '2025-12-31', multiplier: 1.5 }
                    ]
                },
                features: ['Iluminación LED', 'Material resistente', 'Instalación incluida'],
                impressions: 50000,
                featured: true,
                createdAt: '2025-01-15'
            },
            {
                id: 2,
                name: 'Pantalla Digital Polanco',
                title: 'Pantalla Digital Polanco',
                description: 'Pantalla LED de última generación en zona comercial premium',
                type: 'digital_screen',
                location: 'Polanco, CDMX',
                coordinates: { lat: 19.4284, lng: -99.1918 },
                images: [
                    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
                    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800'
                ],
                dailyPrice: 2500,
                dailyViews: 75000,
                rating: 4.9,
                reviewCount: 18,
                size: '4x2 metros',
                dimensions: '4m x 2m',
                providerId: 2,
                providerName: 'Digital Media Pro',
                availability: {
                    blockedDates: ['2025-09-25', '2025-10-10'],
                    priceRules: []
                },
                features: ['Pantalla 4K', 'Control remoto', 'Programación flexible'],
                impressions: 75000,
                featured: false,
                createdAt: '2025-02-10'
            },
            {
                id: 3,
                name: 'Valla Publicitaria Carretera Norte',
                title: 'Valla Publicitaria Carretera Norte',
                description: 'Excelente ubicación en carretera con alto tráfico vehicular',
                type: 'billboard',
                location: 'Carretera México-Querétaro',
                coordinates: { lat: 19.5906, lng: -99.2344 },
                images: [
                    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'
                ],
                dailyPrice: 800,
                dailyViews: 35000,
                rating: 4.5,
                dailyViews: 35000,
                reviewCount: 12,
                size: '8x4 metros',
                dimensions: '8m x 4m',
                providerId: 1,
                providerName: 'MediaMax Solutions',
                availability: {
                    blockedDates: [],
                    priceRules: []
                },
                features: ['Gran formato', 'Visible 24/7', 'Mantenimiento incluido'],
                impressions: 35000,
                featured: false,
                createdAt: '2025-01-20'
            }
        ]

        this.mockCampaigns = [
            {
                id: 1,
                name: 'Campaña Lanzamiento Producto',
                status: 'active',
                clientId: 1,
                startDate: '2025-09-01',
                endDate: '2025-10-01',
                totalAmount: 45000,
                mediaItems: [
                    { mediaId: 1, startDate: '2025-09-01', endDate: '2025-10-01', dailyPrice: 1500 }
                ],
                createdAt: '2025-08-15',
                payments: [
                    { id: 1, amount: 45000, status: 'completed', date: '2025-08-15' }
                ]
            },
            {
                id: 2,
                name: 'Campaña Navideña',
                status: 'requested',
                clientId: 1,
                startDate: '2025-12-01',
                endDate: '2025-12-31',
                totalAmount: 93000,
                mediaItems: [
                    { mediaId: 2, startDate: '2025-12-01', endDate: '2025-12-31', dailyPrice: 2500 },
                    { mediaId: 1, startDate: '2025-12-01', endDate: '2025-12-15', dailyPrice: 1500 }
                ],
                createdAt: '2025-08-20',
                payments: []
            }
        ]

        this.mockUsers = [
            {
                id: 1,
                name: 'Juan Pérez',
                email: 'juan@ejemplo.com',
                role: 'client',
                avatar: 'https://ui-avatars.com/api/?name=Juan+Perez&background=f59e0b&color=fff',
                createdAt: '2025-01-10'
            },
            {
                id: 2,
                name: 'María García',
                email: 'maria@ejemplo.com',
                role: 'provider',
                avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=ef4444&color=fff',
                createdAt: '2025-01-05'
            },
            {
                id: 3,
                name: 'Admin Sistema',
                email: 'admin@mediaspace.com',
                role: 'admin',
                avatar: 'https://ui-avatars.com/api/?name=Admin+Sistema&background=6366f1&color=fff',
                createdAt: '2024-12-01'
            }
        ]
    }

    // Simulate network delay
    async delay(ms = this.delayMs) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    // Media endpoints
    async getMedia(filters = {}) {
        await this.delay()
        let result = [...this.mockMedia]

        // Apply filters
        if (filters.location) {
            result = result.filter(media =>
                media.location.toLowerCase().includes(filters.location.toLowerCase())
            )
        }

        if (filters.type) {
            result = result.filter(media => media.type === filters.type)
        }

        if (filters.minPrice) {
            result = result.filter(media => media.dailyPrice >= parseInt(filters.minPrice))
        }

        if (filters.maxPrice) {
            result = result.filter(media => media.dailyPrice <= parseInt(filters.maxPrice))
        }

        return {
            data: result,
            total: result.length,
            page: 1,
            limit: 10
        }
    }

    async getMediaById(id) {
        await this.delay()
        const media = this.mockMedia.find(m => m.id === parseInt(id))
        if (!media) {
            throw new Error('Media not found')
        }
        return { data: media }
    }

    async createMedia(data) {
        await this.delay()
        const newMedia = {
            id: this.mockMedia.length + 1,
            ...data,
            providerId: this.getCurrentUserId(),
            providerName: this.getCurrentUser()?.name || 'Unknown Provider',
            rating: 0,
            reviewCount: 0,
            createdAt: new Date().toISOString().split('T')[0]
        }
        this.mockMedia.push(newMedia)
        return { data: newMedia }
    }

    async updateMedia(id, data) {
        await this.delay()
        const index = this.mockMedia.findIndex(m => m.id === parseInt(id))
        if (index === -1) {
            throw new Error('Media not found')
        }
        this.mockMedia[index] = { ...this.mockMedia[index], ...data }
        return { data: this.mockMedia[index] }
    }

    async deleteMedia(id) {
        await this.delay()
        const index = this.mockMedia.findIndex(m => m.id === parseInt(id))
        if (index === -1) {
            throw new Error('Media not found')
        }
        this.mockMedia.splice(index, 1)
        return { success: true }
    }

    // Campaign endpoints
    async getCampaigns() {
        await this.delay()
        const userId = this.getCurrentUserId()
        const userRole = this.getCurrentUser()?.role

        let campaigns = [...this.mockCampaigns]

        if (userRole === 'client') {
            campaigns = campaigns.filter(c => c.clientId === userId)
        } else if (userRole === 'provider') {
            // Filter campaigns that include provider's media
            const providerMediaIds = this.mockMedia
                .filter(m => m.providerId === userId)
                .map(m => m.id)

            campaigns = campaigns.filter(c =>
                c.mediaItems.some(item => providerMediaIds.includes(item.mediaId))
            )
        }

        return { data: campaigns }
    }

    async createCampaign(data) {
        await this.delay()
        const newCampaign = {
            id: this.mockCampaigns.length + 1,
            ...data,
            clientId: this.getCurrentUserId(),
            status: 'requested',
            createdAt: new Date().toISOString().split('T')[0],
            payments: []
        }
        this.mockCampaigns.push(newCampaign)
        return { data: newCampaign }
    }

    async updateCampaignStatus(id, status) {
        await this.delay()
        const index = this.mockCampaigns.findIndex(c => c.id === parseInt(id))
        if (index === -1) {
            throw new Error('Campaign not found')
        }
        this.mockCampaigns[index].status = status
        return { data: this.mockCampaigns[index] }
    }

    // Auth endpoints
    async login(credentials) {
        await this.delay()
        const user = this.mockUsers.find(u => u.email === credentials.email)
        if (!user) {
            throw new Error('Invalid credentials')
        }

        const token = `mock_token_${user.id}_${Date.now()}`
        localStorage.setItem('current_user', JSON.stringify(user))

        return {
            user,
            token,
            success: true
        }
    }

    async register(userData) {
        await this.delay()
        const existingUser = this.mockUsers.find(u => u.email === userData.email)
        if (existingUser) {
            throw new Error('Email already exists')
        }

        const newUser = {
            id: this.mockUsers.length + 1,
            ...userData,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=f59e0b&color=fff`,
            createdAt: new Date().toISOString().split('T')[0]
        }

        this.mockUsers.push(newUser)
        const token = `mock_token_${newUser.id}_${Date.now()}`
        localStorage.setItem('current_user', JSON.stringify(newUser))

        return {
            user: newUser,
            token,
            success: true
        }
    }

    async logout() {
        await this.delay()
        localStorage.removeItem('current_user')
        return { success: true }
    }

    // Provider endpoints
    async getProviderDashboard() {
        await this.delay()
        const userId = this.getCurrentUserId()
        const providerMedia = this.mockMedia.filter(m => m.providerId === userId)

        // Calculate statistics
        const totalRevenue = this.mockCampaigns
            .filter(c => c.status === 'paid' || c.status === 'active')
            .reduce((total, campaign) => {
                const providerItems = campaign.mediaItems.filter(item =>
                    providerMedia.some(m => m.id === item.mediaId)
                )
                return total + providerItems.reduce((sum, item) => {
                    const days = Math.ceil((new Date(item.endDate) - new Date(item.startDate)) / (1000 * 60 * 60 * 24))
                    return sum + (item.dailyPrice * days)
                }, 0)
            }, 0)

        return {
            data: {
                totalMedia: providerMedia.length,
                activeMedia: providerMedia.filter(m => !m.isBlocked).length,
                totalRevenue,
                monthlyRevenue: totalRevenue * 0.3, // Simulate monthly portion
                occupancyRate: 75,
                totalImpressions: providerMedia.reduce((sum, m) => sum + m.impressions, 0),
                recentCampaigns: this.mockCampaigns.slice(0, 5),
                upcomingPayouts: [
                    { id: 1, amount: 15000, date: '2025-09-15', status: 'pending' },
                    { id: 2, amount: 22000, date: '2025-10-15', status: 'pending' }
                ]
            }
        }
    }

    async getProviderPayouts() {
        await this.delay()
        return {
            data: [
                { id: 1, amount: 15000, date: '2025-08-15', status: 'completed', campaignId: 1 },
                { id: 2, amount: 12000, date: '2025-07-15', status: 'completed', campaignId: 2 },
                { id: 3, amount: 18000, date: '2025-06-15', status: 'completed', campaignId: 3 }
            ]
        }
    }

    // Admin endpoints
    async getAdminDashboard() {
        await this.delay()
        const totalRevenue = this.mockCampaigns.reduce((sum, c) => sum + c.totalAmount, 0)
        const commission = totalRevenue * 0.1 // 10% commission

        return {
            data: {
                totalUsers: this.mockUsers.length,
                totalMedia: this.mockMedia.length,
                totalCampaigns: this.mockCampaigns.length,
                totalRevenue,
                commission,
                monthlyGrowth: 15.5,
                occupancyRate: 68,
                topProviders: [
                    { id: 1, name: 'MediaMax Solutions', revenue: 45000 },
                    { id: 2, name: 'Digital Media Pro', revenue: 38000 }
                ],
                recentActivity: [
                    { type: 'campaign', message: 'Nueva campaña creada', date: '2025-08-25' },
                    { type: 'media', message: 'Nuevo medio agregado', date: '2025-08-24' },
                    { type: 'payment', message: 'Pago procesado', date: '2025-08-23' }
                ]
            }
        }
    }

    async moderateMedia(id, action) {
        await this.delay()
        const index = this.mockMedia.findIndex(m => m.id === parseInt(id))
        if (index === -1) {
            throw new Error('Media not found')
        }

        if (action === 'approve') {
            this.mockMedia[index].status = 'approved'
        } else if (action === 'reject') {
            this.mockMedia[index].status = 'rejected'
        }

        return { data: this.mockMedia[index] }
    }

    // Helper methods
    getCurrentUser() {
        const userStr = localStorage.getItem('current_user')
        return userStr ? JSON.parse(userStr) : null
    }

    getCurrentUserId() {
        const user = this.getCurrentUser()
        return user ? user.id : null
    }
}

export default new ApiService()
