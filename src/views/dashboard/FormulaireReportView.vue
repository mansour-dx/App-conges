<template>
  <div class="formulaire-report-view">
    <div class="page-header">
      <div class="header-content">
        <button class="back-button" @click="retourGestionDemandes">
          <i class="fas fa-arrow-left"></i>
          Retour
        </button>
        <h1>Report de Congés</h1>
      </div>
      <p class="header-description">Demandez le report de vos jours de congés non utilisés</p>
    </div>

    <div class="form-container">
      <DemandeReport />
    </div>
  </div>
</template>

<script>
import DemandeReport from "@/components/dashboard/DemandeReport.vue";

export default {
  name: "FormulaireReportView",
  components: {
    DemandeReport,
  },
  methods: {
    retourGestionDemandes() {
      const prefix = this.$route.path.split('/')[1];
      this.$router.push(`/${prefix}/gestion-demandes`);
    },
  },
};
</script>

<style scoped>
.formulaire-report-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  border-left: 4px solid #008a9b;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  background: #008a9b;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: #006d7a;
}

.back-button i {
  font-size: 0.9rem;
}

.page-header h1 {
  color: #261555;
  font-size: 2rem;
  margin: 0;
}

.header-description {
  color: #64748b;
  margin: 0.5rem 0 0 0;
  font-size: 1.1rem;
}

.form-container {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

@media (max-width: 768px) {
  .formulaire-report-view {
    padding: 10px;
  }

  .page-header {
    padding: 1.5rem;
  }

  .page-header h1 {
    font-size: 1.5rem;
  }

  .form-container {
    padding: 1rem;
  }
}
</style> 