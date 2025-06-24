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
            <h3>{{ isDirecteurRH ? 'Demandes à Valider' : 'Congés Restants' }}</h3>
            <p class="stat-value">{{ isDirecteurRH ? stats.demandesAValider : stats.congesRestants }} {{ isDirecteurRH ? '' : 'jours' }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-clock"></i>
          </div>
          <div class="stat-content">
            <h3>{{ isDirecteurRH ? 'Documents à Générer' : 'Demandes en Cours' }}</h3>
            <p class="stat-value">{{ isDirecteurRH ? stats.documentsAGenerer : stats.demandesEnCours }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="stat-content">
            <h3>{{ isDirecteurRH ? 'Documents Générés' : 'Demandes Approuvées' }}</h3>
            <p class="stat-value">{{ isDirecteurRH ? stats.documentsGeneres : stats.demandesApprouvees }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Prochains congés -->
    <div class="section">
      <div class="section-header">
        <h2>Prochains Congés</h2>
        <router-link :to="`${routePrefix}/historique`" class="view-all-link">
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
        <router-link :to="`${routePrefix}/gestion-demandes`" class="action-card">
          <div class="action-icon">
            <i class="fas fa-plus"></i>
          </div>
          <div class="action-content">
            <h3>Nouvelle Demande</h3>
            <p>Créer une demande de congés</p>
          </div>
        </router-link>

        <router-link :to="`${routePrefix}/validation-demandes`" class="action-card" v-if="isValidationRole">
          <div class="action-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="action-content">
            <h3>Validation</h3>
            <p>Valider les demandes</p>
          </div>
        </router-link>

        <router-link :to="`${routePrefix}/documents-administratifs`" class="action-card" v-if="isDirecteurRH">
          <div class="action-icon">
            <i class="fas fa-file-contract"></i>
          </div>
          <div class="action-content">
            <h3>Documents Administratifs</h3>
            <p>Gérer les documents</p>
          </div>
        </router-link>

        <router-link :to="`${routePrefix}/historique`" class="action-card">
          <div class="action-icon">
            <i class="fas fa-history"></i>
          </div>
          <div class="action-content">
            <h3>Historique</h3>
            <p>Consulter l'historique des congés</p>
          </div>
        </router-link>

        <router-link :to="`${routePrefix}/solde`" class="action-card">
          <div class="action-icon">
            <i class="fas fa-calculator"></i>
          </div>
          <div class="action-content">
            <h3>Solde</h3>
            <p>Voir le solde de congés</p>
          </div>
        </router-link>

        <router-link :to="`${routePrefix}/etat-demandes`" class="action-card">
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
import { useDemandesStore } from "@/stores/demandes";

export default {
  name: "DashboardHomeView",
  setup() {
    const congesStore = useCongesStore();
    const demandesStore = useDemandesStore();
    return { congesStore, demandesStore };
  },
  computed: {
    stats() {
      if (this.isDirecteurRH) {
        return {
          demandesAValider: this.demandesStore.demandesEnAttenteDRH.length,
          documentsAGenerer: this.demandesStore.demandesValideesDRH.length,
          documentsGeneres: this.demandesStore.demandesValideesDRH.filter(d => d.documentGenere).length,
        };
      }
      return this.congesStore.stats;
    },
    prochainsConges() {
      return this.congesStore.prochainsConges;
    },
    routePrefix() {
      const path = this.$route.path;
      if (path.startsWith('/superieur')) return '/superieur';
      if (path.startsWith('/directeur-unite')) return '/directeur-unite';
      if (path.startsWith('/responsable-rh')) return '/responsable-rh';
      if (path.startsWith('/directeur-rh')) return '/directeur-rh';
      return '/employe';
    },
    isValidationRole() {
      const path = this.$route.path;
      return path.startsWith('/superieur') || 
             path.startsWith('/directeur-unite') || 
             path.startsWith('/responsable-rh') ||
             path.startsWith('/directeur-rh');
    },
    isDirecteurRH() {
      return this.$route.path.startsWith('/directeur-rh');
    }
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
      };
      return classes[type] || "badge-default";
    },
    getStatusClass(status) {
      const classes = {
        "En attente": "status-pending",
        "Approuvé": "status-approved",
        "Rejeté": "status-rejected",
      };
      return classes[status] || "status-default";
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
  color: #64748b;
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
  margin-bottom: 1.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-color: #008a9b;
}

.stat-icon {
  width: 60px;
  height: 60px;
  background: #f0f9ff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon i {
  font-size: 24px;
  color: #008a9b;
}

.stat-content {
  flex: 1;
}

.stat-content h3 {
  color: #261555;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.stat-value {
  color: #008a9b;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

/* Section */
.section {
  margin-bottom: 3rem;
}

.section h2 {
  color: #261555;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.view-all-link {
  color: #008a9b;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
}

.view-all-link:hover {
  color: #005f6b;
}

/* Liste des congés */
.conges-list {
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.conge-item {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
}

.conge-item:last-child {
  border-bottom: none;
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
  color: #64748b;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.badge-annuel {
  background: #e0f2fe;
  color: #0369a1;
}

.badge-fractionnes {
  background: #fef3c7;
  color: #92400e;
}

.badge-autres_legaux {
  background: #f3e8ff;
  color: #6b21a8;
}

.badge-maladie {
  background: #fee2e2;
  color: #991b1b;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-pending {
  background: #fef3c7;
  color: #92400e;
}

.status-approved {
  background: #dcfce7;
  color: #166534;
}

.status-rejected {
  background: #fee2e2;
  color: #991b1b;
}

.empty-state {
  padding: 3rem;
  text-align: center;
  color: #64748b;
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
}

/* Actions rapides */
.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.action-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  text-decoration: none;
  position: relative;
}

.action-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-color: #008a9b;
}

.action-icon {
  width: 60px;
  height: 60px;
  background: #f0f9ff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.action-icon i {
  font-size: 24px;
  color: #008a9b;
}

.action-content {
  flex: 1;
}

.action-content h3 {
  color: #261555;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.action-content p {
  color: #64748b;
  font-size: 0.95rem;
  margin: 0;
  line-height: 1.5;
}

/* Ajout de la flèche à droite comme dans GestionDemandesView */
.action-card::after {
  content: "\f054";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  color: #008a9b;
  font-size: 1.25rem;
  opacity: 0;
  transition: all 0.3s ease;
  position: absolute;
  right: 2rem;
}

.action-card:hover::after {
  opacity: 1;
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .dashboard-home {
    padding: 1rem;
  }

  .dashboard-header {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .dashboard-header h1 {
    font-size: 2rem;
  }

  .stats-grid,
  .actions-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .stat-card,
  .action-card {
    padding: 1.5rem;
  }

  .conge-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .conge-status {
    align-self: flex-start;
  }
}
</style>
