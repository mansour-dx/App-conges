<template>
  <div class="gestion-demandes">
    <div class="content-wrapper" :class="{ 'form-active': selectedComponent }">
      <!-- Section des cartes -->
      <div class="cards-section" v-show="!selectedComponent">
        <div class="page-header">
          <h1>Gestion des Demandes</h1>
          <p>Sélectionnez le type de demande que vous souhaitez effectuer</p>
        </div>

        <div class="cards-grid">
          <!-- Carte pour les congés annuels -->
          <div
            class="demand-card"
            @click="navigateToComponent('planification')"
          >
            <div class="card-icon">
              <i class="fas fa-umbrella-beach"></i>
            </div>
            <div class="card-content">
              <h3>Demande de Congés</h3>
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
      </div>

      <!-- Section du formulaire -->
      <div class="form-section" v-if="selectedComponent">
        <div class="form-header">
          <button class="back-btn" @click="closeForm">
            <i class="fas fa-arrow-left"></i>
            <span>Retour</span>
          </button>
          <h2>{{ getFormTitle }}</h2>
        </div>

        <div class="form-content">
          <component :is="selectedComponent" @close="closeForm" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlanificationConges from "@/components/dashboard/PlanificationConges.vue";
import DemandeReport from "@/components/dashboard/DemandeReport.vue";
import DemandeAbsence from "@/components/dashboard/DemandeAbsence.vue";

export default {
  name: "GestionDemandesView",
  components: {
    PlanificationConges,
    DemandeReport,
    DemandeAbsence,
  },
  data() {
    return {
      selectedComponent: null,
    };
  },
  created() {
    if (this.$route.query.from === "dashboard") {
      this.selectedComponent = "PlanificationConges";
    }
    this.checkUrlForForm();
  },
  watch: {
    "$route.query.form"(newForm) {
      this.checkUrlForForm();
    },
  },
  computed: {
    getFormTitle() {
      switch (this.selectedComponent) {
        case "PlanificationConges":
          return "Demande de Congés";
        case "DemandeReport":
          return "Demande de Report de Congés";
        case "DemandeAbsence":
          return "Demande d'Absence";
        default:
          return "";
      }
    },
  },
  methods: {
    navigateToComponent(type) {
      switch (type) {
        case "planification":
          this.selectedComponent = "PlanificationConges";
          this.$router.push({ query: { form: "planification" } });
          break;
        case "report":
          this.selectedComponent = "DemandeReport";
          this.$router.push({ query: { form: "report" } });
          break;
        case "absence":
          this.selectedComponent = "DemandeAbsence";
          this.$router.push({ query: { form: "absence" } });
          break;
      }
    },
    closeForm() {
      this.selectedComponent = null;
      this.$router.push({ query: {} });
    },
    checkUrlForForm() {
      const formType = this.$route.query.form;
      if (formType) {
        switch (formType) {
          case "planification":
            this.selectedComponent = "PlanificationConges";
            break;
          case "report":
            this.selectedComponent = "DemandeReport";
            break;
          case "absence":
            this.selectedComponent = "DemandeAbsence";
            break;
        }
      } else {
        this.selectedComponent = null;
      }
    },
  },
};
</script>

<style scoped>
.gestion-demandes {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 2rem;
  font-family: "Inter", sans-serif;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

/* Page Header */
.page-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 16px;
  border-left: 4px solid #008a9b;
}

.page-header h1 {
  color: #261555;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.page-header p {
  color: #6c757d;
  font-size: 1.1rem;
  margin: 0;
}

/* Cards Grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

/* Demand Card */
.demand-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.demand-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #008a9b 0%, #b10064 100%);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.demand-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.demand-card:hover::before {
  transform: scaleX(1);
}

.demand-card:hover .card-arrow {
  transform: translateX(8px);
  color: #008a9b;
}

/* Card Icon */
.card-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #008a9b 0%, #b10064 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.card-icon i {
  color: white;
  font-size: 24px;
}

/* Card Content */
.card-content h3 {
  color: #261555;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
}

.card-content p {
  color: #6c757d;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

/* Card Arrow */
.card-arrow {
  position: absolute;
  top: 2rem;
  right: 2rem;
  color: #cbd5e1;
  font-size: 1.25rem;
  transition: all 0.3s ease;
}

/* Form Section */
.form-section {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

/* Form Header */
.form-header {
  background: linear-gradient(135deg, #261555 0%, #b10064 100%);
  color: white;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.back-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.form-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

/* Form Content */
.form-content {
  padding: 2rem;
}

/* Animations */
.form-active .cards-section {
  opacity: 0;
  pointer-events: none;
  transform: translateY(-20px);
  transition: all 0.3s ease;
}

/* Responsive */
@media (max-width: 768px) {
  .gestion-demandes {
    padding: 1rem;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .cards-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .demand-card {
    padding: 1.5rem;
  }

  .form-header {
    padding: 1rem 1.5rem;
  }

  .form-content {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .page-header h1 {
    font-size: 1.75rem;
  }

  .demand-card {
    padding: 1.25rem;
  }

  .card-icon {
    width: 50px;
    height: 50px;
  }

  .card-icon i {
    font-size: 20px;
  }
}
</style>

font-size: 20px;
