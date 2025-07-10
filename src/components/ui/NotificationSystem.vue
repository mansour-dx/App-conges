<template>
  <div class="notification-system">
    <!-- Toast Notifications -->
    <v-snackbar
      v-for="notification in notifications"
      :key="notification.id"
      v-model="notification.show"
      :color="getColorForType(notification.type)"
      :timeout="notification.timeout"
      location="top right"
      multi-line
      elevation="2"
      class="custom-snackbar"
      transition="none"
    >
      <div class="notification-content">
        <div class="notification-header">
          <v-icon 
            :color="getIconColor(notification.type)" 
            size="20"
            class="notification-icon"
          >
            {{ getIconForType(notification.type) }}
          </v-icon>
          <span class="notification-title">{{ notification.title }}</span>
        </div>
        <div class="notification-message">
          {{ notification.message }}
        </div>
      </div>
      
      <template v-slot:actions>
        <v-btn
          variant="text"
          size="small"
          icon
          @click="removeToast(notification.id)"
          class="notification-close"
        >
          <v-icon size="16">mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { useNotificationsStore } from '@/stores/notifications'

export default {
  name: 'NotificationSystem',
  setup() {
    const notificationsStore = useNotificationsStore()
    return { notificationsStore }
  },
  computed: {
    notifications() {
      return this.notificationsStore.notifications.map((notification, index) => ({
        ...notification,
        show: true
      }))
    }
  },
  methods: {
    removeToast(id) {
      this.notificationsStore.removeToast(id)
    },
    
    getColorForType(type) {
      const colors = {
        success: 'success',
        error: 'error',
        warning: 'warning',
        info: 'info'
      }
      return colors[type] || 'info'
    },
    
    getIconForType(type) {
      const icons = {
        success: 'mdi-check-circle',
        error: 'mdi-alert-circle',
        warning: 'mdi-alert',
        info: 'mdi-information'
      }
      return icons[type] || 'mdi-information'
    },
    
    getIconColor(type) {
      const colors = {
        success: 'white',
        error: 'white',
        warning: 'white',
        info: 'white'
      }
      return colors[type] || 'white'
    },
    
    getTopOffset(notificationId) {
      const index = this.notifications.findIndex(n => n.id === notificationId)
      return index * 80 // Espacement entre les notifications
    }
  }
}
</script>

<style scoped>
.notification-system {
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 9999;
  pointer-events: none;
}

.custom-snackbar {
  pointer-events: auto;
  margin-bottom: 10px !important;
}

.notification-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.notification-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.notification-icon {
  flex-shrink: 0;
}

.notification-title {
  font-weight: 600;
  font-size: 14px;
  color: white;
}

.notification-message {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.4;
  margin-left: 28px;
}

.notification-close {
  color: rgba(255, 255, 255, 0.8) !important;
}

.notification-close:hover {
  color: white !important;
}

/* Animation désactivée pour un affichage instantané */
.v-snackbar {
  transition: none !important;
}

.v-snackbar .v-snackbar__wrapper {
  transition: none !important;
}

.v-snackbar .v-snackbar__content {
  transition: none !important;
}

/* Responsive */
@media (max-width: 768px) {
  .notification-system {
    left: 10px;
    right: 10px;
    top: 70px;
  }
  
  .notification-message {
    margin-left: 24px;
  }
}
</style>
