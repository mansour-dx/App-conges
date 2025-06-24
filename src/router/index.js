import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import EmployeDashboard from "../views/EmployeDashboard.vue";
import SuperieurDashboard from "../views/SuperieurDashboard.vue";
import DirecteurUniteDashboard from "../views/DirecteurUniteDashboard.vue";
import ResponsableRHDashboard from "../views/ResponsableRHDashboard.vue";
import DirecteurRHDashboard from "../views/DirecteurRHDashboard.vue";
import GestionDemandesView from "../views/dashboard/GestionDemandesView.vue";
import EtatDemandesView from "../views/dashboard/EtatDemandesView.vue";
import SoldeView from "../views/dashboard/SoldeView.vue";
import HistoriqueView from "../views/dashboard/HistoriqueView.vue";
import DashboardHomeView from "../views/dashboard/DashboardHomeView.vue";
import DemandesEnAttenteView from "../views/dashboard/DemandesEnAttenteView.vue";
import ValidationDemandesView from "../views/dashboard/ValidationDemandesView.vue";
import DocumentsAdministratifsView from "../views/dashboard/DocumentsAdministratifsView.vue";
import FormulairePlanificationView from "../views/dashboard/FormulairePlanificationView.vue";
import FormulaireReportView from "../views/dashboard/FormulaireReportView.vue";
import FormulaireAbsenceView from "../views/dashboard/FormulaireAbsenceView.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/employe",
    component: EmployeDashboard,
    children: [
      {
        path: "",
        redirect: { name: "employeDashboard" },
      },
      {
        path: "dashboard",
        name: "employeDashboard",
        component: DashboardHomeView,
        meta: { title: "Tableau de bord" },
      },
      {
        path: "gestion-demandes",
        name: "gestionDemandes",
        component: GestionDemandesView,
        meta: { title: "Gestion des Demandes" },
      },
      {
        path: "etat-demandes",
        name: "etatDemandes",
        component: EtatDemandesView,
        meta: { title: "État des demandes" },
      },
      {
        path: "solde",
        name: "soldeConges",
        component: SoldeView,
        meta: { title: "Solde de congés" },
      },
      {
        path: "historique",
        name: "historiqueConges",
        component: HistoriqueView,
        meta: { title: "Historique des congés" },
      },
      {
        path: "demande-conges",
        name: "formulairePlanification",
        component: FormulairePlanificationView,
        meta: { title: "Demande de Congés" },
      },
      {
        path: "demande-report",
        name: "formulaireReport",
        component: FormulaireReportView,
        meta: { title: "Demande de Report de Congés" },
      },
      {
        path: "demande-absence",
        name: "formulaireAbsence",
        component: FormulaireAbsenceView,
        meta: { title: "Demande d'Absence" },
      },
    ],
  },
  {
    path: "/superieur",
    component: SuperieurDashboard,
    children: [
      {
        path: "",
        redirect: { name: "superieurDashboard" },
      },
      {
        path: "dashboard",
        name: "superieurDashboard",
        component: DashboardHomeView,
        meta: { title: "Tableau de bord - Supérieur" },
      },
      {
        path: "gestion-demandes",
        name: "superieurGestionDemandes",
        component: GestionDemandesView,
        meta: { title: "Gestion des Demandes - Supérieur" },
      },
      {
        path: "etat-demandes",
        name: "superieurEtatDemandes",
        component: EtatDemandesView,
        meta: { title: "État des demandes - Supérieur" },
      },
      {
        path: "solde",
        name: "superieurSoldeConges",
        component: SoldeView,
        meta: { title: "Solde de congés - Supérieur" },
      },
      {
        path: "historique",
        name: "superieurHistoriqueConges",
        component: HistoriqueView,
        meta: { title: "Historique des congés - Supérieur" },
      },
      {
        path: "demandes-en-attente",
        name: "superieurDemandesEnAttente",
        component: DemandesEnAttenteView,
        meta: { title: "Demandes en attente - Supérieur" },
      },
      {
        path: "validation-demandes",
        name: "superieurValidationDemandes",
        component: ValidationDemandesView,
        meta: { title: "Validation des demandes - Supérieur" },
      },
      {
        path: "demande-conges",
        name: "superieurFormulairePlanification",
        component: FormulairePlanificationView,
        meta: { title: "Demande de Congés - Supérieur" },
      },
      {
        path: "demande-report",
        name: "superieurFormulaireReport",
        component: FormulaireReportView,
        meta: { title: "Demande de Report de Congés - Supérieur" },
      },
      {
        path: "demande-absence",
        name: "superieurFormulaireAbsence",
        component: FormulaireAbsenceView,
        meta: { title: "Demande d'Absence - Supérieur" },
      },
    ],
  },
  {
    path: "/directeur-unite",
    component: DirecteurUniteDashboard,
    children: [
      {
        path: "",
        redirect: { name: "directeurUniteDashboard" },
      },
      {
        path: "dashboard",
        name: "directeurUniteDashboard",
        component: DashboardHomeView,
        meta: { title: "Tableau de bord - Directeur d'Unité" },
      },
      {
        path: "gestion-demandes",
        name: "directeurUniteGestionDemandes",
        component: GestionDemandesView,
        meta: { title: "Gestion des Demandes - Directeur d'Unité" },
      },
      {
        path: "etat-demandes",
        name: "directeurUniteEtatDemandes",
        component: EtatDemandesView,
        meta: { title: "État des demandes - Directeur d'Unité" },
      },
      {
        path: "solde",
        name: "directeurUniteSoldeConges",
        component: SoldeView,
        meta: { title: "Solde de congés - Directeur d'Unité" },
      },
      {
        path: "historique",
        name: "directeurUniteHistoriqueConges",
        component: HistoriqueView,
        meta: { title: "Historique des congés - Directeur d'Unité" },
      },
      {
        path: "demandes-en-attente",
        name: "directeurUniteDemandesEnAttente",
        component: DemandesEnAttenteView,
        meta: { title: "Demandes en attente - Directeur d'Unité" },
      },
      {
        path: "validation-demandes",
        name: "directeurUniteValidationDemandes",
        component: ValidationDemandesView,
        meta: { title: "Validation des demandes - Directeur d'Unité" },
      },
      {
        path: "demande-conges",
        name: "directeurUniteFormulairePlanification",
        component: FormulairePlanificationView,
        meta: { title: "Demande de Congés - Directeur d'Unité" },
      },
      {
        path: "demande-report",
        name: "directeurUniteFormulaireReport",
        component: FormulaireReportView,
        meta: { title: "Demande de Report de Congés - Directeur d'Unité" },
      },
      {
        path: "demande-absence",
        name: "directeurUniteFormulaireAbsence",
        component: FormulaireAbsenceView,
        meta: { title: "Demande d'Absence - Directeur d'Unité" },
      },
    ],
  },
  {
    path: "/responsable-rh",
    component: ResponsableRHDashboard,
    children: [
      {
        path: "",
        redirect: { name: "responsableRHDashboard" },
      },
      {
        path: "dashboard",
        name: "responsableRHDashboard",
        component: DashboardHomeView,
        meta: { title: "Tableau de bord - Responsable RH" },
      },
      {
        path: "gestion-demandes",
        name: "responsableRHGestionDemandes",
        component: GestionDemandesView,
        meta: { title: "Gestion des Demandes - Responsable RH" },
      },
      {
        path: "etat-demandes",
        name: "responsableRHEtatDemandes",
        component: EtatDemandesView,
        meta: { title: "État des demandes - Responsable RH" },
      },
      {
        path: "solde",
        name: "responsableRHSoldeConges",
        component: SoldeView,
        meta: { title: "Solde de congés - Responsable RH" },
      },
      {
        path: "historique",
        name: "responsableRHHistoriqueConges",
        component: HistoriqueView,
        meta: { title: "Historique des congés - Responsable RH" },
      },
      {
        path: "demandes-en-attente",
        name: "responsableRHDemandesEnAttente",
        component: DemandesEnAttenteView,
        meta: { title: "Demandes en attente - Responsable RH" },
      },
      {
        path: "validation-demandes",
        name: "responsableRHValidationDemandes",
        component: ValidationDemandesView,
        meta: { title: "Validation des demandes - Responsable RH" },
      },
      {
        path: "demande-conges",
        name: "responsableRHFormulairePlanification",
        component: FormulairePlanificationView,
        meta: { title: "Demande de Congés - Responsable RH" },
      },
      {
        path: "demande-report",
        name: "responsableRHFormulaireReport",
        component: FormulaireReportView,
        meta: { title: "Demande de Report de Congés - Responsable RH" },
      },
      {
        path: "demande-absence",
        name: "responsableRHFormulaireAbsence",
        component: FormulaireAbsenceView,
        meta: { title: "Demande d'Absence - Responsable RH" },
      },
    ],
  },
  {
    path: "/directeur-rh",
    component: DirecteurRHDashboard,
    children: [
      {
        path: "",
        redirect: { name: "directeurRHDashboard" },
      },
      {
        path: "dashboard",
        name: "directeurRHDashboard",
        component: DashboardHomeView,
        meta: { title: "Tableau de bord - Directeur RH" },
      },
      {
        path: "gestion-demandes",
        name: "directeurRHGestionDemandes",
        component: GestionDemandesView,
        meta: { title: "Gestion des Demandes - Directeur RH" },
      },
      {
        path: "etat-demandes",
        name: "directeurRHEtatDemandes",
        component: EtatDemandesView,
        meta: { title: "État des demandes - Directeur RH" },
      },
      {
        path: "solde",
        name: "directeurRHSoldeConges",
        component: SoldeView,
        meta: { title: "Solde de congés - Directeur RH" },
      },
      {
        path: "historique",
        name: "directeurRHHistoriqueConges",
        component: HistoriqueView,
        meta: { title: "Historique des congés - Directeur RH" },
      },
      {
        path: "demandes-en-attente",
        name: "directeurRHDemandesEnAttente",
        component: DemandesEnAttenteView,
        meta: { title: "Demandes en attente - Directeur RH" },
      },
      {
        path: "validation-demandes",
        name: "directeurRHValidationDemandes",
        component: ValidationDemandesView,
        meta: { title: "Validation des demandes - Directeur RH" },
      },
      {
        path: "documents-administratifs",
        name: "directeurRHDocumentsAdministratifs",
        component: DocumentsAdministratifsView,
        meta: { title: "Documents Administratifs" },
      },
      {
        path: "demande-conges",
        name: "directeurRHFormulairePlanification",
        component: FormulairePlanificationView,
        meta: { title: "Demande de Congés - Directeur RH" },
      },
      {
        path: "demande-report",
        name: "directeurRHFormulaireReport",
        component: FormulaireReportView,
        meta: { title: "Demande de Report de Congés - Directeur RH" },
      },
      {
        path: "demande-absence",
        name: "directeurRHFormulaireAbsence",
        component: FormulaireAbsenceView,
        meta: { title: "Demande d'Absence - Directeur RH" },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Temporairement désactivé pour le développement frontend
router.beforeEach((to, from, next) => {
  next();
});

// Mise à jour du titre de la page
router.afterEach((to) => {
  document.title = to.meta.title
    ? `${to.meta.title} - App Congés`
    : "App Congés";
});

export default router;
