import { defineStore } from "pinia";

export const useDepartmentsStore = defineStore("departments", {
  state: () => ({
    departments: [
      { id: 1, name: "Direction Générale", directorId: 1, status: "Actif" },
      { id: 2, name: "Ressources Humaines", directorId: null, status: "Actif" },
      { id: 3, name: "IT", directorId: null, status: "Actif" },
      { id: 4, name: "Commercial", directorId: null, status: "Inactif" },
    ],
  }),
  actions: {
    addDepartment(department) {
      department.id = Date.now();
      this.departments.push(department);
    },
    updateDepartment(department) {
      const index = this.departments.findIndex((d) => d.id === department.id);
      if (index !== -1) {
        this.departments[index] = department;
      }
    },
    deleteDepartment(departmentId) {
      this.departments = this.departments.filter((d) => d.id !== departmentId);
    },
  },
});
