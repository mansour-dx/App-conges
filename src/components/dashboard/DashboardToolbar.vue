<template>
  <v-card height="64" flat class="dashboard-toolbar-card">
    <v-toolbar class="text-white dashboard-toolbar" :style="toolbarStyle">
      <v-btn icon="mdi-menu" @click="$emit('toggle-sidebar')"></v-btn>
      <v-toolbar-title class="text-center">{{ pageTitle }}</v-toolbar-title>
      <div class="toolbar-actions">
        <v-menu offset-y transition="fab-transition">
          <template #activator="{ props }">
            <v-btn icon v-bind="props">
              <v-badge :content="notificationCount" color="#dc2626" overlap>
                <v-icon>mdi-bell</v-icon>
              </v-badge>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(notif, i) in notifications" :key="i">
              <v-list-item-title>{{ notif.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ notif.subtitle }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item v-if="notifications.length === 0">
              <v-list-item-title>Aucune notification</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn icon @click="logout" class="logout-btn-toolbar">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  name: "DashboardToolbar",
  props: {
    pageTitle: {
      type: String,
      default: "Tableau de bord",
    },
    notificationCount: {
      type: Number,
      default: 3,
    },
    notifications: {
      type: Array,
      default: () => [
        {
          title: "Nouvelle demande",
          subtitle: "Une nouvelle demande de congé a été soumise.",
        },
        { title: "Validation", subtitle: "Votre demande a été validée." },
        {
          title: "Rappel",
          subtitle: "N'oubliez pas de planifier vos congés annuels.",
        },
      ],
    },
  },
  emits: ["toggle-sidebar"],
  computed: {
    toolbarStyle() {
      return {
        background: "linear-gradient(90deg, #008a9b 0%, #261555 100%)",
        height: "64px",
      };
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.dashboard-toolbar-card {
  border-radius: 0;
  box-shadow: none;
}
.dashboard-toolbar {
  min-height: 64px;
  padding-left: 8px;
  padding-right: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.toolbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.logout-btn-toolbar {
  color: #fff;
}
.v-toolbar-title {
  flex: 1;
  text-align: center;
  font-weight: 600;
  font-size: 20px;
}
</style>
