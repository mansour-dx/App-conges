import { defineStore } from "pinia";

export const useDemandesStore = defineStore("demandes", {
  state: () => ({
    demandes: [
      {
        id: 1,
        prenom: "Fatou",
        nom: "Sall",
        matricule: "EMP001",
        unite: "Service Informatique",
        typeDemande: "Congé annuel",
        dateDebut: "2024-04-15",
        dateFin: "2024-04-19",
        duree: 5,
        motif: "Vacances familiales",
        status: "en_attente",
        niveauApprobation: "Supérieur Hiérarchique",
        dateDemande: "2024-03-20",
        commentaireValidation: null,
        dateValidation: null,
        validePar: null,
      },
      {
        id: 2,
        prenom: "Moussa",
        nom: "Diallo",
        matricule: "EMP002",
        unite: "Service Informatique",
        typeDemande: "Congé maladie",
        dateDebut: "2024-03-25",
        dateFin: "2024-03-27",
        duree: 3,
        motif: "Consultation médicale",
        status: "approuvee",
        niveauApprobation: "Directeur RH",
        dateDemande: "2024-03-18",
        dateValidation: "2024-03-19",
        commentaireValidation: "Demande justifiée avec certificat médical",
        validePar: "Mansour Diop",
      },
      {
        id: 3,
        prenom: "Aissatou",
        nom: "Ba",
        matricule: "EMP003",
        unite: "Service Informatique",
        typeDemande: "Report de congés",
        dateDebut: "2024-05-10",
        dateFin: "2024-05-15",
        duree: 6,
        motif: "Report pour raisons personnelles",
        status: "rejetee",
        niveauApprobation: "Supérieur Hiérarchique",
        dateDemande: "2024-03-22",
        dateValidation: "2024-03-23",
        commentaireValidation: "Report non justifié, période de forte activité",
        validePar: "Mansour Diop",
      },
      {
        id: 4,
        prenom: "Omar",
        nom: "Diop",
        matricule: "EMP004",
        unite: "Service Informatique",
        typeDemande: "Congé annuel",
        dateDebut: "2024-06-10",
        dateFin: "2024-06-14",
        duree: 5,
        motif: "Vacances d'été",
        status: "en_attente",
        niveauApprobation: "Directeur Unité",
        dateDemande: "2024-03-25",
        commentaireValidation: null,
        dateValidation: null,
        validePar: null,
      },
      {
        id: 5,
        prenom: "Mariama",
        nom: "Sow",
        matricule: "EMP005",
        unite: "Service Informatique",
        typeDemande: "Congé maladie",
        dateDebut: "2024-03-28",
        dateFin: "2024-03-30",
        duree: 3,
        motif: "Grippe",
        status: "approuvee",
        niveauApprobation: "Responsable RH",
        dateDemande: "2024-03-26",
        dateValidation: "2024-03-26",
        commentaireValidation: "Certificat médical fourni",
        validePar: "Mansour Diop",
      },
    ],
    loading: false,
    error: null,
  }),

  getters: {
    // Demandes par statut
    demandesEnAttente: (state) =>
      state.demandes.filter((d) => d.status === "en_attente"),
    demandesApprouvees: (state) =>
      state.demandes.filter((d) => d.status === "approuvee"),
    demandesRejetees: (state) =>
      state.demandes.filter((d) => d.status === "rejetee"),

    // Demandes validées par le Directeur RH
    demandesValideesDRH: (state) =>
      state.demandes.filter(
        (d) =>
          d.status === "approuvee" &&
          d.validePar &&
          d.validePar.includes("Directeur RH")
      ),

    // Demandes en attente de validation DRH
    demandesEnAttenteDRH: (state) =>
      state.demandes.filter(
        (d) =>
          d.status === "en_attente" &&
          (!d.validePar || !d.validePar.includes("Directeur RH"))
      ),

    // Statistiques
    totalDemandes: (state) => state.demandes.length,
    nombreEnAttente: (state) =>
      state.demandes.filter((d) => d.status === "en_attente").length,
    nombreApprouvees: (state) =>
      state.demandes.filter((d) => d.status === "approuvee").length,
    nombreRejetees: (state) =>
      state.demandes.filter((d) => d.status === "rejetee").length,

    // Pourcentages
    pourcentageApprouvees: (state) => {
      const total = state.demandes.length;
      return total > 0
        ? Math.round(
            (state.demandes.filter((d) => d.status === "approuvee").length /
              total) *
              100
          )
        : 0;
    },
    pourcentageRejetees: (state) => {
      const total = state.demandes.length;
      return total > 0
        ? Math.round(
            (state.demandes.filter((d) => d.status === "rejetee").length /
              total) *
              100
          )
        : 0;
    },
    pourcentageEnAttente: (state) => {
      const total = state.demandes.length;
      return total > 0
        ? Math.round(
            (state.demandes.filter((d) => d.status === "en_attente").length /
              total) *
              100
          )
        : 0;
    },

    // Demandes par type
    demandesParType: (state) => {
      const types = {};
      state.demandes.forEach((demande) => {
        if (!types[demande.typeDemande]) {
          types[demande.typeDemande] = {
            total: 0,
            approuvees: 0,
            rejetees: 0,
            enAttente: 0,
          };
        }
        types[demande.typeDemande].total++;
        types[demande.typeDemande][
          demande.status === "approuvee"
            ? "approuvees"
            : demande.status === "rejetee"
            ? "rejetees"
            : "enAttente"
        ]++;
      });
      return types;
    },

    // Demandes récentes (7 derniers jours)
    demandesRecentes: (state) => {
      const septJoursAgo = new Date();
      septJoursAgo.setDate(septJoursAgo.getDate() - 7);
      return state.demandes.filter(
        (d) => new Date(d.dateDemande) >= septJoursAgo
      );
    },
  },

  actions: {
    // Ajouter une nouvelle demande
    ajouterDemande(demande) {
      const nouvelleDemande = {
        ...demande,
        id: Date.now(),
        status: "en_attente",
        niveauApprobation: "Supérieur Hiérarchique",
        dateDemande: new Date().toISOString().split("T")[0],
        commentaireValidation: null,
        dateValidation: null,
        validePar: null,
        validationDRH: false,
        dateValidationDRH: null,
        commentaireDRH: null,
        documentGenere: false,
        dateGenerationDocument: null,
        typeDocument: null,
      };
      this.demandes.push(nouvelleDemande);
    },

    // Valider une demande par le Directeur RH
    validerDemandeDRH(demandeId, action, commentaire) {
      const demande = this.demandes.find((d) => d.id === demandeId);
      if (demande) {
        demande.status = action === "approve" ? "approuvee" : "rejetee";
        demande.dateValidationDRH = new Date().toISOString().split("T")[0];
        demande.commentaireDRH = commentaire;
        demande.validePar = "Directeur RH";
        demande.validationDRH = true;
      }
    },

    // Générer un document administratif
    genererDocument(demandeId, typeDocument) {
      const demande = this.demandes.find((d) => d.id === demandeId);
      if (demande && demande.status === "approuvee") {
        demande.documentGenere = true;
        demande.dateGenerationDocument = new Date().toISOString().split("T")[0];
        demande.typeDocument = typeDocument;
        return {
          id: Date.now(),
          typeDocument,
          dateGeneration: demande.dateGenerationDocument,
          demande: { ...demande },
          statut: "généré",
        };
      }
      return null;
    },

    // Valider une demande
    validerDemande(demandeId, action, commentaire, validePar, niveauSuivant) {
      const demande = this.demandes.find((d) => d.id === demandeId);
      if (demande) {
        if (action === "approve") {
          if (niveauSuivant) {
            demande.niveauApprobation = niveauSuivant;
          } else {
            demande.status = "approuvee";
            demande.niveauApprobation = "Terminé";
          }
        } else {
          demande.status = "rejetee";
          demande.niveauApprobation = "Rejeté";
        }

        demande.dateValidation = new Date().toISOString().split("T")[0];
        demande.commentaireValidation = commentaire;
        demande.validePar = validePar;
      }
    },

    // Mettre à jour une demande
    mettreAJourDemande(demandeId, modifications) {
      const demande = this.demandes.find((d) => d.id === demandeId);
      if (demande) {
        Object.assign(demande, modifications);
      }
    },

    // Supprimer une demande
    supprimerDemande(demandeId) {
      const index = this.demandes.findIndex((d) => d.id === demandeId);
      if (index !== -1) {
        this.demandes.splice(index, 1);
      }
    },

    // Rechercher des demandes
    rechercherDemandes(terme) {
      if (!terme) return this.demandes;
      terme = terme.toLowerCase();
      return this.demandes.filter(
        (d) =>
          d.prenom.toLowerCase().includes(terme) ||
          d.nom.toLowerCase().includes(terme) ||
          d.matricule.toLowerCase().includes(terme) ||
          d.unite.toLowerCase().includes(terme) ||
          d.typeDemande.toLowerCase().includes(terme)
      );
    },

    // Filtrer par statut
    filtrerParStatut(statut) {
      if (!statut) return this.demandes;
      return this.demandes.filter((d) => d.status === statut);
    },

    // Obtenir les statistiques mensuelles
    getStatistiquesMensuelles() {
      const maintenant = new Date();
      const debutMois = new Date(
        maintenant.getFullYear(),
        maintenant.getMonth(),
        1
      );
      const demandesMois = this.demandes.filter(
        (d) => new Date(d.dateDemande) >= debutMois
      );

      return {
        total: demandesMois.length,
        approuvees: demandesMois.filter((d) => d.status === "approuvee").length,
        rejetees: demandesMois.filter((d) => d.status === "rejetee").length,
        enAttente: demandesMois.filter((d) => d.status === "en_attente").length,
      };
    },

    // Charger les demandes
    async chargerDemandes() {
      try {
        this.loading = true;
        // Simulation d'un appel API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Dans une vraie application, vous feriez un appel API ici
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },

    // Sauvegarder les modifications
    async sauvegarderModifications() {
      try {
        this.loading = true;
        // Simulation d'un appel API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Dans une vraie application, vous feriez un appel API ici
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
  },
});
