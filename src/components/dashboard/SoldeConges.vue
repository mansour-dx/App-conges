<template>
  <div class="solde-container">
    <div class="solde-card main-card">
      <div class="solde-header">
        <h2>Solde de congés</h2>
        <p>
          Aperçu de vos droits et soldes de congés pour l'année
          {{ anneeActuelle }}
        </p>
      </div>

      <div class="solde-summary">
        <div class="solde-circle">
          <div class="inner-circle">
            <span class="solde-days">{{ soldeDisponible }}</span>
            <span class="solde-label">jours</span>
          </div>
          <svg class="progress-ring" width="200" height="200">
            <circle
              class="progress-ring__circle-bg"
              stroke="#f0f0f0"
              stroke-width="12"
              fill="transparent"
              r="80"
              cx="100"
              cy="100"
            />
            <circle
              class="progress-ring__circle"
              stroke="url(#gradient)"
              stroke-width="12"
              fill="transparent"
              r="80"
              cx="100"
              cy="100"
              :stroke-dasharray="circonference"
              :stroke-dashoffset="dashOffset"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color: #008a9b" />
                <stop offset="100%" style="stop-color: #00b4d8" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div class="solde-details">
          <div class="detail-item">
            <div class="detail-icon">
              <i class="fas fa-calendar-check"></i>
            </div>
            <div class="detail-content">
              <span class="detail-label">Total acquis</span>
              <span class="detail-value">{{ totalAcquis }} jours</span>
            </div>
          </div>
          <div class="detail-item">
            <div class="detail-icon">
              <i class="fas fa-calendar-minus"></i>
            </div>
            <div class="detail-content">
              <span class="detail-label">Congés pris</span>
              <span class="detail-value">{{ congesPris }} jours</span>
            </div>
          </div>
          <div class="detail-item">
            <div class="detail-icon">
              <i class="fas fa-calendar-plus"></i>
            </div>
            <div class="detail-content">
              <span class="detail-label">Congés planifiés</span>
              <span class="detail-value">{{ congesPlanifies }} jours</span>
            </div>
          </div>
          <div class="detail-item highlight">
            <div class="detail-icon">
              <i class="fas fa-wallet"></i>
            </div>
            <div class="detail-content">
              <span class="detail-label">Solde disponible</span>
              <span class="detail-value">{{ soldeDisponible }} jours</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="solde-cards-grid">
      <div class="solde-card type-card">
        <div class="type-header">
          <div class="type-icon">
            <i class="fas fa-umbrella-beach"></i>
          </div>
          <h3>Congés annuels</h3>
        </div>
        <div class="type-details">
          <div class="detail-row">
            <span class="detail-label">Acquis</span>
            <span class="detail-value">22 jours</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Pris</span>
            <span class="detail-value">8 jours</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Reste</span>
            <span class="detail-value">14 jours</span>
          </div>
          <div class="progress-bar">
            <div class="progress" style="width: 36%"></div>
          </div>
        </div>
      </div>

      <div class="solde-card type-card">
        <div class="type-header">
          <div class="type-icon">
            <i class="fas fa-medkit"></i>
          </div>
          <h3>Congés maladie</h3>
        </div>
        <div class="type-details">
          <div class="detail-row">
            <span class="detail-label">Acquis</span>
            <span class="detail-value">15 jours</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Pris</span>
            <span class="detail-value">0 jours</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Reste</span>
            <span class="detail-value">15 jours</span>
          </div>
          <div class="progress-bar">
            <div class="progress" style="width: 0%"></div>
          </div>
        </div>
      </div>

      <div class="solde-card type-card">
        <div class="type-header">
          <div class="type-icon">
            <i class="fas fa-calendar-plus"></i>
          </div>
          <h3>Congés exceptionnels</h3>
        </div>
        <div class="type-details">
          <div class="detail-row">
            <span class="detail-label">Acquis</span>
            <span class="detail-value">10 jours</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Pris</span>
            <span class="detail-value">0 jours</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Reste</span>
            <span class="detail-value">10 jours</span>
          </div>
          <div class="progress-bar">
            <div class="progress" style="width: 0%"></div>
          </div>
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
      totalAcquis: 22,
      congesPris: 8,
      congesPlanifies: 0,
      circonference: 2 * Math.PI * 80,
    };
  },
  computed: {
    soldeDisponible() {
      return this.totalAcquis - this.congesPris - this.congesPlanifies;
    },
    dashOffset() {
      const pourcentagePris =
        (this.congesPris + this.congesPlanifies) / this.totalAcquis;
      return this.circonference * (1 - pourcentagePris);
    },
  },
};
</script>

<style scoped>
.solde-container {
  display: flex;
  flex-direction: column;
  gap: 25px;
  max-width: 1200px;
  margin: 0 auto;
}

.solde-card {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.solde-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.main-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
}

.solde-header {
  margin-bottom: 35px;
}

.solde-header h2 {
  color: #1a1a1a;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #008a9b 0%, #00b4d8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.solde-header p {
  color: #666;
  font-size: 15px;
}

.solde-summary {
  display: flex;
  align-items: center;
  gap: 50px;
}

.solde-circle {
  position: relative;
  width: 200px;
  height: 200px;
}

.inner-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.solde-days {
  font-size: 48px;
  font-weight: 700;
  background: linear-gradient(135deg, #008a9b 0%, #00b4d8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1;
}

.solde-label {
  font-size: 16px;
  color: #666;
  margin-top: 8px;
}

.progress-ring__circle {
  transition: stroke-dashoffset 0.5s ease;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}

.solde-details {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.detail-item:hover {
  background: #f1f5f9;
  transform: translateY(-2px);
}

.detail-item.highlight {
  background: linear-gradient(135deg, #008a9b 0%, #00b4d8 100%);
  color: white;
}

.detail-item.highlight .detail-label,
.detail-item.highlight .detail-value {
  color: white;
}

.detail-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #008a9b;
  box-shadow: 0 4px 10px rgba(0, 138, 155, 0.1);
}

.detail-item.highlight .detail-icon {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.detail-label {
  font-size: 14px;
  color: #666;
}

.detail-value {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
}

.solde-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
}

.type-card {
  display: flex;
  flex-direction: column;
}

.type-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.type-icon {
  width: 45px;
  height: 45px;
  border-radius: 12px;
  background: linear-gradient(135deg, #008a9b 0%, #00b4d8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
}

.type-header h3 {
  color: #1a1a1a;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.type-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.detail-row .detail-label {
  font-size: 14px;
  color: #666;
}

.detail-row .detail-value {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

.progress-bar {
  height: 6px;
  background: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 10px;
}

.progress {
  height: 100%;
  background: linear-gradient(135deg, #008a9b 0%, #00b4d8 100%);
  border-radius: 3px;
  transition: width 0.5s ease;
}

@media (max-width: 992px) {
  .solde-summary {
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }

  .solde-details {
    width: 100%;
  }

  .solde-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .solde-cards-grid {
    grid-template-columns: 1fr;
  }

  .solde-details {
    grid-template-columns: 1fr;
  }

  .solde-card {
    padding: 20px;
  }
}
</style>
