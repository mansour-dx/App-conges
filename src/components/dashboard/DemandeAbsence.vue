<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Demande d'Autorisation d'Absence - SENELEC</h2>
        <button class="close-button" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <form @submit.prevent="soumettreDemandeAbsence" class="absence-form">
        <div class="form-section">
          <h3>Informations Personnelles</h3>
          <div class="form-group">
            <label for="prenom">Prénom</label>
            <input type="text" id="prenom" v-model="formData.prenom" required />
          </div>

          <div class="form-group">
            <label for="nom">Nom</label>
            <input type="text" id="nom" v-model="formData.nom" required />
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
            <label for="poste">Poste</label>
            <input type="text" id="poste" v-model="formData.poste" required />
          </div>

          <div class="form-group">
            <label for="unite">Unité d'Appartenance</label>
            <input type="text" id="unite" v-model="formData.unite" required />
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

        <div class="form-section">
          <h3>Période d'Absence</h3>

          <div class="form-group">
            <label>Type de période</label>
            <div class="radio-group">
              <label class="radio-label">
                <input
                  type="radio"
                  v-model="formData.typePeriode"
                  value="matin"
                />
                Matin
              </label>
              <label class="radio-label">
                <input
                  type="radio"
                  v-model="formData.typePeriode"
                  value="apresmidi"
                />
                Après-midi
              </label>
              <label class="radio-label">
                <input
                  type="radio"
                  v-model="formData.typePeriode"
                  value="journee"
                />
                Journée complète
              </label>
              <label class="radio-label">
                <input
                  type="radio"
                  v-model="formData.typePeriode"
                  value="periode"
                />
                Période
              </label>
            </div>
          </div>

          <div
            class="form-group"
            v-if="
              ['matin', 'apresmidi', 'journee'].includes(formData.typePeriode)
            "
          >
            <label for="dateUnique">Date</label>
            <input
              type="date"
              id="dateUnique"
              v-model="formData.dateUnique"
              :min="minDateDebut"
              required
            />
          </div>

          <div v-if="formData.typePeriode === 'periode'">
            <div class="form-group">
              <label for="dateDebut">Du</label>
              <input
                type="date"
                id="dateDebut"
                v-model="formData.dateDebut"
                :min="minDateDebut"
                required
              />
            </div>

            <div class="form-group">
              <label for="dateFin">Au</label>
              <input
                type="date"
                id="dateFin"
                v-model="formData.dateFin"
                :min="formData.dateDebut"
                required
              />
            </div>
          </div>

          <div class="form-info" v-if="dureeAbsence">
            <span
              >Nombre de jours déductibles : {{ dureeAbsence }} jour(s)</span
            >
          </div>
        </div>

        <div class="form-section">
          <h3>Justification</h3>
          <div class="form-group">
            <label for="motif">Motif détaillé</label>
            <textarea
              id="motif"
              v-model="formData.motif"
              rows="4"
              required
            ></textarea>
          </div>

          <div class="form-group">
            <label for="pieceJointe">Pièce justificative</label>
            <input
              type="file"
              id="pieceJointe"
              @change="handleFileUpload"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <small>Formats acceptés : PDF, DOC, DOCX, JPG, PNG (max 5MB)</small>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" @click="$emit('close')">
            Annuler
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
  name: "DemandeAbsence",
  data() {
    return {
      formData: {
        prenom: "",
        nom: "",
        matricule: "",
        poste: "",
        unite: "",
        telephone: "",
        typePeriode: "",
        dateUnique: "",
        dateDebut: "",
        dateFin: "",
        motif: "",
        pieceJointe: null,
      },
    };
  },
  computed: {
    minDateDebut() {
      const today = new Date();
      return today.toISOString().split("T")[0];
    },
    dureeAbsence() {
      if (this.formData.typePeriode === "periode") {
        if (!this.formData.dateDebut || !this.formData.dateFin) return null;

        const debut = new Date(this.formData.dateDebut);
        const fin = new Date(this.formData.dateFin);
        const diffTime = Math.abs(fin - debut);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        return diffDays;
      } else if (["matin", "apresmidi"].includes(this.formData.typePeriode)) {
        return 0.5;
      } else if (this.formData.typePeriode === "journee") {
        return 1;
      }
      return null;
    },
    pieceJustificativeRequise() {
      return ["maladie", "evenement_familial"].includes(
        this.formData.typeAbsence
      );
    },
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert("Le fichier est trop volumineux. Taille maximum : 5MB");
          event.target.value = "";
          return;
        }
        this.formData.pieceJointe = file;
      }
    },
    soumettreDemandeAbsence() {
      // Vérification des dates
      if (this.formData.typePeriode === "periode") {
        if (
          new Date(this.formData.dateFin) < new Date(this.formData.dateDebut)
        ) {
          alert("La date de fin doit être postérieure à la date de début");
          return;
        }
      }

      // Création d'un objet FormData pour l'envoi du fichier
      const formData = new FormData();
      for (const [key, value] of Object.entries(this.formData)) {
        formData.append(key, value);
      }

      // TODO: Envoyer les données à l'API
      console.log("Données du formulaire:", this.formData);

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

.absence-form {
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

.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  background: white;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
}

.radio-label:hover {
  border-color: #008a9b;
}

.radio-label input[type="radio"] {
  margin: 0;
}

.form-info {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #e8f5ff;
  border-radius: 8px;
  color: #0369a1;
  font-size: 0.9rem;
}

label {
  display: block;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input[type="text"],
input[type="tel"],
input[type="email"],
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

input[type="file"] {
  width: 100%;
  padding: 0.75rem;
  border: 2px dashed #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
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

.btn-primary:hover {
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

  .radio-group {
    flex-direction: column;
  }

  .radio-label {
    width: 100%;
  }
}
</style>
