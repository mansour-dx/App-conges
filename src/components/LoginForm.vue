<template>
  <div class="login-form">
    <div class="form-header">
      <h1>Connexion</h1>
    </div>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Nom d'utilisateur</label>
        <input
          type="text"
          id="username"
          v-model="username"
          required
          placeholder="Entrez votre nom d'utilisateur"
        />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="Entrez votre mot de passe"
        />
      </div>
      <div class="form-actions">
        <button type="submit" class="login-btn">Se connecter</button>
      </div>
      <div class="form-links">
        <a href="#" @click.prevent="forgotPassword">Mot de passe oublié?</a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      // Simulation d'une connexion réussie
      // Note: Dans une vraie application, ceci viendrait de votre API
      const userData = {
        id: 1,
        username: this.username,
        nom: "Diallo",
        prenom: "Amadou",
        fonction: "Ingénieur Électricien",
        role: this.determineUserRole(this.username)
      };

      // Stockage des données utilisateur
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirection vers le dashboard approprié
      const dashboardRoutes = {
        'employe': '/employe/dashboard',
        'superieur': '/superieur/dashboard',
        'directeurUnite': '/directeur-unite/dashboard',
        'responsableRH': '/responsable-rh/dashboard',
        'directeurRH': '/directeur-rh/dashboard'
      };

      this.$router.push(dashboardRoutes[userData.role] || '/employe/dashboard');
    },

    determineUserRole(username) {
      // Simulation de la détermination du rôle basée sur le nom d'utilisateur
      // Dans une vraie application, ceci viendrait de votre API
      if (username.toLowerCase().includes('sup')) return 'superieur';
      if (username.toLowerCase().includes('dir')) return 'directeurUnite';
      if (username.toLowerCase().includes('rh')) return 'responsableRH';
      if (username.toLowerCase().includes('drh')) return 'directeurRH';
      return 'employe';
    },
    forgotPassword() {
      // Logique pour réinitialiser le mot de passe
      console.log("Réinitialisation du mot de passe demandée");
    },
  },
};
</script>

<style scoped>
.login-form {
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 35px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 420px;
  backdrop-filter: blur(10px);
}

.form-header {
  text-align: center;
  margin-bottom: 35px;
}

.form-header h1 {
  color: var(--primary-color);
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 0;
}

.form-group {
  margin-bottom: 24px;
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--secondary-color);
  text-align: left;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 14px 16px;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s ease;
  background-color: #f9f9f9;
}

.form-group input:focus {
  border-color: var(--primary-color);
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 138, 155, 0.15);
  background-color: white;
}

.form-actions {
  margin-top: 30px;
}

.login-btn {
  width: 100%;
  padding: 14px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 8px rgba(0, 138, 155, 0.2);
}

.login-btn:hover {
  background-color: var(--tertiary-color);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 138, 155, 0.25);
}

.login-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 138, 155, 0.2);
}

.form-links {
  margin-top: 24px;
  text-align: center;
}

.form-links a {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.form-links a:hover {
  color: var(--tertiary-color);
  text-decoration: underline;
}
</style>
