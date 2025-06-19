<template>
  <div class="sidebar" :class="{ 'is-open': isOpen }">
    <button @click="$emit('toggle-sidebar')" class="sidebar-toggle">
      <i class="fas fa-chevron-left" :class="{ rotated: !isOpen }"></i>
    </button>
    <div class="user-profile-section">
      <div class="logo-container">
        <img
          src="../../assets/images/logo-senelec.png"
          alt="Logo SENELEC"
          class="senelec-logo"
        />
      </div>
      <div class="user-info">
        <div class="user-details">
          <span class="user-name">{{ user.prenom }} {{ user.nom }}</span>
          <span class="user-function">{{ user.fonction }}</span>
          <div class="user-role-container">
            <div class="connection-indicator"></div>
            <span class="user-role">Employé</span>
          </div>
        </div>
      </div>
    </div>
    <nav class="sidebar-nav">
      <router-link
        to="/employe/dashboard"
        class="nav-item"
        active-class="active"
      >
        <i class="fas fa-tachometer-alt"></i>
        <span>Dashboard</span>
      </router-link>
      <router-link
        to="/employe/gestion-demandes"
        class="nav-item"
        active-class="active"
      >
        <i class="fas fa-tasks"></i>
        <span>Gestion des Demandes</span>
      </router-link>
      <router-link
        to="/employe/etat-demandes"
        class="nav-item"
        active-class="active"
      >
        <i class="fas fa-list-check"></i>
        <span>État des demandes</span>
      </router-link>
      <router-link to="/employe/solde" class="nav-item" active-class="active">
        <i class="fas fa-wallet"></i>
        <span>Solde de congés</span>
      </router-link>
      <router-link
        to="/employe/historique"
        class="nav-item"
        active-class="active"
      >
        <i class="fas fa-history"></i>
        <span>Historique</span>
      </router-link>
    </nav>
    <div style="padding: 16px; margin-top: auto">
      <button class="logout-btn-employe" @click="logout">Déconnexion</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SidebarEmploye",
  props: {
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["toggle-sidebar"],
  data() {
    return {
      user: {
        nom: "Diop",
        prenom: "Mansour",
        fonction: "Ingénieur Logiciel",
      },
    };
  },
  computed: {
    userInitials() {
      return this.user.prenom.charAt(0) + this.user.nom.charAt(0);
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: var(--primary-color);
  backdrop-filter: blur(10px);
  color: white;
  padding: 0;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  box-shadow: 4px 0 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.sidebar.is-open {
  transform: translateX(0%);
}

.sidebar:not(.is-open) {
  transform: translateX(-250px);
}

.user-profile-section {
  background-color: var(--secondary-color);
  padding: 20px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 0;
  flex-shrink: 0;
  text-align: center;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 20px;
}

.senelec-logo {
  width: 100px;
  height: auto;
  object-fit: contain;
  transition: all 0.3s ease;
}

.senelec-logo:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 25px;
  transition: transform 0.3s ease;
}

.user-info:hover {
  transform: translateX(0);
}

.user-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.user-name {
  font-weight: 600;
  margin-bottom: 4px;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.95);
}

.user-function {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.user-role-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-role {
  font-size: 11px;
  color: #ffd700;
  font-weight: 500;
  background: rgba(255, 215, 0, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;
  width: fit-content;
  margin-top: 5px;
}

.connection-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #4caf50;
  margin-right: 5px;
  animation: blink 2s infinite;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
    transform: scale(1);
  }
  25%,
  75% {
    opacity: 0.7;
    transform: scale(0.9);
  }
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px 15px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 30px;
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  margin-bottom: 8px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-item i {
  color: #b10064;
  margin-right: 15px;
  font-size: 24px;
  transition: color 0.3s ease;
}

.nav-item:hover i {
  color: white;
}

.nav-item span {
  font-size: 16px;
  font-weight: 500;
}

.nav-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: -1;
}

.nav-item:hover::before {
  transform: translateX(0);
  background: #261555;
}

.nav-item.active {
  background: rgba(0, 138, 155, 0.25);
  color: white;
}

@media (max-width: 1024px) {
  .sidebar {
    width: 200px;
  }

  .nav-item {
    padding: 10px 15px;
  }
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.is-open {
    transform: translateX(0%);
  }
}

.sidebar-toggle {
  position: absolute;
  top: 50px;
  right: -15px;
  width: 30px;
  height: 30px;
  background: var(--secondary-color);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 101;
  transition: all 0.3s ease;
  color: white;
}

.sidebar-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.sidebar-toggle i {
  font-size: 14px;
  transition: transform 0.3s ease;
}

.sidebar-toggle i.rotated {
  transform: rotate(180deg);
}

.logout-btn-employe {
  width: 100%;
  padding: 10px 0;
  background-color: #008a9b;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.logout-btn-employe:hover {
  background-color: #005f6b;
}
</style>
