import { defineStore } from "pinia";

// Constantes de style
export const STYLE_CONSTANTS = {
  colors: {
    primary: {
      light: "#e6f7ff",
      main: "#008a9b",
      dark: "#006d7a",
    },
    warning: {
      light: "#fff7e6",
      main: "#d97706",
      dark: "#b45309",
    },
    success: {
      light: "#f0fdf4",
      main: "#16a34a",
      dark: "#15803d",
    },
    error: {
      light: "#fef2f2",
      main: "#dc2626",
      dark: "#b91c1c",
    },
    info: {
      light: "#e6f7ff",
      main: "#0284c7",
      dark: "#0369a1",
    },
    neutral: {
      light: "#f8fafc",
      main: "#64748b",
      dark: "#475569",
    },
  },
  gradients: {
    primary: "linear-gradient(135deg, #008a9b, #00b4d8)",
    warning: "linear-gradient(135deg, #d97706, #f59e0b)",
    success: "linear-gradient(135deg, #16a34a, #22c55e)",
    error: "linear-gradient(135deg, #dc2626, #ef4444)",
    info: "linear-gradient(135deg, #0284c7, #0ea5e9)",
  },
};

export const useCongesStore = defineStore("conges", {
  state: () => ({
    // Données pour le dashboard
    stats: {
      congesRestants: 25,
      demandesEnCours: 2,
      demandesApprouvees: 15,
    },
    prochainsConges: [
      {
        id: 1,
        dateDebut: "2024-04-01",
        dateFin: "2024-04-05",
        type: "Congés Annuels",
        statut: "En attente",
      },
      {
        id: 2,
        dateDebut: "2024-05-15",
        dateFin: "2024-05-17",
        type: "Congés Maladie",
        statut: "Approuvé",
      },
    ],

    // Données pour l'état des demandes
    demandesEnCours: [
      {
        id: 1,
        dateDebut: "2024-04-01",
        dateFin: "2024-04-05",
        type: "Congés Annuels",
        statut: "En attente",
        motif: "Vacances familiales",
        dateDemande: "2024-03-15",
      },
      {
        id: 2,
        dateDebut: "2024-05-15",
        dateFin: "2024-05-17",
        type: "Congés Maladie",
        statut: "En attente",
        motif: "Rendez-vous médical",
        dateDemande: "2024-03-20",
      },
    ],

    // Données pour l'historique
    historiqueConges: [
      {
        id: 1,
        dateDebut: "2024-01-15",
        dateFin: "2024-01-20",
        type: "Congés Annuels",
        statut: "Approuvé",
        motif: "Vacances d'hiver",
        dateDemande: "2023-12-15",
        dateValidation: "2023-12-20",
      },
      {
        id: 2,
        dateDebut: "2024-02-01",
        dateFin: "2024-02-02",
        type: "Congés Maladie",
        statut: "Approuvé",
        motif: "Rendez-vous médical",
        dateDemande: "2024-01-25",
        dateValidation: "2024-01-26",
      },
      {
        id: 3,
        dateDebut: "2024-03-05",
        dateFin: "2024-03-08",
        type: "Congés Annuels",
        statut: "Refusé",
        motif: "Vacances de printemps",
        dateDemande: "2024-02-15",
        dateValidation: "2024-02-20",
      },
    ],

    // Données pour le solde
    soldeConges: {
      congesAnnuels: {
        total: 25,
        pris: 10,
        restant: 15,
      },
      congesMaladie: {
        total: 10,
        pris: 2,
        restant: 8,
      },
      recuperation: {
        total: 5,
        pris: 1,
        restant: 4,
      },
    },
    loading: false,
    error: null,
  }),

  getters: {
    // Getters pour le dashboard
    getCongesRestants: (state) => state.stats.congesRestants,
    getDemandesEnCours: (state) => state.stats.demandesEnCours,
    getDemandesApprouvees: (state) => state.stats.demandesApprouvees,
    getProchainsConges: (state) => state.prochainsConges,

    // Getters pour l'état des demandes
    getDemandesEnCoursList: (state) => state.demandesEnCours,

    // Getters pour l'historique
    getHistoriqueConges: (state) => state.historiqueConges,

    // Getters pour le solde
    getSoldeConges: (state) => state.soldeConges,
  },

  actions: {
    async fetchStats() {
      this.loading = true;
      try {
        // Données de test temporaires
        this.stats = {
          congesRestants: 25,
          demandesEnCours: 2,
          demandesApprouvees: 15,
        };
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchProchainsConges() {
      this.loading = true;
      try {
        // Données de test temporaires
        this.prochainsConges = [
          {
            id: 1,
            dateDebut: "2024-04-01",
            dateFin: "2024-04-05",
            type: "Congés Annuels",
            statut: "En attente",
          },
          {
            id: 2,
            dateDebut: "2024-05-15",
            dateFin: "2024-05-17",
            type: "Congés Maladie",
            statut: "Approuvé",
          },
        ];
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
