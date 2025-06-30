import { reactive } from 'vue';

const state = reactive({
  users: [
    { id: 1, name: 'Admin', email: 'admin@mail.com', role: 'admin' },
    { id: 2, name: 'Jean Dupont', email: 'jean@mail.com', role: 'employe' }
  ],
  roles: ['admin', 'employe', 'superieur', 'directeur', 'responsableRH', 'directeurRH', 'directeurUnite']
});

export default {
  namespaced: true,
  state,
  getters: {
    users: state => state.users,
    roles: state => state.roles
  },
  actions: {
    addUser({ state }, user) {
      user.id = Date.now();
      state.users.push(user);
    },
    updateUser({ state }, user) {
      const idx = state.users.findIndex(u => u.id === user.id);
      if (idx !== -1) state.users[idx] = { ...user };
    },
    removeUser({ state }, user) {
      state.users = state.users.filter(u => u.id !== user.id);
    },
    updateUserRole({ state }, { id, role }) {
      const user = state.users.find(u => u.id === id);
      if (user) user.role = role;
    }
  }
};
