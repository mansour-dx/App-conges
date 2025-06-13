<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Demande de Report de Congés</h2>
        <button class="close-button" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <form @submit.prevent="soumettreDemandeReport" class="report-form">
        <div class="form-section">
          <h3>Informations sur les Congés à Reporter</h3>

          <div class="form-group">
            <label for="annee">Année des congés à reporter</label>
            <select id="annee" v-model="formData.annee" required>
              <option value="">Sélectionnez une année</option>
              <option :value="currentYear - 1">{{ currentYear - 1 }}</option>
              <option :value="currentYear">{{ currentYear }}</option>
            </select>
          </div>

          <div class="form-group">
            <label for="joursAReporter">Nombre de jours à reporter</label>
            <input
              type="number"
              id="joursAReporter"
              v-model="formData.joursAReporter"
              min="1"
              max="30"
              required
            />
          </div>

          <div class="form-group">
            <label for="dateReport">Date souhaitée du report</label>
            <input
              type="date"
              id="dateReport"
              v-model="formData.dateReport"
              :min="minDateReport"
              required
            />
          </div>
        </div>

        <div class="form-section">
          <h3>Justification</h3>
          <div class="form-group">
            <label for="motif">Motif du report</label>
            <textarea
              id="motif"
              v-model="formData.motif"
              rows="4"
              placeholder="Expliquez les raisons de votre demande de report..."
              required
            ></textarea>
          </div>

          <div class="form-group">
            <label for="pieceJointe">Pièce justificative (optionnel)</label>
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
  name: "DemandeReport",
  data() {
    return {
      currentYear: new Date().getFullYear(),
      formData: {
        annee: "",
        joursAReporter: null,
        dateReport: "",
        motif: "",
        pieceJointe: null,
      },
    };
  },
  computed: {
    minDateReport() {
      const today = new Date();
      return today.toISOString().split("T")[0];
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
    soumettreDemandeReport() {
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

.report-form {
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
}
</style>
