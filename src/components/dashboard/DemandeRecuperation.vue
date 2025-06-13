<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Demande de Récupération de Congés</h2>
        <button class="close-button" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <form
        @submit.prevent="soumettreDemandeRecuperation"
        class="recuperation-form"
      >
        <div class="form-section">
          <h3>Demande de Congés Initiale</h3>

          <div class="form-group">
            <label for="referenceDemande"
              >Référence de la demande initiale</label
            >
            <select
              id="referenceDemande"
              v-model="formData.referenceDemande"
              required
              @change="chargerDetailsDemande"
            >
              <option value="">Sélectionnez une demande</option>
              <option
                v-for="demande in demandesDisponibles"
                :key="demande.id"
                :value="demande.id"
              >
                {{ demande.reference }} - {{ demande.dateDebut }} ({{
                  demande.joursAttribues
                }}
                jours)
              </option>
            </select>
          </div>

          <div v-if="demandeSelectionnee" class="info-demande">
            <div class="info-item">
              <span class="info-label">Jours attribués :</span>
              <span class="info-value"
                >{{ demandeSelectionnee.joursAttribues }} jours</span
              >
            </div>
            <div class="info-item">
              <span class="info-label">Jours utilisés :</span>
              <span class="info-value"
                >{{ demandeSelectionnee.joursUtilises }} jours</span
              >
            </div>
            <div class="info-item">
              <span class="info-label">Jours disponibles :</span>
              <span class="info-value highlight"
                >{{ joursDisponibles }} jours</span
              >
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Détails de la Récupération</h3>

          <div class="form-group">
            <label for="joursARecuperer">Nombre de jours à récupérer</label>
            <input
              type="number"
              id="joursARecuperer"
              v-model="formData.joursARecuperer"
              :max="joursDisponibles"
              min="1"
              required
            />
            <small v-if="joursDisponibles"
              >Maximum : {{ joursDisponibles }} jours</small
            >
          </div>

          <div class="form-group">
            <label for="dateDebut">Date de début souhaitée</label>
            <input
              type="date"
              id="dateDebut"
              v-model="formData.dateDebut"
              :min="minDateDebut"
              required
            />
          </div>

          <div class="form-group">
            <label for="dateFin">Date de fin souhaitée</label>
            <input
              type="date"
              id="dateFin"
              v-model="formData.dateFin"
              :min="formData.dateDebut"
              required
            />
          </div>

          <div class="form-info" v-if="dureeSelectionnee">
            <span>Durée sélectionnée : {{ dureeSelectionnee }} jours</span>
            <span
              v-if="dureeSelectionnee > formData.joursARecuperer"
              class="warning"
            >
              Attention : La période sélectionnée dépasse le nombre de jours à
              récupérer
            </span>
          </div>
        </div>

        <div class="form-section">
          <h3>Justification</h3>
          <div class="form-group">
            <label for="motif">Motif de la récupération</label>
            <textarea
              id="motif"
              v-model="formData.motif"
              rows="4"
              placeholder="Expliquez les raisons de votre demande de récupération..."
              required
            ></textarea>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" @click="$emit('close')">
            Annuler
          </button>
          <button type="submit" class="btn-primary" :disabled="!isFormValid">
            Soumettre la demande
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "DemandeRecuperation",
  data() {
    return {
      formData: {
        referenceDemande: "",
        joursARecuperer: null,
        dateDebut: "",
        dateFin: "",
        motif: "",
      },
      demandesDisponibles: [
        // Ces données seront chargées depuis l'API
        {
          id: 1,
          reference: "CONGE-2024-001",
          dateDebut: "2024-01-15",
          joursAttribues: 30,
          joursUtilises: 20,
        },
        {
          id: 2,
          reference: "CONGE-2024-002",
          dateDebut: "2024-02-01",
          joursAttribues: 15,
          joursUtilises: 10,
        },
      ],
      demandeSelectionnee: null,
    };
  },
  computed: {
    minDateDebut() {
      const today = new Date();
      return today.toISOString().split("T")[0];
    },
    joursDisponibles() {
      if (!this.demandeSelectionnee) return 0;
      return (
        this.demandeSelectionnee.joursAttribues -
        this.demandeSelectionnee.joursUtilises
      );
    },
    dureeSelectionnee() {
      if (!this.formData.dateDebut || !this.formData.dateFin) return null;

      const debut = new Date(this.formData.dateDebut);
      const fin = new Date(this.formData.dateFin);
      const diffTime = Math.abs(fin - debut);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      return diffDays;
    },
    isFormValid() {
      return (
        this.formData.referenceDemande &&
        this.formData.joursARecuperer &&
        this.formData.joursARecuperer <= this.joursDisponibles &&
        this.formData.dateDebut &&
        this.formData.dateFin &&
        this.dureeSelectionnee <= this.formData.joursARecuperer &&
        this.formData.motif
      );
    },
  },
  methods: {
    chargerDetailsDemande() {
      // Dans une vraie application, ceci ferait un appel API
      this.demandeSelectionnee = this.demandesDisponibles.find(
        (d) => d.id === this.formData.referenceDemande
      );

      // Réinitialiser les champs liés
      this.formData.joursARecuperer = null;
      this.formData.dateDebut = "";
      this.formData.dateFin = "";
    },
    soumettreDemandeRecuperation() {
      if (!this.isFormValid) {
        alert("Veuillez vérifier les informations saisies");
        return;
      }

      // TODO: Envoyer les données à l'API
      console.log("Données du formulaire:", {
        ...this.formData,
        demandeInitiale: this.demandeSelectionnee,
        dureeSelectionnee: this.dureeSelectionnee,
      });

      // Réinitialiser le formulaire et fermer la modal
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.modal-header h2 {
  color: #2c3e50;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.25rem;
  transition: color 0.3s ease;
}

.close-button:hover {
  color: #2c3e50;
}

.recuperation-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-section {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
}

.form-section h3 {
  color: #2c3e50;
  margin: 0 0 1.5rem 0;
  font-size: 1.1rem;
  font-weight: 500;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group:last-child {
  margin-bottom: 0;
}

.info-demande {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  color: #64748b;
  font-weight: 500;
}

.info-value {
  color: #2c3e50;
  font-weight: 600;
}

.info-value.highlight {
  color: #008a9b;
}

.form-info {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #e8f5ff;
  border-radius: 8px;
  color: #0369a1;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.warning {
  color: #ef4444;
  font-size: 0.85rem;
}

label {
  display: block;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input[type="text"],
input[type="number"],
input[type="date"],
select,
textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

small {
  display: block;
  color: #64748b;
  margin-top: 0.5rem;
  font-size: 0.8rem;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #008a9b;
  box-shadow: 0 0 0 3px rgba(0, 138, 155, 0.1);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-primary,
.btn-secondary {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(90deg, #008a9b, #00b4d8);
  color: white;
  border: none;
}

.btn-primary:disabled {
  background: #94a3b8;
  cursor: not-allowed;
  transform: none;
}

.btn-primary:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 138, 155, 0.3);
}

.btn-secondary {
  background: #f1f5f9;
  color: #2c3e50;
  border: none;
}

.btn-secondary:hover {
  background: #e2e8f0;
}

@media (max-width: 768px) {
  .modal-content {
    padding: 1.5rem;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }
}
</style>
