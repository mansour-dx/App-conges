<template>
  <div class="etat-demandes">
    <div class="page-header">
      <h1>État des Demandes</h1>
      <p>Suivez l'évolution de vos demandes de congés</p>
    </div>
    <EtatDemandes />
  </div>
</template>

<script>
import EtatDemandes from "@/components/dashboard/EtatDemandes.vue";

export default {
  name: "EtatDemandesView",
  components: {
    EtatDemandes,
  },
};
</script>

<style scoped>
.etat-demandes {
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  font-family: "Inter", sans-serif;
}

/* Page Header */
.page-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 16px;
  border-left: 4px solid #008a9b;
}

.page-header h1 {
  color: #261555;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.page-header p {
  color: #6c757d;
  font-size: 1.1rem;
  margin: 0;
}
</style>
