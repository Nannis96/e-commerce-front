import { ref, onMounted, onUnmounted } from 'vue'

export function useModal() {
    const isOpen = ref(false)

    function open() {
        isOpen.value = true
        document.body.style.overflow = 'hidden'
    }

    function close() {
        isOpen.value = false
        document.body.style.overflow = 'auto'
    }

    function toggle() {
        if (isOpen.value) {
            close()
        } else {
            open()
        }
    }

    // Handle ESC key
    function handleEscape(event) {
        if (event.key === 'Escape' && isOpen.value) {
            close()
        }
    }

    onMounted(() => {
        document.addEventListener('keydown', handleEscape)
    })

    onUnmounted(() => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = 'auto'
    })

    return {
        isOpen,
        open,
        close,
        toggle
    }
}
