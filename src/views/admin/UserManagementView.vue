<template>
  <v-container fluid class="user-management-view">
    <v-card class="rounded-lg" elevation="2">
      <v-card-title class="d-flex align-center pa-4">
        <span class="text-h5 font-weight-bold">Utilisateurs</span>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-inner-icon="mdi-magnify"
          label="Rechercher un utilisateur..."
          variant="outlined"
          density="compact"
          hide-details
          class="mr-4"
          style="max-width: 350px"
        ></v-text-field>
        <v-btn
          color="primary"
          @click="openDialog()"
          prepend-icon="mdi-plus-circle"
        >
          Ajouter un utilisateur
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="usersWithDepartment"
        :search="search"
        v-model:page="page"
        v-model:items-per-page="itemsPerPage"
        :items-per-page-options="[5, 10, 20, 50]"
        class="elevation-0"
        hover
      >
        <template v-slot:item.role="{ item }">
          <v-chip :color="getRoleColor(item.role)" dark small>{{
            item.role
          }}</v-chip>
        </template>
        <template v-slot:item.statut="{ item }">
          <v-chip
            :color="item.statut === 'Actif' ? 'green' : 'grey'"
            dark
            small
            >{{ item.statut }}</v-chip
          >
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip text="Modifier">
            <template v-slot:activator="{ props }">
              <v-icon
                v-bind="props"
                color="grey-darken-1"
                class="mr-2"
                @click="openDialog(item)"
              >
                mdi-pencil
              </v-icon>
            </template>
          </v-tooltip>
          <v-tooltip text="Supprimer">
            <template v-slot:activator="{ props }">
              <v-icon
                v-bind="props"
                color="red-darken-2"
                @click="confirmDelete(item)"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-tooltip>
        </template>
        <template
          v-slot:bottom="{
            pageCount,
            page: slotPage,
            itemsPerPage: slotItemsPerPage,
            startIndex,
            stopIndex,
            itemsLength,
          }"
        >
          <div class="d-flex flex-column align-center my-4">
            <div class="mb-2 text-grey-darken-1">
              Affichage {{ startIndex + 1 }} à {{ stopIndex + 1 }} sur
              {{ itemsLength }} utilisateurs
            </div>
            <v-pagination
              :model-value="page"
              :length="pageCount"
              color="primary"
              rounded
              total-visible="5"
              @update:model-value="(val) => (page = val)"
            ></v-pagination>
            <div class="mt-2">
              <v-select
                :model-value="itemsPerPage"
                @update:model-value="(val) => (itemsPerPage = val)"
                :items="[5, 10, 20, 50]"
                label="Éléments par page"
                variant="outlined"
                density="compact"
                hide-details
                style="max-width: 180px"
              ></v-select>
            </div>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <!-- Dialog for Add/Edit User -->
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
        <v-card-title class="pa-4 bg-primary">
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text class="pt-6">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedUser.name"
                  label="Nom"
                  variant="outlined"
                  prepend-inner-icon="mdi-account"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedUser.prenom"
                  label="Prénom"
                  variant="outlined"
                  prepend-inner-icon="mdi-account-outline"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedUser.matricule"
                  label="Matricule"
                  variant="outlined"
                  prepend-inner-icon="mdi-identifier"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="editedUser.departementId"
                  :items="departments"
                  item-title="name"
                  item-value="id"
                  label="Département"
                  variant="outlined"
                  prepend-inner-icon="mdi-office-building"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedUser.email"
                  label="Adresse e-mail"
                  variant="outlined"
                  prepend-inner-icon="mdi-email"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="editedUser.role"
                  :items="roles"
                  label="Rôle"
                  variant="outlined"
                  prepend-inner-icon="mdi-shield-account"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="editedUser.statut"
                  :items="['Actif', 'Inactif']"
                  label="Statut"
                  variant="outlined"
                  prepend-inner-icon="mdi-toggle-switch"
                ></v-select>
              </v-col>
              <v-col cols="12" v-if="editedIndex === -1">
                <v-text-field
                  v-model="editedUser.password"
                  label="Mot de passe"
                  variant="outlined"
                  prepend-inner-icon="mdi-lock"
                  type="password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialog">Annuler</v-btn>
          <v-btn color="primary" variant="elevated" @click="saveUser"
            >Sauvegarder</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Confirmation Dialog for Delete -->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"
          >Êtes-vous sûr de vouloir supprimer cet utilisateur ?</v-card-title
        >
        <v-card-text>Cette action est irréversible.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDeleteDialog">Annuler</v-btn>
          <v-btn color="red-darken-1" variant="elevated" @click="deleteUser"
            >Supprimer</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUsersStore } from "@/stores/useUsersStore";
import { useDepartmentsStore } from "@/stores/departments";
import { storeToRefs } from "pinia";

const usersStore = useUsersStore();
const { users, roles } = storeToRefs(usersStore);

const departmentsStore = useDepartmentsStore();
const { departments } = storeToRefs(departmentsStore);

const usersWithDepartment = computed(() => {
  return users.value.map((user) => {
    const department = departments.value.find(
      (d) => d.id === user.departementId
    );
    return {
      ...user,
      departmentName: department ? department.name : "N/A",
    };
  });
});

const search = ref("");
const dialog = ref(false);
const dialogDelete = ref(false);
const userToDelete = ref(null);

const page = ref(1);
const itemsPerPage = ref(10);

const editedIndex = ref(-1);
const editedUser = ref({
  id: null,
  name: "",
  prenom: "",
  matricule: "",
  departementId: null,
  email: "",
  role: null,
  statut: "Actif",
  password: "",
});
const defaultUser = {
  id: null,
  name: "",
  prenom: "",
  matricule: "",
  departementId: null,
  email: "",
  role: null,
  statut: "Actif",
  password: "",
};

const formTitle = computed(() =>
  editedIndex.value === -1 ? "Nouvel Utilisateur" : "Modifier l'Utilisateur"
);

const headers = ref([
  { title: "Nom", key: "name", align: "start", sortable: true },
  { title: "Prénom", key: "prenom", sortable: true },
  { title: "Matricule", key: "matricule", sortable: true },
  { title: "Département", key: "departmentName", sortable: true },
  { title: "Email", key: "email", sortable: true },
  { title: "Rôle", key: "role", sortable: true },
  { title: "Statut", key: "statut", sortable: true },
  { title: "Actions", key: "actions", sortable: false, align: "end" },
]);

const getRoleColor = (role) => {
  const colors = {
    Admin: "red-darken-2",
    "Directeur RH": "purple-darken-2",
    "Responsable RH": "indigo-darken-2",
    "Directeur d'Unité": "blue-darken-2",
    Superieur: "cyan-darken-2",
    Employe: "green-darken-2",
  };
  return colors[role] || "grey";
};

const openDialog = (user) => {
  if (user) {
    editedIndex.value = users.value.findIndex((u) => u.id === user.id);
    editedUser.value = { ...user };
    editedUser.value.password = "";
  } else {
    editedIndex.value = -1;
    editedUser.value = { ...defaultUser };
  }
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  editedUser.value = { ...defaultUser };
  editedIndex.value = -1;
};

const saveUser = () => {
  if (editedIndex.value > -1) {
    const original = users.value[editedIndex.value];
    const userToSave = { ...editedUser.value };
    if (!userToSave.password) userToSave.password = original.password;
    usersStore.updateUser(userToSave);
  } else {
    usersStore.addUser({ ...editedUser.value });
  }
  closeDialog();
};

const confirmDelete = (user) => {
  userToDelete.value = user;
  dialogDelete.value = true;
};

const deleteUser = () => {
  if (userToDelete.value) {
    usersStore.removeUser(userToDelete.value);
  }
  closeDeleteDialog();
};

const closeDeleteDialog = () => {
  dialogDelete.value = false;
  userToDelete.value = null;
};
</script>

<style scoped>
.user-management-view {
  background-color: #f4f6f8;
}
.rounded-lg {
  border-radius: 12px;
}
</style>
