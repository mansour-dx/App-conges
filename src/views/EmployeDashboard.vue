<template>
  <div class="employe-dashboard">
    <SidebarEmploye />

    <div class="dashboard-content">
      <Header :pageTitle="currentPageTitle" />

      <div class="content-container">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarEmploye from "@/components/dashboard/SidebarEmploye.vue";
import Header from "@/components/dashboard/Header.vue";

export default {
  name: "EmployeDashboard",
  components: {
    SidebarEmploye,
    Header,
  },
  computed: {
    currentPageTitle() {
      // Obtenir le titre en fonction de la route actuelle
      const routePath = this.$route.path;

      if (routePath.includes("/planification"))
        return "Planification des congés";
      if (routePath.includes("/etat-demandes")) return "État des demandes";
      if (routePath.includes("/solde")) return "Solde de congés";
      if (routePath.includes("/historique")) return "Historique des congés";
      if (routePath.includes("/settings")) return "Paramètres";

      return "Tableau de bord"; // Par défaut
    },
  },
};
</script>

<style scoped>
.employe-dashboard {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
  position: relative;
  overflow: hidden;
}

.employe-dashboard::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(0, 138, 155, 0.05) 0%,
    transparent 50%
  );
  animation: gradientMove 15s linear infinite;
  z-index: 0;
}

@keyframes gradientMove {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-30px, 20px);
  }
  100% {
    transform: translate(0, 0);
  }
}

.dashboard-content {
  flex: 1;
  padding: 25px;
  margin-left: 250px; /* Correspond à la largeur du sidebar */
  position: relative;
  z-index: 1;
}

.content-container {
  padding: 15px;
  position: relative;
  backdrop-filter: blur(10px);
  border-radius: 15px;
}

/* Transitions pour le router-view */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Media Queries */
@media (max-width: 1024px) {
  .dashboard-content {
    margin-left: 200px;
    padding: 20px;
  }
}

@media (max-width: 768px) {
  .dashboard-content {
    margin-left: 0;
    padding: 15px;
  }

  .content-container {
    padding: 10px;
  }

  /* Ces styles nécessiteraient un menu burger sur mobile */
  /* qui affiche/masque le sidebar */
}
</style>
