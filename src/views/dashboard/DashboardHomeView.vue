<template>
  <div class="dashboard-home">
    <h1>Tableau de Bord</h1>

    <!-- Statistiques -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-calendar-check"></i>
        </div>
        <div class="stat-content">
          <h3>Congés Restants</h3>
          <p class="stat-value">{{ stats.congesRestants }} jours</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-clock"></i>
        </div>
        <div class="stat-content">
          <h3>Demandes en Cours</h3>
          <p class="stat-value">{{ stats.demandesEnCours }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="stat-content">
          <h3>Demandes Approuvées</h3>
          <p class="stat-value">{{ stats.demandesApprouvees }}</p>
        </div>
      </div>
    </div>

    <!-- Prochains congés -->
    <div class="section">
      <h2>Prochains Congés</h2>
      <div class="conges-list">
        <div
          v-for="conge in prochainsConges"
          :key="conge.id"
          class="conge-item"
        >
          <div class="conge-info">
            <div class="conge-dates">
              {{ formatDate(conge.dateDebut) }} -
              {{ formatDate(conge.dateFin) }}
            </div>
            <div class="conge-type">
              <span :class="['badge', getTypeClass(conge.type)]">
                {{ conge.type }}
              </span>
            </div>
          </div>
          <div class="conge-status">
            <span :class="['status', getStatusClass(conge.statut)]">
              {{ conge.statut }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions rapides -->
    <div class="section">
      <h2>Actions Rapides</h2>
      <div class="actions-grid">
        <router-link to="/employe/gestion-demandes" class="action-btn">
          <i class="fas fa-plus"></i>
          Nouvelle Demande
        </router-link>
        <router-link to="/employe/historique" class="action-btn">
          <i class="fas fa-history"></i>
          Historique
        </router-link>
        <router-link to="/employe/solde" class="action-btn">
          <i class="fas fa-calculator"></i>
          Solde
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useCongesStore } from "@/stores/conges";

export default {
  name: "DashboardHomeView",
  setup() {
    const congesStore = useCongesStore();
    return { congesStore };
  },
  computed: {
    stats() {
      return this.congesStore.stats;
    },
    prochainsConges() {
      return this.congesStore.prochainsConges;
    },
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("fr-FR");
    },
    getTypeClass(type) {
      const classes = {
        "Congés Annuels": "badge-primary",
        "Congés Maladie": "badge-warning",
        Récupération: "badge-info",
      };
      return classes[type] || "badge-secondary";
    },
    getStatusClass(statut) {
      const classes = {
        "En attente": "status-warning",
        Approuvé: "status-success",
        Refusé: "status-error",
      };
      return classes[statut] || "status-secondary";
    },
    navigateTo(route) {
      this.$router.push({ name: route });
    },
  },
};
</script>

<style scoped>
.dashboard-home {
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 600;
  position: relative;
}

h1:after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #008a9b, #00b4d8);
  border-radius: 2px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #008a9b, #00b4d8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.stat-content {
  flex: 1;
}

.stat-content h3 {
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
}

.stat-value {
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.section {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.section h2 {
  color: #2c3e50;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
}

.conges-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.conge-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  background: #f8fafc;
}

.conge-info {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.conge-dates {
  color: #2c3e50;
  font-weight: 500;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.badge-primary {
  background: #e6f7ff;
  color: #008a9b;
}

.badge-warning {
  background: #fff7e6;
  color: #d97706;
}

.badge-info {
  background: #e6f7ff;
  color: #0284c7;
}

.badge-secondary {
  background: #f1f5f9;
  color: #64748b;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.status-success {
  background: #f0fdf4;
  color: #16a34a;
}

.status-warning {
  background: #fff7e6;
  color: #d97706;
}

.status-error {
  background: #fef2f2;
  color: #dc2626;
}

.status-secondary {
  background: #f1f5f9;
  color: #64748b;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #2c3e50;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: #f8fafc;
  border-color: #008a9b;
  color: #008a9b;
}

.action-btn i {
  font-size: 1.25rem;
}

@media (max-width: 768px) {
  .dashboard-home {
    padding: 1rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-card {
    padding: 1rem;
  }

  .stat-icon {
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
  }

  .stat-value {
    font-size: 1.25rem;
  }

  .section {
    padding: 1rem;
  }

  .conge-info {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .actions-grid {
    grid-template-columns: 1fr;
  }
}
</style>
