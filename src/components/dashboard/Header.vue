<template>
  <header class="dashboard-header">
    <div class="header-left">
      <h1 class="header-title">{{ pageTitle }}</h1>
      <div class="search-bar">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Rechercher..." />
      </div>
    </div>
    <div class="header-right">
      <div class="notification">
        <i class="fas fa-bell"></i>
        <span class="badge">3</span>
      </div>
      <div class="user-avatar">
        <img src="../../assets/images/logo-senelec.png" alt="Logo Senelec" />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "DashboardHeader",
  props: {
    pageTitle: {
      type: String,
      default: "Tableau de bord",
    },
  },
  data() {
    return {
      user: {
        nom: "Diallo",
        prenom: "Amadou",
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
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  margin-bottom: 25px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: all 0.3s ease;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 25px;
}

.header-title {
  font-size: 24px;
  color: #261555;
  font-weight: 600;
  margin: 0;
  position: relative;
}

.header-title::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #008a9b, #261555);
  border-radius: 2px;
}

.search-bar {
  position: relative;
  width: 300px;
}

.search-bar i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #8898aa;
  transition: color 0.3s ease;
}

.search-bar input {
  width: 100%;
  padding: 12px 15px 12px 45px;
  border: 2px solid transparent;
  border-radius: 12px;
  font-size: 14px;
  background: rgba(245, 247, 250, 0.8);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.search-bar input:focus {
  border-color: #008a9b;
  outline: none;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 12px rgba(0, 138, 155, 0.1);
}

.search-bar input:focus + i {
  color: #008a9b;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.notification {
  position: relative;
  padding: 10px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.notification:hover {
  transform: translateY(-2px);
}

.notification i {
  font-size: 20px;
  color: #8898aa;
  transition: color 0.3s ease;
}

.notification:hover i {
  color: #008a9b;
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #008a9b;
  color: white;
  font-size: 11px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  font-weight: 600;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.user-avatar:hover {
  transform: scale(1.05);
  border-color: #008a9b;
  box-shadow: 0 4px 12px rgba(0, 138, 155, 0.2);
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 992px) {
  .search-bar {
    width: 250px;
  }
}

@media (max-width: 768px) {
  .dashboard-header {
    padding: 15px 20px;
    flex-wrap: wrap;
    gap: 15px;
  }

  .header-left {
    width: 100%;
    justify-content: space-between;
  }

  .search-bar {
    width: 100%;
    order: 3;
  }

  .header-right {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
