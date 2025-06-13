<template>
  <div class="sidebar">
    <div class="logo-container">
      <img
        src="../../assets/images/logo-senelec.png"
        alt="Logo SENELEC"
        class="logo"
      />
    </div>
    <div class="user-info">
      <div class="avatar">{{ userInitials }}</div>
      <div class="user-details">
        <span class="user-name">{{ user.prenom }} {{ user.nom }}</span>
        <span class="user-function">{{ user.fonction }}</span>
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
  background: linear-gradient(
    180deg,
    rgba(16, 6, 68, 0.95) 0%,
    rgba(38, 21, 85, 0.95) 100%
  );
  backdrop-filter: blur(10px);
  color: white;
  padding: 25px 0;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  box-shadow: 4px 0 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.logo-container {
  padding: 0 25px 25px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 25px;
  text-align: center;
}

.logo {
  max-width: 140px;
  height: auto;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.user-info {
  display: flex;
  align-items: center;
  padding: 0 25px 25px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 30px;
  transition: transform 0.3s ease;
}

.user-info:hover {
  transform: translateX(5px);
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, #008a9b, #00b4c3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 15px;
  font-size: 16px;
  box-shadow: 0 4px 15px rgba(0, 138, 155, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 138, 155, 0.4);
  border-color: rgba(255, 255, 255, 0.2);
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
  padding: 0 15px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  margin-bottom: 8px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.nav-item:hover::before {
  transform: translateX(0);
}

.nav-item i {
  margin-right: 15px;
  width: 20px;
  text-align: center;
  font-size: 16px;
  position: relative;
  z-index: 1;
}

.nav-item span {
  position: relative;
  z-index: 1;
  font-size: 14px;
  font-weight: 500;
}

.nav-item:hover {
  color: white;
  transform: translateX(5px);
}

.nav-item.active {
  background: linear-gradient(90deg, #008a9b, rgba(0, 138, 155, 0.8));
  color: white;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(0, 138, 155, 0.3);
}

.nav-item.active::before {
  display: none;
}

@media (max-width: 1024px) {
  .sidebar {
    width: 200px;
  }

  .logo {
    max-width: 120px;
  }

  .nav-item {
    padding: 10px 15px;
  }
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.active {
    transform: translateX(0);
  }
}
</style>
