import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

// Import des styles globaux si vous en avez
// import './assets/css/main.css'

// Import de Font Awesome pour les icônes (assurez-vous d'avoir installé les packages nécessaires)
// npm install @fortawesome/fontawesome-free
import "@fortawesome/fontawesome-free/css/all.css";

const app = createApp(App);
const pinia = createPinia();

// Utilisation du router et pinia
app.use(router);
app.use(pinia);

// Montage de l'application
app.mount("#app");
