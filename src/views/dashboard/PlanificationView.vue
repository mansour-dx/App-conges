<template>
  <div class="planification">
    <h1>Planification des congés</h1>

    <v-row class="mt-4">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            Calendrier des congés
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="showAddDialog = true">
              Ajouter une période
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-calendar
              ref="calendar"
              v-model="selectedDate"
              :events="events"
              :event-color="getEventColor"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
            ></v-calendar>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Périodes bloquées</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="(period, index) in blockedPeriods"
                :key="index"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ formatDate(period.start) }} -
                    {{ formatDate(period.end) }}
                  </v-list-item-title>
                  <v-list-item-subtitle>{{
                    period.reason
                  }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon small @click="removeBlockedPeriod(index)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal pour ajouter une période -->
    <v-dialog v-model="showAddDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Ajouter une période</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-menu
                  ref="startMenu"
                  v-model="startMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="newPeriod.start"
                      label="Date de début"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="newPeriod.start"
                    @input="startMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" sm="6">
                <v-menu
                  ref="endMenu"
                  v-model="endMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="newPeriod.end"
                      label="Date de fin"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="newPeriod.end"
                    @input="endMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="newPeriod.reason"
                  label="Raison"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showAddDialog = false">
            Annuler
          </v-btn>
          <v-btn color="blue darken-1" text @click="addBlockedPeriod">
            Ajouter
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "PlanificationView",
  data() {
    return {
      selectedDate: new Date().toISOString().substr(0, 10),
      events: [],
      blockedPeriods: [
        {
          start: "2024-07-15",
          end: "2024-08-15",
          reason: "Période estivale",
        },
        {
          start: "2024-12-23",
          end: "2024-12-31",
          reason: "Fermeture annuelle",
        },
      ],
      showAddDialog: false,
      startMenu: false,
      endMenu: false,
      newPeriod: {
        start: "",
        end: "",
        reason: "",
      },
    };
  },
  methods: {
    getEventColor(event) {
      return event.color;
    },
    showEvent(event) {
      // Afficher les détails de l'événement
      console.log(event);
    },
    viewDay(date) {
      // Afficher la vue du jour
      console.log(date);
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("fr-FR");
    },
    addBlockedPeriod() {
      if (this.newPeriod.start && this.newPeriod.end && this.newPeriod.reason) {
        this.blockedPeriods.push({
          start: this.newPeriod.start,
          end: this.newPeriod.end,
          reason: this.newPeriod.reason,
        });
        this.showAddDialog = false;
        this.newPeriod = {
          start: "",
          end: "",
          reason: "",
        };
      }
    },
    removeBlockedPeriod(index) {
      this.blockedPeriods.splice(index, 1);
    },
  },
  watch: {
    blockedPeriods: {
      handler(newPeriods) {
        this.events = newPeriods.map((period) => ({
          name: period.reason,
          start: period.start,
          end: period.end,
          color: "red",
        }));
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.planification {
  padding: 20px;
}
</style>
