<template>
  <div class="fiche-conge" id="fiche-conge">
    <div class="logo-centre">
      <img
        src="@/assets/images/logo-senelec.png"
        alt="Senelec"
        class="logo-fiche"
      />
    </div>
    <div class="entete-fiche">
      <div class="entete-texte">
        <div class="titre-processus">Processus Ressources Humaines</div>
        <div class="sous-titre">Fiche de Demande de Congés</div>
      </div>
      <div class="entete-infos">
        <div class="date-creation-container">
          <span>Date création :</span>
          <input
            type="date"
            v-model="formData.dateCreation"
            class="date-input-hidden-print"
          />
          <span class="date-display-only-print">{{
            formatDate(formData.dateCreation)
          }}</span>
        </div>
        <div>Réf : PS1-FOR-018-a</div>
        <div>Page 1 / 1</div>
      </div>
    </div>
    <div class="bandeau-titre">
      <span>FICHE DE DEMANDE DE CONGE</span>
    </div>
    <form class="form-fiche" @submit.prevent>
      <div class="ligne-champs">
        <div class="champ">
          <label>Prénoms :</label>
          <input type="text" v-model="formData.prenom" required />
        </div>
        <div class="champ">
          <label>Nom :</label>
          <input type="text" v-model="formData.nom" required />
        </div>
      </div>
      <div class="ligne-champs">
        <div class="champ">
          <label>Matricule :</label>
          <input type="text" v-model="formData.matricule" required />
        </div>
        <div class="champ">
          <label>Unité d'Appartenance :</label>
          <input type="text" v-model="formData.unite" required />
        </div>
      </div>
      <div class="ligne-champs">
        <div class="champ">
          <label>Poste :</label>
          <input type="text" v-model="formData.poste" />
        </div>
        <div class="champ">
          <label>Adresse :</label>
          <input type="text" v-model="formData.adresse" />
        </div>
      </div>
      <div class="ligne-champs">
        <div class="champ">
          <label>Téléphone :</label>
          <input type="text" v-model="formData.telephone" />
        </div>
      </div>
      <div class="section-conge">
        <div class="section-titre">
          Demande à bénéficier de ses droits au congé :
        </div>
        <div class="cases-conge">
          <label
            ><input type="checkbox" v-model="formData.annuel" /> Congés
            Annuels</label
          >
          <label
            ><input type="checkbox" v-model="formData.fractionne" /> Congés
            Fractionnés</label
          >
          <label
            ><input type="checkbox" v-model="formData.legal" /> Autres congés
            légaux</label
          >
        </div>
      </div>
      <div class="section-conge">
        <div class="section-titre">Période des Congés</div>
        <div class="ligne-champs">
          <div class="champ">
            <label>Date de départ :</label>
            <input type="date" v-model="formData.dateDebut" required />
          </div>
          <div class="champ">
            <label>au :</label>
            <input type="date" v-model="formData.dateFin" required />
          </div>
          <div class="champ">
            <label>soit</label>
            <input
              type="number"
              :value="nbJours"
              readonly
              style="width: 70px; background: #f3f3f3"
            />
            jours
          </div>
        </div>
        <div class="ligne-champs">
          <div class="champ">
            <label>Date de reprise :</label>
            <input type="date" v-model="formData.dateReprise" required />
          </div>
        </div>
      </div>
      <div class="section-conge">
        <div class="section-titre">Situation des jours de congés</div>
        <div class="ligne-champs">
          <div class="champ">
            <label>A la date de la demande :</label>
            <input
              type="number"
              min="0"
              v-model="formData.soldeAvant"
              style="width: 60px"
            />
            <span>jours</span>
          </div>
        </div>
        <div class="ligne-champs">
          <div class="champ">
            <label>Jour(s) imputable(s) :</label>
            <input
              type="number"
              min="0"
              v-model="formData.joursImputables"
              style="width: 60px"
            />
            <span>jours</span>
          </div>
        </div>
        <div class="ligne-champs">
          <div class="champ">
            <label>Solde après déduction :</label>
            <input
              type="number"
              :value="soldeApresDeduction"
              readonly
              style="width: 60px; background: #f3f3f3"
            />
            <span>jours</span>
          </div>
        </div>
      </div>
      <div class="section-signature">
        <div class="ligne-signature">
          <div class="date-container">
            <span>Dakar le</span>
            <input
              type="date"
              v-model="formData.dateDemande"
              style="width: 150px"
            />
          </div>
          <div class="signature-area">
            <span class="signature-label">Signature de l'intéressé(e)</span>
            <div class="signature-pad" @click="ouvrirPadSignature('employe')">
              <div v-if="formData.signatureEmploye" class="signature-image">
                <img :src="formData.signatureEmploye" alt="Signature" />
              </div>
              <div v-else class="signature-placeholder">
                <i class="fas fa-upload"></i>
                <span>Upload Signature</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <table class="approbation-table">
        <tbody>
          <tr>
            <td class="approbation-cell-avis">
              <div class="approbation-title-v2">
                Avis du Supérieur Hiérarchique
              </div>
            </td>
            <td class="approbation-cell-avis">
              <div class="approbation-title-v2">Avis du Directeur d'Unité</div>
            </td>
          </tr>
          <tr>
            <td class="approbation-cell-avis">
              <div
                class="signature-pad"
                @click="ouvrirPadSignature('superieur')"
              >
                <div v-if="formData.signatureSuperieur" class="signature-image">
                  <img :src="formData.signatureSuperieur" alt="Signature" />
                </div>
                <div v-else class="signature-placeholder">
                  <i class="fas fa-upload"></i>
                  <span>Upload Signature</span>
                </div>
              </div>
            </td>
            <td class="approbation-cell-avis">
              <div
                class="signature-pad"
                @click="ouvrirPadSignature('directeur')"
              >
                <div v-if="formData.signatureDirecteur" class="signature-image">
                  <img :src="formData.signatureDirecteur" alt="Signature" />
                </div>
                <div v-else class="signature-placeholder">
                  <i class="fas fa-upload"></i>
                  <span>Upload Signature</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="rh-validation-container">
        <div class="rh-validation-row">
          <div class="rh-validation-col">
            <div class="rh-label-v2">Visa du Correspondant RH<sup>1</sup></div>
            <div
              class="signature-pad"
              @click="ouvrirPadSignature('correspondantRH')"
            >
              <div
                v-if="formData.signatureCorrespondantRH"
                class="signature-image"
              >
                <img :src="formData.signatureCorrespondantRH" alt="Signature" />
              </div>
              <div v-else class="signature-placeholder">
                <i class="fas fa-upload"></i>
                <span>Upload Signature</span>
              </div>
            </div>
          </div>
          <div class="rh-validation-col">
            <div class="rh-label-v2">Validation</div>
            <div class="rh-sublabel-v2">
              Département Administration du Personnel
            </div>
          </div>
        </div>
      </div>

      <div class="drh-approbation-row-v2">
        <div class="drh-label-v2">
          Approbation du Directeur des Ressources Humaines
        </div>
        <div class="signature-area-drh">
          <div class="signature-pad" @click="ouvrirPadSignature('directeurRH')">
            <div v-if="formData.signatureDirecteurRH" class="signature-image">
              <img :src="formData.signatureDirecteurRH" alt="Signature" />
            </div>
            <div v-else class="signature-placeholder">
              <i class="fas fa-upload"></i>
              <span>Upload Signature</span>
            </div>
          </div>
          <div class="signature-line"></div>
        </div>
      </div>

      <div class="note-bas">
        1 Dans les Unités opérationnelles et Délégations Régionales
      </div>
      <div class="actions-print">
        <button type="button" @click="imprimerFiche" :disabled="!peutImprimer">
          Imprimer
        </button>
        <button
          type="button"
          class="btn-envoyer"
          @click="envoyerDemande"
          :disabled="demandeEnvoyee"
        >
          Envoyer la demande
        </button>
      </div>
      <div v-if="confirmation" class="confirmation-message">
        Demande envoyée avec succès !
      </div>
    </form>
    <SignaturePad
      v-if="showSignaturePad"
      @close="showSignaturePad = false"
      @signature-saved="sauvegarderSignature"
    />
  </div>
</template>

<script>
import SignaturePad from "./SignaturePad.vue";

export default {
  name: "PlanificationConges",
  components: {
    SignaturePad,
  },
  data() {
    return {
      showSignaturePad: false,
      currentSignatureType: null,
      formData: {
        prenom: "",
        nom: "",
        matricule: "",
        unite: "",
        poste: "",
        adresse: "",
        telephone: "",
        annuel: false,
        fractionne: false,
        legal: false,
        dateDebut: "",
        dateFin: "",
        nbJours: "",
        dateReprise: "",
        soldeAvant: "",
        joursImputables: "",
        soldeApres: "",
        dateDemande: new Date().toISOString().split("T")[0],
        dateCreation: new Date().toISOString().split("T")[0],
        signatureEmploye: null,
        signatureSuperieur: null,
        signatureDirecteur: null,
        signatureCorrespondantRH: null,
        signatureValidationDeptAdmin: null,
        signatureDirecteurRH: null,
        status: "en_attente",
        etapeActuelle: "Approbation Supérieur Hiérarchique",
      },
      demandeEnvoyee: false,
      confirmation: false,
    };
  },
  computed: {
    nbJours() {
      if (!this.formData.dateDebut || !this.formData.dateFin) return "";
      const debut = new Date(this.formData.dateDebut);
      const fin = new Date(this.formData.dateFin);
      if (isNaN(debut) || isNaN(fin)) return "";
      const diffTime = fin - debut;
      if (diffTime < 0) return 0;
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    },
    soldeApresDeduction() {
      const avant = parseInt(this.formData.soldeAvant) || 0;
      const imput = parseInt(this.formData.joursImputables) || 0;
      return avant - imput;
    },
    peutImprimer() {
      return (
        this.formData.signatureEmploye &&
        this.formData.signatureSuperieur &&
        this.formData.signatureDirecteur &&
        this.formData.signatureCorrespondantRH &&
        this.formData.signatureValidationDeptAdmin &&
        this.formData.signatureDirecteurRH
      );
    },
  },
  mounted() {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const userData = JSON.parse(user);
        this.formData.nom = userData.nom || "";
        this.formData.prenom = userData.prenom || "";
      } catch (e) {}
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return "";
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(dateString).toLocaleDateString("fr-FR", options);
    },
    imprimerFiche() {
      window.print();
    },
    envoyerDemande() {
      this.demandeEnvoyee = true;
      this.confirmation = true;
      setTimeout(() => {
        this.confirmation = false;
      }, 3000);
    },
    ouvrirPadSignature(type) {
      this.currentSignatureType = type;
      this.showSignaturePad = true;
    },
    sauvegarderSignature(signatureData) {
      const type = this.currentSignatureType;
      this.formData[
        `signature${type.charAt(0).toUpperCase() + type.slice(1)}`
      ] = signatureData;
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.fiche-conge {
  background: white;
  max-width: 900px;
  margin: 30px auto;
  padding: 32px 40px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  font-family: "Segoe UI", Arial, sans-serif;
  color: #222;
}

.logo-centre {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.logo-fiche {
  width: 90px;
  height: auto;
}

.entete-fiche {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

.entete-texte {
  flex: 1;
  text-align: center;
}

.titre-processus {
  font-size: 16px;
  font-weight: 600;
}

.sous-titre {
  font-size: 15px;
  color: #555;
}

.entete-infos {
  text-align: right;
  font-size: 13px;
  color: #666;
}

.bandeau-titre {
  background: #f3f3f3;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  margin: 24px 0 18px 0;
  letter-spacing: 1px;
  padding: 10px 0;
  border-radius: 6px;
}

.form-fiche {
  margin-top: 10px;
}

.ligne-champs {
  display: flex;
  gap: 30px;
  margin-bottom: 12px;
}

.champ {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.champ label {
  min-width: 110px;
  font-size: 14px;
  font-weight: 500;
}

.section-conge {
  margin: 18px 0 10px 0;
}

.section-titre {
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 7px;
}

.cases-conge label {
  margin-right: 30px;
  font-size: 14px;
}

.table-situation {
  width: 100%;
  border-collapse: collapse;
  margin-top: 7px;
  margin-bottom: 7px;
}

.table-situation td {
  border: 1px solid #ddd;
  padding: 7px 12px;
  font-size: 14px;
}

.section-signature {
  margin: 18px 0 10px 0;
}

.ligne-signature {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  margin-top: 10px;
}

.signature-droite {
  margin-left: 40px;
  font-weight: 500;
}

.section-approbations-v2 {
  border: 1px solid #bbb;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.approbation-row-v2 {
  display: flex;
  border-bottom: 1px solid #bbb;
}

.approbation-col-v2 {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  gap: 10px;
}

.approbation-col-v2:first-child {
  border-right: 1px solid #bbb;
}

.approbation-title-v2 {
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  margin-bottom: 5px;
}

.rh-validation-drh-section-v2 {
  display: flex;
  flex-direction: column;
}

.rh-validation-row-v2 {
  display: flex;
}

.rh-validation-col-v2 {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  gap: 10px;
}

.rh-validation-col-v2:first-child {
  /* J'ai supprimé la bordure droite ici pour enlever la ligne verticale */
}

.rh-label-v2 {
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  margin-bottom: 5px;
}

.rh-sublabel-v2 {
  font-size: 12px;
  color: #555;
  text-align: center;
  margin-top: 5px;
}

.drh-approbation-row-v2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  gap: 10px;
}

.drh-label-v2 {
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  margin-bottom: 5px;
}

.signature-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 200px;
  position: relative;
  padding-bottom: 20px;
}

.signature-line {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 1px;
  background-color: #333;
}

.signature-pad {
  width: 250px;
  height: 120px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f8f9fa;
  overflow: hidden;
}

.signature-pad:hover {
  border-color: #008a9b;
  background: #f0f9fa;
}

.signature-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #666;
  text-align: center;
  padding: 1rem;
}

.signature-placeholder i {
  font-size: 24px;
  color: #008a9b;
}

.signature-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
}

.signature-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.signature-label {
  font-size: 14px;
  font-weight: 500;
  text-align: center;
}

.note-bas {
  font-size: 12px;
  color: #888;
  margin-top: 10px;
}

.actions-print {
  text-align: right;
  margin-top: 18px;
}

.actions-print button {
  background: #008a9b;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 28px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  margin-left: 10px;
}

.actions-print button:disabled {
  background: #bdbdbd;
  cursor: not-allowed;
}

.btn-envoyer {
  background: #00b894;
}

.confirmation-message {
  margin-top: 18px;
  color: #00b894;
  font-weight: 600;
  text-align: right;
}

@media print {
  .actions-print,
  .actions-print button {
    display: none !important;
  }
  .fiche-conge {
    box-shadow: none !important;
    border-radius: 0 !important;
    margin: 0 !important;
    padding: 0 0 0 0 !important;
    width: 100% !important;
    color: #000 !important;
  }
}

.date-creation-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.date-input-hidden-print {
  display: inline-block;
}

.date-display-only-print {
  display: none;
}

@media print {
  .date-input-hidden-print {
    display: none;
  }
  .date-display-only-print {
    display: inline-block;
  }
}

/* Styles pour les nouvelles zones de signature */
.signature-box-empty {
  width: 250px;
  height: 120px;
  border: 1px solid #ccc;
  margin-top: 10px;
  background: #f8f9fa;
}

.signature-line-bottom {
  width: 250px;
  border-bottom: 1px solid #333;
  margin-top: 10px;
  padding-bottom: 5px;
}

/* Styles spécifiques pour les approbations */
.approbation-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.approbation-table td {
  border: 1px solid #bbb;
  padding: 15px;
  vertical-align: top;
}

.approbation-table td:first-child {
  border-left: none;
}

.approbation-table td:last-child {
  border-right: none;
}

.approbation-cell-avis {
  text-align: center;
  width: 50%; /* Pour diviser le tableau en deux colonnes égales */
}

.approbation-cell-avis:first-child {
  border-right: 1px solid #bbb;
}

/* Nouveaux styles pour les sections sans tableau */
.rh-validation-container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.rh-validation-row {
  display: flex;
}

.rh-validation-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  gap: 10px;
}

.rh-validation-col:first-child {
  /* J'ai supprimé la bordure droite ici pour enlever la ligne verticale */
}

.approbation-cell-visa {
  text-align: center;
  width: 50%;
}

.approbation-cell-visa:first-child {
  /* J'ai supprimé la bordure droite ici pour enlever la ligne verticale */
}

.approbation-cell-validation {
  text-align: center;
  width: 50%;
}

.signature-box-empty {
  width: 200px; /* Taille ajustée pour l'espace de signature */
  height: 80px; /* Hauteur ajustée */
  border: 1px solid #ccc;
  margin: 10px auto 0 auto; /* Centrer la boîte */
  background: #f8f9fa;
}

.signature-line-bottom {
  width: 200px; /* Taille ajustée */
  border-bottom: 1px solid #333;
  margin: 10px auto 0 auto; /* Centrer la ligne */
  padding-bottom: 5px;
}

.signature-area-drh {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 200px;
  position: relative;
  padding-bottom: 20px;
  margin-top: 10px;
}

.drh-approbation-row-v2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  gap: 10px;
  margin-top: 20px;
  /* Removed border here */
}
</style>
