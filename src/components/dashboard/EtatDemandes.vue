<template>
  <div class="etat-demandes">
    <div class="filter-bar">
      <div class="filter-group">
        <label for="statusFilter">Statut</label>
        <select id="statusFilter" v-model="filters.status">
          <option value="all">Tous</option>
          <option value="en_attente">En attente</option>
          <option value="approuve">Approuvé</option>
          <option value="rejete">Rejeté</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="typeFilter">Type</label>
        <select id="typeFilter" v-model="filters.type">
          <option value="all">Tous</option>
          <option value="annuel">Congé annuel</option>
          <option value="maladie">Congé maladie</option>
          <option value="exceptionnel">Congé exceptionnel</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="yearFilter">Année</label>
        <select id="yearFilter" v-model="filters.year">
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
        </select>
      </div>
    </div>

    <div class="demandes-list">
      <div
        v-for="demande in filteredDemandes"
        :key="demande.id"
        class="demande-card"
        :class="statusClass(demande.status)"
      >
        <div class="demande-header">
          <div class="demande-title">
            <h3>{{ demande.type }}</h3>
            <span class="demande-status">{{
              formatStatus(demande.status)
            }}</span>
          </div>
          <div class="demande-actions">
            <button
              v-if="demande.status === 'en_attente'"
              class="btn-icon"
              @click="annulerDemande(demande)"
            >
              <i class="fas fa-times"></i>
            </button>
            <button class="btn-icon" @click="voirDetails(demande)">
              <i class="fas fa-eye"></i>
            </button>
          </div>
        </div>
        <div class="demande-info">
          <div class="info-row">
            <div class="info-label">Période</div>
            <div class="info-value">
              {{ demande.dateDebut }} - {{ demande.dateFin }}
            </div>
          </div>
          <div class="info-row">
            <div class="info-label">Durée</div>
            <div class="info-value">{{ demande.duree }} jours</div>
          </div>
          <div class="info-row">
            <div class="info-label">Étape actuelle</div>
            <div class="info-value">{{ demande.etapeActuelle }}</div>
          </div>
        </div>
        <div class="demande-footer">
          <div class="demande-date">Soumis le {{ demande.dateSoumission }}</div>
          <div v-if="demande.motifRejet" class="demande-rejet">
            Motif: {{ demande.motifRejet }}
          </div>
        </div>
      </div>

      <div v-if="filteredDemandes.length === 0" class="empty-state">
        <i class="fas fa-search"></i>
        <p>Aucune demande ne correspond à vos critères de recherche</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EtatDemandes",
  data() {
    return {
      filters: {
        status: "all",
        type: "all",
        year: "2023",
      },
      demandes: [
        {
          id: 1,
          type: "Congé annuel",
          dateDebut: "15/08/2023",
          dateFin: "25/08/2023",
          duree: 11,
          status: "en_attente",
          etapeActuelle: "Approbation Supérieur Hiérarchique",
          dateSoumission: "01/08/2023",
        },
        {
          id: 2,
          type: "Congé maladie",
          dateDebut: "05/06/2023",
          dateFin: "12/06/2023",
          duree: 8,
          status: "approuve",
          etapeActuelle: "Approuvé",
          dateSoumission: "04/06/2023",
        },
        {
          id: 3,
          type: "Congé exceptionnel",
          dateDebut: "10/04/2023",
          dateFin: "15/04/2023",
          duree: 6,
          status: "rejete",
          etapeActuelle: "Rejeté",
          dateSoumission: "01/04/2023",
          motifRejet: "Demande hors délai règlementaire",
        },
      ],
    };
  },
  computed: {
    filteredDemandes() {
      return this.demandes.filter((demande) => {
        if (
          this.filters.status !== "all" &&
          demande.status !== this.filters.status
        )
          return false;
        if (
          this.filters.type !== "all" &&
          demande.type !== this.convertTypeFilter(this.filters.type)
        )
          return false;
        return true;
      });
    },
  },
  methods: {
    convertTypeFilter(type) {
      const typeMap = {
        annuel: "Congé annuel",
        maladie: "Congé maladie",
        exceptionnel: "Congé exceptionnel",
      };
      return typeMap[type] || "";
    },
    statusClass(status) {
      return {
        "status-pending": status === "en_attente",
        "status-approved": status === "approuve",
        "status-rejected": status === "rejete",
      };
    },
    formatStatus(status) {
      const statusMap = {
        en_attente: "En attente",
        approuve: "Approuvé",
        rejete: "Rejeté",
      };
      return statusMap[status] || status;
    },
    annulerDemande(demande) {
      if (
        confirm(
          `Êtes-vous sûr de vouloir annuler cette demande de ${demande.type}?`
        )
      ) {
        // Logique d'annulation
        console.log("Demande annulée:", demande.id);
      }
    },
    voirDetails(demande) {
      console.log("Voir détails de la demande:", demande.id);
      // Ouvrir modal ou naviguer vers page détaillée
    },
  },
};
</script>

<style scoped>
.etat-demandes {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  padding: 25px;
}

.filter-bar {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.filter-group {
  display: flex;
  flex-direction: column;
  min-width: 150px;
}

.filter-group label {
  font-size: 12px;
  margin-bottom: 6px;
  color: #666;
}

.filter-group select {
  padding: 10px 12px;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f9f9f9;
}

.filter-group select:focus {
  border-color: #008a9b;
  outline: none;
}

.demandes-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.demande-card {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #ddd;
}

.demande-card.status-pending {
  border-left-color: #ffc107;
  background-color: rgba(255, 193, 7, 0.05);
}

.demande-card.status-approved {
  border-left-color: #008a9b;
  background-color: rgba(0, 138, 155, 0.05);
}

.demande-card.status-rejected {
  border-left-color: #dc3545;
  background-color: rgba(220, 53, 69, 0.05);
}

.demande-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.demande-title {
  display: flex;
  align-items: center;
}

.demande-title h3 {
  font-size: 16px;
  color: #261555;
  margin: 0;
  margin-right: 12px;
}

.demande-status {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: #f0f0f0;
  color: #666;
}

.status-pending .demande-status {
  background-color: #fff8e1;
  color: #f57c00;
}

.status-approved .demande-status {
  background-color: rgba(0, 138, 155, 0.15);
  color: #008a9b;
}

.status-rejected .demande-status {
  background-color: #ffebee;
  color: #c62828;
}

.demande-actions {
  display: flex;
  gap: 10px;
}

.btn-icon {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background-color: #f5f5f5;
  border: none;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-icon:hover {
  background-color: #008a9b;
  color: white;
}

.demande-info {
  margin-bottom: 15px;
}

.info-row {
  display: flex;
  margin-bottom: 8px;
}

.info-label {
  width: 120px;
  color: #777;
  font-size: 14px;
}

.info-value {
  font-weight: 500;
  font-size: 14px;
}

.demande-footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #888;
  padding-top: 12px;
  border-top: 1px solid #eee;
}

.demande-rejet {
  color: #c62828;
  font-style: italic;
}

.empty-state {
  padding: 40px 20px;
  text-align: center;
  color: #888;
}

.empty-state i {
  font-size: 40px;
  margin-bottom: 15px;
  opacity: 0.5;
}

@media (max-width: 768px) {
  .filter-bar {
    flex-direction: column;
    gap: 15px;
  }

  .filter-group {
    width: 100%;
  }
}
</style>
