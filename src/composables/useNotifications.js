import { ref } from 'vue'

export function useNotifications() {
    const notifications = ref([])

    function addNotification(notification) {
        const id = Date.now()
        const newNotification = {
            id,
            type: 'info', // info, success, warning, error
            title: '',
            message: '',
            duration: 5000,
            ...notification
        }

        notifications.value.push(newNotification)

        if (newNotification.duration > 0) {
            setTimeout(() => {
                removeNotification(id)
            }, newNotification.duration)
        }

        return id
    }

    function removeNotification(id) {
        const index = notifications.value.findIndex(n => n.id === id)
        if (index !== -1) {
            notifications.value.splice(index, 1)
        }
    }

    function success(title, message, duration = 5000) {
        return addNotification({
            type: 'success',
            title,
            message,
            duration
        })
    }

    function error(title, message, duration = 8000) {
        return addNotification({
            type: 'error',
            title,
            message,
            duration
        })
    }

    function warning(title, message, duration = 6000) {
        return addNotification({
            type: 'warning',
            title,
            message,
            duration
        })
    }

    function info(title, message, duration = 5000) {
        return addNotification({
            type: 'info',
            title,
            message,
            duration
        })
    }

    function clear() {
        notifications.value = []
    }

    return {
        notifications,
        addNotification,
        removeNotification,
        success,
        error,
        warning,
        info,
        clear
    }
}
