<template>
  <div class="sidebar" :class="{ 'is-open': isOpen }">
    <div class="user-profile-section">
      <div class="logo-container"></div>
      <div class="user-info">
        <div class="avatar">
          <img
            src="../../assets/images/logo-senelec.png"
            alt="Logo SENELEC"
            class="avatar-logo"
          />
        </div>
        <div class="user-details">
          <span class="user-name">{{ user.prenom }} {{ user.nom }}</span>
          <span class="user-function">{{ user.fonction }}</span>
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
  padding: 15px 0 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 0;
}

.logo-container {
  /* Ce bloc est vide car le logo a été déplacé */
}

.user-info {
  display: flex;
  align-items: center;
  padding: 25px;
  border-bottom: none;
  margin-bottom: 0;
  transition: transform 0.3s ease;
}

.user-info:hover {
  transform: translateX(0);
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  margin-right: 25px;
}

.avatar-logo {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
}

.avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 255, 255, 0.3);
}

.user-details {
  display: flex;
  flex-direction: column;
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
  color: #ffdd00;
  margin-right: 15px;
  font-size: 24px;
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
</style>
