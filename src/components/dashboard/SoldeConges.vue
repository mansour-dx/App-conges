<template>
  <div class="solde-container">
    <!-- En-tête simple -->
    <div class="solde-header">
      <h1>Mon solde de congés</h1>
      <p>Année {{ anneeActuelle }}</p>
    </div>

    <!-- Cartes des congés -->
    <div class="conges-grid">
      <!-- Congé annuel -->
      <div class="conge-card">
        <div class="conge-title">
          <i class="fas fa-umbrella-beach"></i>
          <h3>Congé annuel</h3>
        </div>

        <div class="conge-stats">
          <div class="stat-row">
            <span>Acquis</span>
            <span class="stat-value">{{ congesAnnuel.acquis }} jours</span>
          </div>
          <div class="stat-row">
            <span>Pris</span>
            <span class="stat-value taken">{{ congesAnnuel.pris }} jours</span>
          </div>
          <div class="stat-row highlight">
            <span>Reste</span>
            <span class="stat-value">{{ congesAnnuel.reste }} jours</span>
          </div>
        </div>

        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: congesAnnuel.pourcentage + '%' }"
          ></div>
        </div>
        <div class="progress-text">{{ congesAnnuel.pourcentage }}% utilisé</div>
      </div>

      <!-- Congés fractionnés -->
      <div class="conge-card">
        <div class="conge-title">
          <i class="fas fa-calendar-week"></i>
          <h3>Congés fractionnés</h3>
        </div>

        <div class="conge-stats">
          <div class="stat-row">
            <span>Acquis</span>
            <span class="stat-value">{{ congesFractionnes.acquis }} jours</span>
          </div>
          <div class="stat-row">
            <span>Pris</span>
            <span class="stat-value taken"
              >{{ congesFractionnes.pris }} jours</span
            >
          </div>
          <div class="stat-row highlight">
            <span>Reste</span>
            <span class="stat-value">{{ congesFractionnes.reste }} jours</span>
          </div>
        </div>

        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: congesFractionnes.pourcentage + '%' }"
          ></div>
        </div>
        <div class="progress-text">
          {{ congesFractionnes.pourcentage }}% utilisé
        </div>
      </div>

      <!-- Autres congés -->
      <div class="conge-card">
        <div class="conge-title">
          <i class="fas fa-gavel"></i>
          <h3>Autres congés légaux</h3>
        </div>

        <div class="conge-stats">
          <div class="stat-row">
            <span>Acquis</span>
            <span class="stat-value">{{ autresConges.acquis }} jours</span>
          </div>
          <div class="stat-row">
            <span>Pris</span>
            <span class="stat-value taken">{{ autresConges.pris }} jours</span>
          </div>
          <div class="stat-row highlight">
            <span>Reste</span>
            <span class="stat-value">{{ autresConges.reste }} jours</span>
          </div>
        </div>

        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: autresConges.pourcentage + '%' }"
          ></div>
        </div>
        <div class="progress-text">{{ autresConges.pourcentage }}% utilisé</div>
      </div>
    </div>

    <!-- Résumé global -->
    <div class="resume-section">
      <h3>Résumé global</h3>
      <div class="resume-grid">
        <div class="resume-item">
          <span class="resume-label">Total acquis</span>
          <span class="resume-value">{{ totalAcquis }} jours</span>
        </div>
        <div class="resume-item">
          <span class="resume-label">Total pris</span>
          <span class="resume-value">{{ totalPris }} jours</span>
        </div>
        <div class="resume-item">
          <span class="resume-label">Planifiés</span>
          <span class="resume-value">{{ congesPlanifies }} jours</span>
        </div>
        <div class="resume-item primary">
          <span class="resume-label">Solde disponible</span>
          <span class="resume-value">{{ soldeDisponible }} jours</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SoldeConges",
  data() {
    return {
      anneeActuelle: new Date().getFullYear(),
      congesAnnuel: {
        acquis: 25,
        pris: 12,
        reste: 13,
        pourcentage: 48,
      },
      congesFractionnes: {
        acquis: 15,
        pris: 8,
        reste: 7,
        pourcentage: 53,
      },
      autresConges: {
        acquis: 10,
        pris: 3,
        reste: 7,
        pourcentage: 30,
      },
      congesPlanifies: 5,
    };
  },
  computed: {
    totalAcquis() {
      return (
        this.congesAnnuel.acquis +
        this.congesFractionnes.acquis +
        this.autresConges.acquis
      );
    },
    totalPris() {
      return (
        this.congesAnnuel.pris +
        this.congesFractionnes.pris +
        this.autresConges.pris
      );
    },
    soldeDisponible() {
      return this.totalAcquis - this.totalPris - this.congesPlanifies;
    },
  },
};
</script>

<style scoped>
.solde-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Inter", sans-serif;
}

/* En-tête */
.solde-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #008a9b;
}

.solde-header h1 {
  color: #261555;
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.solde-header p {
  color: #6c757d;
  font-size: 16px;
  margin: 0;
}

/* Grille des congés */
.conges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.conge-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  transition: transform 0.2s ease;
}

.conge-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.conge-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e9ecef;
}

.conge-title i {
  color: #008a9b;
  font-size: 20px;
}

.conge-title h3 {
  color: #261555;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

/* Statistiques */
.conge-stats {
  margin-bottom: 20px;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 14px;
}

.stat-row span:first-child {
  color: #6c757d;
}

.stat-value {
  font-weight: 600;
  color: #261555;
}

.stat-value.taken {
  color: #b10064;
}

.stat-row.highlight {
  background: #f8f9fa;
  padding: 12px 16px;
  border-radius: 8px;
  margin: 8px -16px;
  font-weight: 600;
}

.stat-row.highlight span:first-child {
  color: #008a9b;
}

.stat-row.highlight .stat-value {
  color: #008a9b;
}

/* Barre de progression */
.progress-bar {
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: #261555;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.progress-text {
  text-align: center;
  font-size: 12px;
  color: #6c757d;
}

/* Section résumé */
.resume-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
}

.resume-section h3 {
  color: #261555;
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 20px 0;
  text-align: center;
}

.resume-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.resume-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  text-align: center;
}

.resume-item.primary {
  background: #261555;
  color: white;
}

.resume-label {
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 8px;
}

.resume-item.primary .resume-label {
  color: rgba(255, 255, 255, 0.9);
}

.resume-value {
  font-size: 24px;
  font-weight: 700;
  color: #261555;
}

.resume-item.primary .resume-value {
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .solde-container {
    padding: 15px;
  }

  .conges-grid {
    grid-template-columns: 1fr;
  }

  .resume-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .resume-grid {
    grid-template-columns: 1fr;
  }

  .conge-card {
    padding: 20px;
  }
}
</style>
