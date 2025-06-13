import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import EmployeDashboard from "../views/EmployeDashboard.vue";
import GestionDemandesView from "../views/dashboard/GestionDemandesView.vue";
import EtatDemandesView from "../views/dashboard/EtatDemandesView.vue";
import SoldeView from "../views/dashboard/SoldeView.vue";
import HistoriqueView from "../views/dashboard/HistoriqueView.vue";
import DashboardHomeView from "../views/dashboard/DashboardHomeView.vue";

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
