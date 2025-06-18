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
        id: Date.now(), // Générer un ID unique
        status: "en_attente",
        dateDemande: new Date().toISOString().split("T")[0],
        commentaireValidation: null,
        dateValidation: null,
        validePar: null,
      };
      this.demandes.push(nouvelleDemande);
    },

    // Valider une demande (approuver ou rejeter)
    validerDemande(demandeId, action, commentaire, validePar) {
      const demande = this.demandes.find((d) => d.id === demandeId);
      if (demande) {
        demande.status = action === "approve" ? "approuvee" : "rejetee";
        demande.dateValidation = new Date().toISOString().split("T")[0];
        demande.commentaireValidation = commentaire;
        demande.validePar = validePar;
      }
    },

    // Mettre à jour une demande
    mettreAJourDemande(demandeId, modifications) {
      const index = this.demandes.findIndex((d) => d.id === demandeId);
      if (index !== -1) {
        this.demandes[index] = { ...this.demandes[index], ...modifications };
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
      const termeLower = terme.toLowerCase();
      return this.demandes.filter(
        (d) =>
          d.nom.toLowerCase().includes(termeLower) ||
          d.prenom.toLowerCase().includes(termeLower) ||
          d.matricule.toLowerCase().includes(termeLower) ||
          d.unite.toLowerCase().includes(termeLower) ||
          d.typeDemande.toLowerCase().includes(termeLower)
      );
    },

    // Filtrer les demandes par statut
    filtrerParStatut(statut) {
      if (statut === "toutes") {
        return this.demandes;
      }
      return this.demandes.filter((d) => d.status === statut);
    },

    // Obtenir les statistiques mensuelles
    getStatistiquesMensuelles() {
      const stats = {};
      this.demandes.forEach((demande) => {
        const mois = new Date(demande.dateDemande).toLocaleDateString("fr-FR", {
          month: "short",
        });
        if (!stats[mois]) {
          stats[mois] = { approuvees: 0, rejetees: 0, enAttente: 0 };
        }
        if (demande.status === "approuvee") {
          stats[mois].approuvees++;
        } else if (demande.status === "rejetee") {
          stats[mois].rejetees++;
        } else {
          stats[mois].enAttente++;
        }
      });
      return stats;
    },

    // Charger les demandes depuis une API (simulation)
    async chargerDemandes() {
      this.loading = true;
      this.error = null;

      try {
        // Simulation d'un appel API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Ici on ferait un vrai appel API
        // this.demandes = await api.getDemandes();
        this.loading = false;
      } catch (error) {
        this.error = "Erreur lors du chargement des demandes";
        this.loading = false;
      }
    },

    // Sauvegarder les modifications (simulation)
    async sauvegarderModifications() {
      this.loading = true;
      try {
        // Simulation d'un appel API
        await new Promise((resolve) => setTimeout(resolve, 500));
        // Ici on ferait un vrai appel API pour sauvegarder
        this.loading = false;
      } catch (error) {
        this.error = "Erreur lors de la sauvegarde";
        this.loading = false;
      }
    },
  },
});
