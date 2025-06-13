<template>
  <div class="planification-container">
    <div class="form-card">
      <h2>Demande de Congé SENELEC</h2>
      <form @submit.prevent="soumettreDemandeConge" class="conge-form">
        <!-- Informations personnelles -->
        <div class="form-section">
          <h3>Informations Personnelles</h3>
          <div class="form-grid">
            <div class="form-group">
              <label for="nom">Nom</label>
              <input type="text" id="nom" v-model="formData.nom" required />
            </div>
            <div class="form-group">
              <label for="prenom">Prénom</label>
              <input
                type="text"
                id="prenom"
                v-model="formData.prenom"
                required
              />
            </div>
            <div class="form-group">
              <label for="matricule">Matricule</label>
              <input
                type="text"
                id="matricule"
                v-model="formData.matricule"
                required
              />
            </div>
            <div class="form-group">
              <label for="telephone">Téléphone</label>
              <input
                type="tel"
                id="telephone"
                v-model="formData.telephone"
                required
              />
            </div>
          </div>
          <div class="form-group">
            <label for="adresse">Adresse</label>
            <input
              type="text"
              id="adresse"
              v-model="formData.adresse"
              required
            />
          </div>
          <div class="form-group">
            <label for="unite">Unité d'Appartenance</label>
            <input type="text" id="unite" v-model="formData.unite" required />
          </div>
        </div>

        <!-- Type de congé -->
        <div class="form-section">
          <h3>Nature du Congé</h3>
          <div class="form-group">
            <label for="typeConge">Type de congé</label>
            <select id="typeConge" v-model="formData.typeConge" required>
              <option value="">Sélectionnez un type</option>
              <option value="annuel">Congés Annuels</option>
              <option value="fractionne">Congés Fractionnés</option>
              <option value="legal">Autres Congés Légaux</option>
            </select>
          </div>
        </div>

        <!-- Période de congé -->
        <div class="form-section">
          <h3>Période de Congé</h3>
          <div class="form-row">
            <div class="form-group">
              <label for="dateDebut">Date de départ</label>
              <input
                type="date"
                id="dateDebut"
                v-model="formData.dateDebut"
                required
              />
            </div>
            <div class="form-group">
              <label for="dateFin">Date de retour</label>
              <input
                type="date"
                id="dateFin"
                v-model="formData.dateFin"
                required
              />
            </div>
          </div>
        </div>

        <!-- Situation des jours de congé -->
        <div class="form-section">
          <h3>Situation des Jours de Congé</h3>
          <div class="form-summary">
            <div class="summary-item">
              <span class="summary-label">Date de la demande :</span>
              <span class="summary-value">{{ dateDemande }}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Jours demandés :</span>
              <span class="summary-value">{{ dureeConge }} jours</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Solde actuel :</span>
              <span class="summary-value">{{ soldeDisponible }} jours</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Solde après déduction :</span>
              <span class="summary-value">{{ soldeApresDeduction }} jours</span>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="motif">Motif</label>
          <textarea
            id="motif"
            v-model="formData.motif"
            rows="4"
            placeholder="Décrivez brièvement le motif de votre demande..."
            required
          ></textarea>
        </div>

        <div class="form-actions">
          <button
            type="button"
            class="btn-secondary"
            @click="reinitialiserForm"
          >
            Réinitialiser
          </button>
          <button type="submit" class="btn-primary">
            Soumettre la demande
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlanificationConges",
  data() {
    return {
      formData: {
        nom: "",
        prenom: "",
        matricule: "",
        telephone: "",
        adresse: "",
        unite: "",
        typeConge: "",
        dateDebut: "",
        dateFin: "",
        motif: "",
      },
      soldeDisponible: 22, // À récupérer depuis l'API
    };
  },
  computed: {
    dateDemande() {
      return new Date().toLocaleDateString("fr-FR");
    },
    dureeConge() {
      if (!this.formData.dateDebut || !this.formData.dateFin) return 0;

      const debut = new Date(this.formData.dateDebut);
      const fin = new Date(this.formData.dateFin);
      const diffTime = Math.abs(fin - debut);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      return diffDays;
    },
    soldeApresDeduction() {
      return this.soldeDisponible - this.dureeConge;
    },
  },
  methods: {
    soumettreDemandeConge() {
      // Vérification du solde disponible
      if (this.dureeConge > this.soldeDisponible) {
        alert("Solde de congés insuffisant !");
        return;
      }

      // Simulation de l'envoi des données
      console.log("Demande soumise:", {
        ...this.formData,
        dateDemande: this.dateDemande,
        duree: this.dureeConge,
        soldeApresDeduction: this.soldeApresDeduction,
      });

      // Réinitialisation du formulaire après soumission
      this.reinitialiserForm();
    },
    reinitialiserForm() {
      this.formData = {
        nom: "",
        prenom: "",
        matricule: "",
        telephone: "",
        adresse: "",
        unite: "",
        typeConge: "",
        dateDebut: "",
        dateFin: "",
        motif: "",
      };
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.formData.justificatif = file;
      }
    },
  },
};
</script>

<style scoped>
.planification-container {
  padding: 20px;
}

.form-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.form-card h2 {
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 600;
  position: relative;
}

.form-card h2:after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #008a9b, #00b4d8);
  border-radius: 2px;
}

.form-section {
  margin-bottom: 30px;
  background: #f8fafc;
  padding: 25px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.form-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.form-section h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.form-section h3:before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 20px;
  background: linear-gradient(180deg, #008a9b, #00b4d8);
  margin-right: 10px;
  border-radius: 2px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-size: 14px;
  color: #2c3e50;
  font-weight: 500;
  transition: all 0.3s ease;
}

input[type="text"],
input[type="tel"],
input[type="date"],
select,
textarea {
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: white;
  color: #2c3e50;
}

input[type="text"]:hover,
input[type="tel"]:hover,
input[type="date"]:hover,
select:hover,
textarea:hover {
  border-color: #cbd5e1;
}

input[type="text"]:focus,
input[type="tel"]:focus,
input[type="date"]:focus,
select:focus,
textarea:focus {
  border-color: #008a9b;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 138, 155, 0.1);
}

.form-summary {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-label {
  color: #2c3e50;
  font-weight: 500;
}

.summary-value {
  font-weight: 600;
  color: #008a9b;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.btn-primary,
.btn-secondary {
  padding: 12px 28px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.btn-primary {
  background: linear-gradient(90deg, #008a9b, #00b4d8);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 138, 155, 0.3);
}

.btn-secondary {
  background: #f1f5f9;
  color: #2c3e50;
}

.btn-secondary:hover {
  background: #e2e8f0;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }

  .form-section {
    padding: 20px;
  }
}
</style>
