import { ref, computed } from 'vue'

export function useDateRange() {
    const startDate = ref(null)
    const endDate = ref(null)

    const isValidRange = computed(() => {
        if (!startDate.value || !endDate.value) return false
        return new Date(endDate.value) > new Date(startDate.value)
    })

    const daysBetween = computed(() => {
        if (!isValidRange.value) return 0
        const start = new Date(startDate.value)
        const end = new Date(endDate.value)
        const diffTime = Math.abs(end - start)
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    })

    const isMinimumDuration = computed(() => {
        return daysBetween.value >= 30
    })

    function setRange(start, end) {
        startDate.value = start
        endDate.value = end
    }

    function clearRange() {
        startDate.value = null
        endDate.value = null
    }

    function getRange() {
        return {
            start: startDate.value,
            end: endDate.value
        }
    }

    function validateMinimumDuration() {
        if (!isMinimumDuration.value) {
            throw new Error('Campaign duration must be at least 30 days')
        }
        return true
    }

    return {
        startDate,
        endDate,
        isValidRange,
        daysBetween,
        isMinimumDuration,
        setRange,
        clearRange,
        getRange,
        validateMinimumDuration
    }
}
