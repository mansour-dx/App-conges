<template>
  <div class="dashboard-home">
    <!-- En-tête du dashboard -->
    <div class="dashboard-header">
      <h1>Tableau de Bord</h1>
      <p>Bienvenue sur votre espace de gestion des congés</p>
    </div>

    <!-- Statistiques principales -->
    <div class="stats-section">
      <h2>Vue d'ensemble</h2>
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
    </div>

    <!-- Prochains congés -->
    <div class="section">
      <div class="section-header">
        <h2>Prochains Congés</h2>
        <router-link to="/employe/historique" class="view-all-link">
          Voir tout <i class="fas fa-arrow-right"></i>
        </router-link>
      </div>

      <div class="conges-list">
        <div
          v-for="conge in prochainsConges"
          :key="conge.id"
          class="conge-item"
        >
          <div class="conge-info">
            <div class="conge-dates">
              <i class="fas fa-calendar"></i>
              <span
                >{{ formatDate(conge.dateDebut) }} -
                {{ formatDate(conge.dateFin) }}</span
              >
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

        <div v-if="prochainsConges.length === 0" class="empty-state">
          <i class="fas fa-calendar-times"></i>
          <p>Aucun congé planifié</p>
        </div>
      </div>
    </div>

    <!-- Actions rapides -->
    <div class="section">
      <h2>Actions Rapides</h2>
      <div class="actions-grid">
        <router-link to="/employe/gestion-demandes" class="action-card">
          <div class="action-icon">
            <i class="fas fa-plus"></i>
          </div>
          <div class="action-content">
            <h3>Nouvelle Demande</h3>
            <p>Créer une demande de congés</p>
          </div>
        </router-link>

        <router-link to="/employe/historique" class="action-card">
          <div class="action-icon">
            <i class="fas fa-history"></i>
          </div>
          <div class="action-content">
            <h3>Historique</h3>
            <p>Consulter l'historique des congés</p>
          </div>
        </router-link>

        <router-link to="/employe/solde" class="action-card">
          <div class="action-icon">
            <i class="fas fa-calculator"></i>
          </div>
          <div class="action-content">
            <h3>Solde</h3>
            <p>Voir le solde de congés</p>
          </div>
        </router-link>

        <router-link to="/employe/etat-demandes" class="action-card">
          <div class="action-icon">
            <i class="fas fa-list-alt"></i>
          </div>
          <div class="action-content">
            <h3>État des Demandes</h3>
            <p>Suivre vos demandes en cours</p>
          </div>
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
        "Congé annuel": "badge-annuel",
        "Congés fractionnés": "badge-fractionnes",
        "Autres congés légaux": "badge-autres_legaux",
        "Congés Annuels": "badge-annuel",
        "Congés Maladie": "badge-maladie",
        Récupération: "badge-recup",
      };
      return classes[type] || "badge-default";
    },
    getStatusClass(statut) {
      const classes = {
        "En attente": "status-pending",
        en_attente: "status-pending",
        Approuvé: "status-approved",
        approuve: "status-approved",
        Refusé: "status-rejected",
        rejete: "status-rejected",
      };
      return classes[statut] || "status-default";
    },
  },
};
</script>

<style scoped>
.dashboard-home {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: "Inter", sans-serif;
}

/* En-tête du dashboard */
.dashboard-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 16px;
  border-left: 4px solid #008a9b;
}

.dashboard-header h1 {
  color: #261555;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.dashboard-header p {
  color: #6c757d;
  font-size: 1.1rem;
  margin: 0;
}

/* Section des statistiques */
.stats-section {
  margin-bottom: 3rem;
}

.stats-section h2 {
  color: #261555;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.stat-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #008a9b 0%, #b10064 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon i {
  color: white;
  font-size: 20px;
}

.stat-content h3 {
  color: #6c757d;
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  color: #261555;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
}

/* Sections générales */
.section {
  margin-bottom: 3rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section h2 {
  color: #261555;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.view-all-link {
  color: #008a9b;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.view-all-link:hover {
  color: #b10064;
  transform: translateX(4px);
}

/* Liste des congés */
.conges-list {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
  overflow: hidden;
}

.conge-item {
  padding: 1.25rem;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
}

.conge-item:last-child {
  border-bottom: none;
}

.conge-item:hover {
  background-color: #f8fafc;
}

.conge-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.conge-dates {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #261555;
  font-weight: 500;
}

.conge-dates i {
  color: #008a9b;
  font-size: 14px;
}

/* Badges et statuts */
.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-annuel {
  background-color: rgba(0, 138, 155, 0.1);
  color: #008a9b;
}

.badge-maladie {
  background-color: rgba(177, 0, 100, 0.1);
  color: #b10064;
}

.badge-recup {
  background-color: rgba(38, 21, 85, 0.1);
  color: #261555;
}

.badge-fractionnes {
  background-color: rgba(177, 0, 100, 0.1);
  color: #b10064;
}

.badge-autres_legaux {
  background-color: rgba(38, 21, 85, 0.1);
  color: #261555;
}

.badge-default {
  background-color: #f1f5f9;
  color: #6c757d;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-pending {
  background-color: rgba(177, 0, 100, 0.1);
  color: #b10064;
}

.status-approved {
  background-color: rgba(0, 138, 155, 0.1);
  color: #008a9b;
}

.status-rejected {
  background-color: rgba(38, 21, 85, 0.1);
  color: #261555;
}

.status-default {
  background-color: #f1f5f9;
  color: #6c757d;
}

/* Actions rapides */
.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.action-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.action-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #008a9b 0%, #b10064 100%);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.action-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.action-card:hover::before {
  transform: scaleX(1);
}

.action-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #008a9b 0%, #b10064 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.action-icon i {
  color: white;
  font-size: 20px;
}

.action-content h3 {
  color: #261555;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.action-content p {
  color: #6c757d;
  font-size: 0.9rem;
  margin: 0;
}

/* État vide */
.empty-state {
  padding: 3rem 2rem;
  text-align: center;
  color: #6c757d;
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state p {
  margin: 0;
  font-size: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard-home {
    padding: 1rem;
  }

  .dashboard-header h1 {
    font-size: 2rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .actions-grid {
    grid-template-columns: 1fr;
  }

  .conge-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .dashboard-header h1 {
    font-size: 1.75rem;
  }

  .stat-card {
    padding: 1.25rem;
  }

  .action-card {
    padding: 1.25rem;
  }
}
</style>
