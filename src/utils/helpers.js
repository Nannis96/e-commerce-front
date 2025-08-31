export function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(amount)
}

export function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K'
    }
    return num.toLocaleString()
}

export function formatDate(date, options = {}) {
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }

    return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(
        new Date(date)
    )
}

export function formatRelativeTime(date) {
    const now = new Date()
    const targetDate = new Date(date)
    const diffInSeconds = (now - targetDate) / 1000

    const timeUnits = [
        { unit: 'year', seconds: 31536000 },
        { unit: 'month', seconds: 2592000 },
        { unit: 'week', seconds: 604800 },
        { unit: 'day', seconds: 86400 },
        { unit: 'hour', seconds: 3600 },
        { unit: 'minute', seconds: 60 },
    ]

    for (const { unit, seconds } of timeUnits) {
        const interval = Math.floor(Math.abs(diffInSeconds) / seconds)
        if (interval >= 1) {
            const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
            return rtf.format(diffInSeconds < 0 ? interval : -interval, unit)
        }
    }

    return 'just now'
}

export function calculateDaysBetween(startDate, endDate) {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end - start)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function generateId() {
    return Math.random().toString(36).substr(2, 9)
}

export function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

export function throttle(func, limit) {
    let inThrottle
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args)
            inThrottle = true
            setTimeout(() => inThrottle = false, limit)
        }
    }
}

export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

export function validatePhoneNumber(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
    return phoneRegex.test(phone)
}

export function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
}
