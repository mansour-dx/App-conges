import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", {
  state: () => ({
    currentUser: {
      id: 1,
      name: "Admin",
      prenom: "Super",
      matricule: "ADM001",
      email: "admin@mail.com",
      role: "admin",
      statut: "Actif",
      password: "admin123",
      departementId: 1,
    },
    users: [
      {
        id: 1,
        name: "Admin",
        prenom: "Super",
        matricule: "ADM001",
        email: "admin@mail.com",
        role: "admin",
        statut: "Actif",
        password: "admin123",
        departementId: 1,
      },
      {
        id: 2,
        name: "Dupont",
        prenom: "Jean",
        matricule: "EMP002",
        email: "jean@mail.com",
        role: "employe",
        statut: "Actif",
        password: "jeanpass",
        departementId: 2,
      },
    ],
    roles: [
      "admin",
      "employe",
      "superieur",
      "directeur",
      "responsableRH",
      "directeurRH",
      "directeurUnite",
    ],
  }),
  getters: {
    totalUsers: (state) => state.users.length,
    usersByRole: (state) => {
      return state.users.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
      }, {});
    },
    getUserById: (state) => (id) => {
      return state.users.find((user) => user.id === id);
    },
  },
  actions: {
    logout() {
      this.currentUser = null;
    },
    addUser(user) {
      user.id = Date.now();
      this.users.push(user);
    },
    updateUser(user) {
      const idx = this.users.findIndex((u) => u.id === user.id);
      if (idx !== -1) this.users[idx] = { ...user };
    },
    removeUser(user) {
      this.users = this.users.filter((u) => u.id !== user.id);
    },
    updateUserRole({ id, role }) {
      const user = this.users.find((u) => u.id === id);
      if (user) user.role = role;
    },
  },
});
