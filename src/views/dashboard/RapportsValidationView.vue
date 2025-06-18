<template>
  <div class="rapports-validation">
    <div class="page-header">
      <h1>Rapports de Validation</h1>
      <p class="subtitle">Statistiques et analyses de vos validations</p>
    </div>

    <div class="stats-overview">
      <div class="stat-card">
        <div class="stat-icon total">
          <i class="fas fa-list-alt"></i>
        </div>
        <div class="stat-content">
          <h3>{{ totalDemandes }}</h3>
          <p>Total demandes</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon pending">
          <i class="fas fa-clock"></i>
        </div>
        <div class="stat-content">
          <h3>{{ demandesEnAttente }}</h3>
          <p>En attente</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon approved">
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="stat-content">
          <h3>{{ demandesApprouvees }}</h3>
          <p>Approuvées</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon rejected">
          <i class="fas fa-times-circle"></i>
        </div>
        <div class="stat-content">
          <h3>{{ demandesRejetees }}</h3>
          <p>Rejetées</p>
        </div>
      </div>
    </div>

    <div class="charts-section">
      <div class="chart-container">
        <h3>Répartition des demandes</h3>
        <div class="pie-chart">
          <div class="chart-legend">
            <div class="legend-item">
              <div class="legend-color approved"></div>
              <span>Approuvées ({{ pourcentageApprouvees }}%)</span>
            </div>
            <div class="legend-item">
              <div class="legend-color rejected"></div>
              <span>Rejetées ({{ pourcentageRejetees }}%)</span>
            </div>
            <div class="legend-item">
              <div class="legend-color pending"></div>
              <span>En attente ({{ pourcentageEnAttente }}%)</span>
            </div>
          </div>
          <div class="chart-visual">
            <div
              class="pie-slice approved"
              :style="{ transform: `rotate(${rotationApprouvees}deg)` }"
            ></div>
            <div
              class="pie-slice rejected"
              :style="{ transform: `rotate(${rotationRejetees}deg)` }"
            ></div>
            <div
              class="pie-slice pending"
              :style="{ transform: `rotate(${rotationEnAttente}deg)` }"
            ></div>
            <div class="pie-center">
              <span>{{ totalDemandes }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="chart-container">
        <h3>Évolution mensuelle</h3>
        <div class="bar-chart">
          <div class="chart-bars">
            <div
              v-for="(month, index) in evolutionMensuelle"
              :key="index"
              class="bar-group"
            >
              <div class="bar-label">{{ month.mois }}</div>
              <div class="bars">
                <div
                  class="bar approved"
                  :style="{ height: `${month.approuvees * 2}px` }"
                  :title="`${month.approuvees} approuvées`"
                ></div>
                <div
                  class="bar rejected"
                  :style="{ height: `${month.rejetees * 2}px` }"
                  :title="`${month.rejetees} rejetées`"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="details-section">
      <div class="section-header">
        <h3>Détails par type de demande</h3>
        <div class="filters">
          <select v-model="selectedPeriod" @change="filterData">
            <option value="30">30 derniers jours</option>
            <option value="90">3 derniers mois</option>
            <option value="365">12 derniers mois</option>
          </select>
        </div>
      </div>

      <div class="type-stats">
        <div
          v-for="type in statsParType"
          :key="type.nom"
          class="type-stat-card"
        >
          <div class="type-header">
            <h4>{{ type.nom }}</h4>
            <span class="type-count">{{ type.total }}</span>
          </div>
          <div class="type-bars">
            <div
              class="type-bar approved"
              :style="{ width: `${type.pourcentageApprouvees}%` }"
            >
              {{ type.approuvees }}
            </div>
            <div
              class="type-bar rejected"
              :style="{ width: `${type.pourcentageRejetees}%` }"
            >
              {{ type.rejetees }}
            </div>
          </div>
          <div class="type-percentages">
            <span class="percentage approved"
              >{{ type.pourcentageApprouvees }}% approuvées</span
            >
            <span class="percentage rejected"
              >{{ type.pourcentageRejetees }}% rejetées</span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="recent-activity">
      <h3>Activité récente</h3>
      <div class="activity-list">
        <div
          v-for="activity in activiteRecente"
          :key="activity.id"
          class="activity-item"
        >
          <div class="activity-icon" :class="getActivityClass(activity.action)">
            <i :class="getActivityIcon(activity.action)"></i>
          </div>
          <div class="activity-content">
            <p class="activity-text">
              <strong>{{ activity.employe }}</strong>
              {{ getActivityText(activity.action) }}
              <strong>{{ activity.typeDemande }}</strong>
            </p>
            <span class="activity-date">{{ formatDate(activity.date) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RapportsValidationView",
  data() {
    return {
      selectedPeriod: "30",
      evolutionMensuelle: [
        { mois: "Jan", approuvees: 8, rejetees: 2 },
        { mois: "Fév", approuvees: 12, rejetees: 1 },
        { mois: "Mar", approuvees: 15, rejetees: 3 },
        { mois: "Avr", approuvees: 10, rejetees: 2 },
        { mois: "Mai", approuvees: 18, rejetees: 4 },
        { mois: "Jun", approuvees: 14, rejetees: 1 },
      ],
      statsParType: [
        {
          nom: "Congé annuel",
          total: 45,
          approuvees: 38,
          rejetees: 7,
          pourcentageApprouvees: 84,
          pourcentageRejetees: 16,
        },
        {
          nom: "Congé maladie",
          total: 23,
          approuvees: 22,
          rejetees: 1,
          pourcentageApprouvees: 96,
          pourcentageRejetees: 4,
        },
        {
          nom: "Report de congés",
          total: 12,
          approuvees: 8,
          rejetees: 4,
          pourcentageApprouvees: 67,
          pourcentageRejetees: 33,
        },
      ],
      activiteRecente: [
        {
          id: 1,
          employe: "Fatou Sall",
          action: "approved",
          typeDemande: "Congé annuel",
          date: "2024-03-25",
        },
        {
          id: 2,
          employe: "Moussa Diallo",
          action: "rejected",
          typeDemande: "Report de congés",
          date: "2024-03-24",
        },
        {
          id: 3,
          employe: "Aissatou Ba",
          action: "approved",
          typeDemande: "Congé maladie",
          date: "2024-03-23",
        },
        {
          id: 4,
          employe: "Omar Diop",
          action: "approved",
          typeDemande: "Congé annuel",
          date: "2024-03-22",
        },
      ],
    };
  },
  computed: {
    totalDemandes() {
      return (
        this.demandesEnAttente + this.demandesApprouvees + this.demandesRejetees
      );
    },
    demandesEnAttente() {
      return 3; // À connecter avec le store
    },
    demandesApprouvees() {
      return 68; // À connecter avec le store
    },
    demandesRejetees() {
      return 12; // À connecter avec le store
    },
    pourcentageApprouvees() {
      return this.totalDemandes > 0
        ? Math.round((this.demandesApprouvees / this.totalDemandes) * 100)
        : 0;
    },
    pourcentageRejetees() {
      return this.totalDemandes > 0
        ? Math.round((this.demandesRejetees / this.totalDemandes) * 100)
        : 0;
    },
    pourcentageEnAttente() {
      return this.totalDemandes > 0
        ? Math.round((this.demandesEnAttente / this.totalDemandes) * 100)
        : 0;
    },
    rotationApprouvees() {
      return 0;
    },
    rotationRejetees() {
      return (this.pourcentageApprouvees / 100) * 360;
    },
    rotationEnAttente() {
      return (
        ((this.pourcentageApprouvees + this.pourcentageRejetees) / 100) * 360
      );
    },
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return "";
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(dateString).toLocaleDateString("fr-FR", options);
    },
    getActivityClass(action) {
      switch (action) {
        case "approved":
          return "approved";
        case "rejected":
          return "rejected";
        default:
          return "";
      }
    },
    getActivityIcon(action) {
      switch (action) {
        case "approved":
          return "fas fa-check-circle";
        case "rejected":
          return "fas fa-times-circle";
        default:
          return "fas fa-info-circle";
      }
    },
    getActivityText(action) {
      switch (action) {
        case "approved":
          return "a approuvé la demande de";
        case "rejected":
          return "a rejeté la demande de";
        default:
          return "a traité la demande de";
      }
    },
    filterData() {
      // Logique de filtrage des données selon la période
      console.log("Filtrage pour la période:", this.selectedPeriod);
    },
  },
};
</script>

<style scoped>
.rapports-validation {
  padding: 20px;
}

.page-header {
  margin-bottom: 30px;
}

.page-header h1 {
  font-size: 28px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
}

.subtitle {
  color: #7f8c8d;
  font-size: 16px;
}

.stats-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 15px;
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
}

.stat-icon.total {
  background: linear-gradient(135deg, #3498db, #2980b9);
}

.stat-icon.pending {
  background: linear-gradient(135deg, #f39c12, #e67e22);
}

.stat-icon.approved {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
}

.stat-icon.rejected {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.stat-content h3 {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: #2c3e50;
}

.stat-content p {
  margin: 0;
  color: #7f8c8d;
  font-size: 14px;
}

.charts-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 40px;
}

.chart-container {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.chart-container h3 {
  margin: 0 0 20px 0;
  color: #2c3e50;
  font-size: 18px;
}

.pie-chart {
  display: flex;
  align-items: center;
  gap: 30px;
}

.chart-legend {
  flex: 1;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.legend-color.approved {
  background: #27ae60;
}

.legend-color.rejected {
  background: #e74c3c;
}

.legend-color.pending {
  background: #f39c12;
}

.chart-visual {
  position: relative;
  width: 120px;
  height: 120px;
}

.pie-slice {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%);
}

.pie-slice.approved {
  background: #27ae60;
}

.pie-slice.rejected {
  background: #e74c3c;
}

.pie-slice.pending {
  background: #f39c12;
}

.pie-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
}

.bar-chart {
  height: 200px;
}

.chart-bars {
  display: flex;
  align-items: end;
  justify-content: space-around;
  height: 100%;
  gap: 10px;
}

.bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.bar-label {
  font-size: 12px;
  color: #7f8c8d;
  font-weight: 500;
}

.bars {
  display: flex;
  gap: 2px;
  align-items: end;
}

.bar {
  width: 20px;
  border-radius: 2px 2px 0 0;
  transition: all 0.3s ease;
}

.bar.approved {
  background: #27ae60;
}

.bar.rejected {
  background: #e74c3c;
}

.bar:hover {
  opacity: 0.8;
}

.details-section {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 18px;
}

.filters select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background: white;
}

.type-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.type-stat-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #ddd;
}

.type-stat-card:nth-child(1) {
  border-left-color: #27ae60;
}

.type-stat-card:nth-child(2) {
  border-left-color: #f39c12;
}

.type-stat-card:nth-child(3) {
  border-left-color: #3498db;
}

.type-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.type-header h4 {
  margin: 0;
  color: #2c3e50;
  font-size: 16px;
}

.type-count {
  background: #e9ecef;
  color: #495057;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.type-bars {
  display: flex;
  height: 20px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
}

.type-bar {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 11px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.type-bar.approved {
  background: #27ae60;
}

.type-bar.rejected {
  background: #e74c3c;
}

.type-percentages {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.percentage.approved {
  color: #27ae60;
}

.percentage.rejected {
  color: #e74c3c;
}

.recent-activity {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.recent-activity h3 {
  margin: 0 0 20px 0;
  color: #2c3e50;
  font-size: 18px;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.activity-item:hover {
  background: #e9ecef;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: white;
}

.activity-icon.approved {
  background: #27ae60;
}

.activity-icon.rejected {
  background: #e74c3c;
}

.activity-content {
  flex: 1;
}

.activity-text {
  margin: 0 0 5px 0;
  color: #2c3e50;
  font-size: 14px;
}

.activity-date {
  font-size: 12px;
  color: #95a5a6;
}

@media (max-width: 1024px) {
  .charts-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .stats-overview {
    grid-template-columns: repeat(2, 1fr);
  }

  .type-stats {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }

  .pie-chart {
    flex-direction: column;
    gap: 20px;
  }
}
</style>
