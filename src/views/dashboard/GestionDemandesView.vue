<template>
  <div class="gestion-demandes">
    <h1>Gestion des Demandes</h1>
    <div class="cards-container">
      <!-- Carte pour les congés annuels -->
      <div class="demand-card" @click="navigateToComponent('planification')">
        <div class="card-icon">
          <i class="fas fa-calendar-alt"></i>
        </div>
        <div class="card-content">
          <h3>Congés Annuels</h3>
          <p>
            Planifiez vos congés annuels et consultez votre solde disponible
          </p>
        </div>
        <div class="card-arrow">
          <i class="fas fa-chevron-right"></i>
        </div>
      </div>

      <!-- Carte pour les reports de congés -->
      <div class="demand-card" @click="navigateToComponent('report')">
        <div class="card-icon">
          <i class="fas fa-clock"></i>
        </div>
        <div class="card-content">
          <h3>Report de Congés</h3>
          <p>Demandez le report de vos jours de congés non utilisés</p>
        </div>
        <div class="card-arrow">
          <i class="fas fa-chevron-right"></i>
        </div>
      </div>

      <!-- Carte pour les récupérations -->
      <div class="demand-card" @click="navigateToComponent('recuperation')">
        <div class="card-icon">
          <i class="fas fa-sync-alt"></i>
        </div>
        <div class="card-content">
          <h3>Récupération</h3>
          <p>Demandez la récupération des heures supplémentaires</p>
        </div>
        <div class="card-arrow">
          <i class="fas fa-chevron-right"></i>
        </div>
      </div>

      <!-- Carte pour les absences -->
      <div class="demand-card" @click="navigateToComponent('absence')">
        <div class="card-icon">
          <i class="fas fa-user-clock"></i>
        </div>
        <div class="card-content">
          <h3>Demande d'Absence</h3>
          <p>Déclarez une absence exceptionnelle ou une permission</p>
        </div>
        <div class="card-arrow">
          <i class="fas fa-chevron-right"></i>
        </div>
      </div>
    </div>

    <!-- Composant dynamique pour afficher le formulaire sélectionné -->
    <component
      v-if="selectedComponent"
      :is="selectedComponent"
      @close="selectedComponent = null"
    />
  </div>
</template>

<script>
import PlanificationConges from "@/components/dashboard/PlanificationConges.vue";
import DemandeReport from "@/components/dashboard/DemandeReport.vue";
import DemandeRecuperation from "@/components/dashboard/DemandeRecuperation.vue";
import DemandeAbsence from "@/components/dashboard/DemandeAbsence.vue";

export default {
  name: "GestionDemandesView",
  components: {
    PlanificationConges,
    DemandeReport,
    DemandeRecuperation,
    DemandeAbsence,
  },
  data() {
    return {
      selectedComponent: null,
    };
  },
  created() {
    // Si on vient du dashboard, afficher directement le formulaire de planification
    if (this.$route.query.from === "dashboard") {
      this.selectedComponent = "PlanificationConges";
    }
  },
  methods: {
    navigateToComponent(type) {
      switch (type) {
        case "planification":
          this.selectedComponent = "PlanificationConges";
          break;
        case "report":
          this.selectedComponent = "DemandeReport";
          break;
        case "recuperation":
          this.selectedComponent = "DemandeRecuperation";
          break;
        case "absence":
          this.selectedComponent = "DemandeAbsence";
          break;
      }
    },
  },
};
</script>

<style scoped>
.gestion-demandes {
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

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.demand-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.demand-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.demand-card:hover .card-arrow {
  right: 1.5rem;
  opacity: 1;
}

.card-icon {
  background: linear-gradient(135deg, #008a9b, #00b4d8);
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-icon i {
  color: white;
  font-size: 1.5rem;
}

.card-content {
  flex-grow: 1;
}

.card-content h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
}

.card-content p {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0;
}

.card-arrow {
  position: absolute;
  right: -2rem;
  opacity: 0;
  transition: all 0.3s ease;
  color: #008a9b;
}

@media (max-width: 768px) {
  .gestion-demandes {
    padding: 1rem;
  }

  .cards-container {
    grid-template-columns: 1fr;
  }

  .demand-card {
    padding: 1rem;
  }
}
</style>
