import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import EmployeDashboard from "../views/EmployeDashboard.vue";
import SuperieurDashboard from "../views/SuperieurDashboard.vue";
import GestionDemandesView from "../views/dashboard/GestionDemandesView.vue";
import EtatDemandesView from "../views/dashboard/EtatDemandesView.vue";
import SoldeView from "../views/dashboard/SoldeView.vue";
import HistoriqueView from "../views/dashboard/HistoriqueView.vue";
import DashboardHomeView from "../views/dashboard/DashboardHomeView.vue";
import DemandesEnAttenteView from "../views/dashboard/DemandesEnAttenteView.vue";
import ValidationDemandesView from "../views/dashboard/ValidationDemandesView.vue";
// import RapportsValidationView from "../views/dashboard/RapportsValidationView.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/employe",
    component: EmployeDashboard,
    meta: { requiresAuth: true },
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
    ],
  },
  {
    path: "/superieur",
    component: SuperieurDashboard,
    meta: { requiresAuth: true },
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
        name: "demandesEnAttente",
        component: DemandesEnAttenteView,
        meta: { title: "Demandes en attente" },
      },
      {
        path: "validation-demandes",
        name: "validationDemandes",
        component: ValidationDemandesView,
        meta: { title: "Validation des demandes" },
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

router.beforeEach((to, from, next) => {
  // Temporairement désactivé pour le développement frontend
  next();

  // La logique d'authentification sera réactivée plus tard
  /*
  const isAuthenticated = localStorage.getItem("user") !== null;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({
        path: "/",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    if (isAuthenticated && to.path === "/") {
      next("/employe/dashboard");
    } else {
      next();
    }
  }
  */
});

// Mise à jour du titre de la page
router.afterEach((to) => {
  document.title = to.meta.title
    ? `${to.meta.title} - App Congés`
    : "App Congés";
});

export default router;
