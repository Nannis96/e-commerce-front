// Sample data for development and testing
export const sampleMedia = [
    {
        id: '1',
        name: 'Times Square Digital Billboard',
        type: 'digital-screen',
        location: 'Times Square, New York, NY',
        dimensions: '20m x 15m',
        size: 'extra-large',
        dailyPrice: 5000,
        dailyViews: 250000,
        rating: 4.9,
        reviewCount: 127,
        featured: true,
        description: 'Premium digital billboard in the heart of Times Square with maximum visibility and foot traffic.',
        images: [
            'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?w=800&h=600&fit=crop'
        ],
        availability: ['2024-02-01', '2024-02-02', '2024-02-03', '2024-02-05', '2024-02-06']
    },
    {
        id: '2',
        name: 'Hollywood Boulevard LED Screen',
        type: 'digital-screen',
        location: 'Hollywood Boulevard, Los Angeles, CA',
        dimensions: '15m x 10m',
        size: 'large',
        dailyPrice: 3500,
        dailyViews: 180000,
        rating: 4.7,
        reviewCount: 89,
        featured: false,
        description: 'High-resolution LED screen on the famous Hollywood Boulevard with excellent tourist exposure.',
        images: [
            'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop'
        ],
        availability: ['2024-02-01', '2024-02-02', '2024-02-04', '2024-02-05', '2024-02-06']
    },
    {
        id: '3',
        name: 'Central Station Metro Display',
        type: 'metro',
        location: 'Central Station, Chicago, IL',
        dimensions: '5m x 3m',
        size: 'medium',
        dailyPrice: 1200,
        dailyViews: 75000,
        rating: 4.5,
        reviewCount: 156,
        featured: false,
        description: 'Strategic metro station display with high commuter traffic during peak hours.',
        images: [
            'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
        ],
        availability: ['2024-02-01', '2024-02-03', '2024-02-04', '2024-02-05', '2024-02-07']
    },
    {
        id: '4',
        name: 'Airport Terminal A Digital Wall',
        type: 'airport',
        location: 'LAX Terminal A, Los Angeles, CA',
        dimensions: '25m x 4m',
        size: 'extra-large',
        dailyPrice: 4200,
        dailyViews: 120000,
        rating: 4.8,
        reviewCount: 234,
        featured: true,
        description: 'Large digital wall display in busy airport terminal with international passenger exposure.',
        images: [
            'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&h=600&fit=crop'
        ],
        availability: ['2024-02-02', '2024-02-03', '2024-02-04', '2024-02-06', '2024-02-07']
    },
    {
        id: '5',
        name: 'Downtown Bus Stop Display',
        type: 'bus-stop',
        location: 'Downtown Financial District, San Francisco, CA',
        dimensions: '2m x 1.5m',
        size: 'small',
        dailyPrice: 800,
        dailyViews: 25000,
        rating: 4.3,
        reviewCount: 67,
        featured: false,
        description: 'Prime bus stop location in the financial district with professional audience.',
        images: [
            'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop'
        ],
        availability: ['2024-02-01', '2024-02-02', '2024-02-03', '2024-02-04', '2024-02-05']
    },
    {
        id: '6',
        name: 'Shopping Mall Entrance Screen',
        type: 'mall',
        location: 'Beverly Center, Beverly Hills, CA',
        dimensions: '8m x 6m',
        size: 'large',
        dailyPrice: 2800,
        dailyViews: 95000,
        rating: 4.6,
        reviewCount: 198,
        featured: false,
        description: 'High-traffic mall entrance display with affluent shopper demographic.',
        images: [
            'https://images.unsplash.com/photo-1555529902-a6fa1d3e6cef?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop'
        ],
        availability: ['2024-02-01', '2024-02-03', '2024-02-05', '2024-02-06', '2024-02-07']
    }
]

export const sampleCampaigns = [
    {
        id: 'c1',
        name: 'Summer Fashion Campaign',
        description: 'Promoting our new summer collection across premium locations',
        status: 'active',
        startDate: '2024-01-15',
        endDate: '2024-02-15',
        totalBudget: 75000,
        totalSpent: 45000,
        mediaSpaces: ['1', '4', '6'],
        targetAudience: 'Adults 18-35',
        objectives: ['brand-awareness', 'sales']
    },
    {
        id: 'c2',
        name: 'Tech Product Launch',
        description: 'Launch campaign for our revolutionary new smartphone',
        status: 'requested',
        startDate: '2024-02-01',
        endDate: '2024-03-15',
        totalBudget: 120000,
        totalSpent: 0,
        mediaSpaces: ['1', '2', '3', '4'],
        targetAudience: 'Tech enthusiasts 25-45',
        objectives: ['product-launch', 'brand-awareness', 'website-traffic']
    }
]

export const sampleUsers = [
    {
        id: 'u1',
        email: 'client@example.com',
        name: 'John Smith',
        role: 'client',
        company: 'Fashion Forward Inc.',
        phone: '+1-555-0123'
    },
    {
        id: 'u2',
        email: 'provider@example.com',
        name: 'Sarah Johnson',
        role: 'provider',
        company: 'Prime Media Spaces',
        phone: '+1-555-0456'
    },
    {
        id: 'u3',
        email: 'admin@example.com',
        name: 'Mike Wilson',
        role: 'admin',
        company: 'MediaSpace Platform',
        phone: '+1-555-0789'
    }
]
